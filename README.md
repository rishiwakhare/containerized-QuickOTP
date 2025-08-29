# QuickOTP (Dockerized Version) (WIP please use main branch)

This is a **Dockerized version** of the original [QuickOTP](https://github.com/rishiwakhare/QuickOTP) web application. The application's core functionality and UI remain unchanged. The only addition is a `Dockerfile` that allows the app to be containerized and served using **Nginx (alpine)**.

## 🔧 What's Different?

- Added a `Dockerfile` using the lightweight `nginx:alpine` image
- Enables containerized deployment of the static site

## 🚀 Run with Docker

1. **Build the Docker image**
   ```bash
   docker build -t quickotp-nginx .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 8080:80 quickotp-nginx
   ```

3. Open your browser at: [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure

```
/quickotp
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── Dockerfile
```

> The OTP app is unchanged. This version simply adds Docker support for serving via Nginx.

---

**Note:** For details on how the OTP logic works, refer to the original repository and its documentation.
