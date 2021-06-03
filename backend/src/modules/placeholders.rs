use regex::Regex;

pub fn find_placeholders(template_content: String) -> Vec<String> {
    let re = Regex::new(r"\{\{.+?\}\}").unwrap();
    let mut placeholders: Vec<String> = Vec::new();

    for caps in re.captures_iter(template_content.as_str()) {
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
