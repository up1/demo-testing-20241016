use axum::{routing::get, Router};
use axum::response::Json;
use serde_json::json;
use std::net::SocketAddr;

// Create the app as a reusable function
fn create_app() -> Router {
    Router::new().route("/hello", get(hello))
}

#[tokio::main]
async fn main() {
    let app = create_app();

    // Run our application
    let addr: SocketAddr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Server listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// The handler for GET /hello
async fn hello() -> Json<serde_json::Value> {
    Json(json!({ "message": "Hello Rust" }))
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::http::{Request, StatusCode};
    use axum::body::Body;
    use tower::ServiceExt; // for `oneshot` testing

    #[tokio::test]
    async fn test_hello_success() {
        // Arrange
        let app = create_app();

        // Act
        let response = app
            .oneshot(
                Request::builder()
                    .uri("/hello")
                    .body(Body::empty())
                    .unwrap()
            )
            .await
            .unwrap();

        // Assert
        assert_eq!(response.status(), StatusCode::OK);

        let body = hyper::body::to_bytes(response.into_body()).await.unwrap();
        let json_body: serde_json::Value = serde_json::from_slice(&body).unwrap();

        assert_eq!(json_body, json!({ "message": "Hello Rust" }));
    }
}
