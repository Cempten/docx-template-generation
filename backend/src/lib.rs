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
