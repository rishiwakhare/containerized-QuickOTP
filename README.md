# 🚀 QuickOTP – Containerized OTP Service with Monitoring  

A production-like **One-Time Password (OTP)** microservice built with:  

- **Backend** → Node.js + Express  
- **Frontend** → HTML/CSS/JavaScript  
- **Observability** → Prometheus + Grafana  
- **Containerization** → Docker & Docker Compose  

This project demonstrates **API design, observability, monitoring dashboards, and scalability concepts** — perfect for interview discussions.  

---

## 🛠️ Setup Instructions

### 1️⃣ Install Docker & Docker Compose  
[Get Docker](https://docs.docker.com/get-docker/)  

Verify installation:
```bash
docker -v
docker compose version
```

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/containerized-QuickOTP.git
cd containerized-QuickOTP
```

### 3️⃣ Configure Gmail App Password
- Go to [Google App Passwords](https://myaccount.google.com/apppasswords)  
- Generate a password for "Mail".  
- Edit `backend/server.js`:
  ```js
  auth: {
    user: "your_email@gmail.com",
    pass: "your_app_password"
  }
  ```

### 4️⃣ Give Docker Permissions (Linux only)
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### 5️⃣ Install Node.js Modules (if running backend locally)
```bash
cd backend
npm install
```

### 6️⃣ Run Everything
```bash
docker compose up --build
```

---

## 🌐 Access Points

- 🌍 **Frontend** → [http://localhost:8080](http://localhost:8080)  
- ⚙️ **Backend API** → [http://localhost:3000](http://localhost:3000)  
- 📊 **Prometheus** → [http://localhost:9090](http://localhost:9090)  
- 📈 **Grafana** → [http://localhost:3001](http://localhost:3001)  

---

## 📊 Metrics Exposed

Prometheus scrapes metrics from `/metrics`.  

**System Metrics**  
- CPU, memory, event loop, GC  

**Custom Business Metrics**
- `http_requests_total` → Count of requests by method/route/status  
- `http_request_duration_seconds` → Latency histogram  
- `otp_send_total{status="success"|"fail"}` → OTP sends  
- `otp_validate_total{status="success"|"fail"}` → OTP validations  
- `otp_active_count` → Current valid OTPs  
- `otp_email_duration_seconds` → Email send latency  

---

## 📈 Grafana Dashboard Ideas

- OTP Send Attempts (Success vs Fail) → 📊 Bar chart  
- OTP Validation Results → 🥧 Pie chart  
- Email Send Latency (p95) → ⏱️ Histogram  
- Error Rate (%) → 🚨 Time-series  
- Active OTPs Over Time → 📉 Gauge/line  
- API Latency Per Route → Heatmap  

---

## 🔗 API Endpoints

### 🔑 Send OTP
```http
POST /send-otp
Content-Type: application/json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

✅ Response
```json
{ "success": true, "message": "OTP sent" }
```

### 🔍 Validate OTP (Upcoming Feature)
```http
POST /validate-otp
Content-Type: application/json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

✅ Response
```json
{ "success": true, "message": "OTP valid" }
```

---

## ⚡ Scaling & Proof of Concept

- **Load Balancing** → Multiple backend containers behind NGINX or Kubernetes  
- **Persistent Storage** → Replace in-memory OTP store with Redis/MongoDB  
- **Secrets Management** → Store Gmail creds in `.env` or Docker secrets  
- **Alerting** → Prometheus alert rules (e.g., OTP failures > 10%)  
- **CI/CD** → GitHub Actions for build/test/deploy  

---

## 🔮 Roadmap / Upcoming Features

- ✅ OTP Validation endpoint  
- ✅ Configurable OTP expiry  
- ✅ SMS OTP via Twilio  
- ✅ Prebuilt Grafana dashboard JSON  
- ✅ Kubernetes Helm chart  

---

✨ **Demo Flow**:  
1. User enters email in frontend → OTP is generated.  
2. Backend sends OTP via Gmail → metrics are collected.  
3. Prometheus scrapes metrics → Grafana visualizes dashboards.  
4. Interviewer sees real **API, Monitoring & Scaling** story.  
