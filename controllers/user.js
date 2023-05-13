const user = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const { createToken, setUser } = require('../services/auth')
const { setSignUpOtp, getSignUpOtp, deleteSignUpOtp } = require('../services/signUpOtpAuth');


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}


const handelSignUp = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(401).send({
            success: false,
            message: "body can not be empty"
        })
    }
    const email = body.email;
    const emailFind = await user.findOne({email});
    if (emailFind) {
        return res.status(409).send({
            success: false,
            message: 'Email address already exists, try to forgot password'
        })

    }

    const time = new Date();
    const otp = generateOTP();
    const sessionId = uuidv4();

    const userData = {
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            isPolicyAccept: (body.policyCheckbox == "on") ? true : false
        },
        otp: otp,
        otpExp: time.getTime() + 1 * 60000,
        attempt: 0
    }

    // map sessionId with userData
    await setSignUpOtp(sessionId, userData);

    return res.status(201).cookie("uid", sessionId).send({
        success: true,
        message: `since you are on local machine so OTP can't send your email. Please use this otp ${otp}`
    });
}

const handelLogIn = async (req, res) => {
    const { email, password } = req.body;
    const findUser = await user.findOne({ email, password });

    if (!findUser) return res.status(401).send({ error: "user not found" });

    const jwtPayload = {
        email: findUser.email,
        firstName: findUser.firstName,
        lastName:  findUser.lastName,
        profilePic: findUser.profilePic
    }

    const token = createToken(jwtPayload);

    return res.status(200)
        .send({
            'token': token, 
            'message': "your are login"
        });
}


const handelUserSignUpOtpVerify = async (req, res) => {

    if (!req.cookies) {
        return res.status(401).send({  // 401 Unauthorized request
            success: false,
            'message': "not allowed, try again"
        });
    }

    const sessionId = req.cookies.uid;
    const { otp } = req.body;
    const savedData = getSignUpOtp(sessionId);
    const time = new Date();
    const timeNow = time.getTime();

    // if sessionId Not found in map
    if (!savedData) {
        return res.status(401).send({
            success: false,
            'message': "Unable to verify, please go back and try to sign up again"
        });
    }


    //check Is otp expire, if expire it return with status code 410
    if (timeNow > savedData.otpExp) {
        deleteSignUpOtp(sessionId);
        // 410 ( Gone) -> The requested page is no longer available
        return res.status(410).send({
            success: false,
            'message': "otp is expired"
        });
    }

    /**  Check attempt, if user input 5 times wrong otp if return with attempts are reached 
    /* 403 Forbidden => which will return once all of the allowed attempts are reached to verify the code and were all unsuccessful
    */
    if (savedData.attempt > 4) {
        deleteSignUpOtp(sessionId);
        return res.status(403).send({
            success: false,
            'message': "maximum attempts are reached"
        });
    }


    // Check if opt is not match to saved otp it return with 401 [401 => OTP is not valid ( Unauthorized )]
    if (Number.parseInt(otp) === savedData.otp) {
        // Saved data in database
        let dbData;
        try {
            
            dbData =  await user.create(savedData.data);
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'unable to create account try again',
            });
        }

        const jwtPayload = {
            email: dbData.email,
            firstName: dbData.firstName,
            lastName:  dbData.lastName,
            profilePic: dbData.profilePic
        }
        deleteSignUpOtp(sessionId);
        const token = createToken(jwtPayload);

        return res.status(202).send({
            success: true,
            name: `${dbData.firstName} ${dbData.lastName}`,
            'token': token
        })

    }


    savedData.attempt++;
    // saved updated value in map 
    await setSignUpOtp(sessionId, savedData);

    return res.status(401).send({
        success: false,
        'message': `wrong otp you have ${5 - savedData.attempt} attempt left`
    });
}


const handelLogOut = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
}

module.exports = { 
    handelSignUp, 
    handelLogIn, 
    handelUserSignUpOtpVerify, 
    handelLogOut 
}