
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


function displayNewPasswordForm(data) {
    const container = document.getElementById('container');

    container.innerHTML = `
    <div class="heading"> 
        <i class="fa-solid fa-user fa-2xl"></i>
        <h3>Create Password</h3>
    </div>
    <form class="form-container" action="" method="post">
        <div class="form-field otp-input-filed">
            <label for="otp">Enter Otp</label> 
            <input id="otp" type="text" name="otp"  maxlength="6", placeholder="000000">
        </div>
        <p>Enter new password</p>
        <div class="form-field"> 
            <input id="password" type="password" name="password" placeholder="New Password" required="true">
        </div>
        <div class="form-field"> 
            <input id="confirm-password" type="password" name="confirmPassword" placeholder="Confirm Password" required="true">
        </div>
        <div class="message-container red" id="update-password-message"> </div>
        <input class="btn" type="button" value="Submit" onclick="updatePassword()">
        <a href="/sign-in"> Sign In with password</a>
    </form>
    `

    document.getElementById('update-password-message').innerHTML = data.message;
    return;

}

function forgotPassword() {
    const inputElement = document.getElementById('password-forgot-email');
    const email = inputElement.value;

    const messageBox = document.getElementById('forgot-password-message');

    if (email == "") {
        messageBox.innerText = "please enter valid email"
        return;
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    };

    const response = fetch('/user/forgot-password', options);

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
            ;
            displayNewPasswordForm(data);
        })
        .catch((error) => {
            displayMessage(error);
        });
}

function finalPasswordUpdate(data) {

    document.cookie = `token=${data.token}`;


    const container = document.getElementById('container');
    container.classList.add('password-update-done');
    container.innerHTML = `
    <i class="fa-solid fa-circle-check fa-2xl" style="color: #1fff0f;"></i>
    <p> Your password has been changed successfully. you will be automatic redirect in <span id="redirectTime"></span> to dashboard <br> or <br> go back and login <a href="/sign-in">click here</p>
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

function updatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const otp = document.getElementById('otp').value;

    if (otp == "") {
        document.getElementById('update-password-message').innerHTML = 'Enter otp';
        return;
    }

    if (!passwordStrength(password)) {
        document.getElementById('update-password-message').innerHTML = 'Week password';
        return;
    }

    if (!confirmPasswordCheck(password, confirmPassword)) {
        document.getElementById('update-password-message').innerHTML = 'Password not match';
        return;
    }


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            otp: otp,
            password: password
        })
    };

    const response = fetch('/user/update-password', options);

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
            finalPasswordUpdate(data);
        })
        .catch((error) => {
            document.getElementById('update-password-message').innerHTML = error;
        });
}


