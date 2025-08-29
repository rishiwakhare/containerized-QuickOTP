# 🚀 QuickOTP - Containerized OTP Service with Monitoring

QuickOTP is a modern **One-Time Password (OTP) delivery system** built on **Node.js (Express)** with a lightweight frontend, 
fully containerized using **Docker Compose**, and production-ready observability powered by **Prometheus + Grafana**.

---

## ✨ Why This Project Stands Out (Interview Highlights)

- 🔒 **Secure OTP Delivery** → Generates and emails OTPs via Gmail (App Passwords).
- ⚡ **Containerized Architecture** → Seamless orchestration of **Frontend, Backend, Prometheus, Grafana** with Docker Compose.
- 📊 **Enterprise-grade Monitoring** → Exposes `/metrics` for Prometheus & visualizes system health in Grafana dashboards.
- 🚀 **DevOps Ready** → CI/CD pipeline integration (via GitHub Actions) for automated build/test/deploy.

This project demonstrates **system design, backend engineering, observability, and DevOps practices** in a compact yet impactful way — a perfect portfolio project.

---

## 📂 Project Structure

```
containerized-QuickOTP/
├── backend/            # Node.js + Express backend (OTP API + Prometheus metrics)
│   ├── server.js
│   ├── package.json
│   └── creds.txt
├── frontend/           # HTML/CSS/JS frontend (OTP request + validation UI)
│   ├── index.html
│   ├── css/style.css
│   └── js/script.js
├── prometheus.yml      # Prometheus scraping configuration
├── docker-compose.yml  # Multi-service orchestration
└── README.md           # This file 😉
```

---

## ⚙️ Features

- **OTP Service**
  - Generate, send, and validate OTPs via email.
- **Observability**
  - Metrics collected: latency, throughput, error rates, OTP attempts, email send latency.
- **Monitoring Stack**
  - Prometheus (scraping metrics)
  - Grafana (dashboards with p95 latency, error rate %, OTP analytics)
- **DevOps**
  - Containerized with Docker Compose
  - Ready for CI/CD pipeline integration

---

## 🐳 Run with Docker Compose

```bash
docker-compose up --build
```

### Access Points
- 🌐 **Frontend** → [http://localhost:8080](http://localhost:8080)
- ⚡ **Backend API** → [http://localhost:3000](http://localhost:3000)
- 📊 **Prometheus** → [http://localhost:9090](http://localhost:9090)
- 📈 **Grafana** → [http://localhost:3001](http://localhost:3001) (default: admin / admin)

---

## 📊 Prometheus Metrics Exposed

- `http_requests_total` → Total HTTP requests
- `http_request_duration_seconds` → Latency histogram
- `otp_send_total{status}` → OTP send attempts (success/fail)
- `otp_validate_total{status}` → OTP validation attempts
- `otp_email_duration_seconds` → Email send latency (histogram)
- `active_otps` → Gauge for active OTPs in memory

---

## 📈 Grafana Dashboard Ideas

- ✅ **Error Rate (%)** → Failed requests / total
- ✅ **Latency (p95)** → histogram_quantile(0.95, ...)
- ✅ **OTP Send Attempts** → success vs fail
- ✅ **OTP Validation Results** → success vs fail
- ✅ **Email Send Duration** → p95 latency

---

## 🧪 Testing API

**Send OTP**:
```bash
curl -X POST http://localhost:3000/send-otp   -H "Content-Type: application/json"   -d '{"email":"test@example.com","otp":"123456"}'
```

**Validate OTP**:
```bash
curl -X POST http://localhost:3000/validate-otp   -H "Content-Type: application/json"   -d '{"email":"test@example.com","otp":"123456"}'
```

---

## 💡 Interview Talking Points

- How **observability (Prometheus + Grafana)** gives insights into system reliability.
- Why **Docker Compose** simplifies multi-service orchestration.
- How **GitHub Actions CI/CD** could automate testing + deployment.
- Scaling QuickOTP → moving OTP storage from memory → Redis/DB.

---