#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate serde_derive;

use std::collections::HashMap;
use std::sync::Mutex;

use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::State;
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

type ID = usize;

type MessageMap = Mutex<HashMap<ID, String>>;

#[derive(Serialize, Deserialize)]
struct Message {
    id: Option<ID>,
    contents: Option<String>,
}

#[get("/<id>", format = "json")]
fn get(id: ID) -> Json<Message> {
    Json(Message {
        id: None,
        contents: Some(String::from("s: &str")),
    })
}

fn main() {
    rocket::ignite()
        .attach(CORS)
        .mount("/", routes![get])
        .launch();
}
