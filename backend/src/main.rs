#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};
use rocket_contrib::json::Json;

mod modules;

use modules::{placeholders, templates};

pub struct CORS;
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    fn on_response(&self, _request: &Request, response: &mut Response) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH, OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[get("/template")]
fn get_template() -> Json<Vec<String>> {
    let templates_names = templates::get_templates_names();
    Json(templates_names)
}

#[get("/template/<name>/placeholders")]
fn get_placeholders(name: String) -> Json<Vec<String>> {
    let template_name = match templates::try_to_find_template(name) {
        Ok(template_name) => template_name,
        Err(err_message) => err_message,
    };

    let template_content = templates::get_template_content(template_name);

    let placeholders = placeholders::find_placeholders(template_content);

    Json(placeholders)
}

fn main() {
    rocket::ignite()
        .attach(CORS)
        .mount("/", routes![get_template, get_placeholders])
        .launch();
}
