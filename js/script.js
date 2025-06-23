let otpKeeper;
let countNum;
let otpgen = document.querySelector(".otp-gen");
let otpvalid = document.querySelector(".otp-valid");

function otpGen() {
  function GEN_OTP(length = 6) {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 7);
    }
    return otp;
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.75) {
        resolve((otpKeeper = GEN_OTP()));
        startCountDown();
      } else {
        reject(`Server Down`);
      }
    }, 150);
  });
}

function retryOtpGen(retries = 15) {
  return otpGen().catch((err) => {
    if (retries > 0) {
      console.log(`Please wait, Retrying... Attempt left ${retries}`);
      return retryOtpGen(retries - 1);
    } else {
      return Promise.reject("All retry attempt failed.");
    }
  });
}

function resetOTPInput() {
  otpvalid.querySelector(".otp-paste").value = "";
  otpvalid.querySelector(".otp-btn-valid").disabled = true;
  otpvalid.querySelector(".otp-paste").disabled = true;
  otpKeeper = null;
  clearInterval(countNum);
  otpvalid.querySelector(".otp-result").innerHTML = "";
}

checkOTP();
otpgen.querySelector(".otp-btn").addEventListener("click", () => {
  retryOtpGen()
    .then((result) => {
      console.log(`Otp is ${result}`);
      otpvalid.querySelector(".otp-btn-valid").disabled = false;
      otpvalid.querySelector(".otp-paste").disabled = false;
    })
    .catch((err) => {
      console.error(`There was an issue: ${err}`);
    });
});

function startCountDown() {
  clearInterval(countNum);
  let timerNum = 30;
  otpvalid.querySelector(
    ".timer-message"
  ).innerHTML = `Otp expires in ${timerNum}s`;
  countNum = setInterval(() => {
    timerNum--;
    otpvalid.querySelector(
      ".timer-message"
    ).innerHTML = `Otp expires in ${timerNum}s`;
    if (timerNum <= 0) {
      resetOTPInput();
      otpvalid.querySelector(".timer-message").innerHTML = `Otp expired`;
    }
  }, 1000);
}

function checkOTP() {
  otpvalid
    .querySelector(".otp-btn-valid")
    .addEventListener("click", (params) => {
      const user_Value = otpvalid.querySelector(".otp-paste").value;
      otpvalid.querySelector(
        ".otp-result"
      ).innerHTML = `Please wait until OTP is checked`;
      setTimeout(() => {
        if (user_Value.length === 6) {
          if (user_Value === otpKeeper) {
            otpvalid.querySelector(
              ".timer-message"
            ).innerHTML = `✅ The otp is correct`;
            resetOTPInput();
            console.clear();
          } else {
            otpvalid.querySelector(
              ".otp-result"
            ).innerHTML = `❌ The otp is incorrect`;
            otpvalid.querySelector(".otp-paste").value = "";
            console.clear();
          }
        } else {
          otpvalid.querySelector(
            ".otp-result"
          ).innerHTML = `⚠️ The OTP should be exact 6-Digits`;
          otpvalid.querySelector(".otp-paste").value = "";
          console.clear();
        }
      }, 500);
    });
}
