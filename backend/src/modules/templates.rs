use std::fs;
use std::io::{Read, Write};

use zip::write::FileOptions;

const TEMPLATES_PATH: &str = "static/";

pub fn get_templates_names() -> Vec<String> {
    let mut template_names: Vec<String> = Vec::new();

    let dir = fs::read_dir(TEMPLATES_PATH).unwrap();

    for template in dir {
        let template_name = template.unwrap().file_name().into_string().unwrap();
        template_names.push(template_name);
    }

    template_names
}

pub fn try_to_find_template(name: String) -> Result<String, String> {
    let dir = fs::read_dir(TEMPLATES_PATH).unwrap();

    for template in dir {
        let template_name = template.unwrap().file_name().into_string().unwrap();
        if template_name == name {
            return Ok(template_name);
        }
    }
    Err(String::from("Template not found"))
}

pub fn get_template_content(template_name: String) -> String {
    let full_name = format!("{}{}", TEMPLATES_PATH, template_name);

    let template = fs::File::open(full_name).unwrap();
    let mut archive = zip::ZipArchive::new(&template).unwrap();

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

fn make_document_copy() {
    let template = fs::File::open("static/handover_protocol_NAKUKOP_template.docx").unwrap();
    let new_template = fs::File::create("sss.docx").unwrap();

    let mut archive = zip::ZipArchive::new(template).unwrap();
    let mut zip = zip::ZipWriter::new(new_template);

    let options = FileOptions::default().compression_method(zip::CompressionMethod::Stored);

    for i in 0..archive.len() {
        let mut inner_file = archive.by_index(i).unwrap();
        let mut inner_file_content = String::new();
        inner_file.read_to_string(&mut inner_file_content).unwrap();

        zip.start_file(inner_file.name(), options).unwrap();
        zip.write(inner_file_content.as_bytes()).unwrap();
    }
}
