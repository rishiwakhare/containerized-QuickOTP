
# QuickOTP - OTP Verification Web App

A simple, interactive, and user-friendly web application to generate, validate, and verify One-Time Passwords (OTPs). Built with pure HTML, CSS, and JavaScript, QuickOTP simulates a typical OTP verification flow seen in authentication systems with a countdown timer and retry mechanism.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [How It Works](#how-it-works)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Possible Extensions](#possible-extensions)  
- [Contributing](#contributing)    

---

## Overview

QuickOTP is designed to simulate OTP generation and validation on the client side. It provides users with a 6-digit OTP that expires in 30 seconds, includes a retry system for generation failures, and validates user input with real-time feedback. This project is ideal for beginners learning JavaScript promises, async programming, DOM manipulation, and basic front-end design principles.

---

## Features

- Generate random 6-digit OTPs (digits 0-6)
- Simulate server failure with a 25% chance and auto-retry up to 15 times
- Enable OTP input with a 30-second expiry countdown timer
- Real-time OTP validation with success and error messages
- Disable inputs and reset after OTP expiration or successful validation
- Clean, responsive, and animated UI for a smooth user experience

---

## Tech Stack

- **HTML5** — Structure and layout  
- **CSS3** — Styling, animations, and responsive design  
- **JavaScript (ES6+)** — OTP generation, validation logic, timers, and DOM manipulation  

---

## How It Works

1. User clicks the **Generate OTP** button.  
2. The app attempts to generate a 6-digit OTP (digits 0 to 6) asynchronously.  
3. If generation fails (simulated 25% chance), it retries up to 15 times before giving up.  
4. On success, the OTP input field is enabled, and a 30-second countdown starts.  
5. The user enters the OTP and clicks **Verify OTP**.  
6. The app validates the input length and correctness against the generated OTP.  
7. Success or error messages are displayed.  
8. If the timer expires, the OTP input is disabled, and the OTP is invalidated.

---

## Usage

1. Clone or download the repository.  
2. Open `index.html` in any modern web browser.  
3. Click **Generate OTP** to receive a new OTP.  
4. Enter the OTP in the input field within 30 seconds.  
5. Click **Verify OTP** to check the validity.  
6. Observe feedback messages below the input.  

---

## Project Structure

```
/quickotp
│
├── index.html       # Main HTML page  
├── style.css        # Styling for the app  
└── script.js        # JavaScript functionality  
```

---

## Possible Extensions

- Integrate a backend (Node.js, Python, etc.) to generate and send real OTPs via SMS or email.  
- Replace the static OTP range (0-6) with the full digit range (0-9).  
- Add user authentication and session management.  
- Enhance UI with animations, notifications, and accessibility improvements.  
- Implement OTP attempt limits to increase security.  
- Add localization support for multiple languages.

---

## Contributing

Contributions are welcome! If you find any bugs or want to suggest new features, feel free to open an issue or submit a pull request.

---


**Enjoy using QuickOTP! Secure your apps with confidence. 🔐**
