use std::fs;
use std::io::{Read, Write};
use std::path::PathBuf;

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

pub fn get_template_content(template_name: String) -> Result<String, String> {
    let full_name = format!("{}{}", TEMPLATES_PATH, template_name);

    let template = match fs::File::open(full_name) {
        Ok(file) => file,
        Err(_) => return Err(String::from("Template not found")),
    };
    let mut archive = match zip::ZipArchive::new(&template) {
        Ok(zip) => zip,
        Err(_) => return Err(String::from("File is damaged")),
    };

    for i in 0..archive.len() {
        let mut inner_file = match archive.by_index(i) {
            Ok(zip) => zip,
            Err(_) => return Err(String::from("File is damaged")),
        };

        if inner_file.name().contains("word/document") {
            let mut inner_file_content = String::new();
            if let Err(_) = inner_file.read_to_string(&mut inner_file_content) {
                return Err(String::from("File is damaged"));
            };

            return Ok(inner_file_content);
        }
    }

    Err(String::from("Template not found"))
}

pub fn try_to_delete_template(template_name: String) -> Result<String, String> {
    let full_name = format!("{}{}", TEMPLATES_PATH, template_name);

    if let Err(_) = fs::remove_file(full_name) {
        return Err(String::from("Unable to delete template"));
    }
    Ok(template_name)
}

pub fn save_file(file_name: &String, file_path: PathBuf) -> Result<(), String> {
    let template = match fs::File::open(file_path) {
        Ok(file) => file,
        Err(_) => return Err(String::from("File not found")),
    };

    let full_name = format!("{}{}", TEMPLATES_PATH, file_name);
    let new_template = match fs::File::create(full_name) {
        Ok(file) => file,
        Err(_) => return Err(String::from("File creation error")),
    };

    let mut archive = match zip::ZipArchive::new(template) {
        Ok(archive) => archive,
        Err(_) => return Err(String::from("File unzip error")),
    };
    let mut zip = zip::ZipWriter::new(new_template);

    let options = FileOptions::default().compression_method(zip::CompressionMethod::Stored);

    for i in 0..archive.len() {
        let mut inner_file = match archive.by_index(i) {
            Ok(inner_file) => inner_file,
            Err(_) => return Err(String::from("File unzip error")),
        };

        let mut inner_file_content = String::new();
        if let Err(_) = inner_file.read_to_string(&mut inner_file_content) {
            return Err(String::from("Error reading file content"));
        };

        if let Err(_) = zip.start_file(inner_file.name(), options) {
            return Err(String::from("File save error"));
        }
        if let Err(_) = zip.write(inner_file_content.as_bytes()) {
            return Err(String::from("File save error"));
        }
    }
    Ok(())
}
