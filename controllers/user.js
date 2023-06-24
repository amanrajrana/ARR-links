const user = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/auth");
const { setOtp, verifyOtp } = require("./otp");
const { sendMail } = require("../services/sendMail");
const {
  signInEmailOtpVerificationTemplateHtml,
  signInEmailOtpVerificationTemplateText,
  passwordRecoveryTemplateText,
  passwordRecoveryTemplateHtml,
} = require("../services/template");

const emailHider = (email) => {
  return `${email.slice(0, 2)}***@***${email.slice(email.length - 3)}`;
};

// User Login Handle
const handelLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await user.findOne({ email }); // Get user from database

    // return  If user not found
    if (!findUser) {
      return res.status(401).send({ message: "user not found" });
    }

    // compare user's entered password store password
    const isHashPasswordMatch = await bcrypt.compare(
      password,
      findUser.password
    );

    // if password not match return
    if (!isHashPasswordMatch) {
      return res.status(401).send({
        message: "Invalid username or password",
      });
    }

    // create JWT payload
    const jwtPayload = {
      email: findUser.email,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      profilePic: findUser.profilePic,
    };

    // Create JWT
    const token = createToken(jwtPayload);

    // Return successful response with 200
    return res.status(200).send({
      token: token,
      message: "your are login",
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal Sever Error!",
    });
  }
};

// user sign up request handel
const handelSignUp = async (req, res) => {
  const body = req.body;

  // Check if request body exits
  if (!body) {
    return res.status(401).send({
      success: false,
      message: "body can not be empty",
    });
  }

  const { firstName, lastName, password, email, policyCheckbox } = body;

  try {
    const emailFind = await user.findOne({ email });

    // If email exists in the database, return a 409 conflict status
    if (emailFind) {
      return res.status(409).send({
        success: false,
        message: "Email address already exists. Try resetting your password.",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Prepare user data for saving
    const userData = {
      firstName,
      lastName,
      email,
      password: hashPassword,
      isPolicyAccept: policyCheckbox === "on",
    };

    // Set OTP and session ID
    const { sessionId, otp } = setOtp(userData);

    // Prepare email payload
    let mailPayload = {
      sender: `ARR links`,
      receiversEmail: email,
      subject: `ARR Links - Email verification`,
      messageText: signInEmailOtpVerificationTemplateText(otp),
      messageHtml: signInEmailOtpVerificationTemplateHtml(otp),
    };

    // Send email
    const send = await sendMail(mailPayload);

    // Check if email sending was successful
    if (!send.success) {
      return res.status(500).send({
        success: false,
        message: "Unable to send opt",
      });
    }

    // Return response with success status and cookie
    return res
      .status(201)
      .cookie("uid", sessionId)
      .send({
        success: true,
        message: `OTP send on "${emailHider(email)}". Check spam folder`,
      });
  } catch (error) {
    return res.status(500).send({
      error: "Internal server error! 2",
    });
  }
};

const handelUserSignUpOtpVerify = async (req, res) => {
  if (!req.cookies) {
    return res.status(401).send({
      // 401 Unauthorized request
      success: false,
      message: "not allowed, try again",
    });
  }

  const sessionId = req.cookies.uid;
  const { otp } = req.body;

  const isOtpTrue = await verifyOtp(sessionId, otp);

  if (!isOtpTrue.success) {
    return res.status(401).send(isOtpTrue);
  }

  let userData;
  try {
    userData = await user.create(isOtpTrue.userData);
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error unable to create account try again",
    });
  }

  const jwtPayload = {
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    profilePic: userData.profilePic,
  };

  const token = createToken(jwtPayload);

  return res.status(202).send({
    success: true,
    name: `${userData.firstName} ${userData.lastName}`,
    token: token,
  });
};

const handelLogOut = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

const handleForgotPassword = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(401).send({
      success: false,
      message: "Email can not be empty",
    });
  }

  const email = body.email;
  const emailFind = await user.findOne({ email });
  if (!emailFind) {
    return res.status(404).send({
      success: false,
      message: "Email does not exits",
    });
  }

  const { sessionId, otp } = setOtp(email);

      // Prepare email payload
      let mailPayload = {
        sender: `ARR links`,
        receiversEmail: email,
        subject: `ARR Links - Password Recovery`,
        messageText: passwordRecoveryTemplateText(otp),
        messageHtml: passwordRecoveryTemplateHtml(otp),
      };
  
      // Send email
      const send = await sendMail(mailPayload);
  
      // Check if email sending was successful
      if (!send.success) {
        return res.status(500).send({
          success: false,
          message: "Unable to send opt",
        });
      }

  return res
    .status(201)
    .cookie("uid", sessionId)
    .send({
      success: true,
      message: `OTP send on "${emailHider(email)}". Check spam folder`,
    });
};

const handelUpdatePassword = async (req, res) => {
  const body = req.body;
  const uid = req.cookies.uid;

  if (!uid) {
    return res.status(401).send({
      success: false,
      message: "Can not process your request",
    });
  }

  if (!body) {
    return res.status(400).send({
      success: false,
      message: "OTP or password can not be empty",
    });
  }

  const { otp, password } = body;
  const data = await verifyOtp(uid, otp);
  const userEmail = data.userData;

  if (!data.success) {
    return res.status(400).send(data);
  }

  let userData;
  try {
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    userData = await user.findOneAndUpdate(
      { email: userEmail },
      { password: hashPassword },
      { new: true }
    );
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server Error! unable to create account try again",
      error: error,
    });
  }

  const jwtPayload = {
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    profilePic: userData.profilePic,
  };

  const token = createToken(jwtPayload);

  console.log("password updated");
  return res.status(202).send({
    success: true,
    name: `${userData.firstName} ${userData.lastName}`,
    token: token,
  });
};

module.exports = {
  handelSignUp,
  handelLogIn,
  handelUserSignUpOtpVerify,
  handelLogOut,
  handleForgotPassword,
  handelUpdatePassword,
};
