function signInDone(data) {
  document.cookie = `token=${data.token}`;

  document.location.href = "/user";
}

function signInMessage(message) {
  document.getElementById("message-container").innerHTML = message;
}

function displayMessage(message) {
  document.getElementById("message-container").innerHTML = message;
}

const signIn = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = fetch("/user/sign-in", options);
  response
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((errorData) => {
          throw new Error(errorData.message || "Invalid credential");
        });
      }
    })
    .then((data) => {
      signInDone(data);
    })
    .catch((error) => {
      displayMessage(error);
    });
};

async function displayForgotPasswordForm() {
  const container = document.getElementById("container");

  container.innerHTML = `
    <div class="heading"> 
        <i class="fa-solid fa-user fa-2xl"></i>
        <h3>Password Forgot</h3>
    </div>
    <form class="form-container" action="" method="post">
        <div class="form-field"> 
            <input id="password-forgot-email" type="email" name="email" placeholder="Email" required="true"></div>
        <div class="message-container red" id="forgot-password-message"> </div>
        <input class="btn" type="button" value="get otp" onclick="forgotPassword()">
        <a href="/sign-in"> Sign In with password</a>
    </form>
    `;
  return;
}

const signUpForm = document.getElementById("sign-up-form");
signUpForm.addEventListener("submit", signIn);

document
  .getElementById("forgot-password-link")
  .addEventListener("click", displayForgotPasswordForm);
