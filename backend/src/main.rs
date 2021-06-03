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

#[get("/template/<name>/placeholders")]
fn get_placeholders(name: String) -> Json<Vec<String>> {
    let file_name = match backend::try_to_find_file(name) {
        Ok(file_name) => file_name,
        Err(err_message) => err_message,
    };

    let template_content = get_template_content(file_name);

    let placeholders = find_placeholders(template_content);

    Json(placeholders)
}

fn main() {
    rocket::ignite()
        .attach(CORS)
        .mount("/", routes![get_template, get_placeholders])
        .launch();
}

use std::fs;
use std::io::Read;
use std::io::Write;
use zip::write::FileOptions;

fn make_document_copy() {
    let file = fs::File::open("static/handover_protocol_NAKUKOP_template.docx").unwrap();
    let new_file = fs::File::create("sss.docx").unwrap();

    let mut archive = zip::ZipArchive::new(&file).unwrap();
    let mut zip = zip::ZipWriter::new(&new_file);

    let options = FileOptions::default().compression_method(zip::CompressionMethod::Stored);

    for i in 0..archive.len() {
        let mut inner_file = archive.by_index(i).unwrap();
        let mut inner_file_content = String::new();
        inner_file.read_to_string(&mut inner_file_content).unwrap();

        zip.start_file(inner_file.name(), options).unwrap();
        zip.write(inner_file_content.as_bytes()).unwrap();
    }
}

fn get_template_content(file_name: String) -> String {
    let dir = "static/"; // refactor
    let full_name = format!("{}{}", dir, file_name);

    let file = fs::File::open(full_name).unwrap();
    let mut archive = zip::ZipArchive::new(&file).unwrap();

    for i in 0..archive.len() {
        let mut inner_file = archive.by_index(i).unwrap();

        if inner_file.name().contains("word/document") {
            let mut inner_file_content = String::new();
            inner_file.read_to_string(&mut inner_file_content).unwrap();
            return inner_file_content;
        }
    }

    return String::new();
}

use regex::Regex;

fn find_placeholders(file_content: String) -> Vec<String> {
    let re = Regex::new(r"\{\{.+?\}\}").unwrap();
    let mut placeholders: Vec<String> = Vec::new();

    for caps in re.captures_iter(file_content.as_str()) {
        let one_placeholder = caps.get(0).unwrap().as_str();
        let expanded_placeholder = expand_placeholder(one_placeholder);
        placeholders.push(String::from(expanded_placeholder));
    }

    placeholders
}

fn expand_placeholder(raw_placeholder: &str) -> &str {
    let expanded_placeholder = &raw_placeholder[2..raw_placeholder.len() - 2];
    expanded_placeholder.trim()
}
