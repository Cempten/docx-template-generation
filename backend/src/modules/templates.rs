use std::fs;
use std::io::ErrorKind;
use std::io::{Read, Write};
use std::path::PathBuf;

use zip::write::FileOptions;

const TEMPLATES_PATH: &str = "static/";
const PREFIX: &str = "done_";

pub fn get_templates_names() -> Result<Vec<String>, &'static str> {
    let mut template_names: Vec<String> = Vec::new();

    let dir = match fs::read_dir(TEMPLATES_PATH) {
        Ok(dir) => dir,
        Err(err) => match err.kind() {
            ErrorKind::NotFound => match fs::create_dir(TEMPLATES_PATH) {
                Ok(_) => return Ok(template_names),
                Err(_) => return Err("Failed to create directory"),
            },
            _ => return Err("Failed to create directory"),
        },
    };

    for template in dir {
        let template_name = template.unwrap().file_name().into_string().unwrap();
        if &template_name[0..PREFIX.len()] != PREFIX {
            template_names.push(template_name);
        }
    }

    Ok(template_names)
}

pub fn try_to_find_template(name: String) -> Result<String, &'static str> {
    let dir = fs::read_dir(TEMPLATES_PATH).unwrap();

    for template in dir {
        let template_name = template.unwrap().file_name().into_string().unwrap();
        if template_name == name {
            return Ok(template_name);
        }
    }
    Err("Template not found")
}

pub fn get_template_content(template_name: &String) -> Result<String, &'static str> {
    let full_name = format!("{}{}", TEMPLATES_PATH, template_name);

    let template = match fs::File::open(full_name) {
        Ok(file) => file,
        Err(_) => return Err("Template not found"),
    };
    let mut archive = match zip::ZipArchive::new(&template) {
        Ok(zip) => zip,
        Err(_) => return Err("Template is damaged"),
    };

    for i in 0..archive.len() {
        let mut inner_file = match archive.by_index(i) {
            Ok(zip) => zip,
            Err(_) => return Err("Template is damaged"),
        };

        if inner_file.name().contains("word/document") {
            let mut inner_file_content = String::new();
            if let Err(_) = inner_file.read_to_string(&mut inner_file_content) {
                return Err("Template is damaged");
            };

            return Ok(inner_file_content);
        }
    }

    Err("Template not found")
}

pub fn try_to_delete_template(template_name: String) -> Result<String, &'static str> {
    let full_template_name = format!("{}{}", TEMPLATES_PATH, template_name);
    let full_filled_template_name = format!("{}{}{}", TEMPLATES_PATH, PREFIX, template_name);

    if let Err(_) = fs::remove_file(full_template_name) {
        return Err("Unable to delete template");
    }
    if let Err(_) = fs::remove_file(full_filled_template_name) {
        return Ok(template_name);
    };
    Ok(template_name)
}

pub fn save_file(file_name: &String, file_path: PathBuf) -> Result<(), &'static str> {
    let full_name = format!("{}{}", TEMPLATES_PATH, file_name);

    match fs::copy(file_path, full_name) {
        Ok(_) => return Ok(()),
        Err(_) => return Err("File save error"),
    }
}

pub fn edit_template(file_name: &String, new_content: String) -> Result<String, &'static str> {
    let template_path = format!("{}{}", TEMPLATES_PATH, file_name);
    let template = match fs::File::open(template_path) {
        Ok(file) => file,
        Err(_) => return Err("File not found"),
    };

    let filling_template_name = format!("{}{}{}", TEMPLATES_PATH, PREFIX, file_name);
    let filling_template = match fs::File::create(&filling_template_name) {
        Ok(file) => file,
        Err(_) => return Err("File creation error"),
    };

    let mut archive = match zip::ZipArchive::new(template) {
        Ok(archive) => archive,
        Err(_) => return Err("File unzip error"),
    };
    let mut zip = zip::ZipWriter::new(filling_template);

    let options = FileOptions::default().compression_method(zip::CompressionMethod::Stored);

    for i in 0..archive.len() {
        let mut inner_file = match archive.by_index(i) {
            Ok(inner_file) => inner_file,
            Err(_) => return Err("File unzip error"),
        };

        let mut inner_file_content = String::new();

        if inner_file.name().contains("word/document") {
            inner_file_content = new_content.clone();
        } else {
            if let Err(_) = inner_file.read_to_string(&mut inner_file_content) {
                return Err("Error reading file content");
            };
        }

        if let Err(_) = zip.start_file(inner_file.name(), options) {
            return Err("File save error");
        }
        if let Err(_) = zip.write(inner_file_content.as_bytes()) {
            return Err("File save error");
        }
    }
    let filling_template_name = String::from(&filling_template_name[TEMPLATES_PATH.len()..]);
    Ok(filling_template_name)
}
