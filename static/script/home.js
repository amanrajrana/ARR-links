
/**
 * The function checks if a given URL is valid using a regular expression.
 * @param url - a string representing a URL that needs to be validated.
 * @returns The function `isValidURL` returns a boolean value indicating whether the given `url`
 * parameter is a valid URL or not.
 */

function isValidURL(url) {
    const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[\w-]+\.)+[a-z]{2,6}(?:\/\S*)?$/i;
    return urlRegex.test(url);
}




/**
 * The function takes a long URL input, validates it, sends a POST request to a server to generate a
 * short URL, and displays the short URL output or an error message.
 * @returns The function `getShortUrl()` does not have a return statement, so it does not return
 * anything.
 */

function getShortUrl() {

    // get value of input box by id long-url
    let longUrl = document.getElementById('long-url').value;

    // All previous output of document will be clean (display:none)
    document.getElementById('hidden').classList.add('hidden')
    document.getElementById('error-box').classList.add('hidden')


    // trim white spaces
    longUrl = longUrl.trim()

    if (!isValidURL(longUrl)) {
        displayError("please Enter a valid url");
        return;
    }

    // set url body
    let urlOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },

        body: JSON.stringify({
            "url": longUrl
        }),
    }

    // AJAX request
    fetch('api/short-url', urlOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(data => {
            displayShortUrl(data);
        })
        .catch((error) => {
            displayError(error)
        })

}


/**
 * The function displays two short URLs on a webpage and clears the input box for a long URL.
 * @param data - The parameter `data` is an object that contains two properties: `shortId1` and
 * `shortId2`. These properties are used to generate two short URLs that will be displayed on the
 * webpage. The function `displayShortUrl` takes this `data` object as input and updates the HTML
 */

const displayShortUrl = (data) => {

    document.getElementById('hidden').classList.remove('hidden')
    let shortUrlSpan = document.getElementsByClassName('short-urls')

    shortUrlSpan[0].innerHTML = `https://url.amanrajrna.engineer/${data.shortId1}`;
    shortUrlSpan[1].innerHTML = `https://url.amanrajrna.engineer/${data.shortId2}`;

    // clean the long url input box 
    document.getElementById('long-url').value = "";

}


// Error box handler
const displayError = (error) => {
    document.getElementById('error-box').classList.remove('hidden');
    document.getElementById('error-msg').innerHTML = error
}

// url copy handler
const copyToClickBoard = (data) => {
    // add script for copy the text to click board
}


// Display qr image
const displayQrImage = (data) => {

    // create img element
    let img = document.createElement('img');
    img.src = data.imageUrl;
    img.alt = "QR code";
    img.width = "200";

    // create a anchor tag with download attribute
    let downloadLink = document.createElement('a');
    downloadLink.href = data.imageUrl;
    downloadLink.download = "QR code";
    downloadLink.innerText = "download";

    // scroll screen by 300px in y
    window.scrollBy(0, 300);

    // get QR container where img and anchor element have to insert
    const qrContainer = document.getElementsByClassName('qr-code-container')[0];

    // insert elements img and downloadLink (anchor tag)
    qrContainer.insertAdjacentElement('afterbegin', img);
    qrContainer.insertAdjacentElement('beforeend', downloadLink);
    qrContainer.classList.remove('hidden');
}

const displayQrError = (error) => {
    document.getElementsByClassName('qr-code-container')[0].innerHTML = error;
    document.getElementsByClassName('qr-code-container')[0].classList.remove('hidden')
}

const generateQR = (index) => {
    const url = document.getElementsByClassName('short-urls')[index].innerHTML
    document.getElementsByClassName('qr-code-container')[0].innerHTML = '';
    document.getElementsByClassName('qr-code-container')[0].classList.add('hidden')

    // set url body
    let urlOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },

        body: JSON.stringify({
            "url": url
        }),
    }

    fetch('/api/qr-code', urlOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(data => {
            displayQrImage(data);
        })
        .catch((error) => {
            displayQrError(error);
        })

}


function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let element = document.getElementById('greeting');
    let greeting;

    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    element.innerText = greeting;

    return;
}

window.onload = function () {
    try {
        getGreeting();
    } catch (error) {

    }
}