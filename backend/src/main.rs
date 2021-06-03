#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate serde_derive;

use rocket::http::Status;
use rocket_contrib::json::Json;

mod modules;

use modules::{cors, placeholders, templates};

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

#[get("/template/<name>/placeholders")]
fn get_placeholders(name: String) -> Result<Json<Vec<String>>, Status> {
    let template_name = match templates::try_to_find_template(name) {
        Ok(template_name) => template_name,
        Err(_) => return Err(Status::NotFound),
    };

    let template_content = match templates::get_template_content(template_name) {
        Ok(template_name) => template_name,
        Err(_) => return Err(Status::NotFound),
    };

    let placeholders = placeholders::find_placeholders(template_content);

    Ok(Json(placeholders))
}

#[catch(404)]
fn not_found() -> Json<CustomError> {
    Json(CustomError {
        status: 404,
        message: String::from("Template not found"),
    })
}

fn main() {
    rocket::ignite()
        .attach(cors::CORS)
        .mount("/", routes![get_template, get_placeholders])
        .register(catchers![not_found])
        .launch();
}
