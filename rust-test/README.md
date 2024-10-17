## 1. Create project
```
$cargo new rust-test
$cd rust-test
$cargo build
$./target/debug/rust-test 
Hello, world!
```

## 2. Create REST API

Add libraries in file `Cargo.toml`
```
[dependencies]
axum = "0.6"
tokio = { version = "1", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

Run application
```
$cargo run
```

Access to API
* http://127.0.0.1:3000/hello

## 3. Testing REST API
Add libraries for testing
```
tower = "0.51"
hyper = "1.0"
```

Add test in main.rs
```
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
```

Run test
```
$cargo test
```

## 4. Add code coverage
```
$cargo install cargo-tarpaulin
```

Run
```
$cargo tarpaulin
```

Generate report
```
$cargo tarpaulin --out Html
```
Open report file `tarpaulin-report.html`
