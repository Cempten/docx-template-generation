use std::fs;

const TEMPLATES_PATH: &str = "static/";

pub fn get_templates_names() -> Vec<String> {
    let mut file_names: Vec<String> = Vec::new();

    let dir = fs::read_dir(TEMPLATES_PATH).unwrap();

    for file in dir {
        let file_name = file.unwrap().file_name().into_string().unwrap();
        file_names.push(file_name);
    }

    file_names
}

pub fn try_to_find_file(name: String) -> Result<String, String> {
    let dir = fs::read_dir(TEMPLATES_PATH).unwrap();

    for file in dir {
        let file_name = file.unwrap().file_name().into_string().unwrap();
        if file_name == name {
            return Ok(file_name);
        }
    }
    Err(String::from("File not found"))
}
