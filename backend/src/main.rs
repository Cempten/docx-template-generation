#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate serde_derive;

mod config;
mod modules;
use modules::cors;

fn main() {
    let cors_headers = cors::get_cors();

    rocket::ignite()
        .attach(cors_headers)
        .mount(
            "/",
            routes![
                config::get_template,
                config::get_placeholders,
                config::delete_template,
                config::new_template,
                config::get_filled_template,
                config::download_template
            ],
        )
        .register(catchers![config::not_found])
        .launch();
}
