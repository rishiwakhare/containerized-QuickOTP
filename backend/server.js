import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import client from "prom-client";

const app = express();
app.use(express.json());
app.use(cors());

let otpStore = {}; // { email: { otp, expires } }

client.collectDefaultMetrics();

// Active OTPs
const otpActiveCount = new client.Gauge({
  name: "otp_active_count",
  help: "Number of active OTPs currently stored",
});

// OTP send attempts
const otpSendAttempts = new client.Counter({
  name: "otp_send_total",
  help: "Number of OTP send attempts",
  labelNames: ["status"], // success | failed
});

// OTP validation attempts
const otpValidationAttempts = new client.Counter({
  name: "otp_validation_total",
  help: "Number of OTP validation attempts",
  labelNames: ["result"], // valid | invalid | expired
});

// Email send duration
const emailSendDuration = new client.Histogram({
  name: "email_send_duration_seconds",
  help: "Duration of sending OTP emails",
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});

// HTTP request counter
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// HTTP request duration (seconds)
const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 1, 3, 5],
});

// Middleware to capture HTTP metrics
app.use((req, res, next) => {
  const end = httpRequestDurationSeconds.startTimer();
  res.on("finish", () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
    end({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
});

// Expose metrics for Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});



// send OTP
app.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Email & OTP required" });

  otpStore[email] = { otp, expires: Date.now() + 1 * 60 * 1000 };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rishiwakhare2002@gmail.com", // mail
      pass: "", // pass through google app (not the normal password)
    },
  });

  try {
    await transporter.sendMail({
      from: '"QuickOTP" <your_email@gmail.com>',
      to: email,
      subject: "Your One-Time Password (OTP) for Verification",
      text: `Your One-Time Password (OTP) is: ${otp}. 

This OTP is valid for 1 minute. Please do not share it with anyone.
      
If you did not request this, please ignore this email.
      
Thank you,
QuickOTP Team`,
    });
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

app.listen(3000, "0.0.0.0", () =>
  console.log("✅ Backend running on http://localhost:3000")
);
