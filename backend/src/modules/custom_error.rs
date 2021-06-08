use rocket::http::Status;
use rocket::response::status::Custom;
use rocket_contrib::json::Json;

pub type CustomErrorType = Custom<Json<CustomError>>;

#[derive(Serialize, Debug)]
pub struct CustomError {
    status: u16,
    message: &'static str,
}

impl CustomError {
    pub fn new(status: u16, message: &'static str) -> CustomErrorType {
        Custom(
            Status::new(status, message),
            Json(CustomError { status, message }),
        )
    }
}
