const signInEmailOtpVerificationTemplateHtml = (otp) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email OTP</title>
    <style>
      body {
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 10px;
      }
      .container {
        margin: auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .container h1 {
        text-align: center;
        color: blue;
      }
      .message {
        text-align: center;
        margin-bottom: 20px;
      }
      .otp {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>ARR LINKS</h1>
      <div class="message">
        <h2>One-Time Password (OTP)</h2>
        <p>Please use the following OTP to verify your email:</p>
      </div>
      <div class="otp">
        <span>${otp}</span>
      </div>
      <div class="footer">
        <p>OTP will expire in 10 minutes.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>&copy; 2023 ARR links All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

const signInEmailOtpVerificationTemplateText = (otp) => {
  return `Your One-Time Password is ${otp}`;
};

const passwordRecoveryTemplateHtml = (otp) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email OTP</title>
    <style>
      body {
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 10px;
      }
      .container {
        margin: auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .container h1 {
        text-align: center;
        color: blue;
      }
      .message {
        text-align: center;
        margin-bottom: 20px;
      }
      .otp {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>ARR LINKS</h1>
      <div class="message">
        <h2>One-Time Password (OTP)</h2>
        <p>Please use the following OTP to recover the password:</p>
      </div>
      <div class="otp">
        <span>${otp}</span>
      </div>
      <div class="footer">
        <p>OTP will expire in 10 minutes.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>&copy; 2023 ARR links All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

const passwordRecoveryTemplateText = (otp) => {
  return `Your password recovery OTP is ${otp}`;
};

module.exports = {
  signInEmailOtpVerificationTemplateHtml,
  signInEmailOtpVerificationTemplateText,
  passwordRecoveryTemplateHtml,
  passwordRecoveryTemplateText,
};
