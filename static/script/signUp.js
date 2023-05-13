const hideErrorMessage = () => {
    document.getElementById('passwordNotMatch').style.display = "none";
    document.getElementById('weekPasswordError').style.display = "none";
}

const confirmPasswordCheck = (password1, password2) => {
    return (password1 === password2)
}

const passwordStrength = (password) => {

    if (password.length < 8) return false
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    return lowercaseRegex.test(password) && uppercaseRegex.test(password) && numberRegex.test(password) && specialRegex.test(password);
}

function displayOtpMessage(message) {
    const element = document.getElementsByClassName('display-otp-message')[0];
    element.style.display = "block";
    element.innerHTML = message;
}

function displaySignUpMessage(message) {
    const element = document.getElementsByClassName('message-box')[0];
    element.style.display = "block";
    element.innerHTML = message;
}

function otpBox() {
    document.getElementsByClassName('sign-up-container')[0].style.display = "none";
    document.getElementsByClassName('otp-container')[0].style.display = "flex";
}

function signUpDone(data) {
    document.cookie = `token=${data.token}`;


    const container = document.getElementsByClassName('otp-container')[0];
    container.classList.add('sign-up-done');
    container.innerHTML = `
    <i class="fa-solid fa-circle-check fa-2xl" style="color: #1fff0f;"></i>
    <h3> Welcome ${data.name} </h3>
    <p> Your account have been created successfully. you will be automatic redirect in <span id="redirectTime"></span>t o dashboard <br> or <br> go back and login <a href="/sign-in">click here</p>
    `

    let redirectTime = 5;
    const redirectTimerCountDown = setInterval(() => {
        document.getElementById('redirectTime').innerText = redirectTime + ' sec';
        redirectTime--;

        if (redirectTime < 1) {
            document.getElementById('redirectTime').innerText = 'redirecting...';
        }

    }, 1000);

    setTimeout(() => {
        clearInterval(redirectTimerCountDown);
        document.location.href = '/user';
    }, 6000);
}

const createUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!passwordStrength(data.password)) {
        document.getElementById('weekPasswordError').style.display = "block";
        return;
    }
    if (!confirmPasswordCheck(data.password, data.confPassword)) {
        document.getElementById('passwordNotMatch').style.display = "block";
        return;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = fetch('/user/sign-up', options);
    response.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then((errorData) => {
                throw new Error(errorData.message || "Unable to create account");
            });
        }
    })
        .then((data) => {
            otpBox();
            displayOtpMessage(data.message);
        })
        .catch((error) => {
            displaySignUpMessage(error);
        });
    return;
}

function verifyOtp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = fetch('/user/verify-otp', options);

    response.then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            return res.json().then((errorData) => {
                throw new Error(errorData.message || "Unable to create account");
            });
        }
    })
        .then((data) => {
            // Handle success
            signUpDone(data);
        })
        .catch((error) => {
            // Handle general errors
            displayOtpMessage(error);
        });

}

const signUpForm = document.getElementById("sign-up-form");
signUpForm.addEventListener('submit', createUser);

const optVerification = document.getElementsByClassName("otp-input")[0];
optVerification.addEventListener('submit', verifyOtp)



