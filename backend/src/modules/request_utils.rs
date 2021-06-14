use std::path::PathBuf;

use multipart::server::{save::SavedData, Entries};
use rocket::http::ContentType;

pub fn get_boundary(cont_type: &ContentType) -> Result<String, &'static str> {
    let (_, boundary) = match cont_type.params().find(|&(k, _)| k == "boundary") {
        Some(x) => x,
        None => return Err("Boundary param not provided"),
    };
    Ok(String::from(boundary))
}

pub fn get_file_from_req_body(entries: &Entries) -> Result<(String, PathBuf), &'static str> {
    let file = match entries.fields.get("file") {
        Some(file) => file,
        None => return Err("File is missing"),
    };
    let file_name = match &file[0].headers.filename {
        Some(file_name) => file_name.clone(),
        None => String::from("unnamed.docx"),
    };

    if let SavedData::File(file_path, _) = &file[0].data {
        return Ok((file_name, file_path.clone()));
    };
    Err("Failed to read the contents of the file")
}
