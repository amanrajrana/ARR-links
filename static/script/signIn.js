function signInDone(data) {
    document.cookie = `token=${data.token}`;

    document.location.href = '/user';
}



const signIn = (event) => {
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

    const response = fetch('/user/sign-in', options);
    response.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Invalid username or password");
        }
    })
        .then((data) => {
            signInDone(data);
        })
        .catch((error) => {
            alert("Something went wrong: " + error);
        });


}

const signUpForm = document.getElementById("sign-up-form");
signUpForm.addEventListener('submit', signIn);


