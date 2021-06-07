#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate serde_derive;

use multipart::server::{
    save::SaveResult::{Error, Full, Partial},
    Multipart,
};
use rocket::{
    http::{ContentType, Status},
    response, Data, Request, Response,
};
use rocket_contrib::json::Json;
use std::fs::File;

mod modules;
use modules::{cors, placeholders, request_utils, templates};

#[derive(Serialize, Deserialize)]
struct CustomError {
    message: String,
    status: usize,
}

#[get("/template")]
fn get_template() -> Json<Vec<String>> {
    let templates_names = templates::get_templates_names();
    Json(templates_names)
}

#[post("/template", data = "<data>")]
fn new_template(cont_type: &ContentType, data: Data) -> Result<Json<String>, Status> {
    let boundary = match request_utils::get_boundary(cont_type) {
        Ok(boundary) => boundary,
        Err(_) => return Err(Status::new(404, "Boundary param not provided")),
    };

    let entries = match Multipart::with_body(data.open(), boundary).save().temp() {
        Full(entries) => entries,
        Partial(_, _) => return Err(Status::new(404, "Partial data")),
        Error(_) => return Err(Status::new(404, "File read failed")),
    };

    let (file_name, file_path) = match request_utils::get_file_from_req_body(&entries) {
        Ok((file_name, file_content)) => (file_name, file_content),
        Err(err) => {
            println!("{}", err);
            return Err(Status::new(404, "File read failed"));
        }
    };

    if let Err(_) = templates::save_file(&file_name, file_path) {
        return Err(Status::new(404, "File save error"));
    }

    return Ok(Json(file_name));
}

#[get("/template/<name>/placeholders")]
fn get_placeholders(name: String) -> Result<Json<Vec<String>>, Status> {
    let template_name = match templates::try_to_find_template(name) {
        Ok(template_name) => template_name,
        Err(_) => return Err(Status::NotFound),
    };

    let template_content = match templates::get_template_content(&template_name) {
        Ok(content) => content,
        Err(_) => return Err(Status::NotFound),
    };

    let mut placeholders = placeholders::find_placeholders(&template_content);
    for elem in placeholders.iter_mut() {
        *elem = String::from(placeholders::expand_placeholder(elem));
    }

    Ok(Json(placeholders))
}

use std::collections::HashMap;

#[derive(Deserialize, Debug)]
struct Placeholders {
    placeholders: HashMap<String, String>,
}

#[post("/template/<name>", data = "<data>")]
fn get_filled_template(data: Json<Placeholders>, name: String) -> Result<Json<String>, Status> {
    let mut template_content = match templates::get_template_content(&name) {
        Ok(content) => content,
        Err(_) => return Err(Status::NotFound),
    };

    let raw_placeholders = placeholders::find_placeholders(&template_content);

    for one_raw_placeholder in raw_placeholders.iter() {
        let expanded_placeholder =
            String::from(placeholders::expand_placeholder(one_raw_placeholder));

        let placeholder_value = match data.placeholders.get(&expanded_placeholder) {
            Some(value) => value,
            None => return Err(Status::NotFound),
        };

        let updated_template_content =
            template_content.replace(one_raw_placeholder, placeholder_value);

        template_content = updated_template_content;
    }

    let filled_template_name = match templates::edit_template(&name, template_content) {
        Ok(name) => name,
        Err(_) => return Err(Status::NotFound),
    };

    return Ok(Json(filled_template_name));
}

struct FileStruct(File);

impl<'r> response::Responder<'r> for FileStruct {
    fn respond_to(self, req: &Request) -> response::Result<'r> {
        Response::build_from(self.0.respond_to(req)?)
            .raw_header("Content-Disposition", "attachment")
            .ok()
    }
}

#[get("/template/<name>")]
fn download_template(name: String) -> Result<FileStruct, Status> {
    let full_name = format!("{}{}", "static/", name);
    let filled_template = match File::open(full_name) {
        Ok(name) => name,
        Err(_) => return Err(Status::NotFound),
    };
    return Ok(FileStruct(filled_template));
}

#[delete("/template/<name>")]
fn delete_template(name: String) -> Result<Json<String>, Status> {
    let template_name = match templates::try_to_find_template(name) {
        Ok(template_name) => template_name,
        Err(_) => return Err(Status::NotFound),
    };

    match templates::try_to_delete_template(template_name) {
        Ok(deleted_template_name) => return Ok(Json(deleted_template_name)),
        Err(_) => return Err(Status::NotFound),
    };
}

#[catch(404)]
fn not_found() -> Json<CustomError> {
    Json(CustomError {
        status: 404,
        message: String::from("Template not found"),
    })
}

fn main() {
    let cors_headers = cors::get_cors();

    rocket::ignite()
        .attach(cors_headers)
        .mount(
            "/",
            routes![
                get_template,
                get_placeholders,
                delete_template,
                new_template,
                get_filled_template,
                download_template
            ],
        )
        .register(catchers![not_found])
        .launch();
}
