import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import client from "prom-client";

const app = express();
app.use(express.json());
app.use(cors());

let otpStore = {}; // { email: { otp, expires } }

// Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // 

// Custom histogram for request duration
const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [50, 100, 300, 500, 1000, 2000, 5000], // ms buckets
});

// Middleware to measure request durations
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => {
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
      user: "", // mail
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

app.listen(3000, () =>
  console.log("✅ Backend running on http://localhost:3000")
);
