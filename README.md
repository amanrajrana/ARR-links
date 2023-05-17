
# ARR links

ARR Links is a web application that allows users to shorten URLs, generate QR codes for the shortened links, and provides additional features like user authentication, click analytics, and more. This readme file provides an overview of the project and the technologies used.

---
## Table of Contents

- [Features](#features)
- [Technologies Used](#Technologies-Used)
- [Screenshots](#screenshots)
- [Tech](#tech-stack)
- [Run Locally](#run-locally)
- [Contributing](#contributing)
- [FAQs](#faq)
- [Feedback](#feedback)
- [Lessons I learn](#lessons-i-learned)
- [Authors](#authors)

---
## Features
- **URL Shortening**: Users can enter a long URL and generate a shortened version of it.

- **QR Code Generation**: The application can generate QR codes for the shortened URLs, making it easier for users to share them by downloading it.



- **User Authentication**: ARR Links provides user registration and login functionality to access additional features.

- **Forgot Password**: Users who forget their passwords can initiate a password reset process, including OTP verification.

- **Stateless Authentication**: ARR Links uses JSON Web Tokens (JWT) for stateless authentication, ensuring secure and efficient user authentication.

- **OTP Verification**: During Sign up and forgot password processes, users are required to verify their email using a one-time password (OTP).

- **Special Dashboard**: Logged-in users have access to a personalized dashboard with additional functionalities and settings. where user can track there URLs clicks and analytics, user can also update their profile details using dashboard.

- **URL Click Analytics**: ARR Links tracks the number of clicks and provides analytics to the user for each shortened URL.

- **Responsive & user friendly Design**: Layout of website is fully responsive and user friendly. support all size of screen

------
## Technologies used

- **MongoDB**: A NoSQL database used to store user information, shortened URLs, and click analytics data.

- **Node.js**: A JavaScript runtime environment used to execute server-side code.

- **ExpressJS**: A web application framework for Node.js used to build the backend of ARR Links.

- **Pug**: A template engine for Node.js that simplifies HTML generation and allows for dynamic content rendering.

- **JavaScript**: The programming language used for client-side scripting and interactions.

- **REST API**: ARR Links uses RESTful APIs to communicate between the frontend and backend.

- **CSS3**: The latest version of Cascading Style Sheets used for styling the web application.

- **JWT**: JSON Web Tokens are used for stateless authentication.

---

## Screenshots and preview

- ##### Generate Short links and QR code

     <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmUA2rAH7hrA8e5rHlCAgtPWvuicFxbm2tnihmrT2kkI1YuWVz-rpPEATYHWSZXQzem0g_DGhRNM79m8PUAzvTYR_XWRr2MeF-BbnuivBOt4PX8_uQxIIDfvEuy7G9uZ-5vXH-ZiNvjH5KiwM20gShHYwop8mZXPBq8heikzQOOFQka44c17uUAdKm/s600/arr-links-home-page.gif" height="300" alt="desktop-view">

- ##### Sign Up
     <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiww_dvQ-K441Xpi4tMoSnyPlPTLLwKeGkrQkYoM2wqG3m6nlhOYDwarVOC_MWoZIZAOemT75gnE_zfJdxFVIOpNDWH7duN7gkGUcDlBxwdWwh1dT5I0tnn9U7iBfesUlKHHLHhcjCgoZ6O79LCWQ6-ws957xZmoRLb4dRgagRIgsZzcJ6UmEIwQWZ0/s600/arr-links-sign-up-page.gif" height="300" alt="desktop-view">

- #### Display Different menu for Logged vs Guest user
    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjgV7VPfmMnlWETjazSftL_REVQQgvhwfoRbPJz7F9rJhBG8PDxTw8oe9m4rc7QmIwmYZfi9mmCKPric2sT_v4P6SmJbCZU0t5YXMfDgVgKK4RBVilq1w_sUfS91EWXANlZBxzAgkx3pIo7a-WY6sslJ4piX3CnE9VreOf8FbqEPeGa7K-tLzomLfPm/s600/guest-user-and-logged-in-user.gif" height="300" alt="Display Different menu for Logged vs Guest user">
---
## Tech Stack

**Client:** pugJS

**Server:** NodeJS, ExpressJS

**Database:** MongoDB

---


## Run Locally

Clone the project

```bash
  git clone https://github.com/amanrajrana/ARR-links.git
```

Go to the project directory

```bash
  cd ARR-links
```

Install dependencies

```bash
  npm install
```

##### Make missing files or directory
Due to security reasons there are some in of a directory name `private` is not push. To run follow following steps

A. **JWT Signature**
1. Make directory in root folder name `private`
2. Create a JavaScript file with the name `secretKey.js` inside `private` directory
3. Add following code in this

```javaScript
const jwtSecretKey = 'Your_Secret_key';
module.exports = {
    jwtSecretKey
}
```

Start Server

```bash
  npm run start
```

You can use nodemon for auto restart the server
```bash
  npm run dev
```

App start on at PORT `3000` i.e `http://127.0.0.1:3000`

**NOTE:**
 Make sure you have preinstalled the following software in your local system
- NodeJS
- MongoDB

MongoDB server started on its default port i.e `mongodb://127.0.0.1:27017`

Start the server

---


## Contributing

We welcome contributions from developers who want to help improve my **ARR links** web app. To contribute, please follow these steps:
1. Fork the repository on GitHub.
2. Make your changes and commit them to your forked repository.
3. Submit a pull request with a detailed explanation of your changes.

---

## FAQ

#### Can I use this project for my project?

Yes, This is an open-source code so you can use it anywhere you want

---

## Feedback

If you have any feedback, please reach out to us via the following way

- [Linkedin](https://www.linkedin.com/in/amanrajrana)

----

## Lessons I Learned

This is my first full-stack project. In this project, I Learned many things. A few of them are mentioned below
1. Build Server
2. Build API
3. Server static files
4. MVC pattern
5. Deal with Database
6. Define Schema
7. PUG templating engine
8. OTP verifications
9. Stateless and Stateful authentication
10. JWT token
11. AJAX request
12. DOM manipulation
13. _And many more things :)_

---

## Authors
**_Aman Raj Rana_**

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amanrajrana)
[![github](https://img.shields.io/badge/github-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amanrajrana)

## 🚀 About Me
MERN developer | ReactJS 🚀 MongoDB 📊 Express 🛠️ NodeJS 💻 | Clean code enthusiast | Agile methodologies | Let's build amazing web apps! 🌐

