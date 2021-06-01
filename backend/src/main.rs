#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};
use rocket_contrib::json::Json;

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
    let templates_names = backend::get_templates_names();
    Json(templates_names)
}

#[get("/template/<name>")]
fn get_placeholders(name: String) -> Json<String> {
    match backend::try_to_find_file(name) {
        Ok(file_name) => return Json(file_name),
        Err(err_message) => return Json(err_message),
    };
}

fn main() {
    rocket::ignite()
        .attach(CORS)
        .mount("/", routes![get_template, get_placeholders])
        .launch();
}
