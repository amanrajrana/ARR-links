const signUpOtpMap = new Map();

function setSignUpOtp (id, data) {
    signUpOtpMap.set(id, data);
}

function getSignUpOtp (id) {
    return signUpOtpMap.get(id);
}

function deleteSignUpOtp (id) {
    signUpOtpMap.delete(id);
}

module.exports = {
    setSignUpOtp,
    getSignUpOtp,
    deleteSignUpOtp
}