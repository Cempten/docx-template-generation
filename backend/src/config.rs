use multipart::server::{
    save::SaveResult::{Error, Full, Partial},
    Multipart,
};
use rocket::{http::ContentType, response, Data, Request, Response};
use rocket_contrib::json::Json;
use std::collections::HashMap;
use std::fs::File;
use std::io::ErrorKind;

use crate::modules::{
    custom_error::{CustomError, CustomErrorType},
    placeholders, request_utils, templates,
};

type ApiResponse<T> = Result<T, CustomErrorType>;

#[derive(Deserialize, Debug)]
pub struct Placeholders {
    placeholders: HashMap<String, String>,
}

pub struct FileStruct(File);

impl<'r> response::Responder<'r> for FileStruct {
    fn respond_to(self, req: &Request) -> response::Result<'r> {
        Response::build_from(self.0.respond_to(req)?)
            .raw_header("Content-Disposition", "attachment")
            .ok()
    }
}

#[get("/template")]
pub fn get_template() -> ApiResponse<Json<Vec<String>>> {
    let templates_names = match templates::get_templates_names() {
        Ok(names) => names,
        Err(err) => return Err(CustomError::new(500, err)),
    };

    Ok(Json(templates_names))
}

#[post("/template", data = "<data>")]
pub fn new_template(cont_type: &ContentType, data: Data) -> ApiResponse<Json<String>> {
    let boundary = match request_utils::get_boundary(cont_type) {
        Ok(boundary) => boundary,
        Err(err) => return Err(CustomError::new(400, err)),
    };

    let entries = match Multipart::with_body(data.open(), boundary).save().temp() {
        Full(entries) => entries,
        Partial(_, _) => return Err(CustomError::new(400, "Partial data")),
        Error(_) => return Err(CustomError::new(400, "File read failed")),
    };

    let (file_name, file_path) = match request_utils::get_file_from_req_body(&entries) {
        Ok((file_name, file_content)) => (file_name, file_content),
        Err(err) => return Err(CustomError::new(400, err)),
    };

    if let Err(err) = templates::save_file(&file_name, file_path) {
        return Err(CustomError::new(400, err));
    }

    return Ok(Json(file_name));
}

#[get("/template/<name>/placeholders")]
pub fn get_placeholders(name: String) -> ApiResponse<Json<Vec<String>>> {
    let template_name = match templates::try_to_find_template(name) {
        Ok(template_name) => template_name,
        Err(err) => return Err(CustomError::new(404, err)),
    };

    let template_content = match templates::get_template_content(&template_name) {
        Ok(content) => content,
        Err(err) => return Err(CustomError::new(500, err)),
    };

    let mut placeholders = placeholders::find_placeholders(&template_content);
    for elem in placeholders.iter_mut() {
        *elem = String::from(placeholders::expand_placeholder(elem));
    }

    Ok(Json(placeholders))
}

#[post("/template/<name>", data = "<data>")]
pub fn get_filled_template(data: Json<Placeholders>, name: String) -> ApiResponse<Json<String>> {
    let mut template_content = match templates::get_template_content(&name) {
        Ok(content) => content,
        Err(err) => return Err(CustomError::new(500, err)),
    };

    let raw_placeholders = placeholders::find_placeholders(&template_content);

    for one_raw_placeholder in raw_placeholders.iter() {
        let expanded_placeholder =
            String::from(placeholders::expand_placeholder(one_raw_placeholder));

        let placeholder_value = match data.placeholders.get(&expanded_placeholder) {
            Some(value) => value,
            None => continue,
        };

        let updated_template_content =
            template_content.replace(one_raw_placeholder, placeholder_value);

        template_content = updated_template_content;
    }

    let filled_template_name = match templates::edit_template(&name, template_content) {
        Ok(name) => name,
        Err(err) => return Err(CustomError::new(500, err)),
    };

    return Ok(Json(filled_template_name));
}

#[get("/template/<name>")]
pub fn download_template(name: String) -> ApiResponse<FileStruct> {
    let full_name = format!("{}{}", "static/", name);
    let filled_template = match File::open(full_name) {
        Ok(name) => name,
        Err(err) => match err.kind() {
            ErrorKind::NotFound => return Err(CustomError::new(404, "Template not find")),
            _ => return Err(CustomError::new(404, "File read error")),
        },
    };
    return Ok(FileStruct(filled_template));
}

#[delete("/template/<name>")]
pub fn delete_template(name: String) -> ApiResponse<Json<String>> {
    let template_name = match templates::try_to_find_template(name) {
        Ok(template_name) => template_name,
        Err(err) => return Err(CustomError::new(404, err)),
    };

    match templates::try_to_delete_template(template_name) {
        Ok(deleted_template_name) => return Ok(Json(deleted_template_name)),
        Err(err) => return Err(CustomError::new(500, err)),
    };
}
