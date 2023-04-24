
function isValidURL(url) {
    // Regular expression for URL validation
    const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[\w-]+\.)+[a-z]{2,6}(?:\/\S*)?$/i;
  
    // Test the given URL against the regex
    return urlRegex.test(url);
  }


// FUNCTION TO GET SHORT URL by AJAX request

function getShortUrl() {

    // get value of input box by id long-url
    let longUrl = document.getElementById('long-url').value;

    // All previous output of document will be clean (display:none)
    document.getElementById('hidden').classList.add('hidden')
    document.getElementById('error-box').classList.add('hidden')
    
    
    // trim white spaces
    longUrl = longUrl.trim()

    if(!isValidURL(longUrl)) {
        displayError("please Enter a valid url")
        return
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

    fetch('http://127.0.0.1:3000/api/short-url', urlOptions)
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


// json => {success: true, message: 'Data saved successfully', shortId1: 'Cb2XtAWac', shortId2: 'W_R-n1hU45'}

const displayShortUrl = (data) => {
    let urlContainer = document.getElementsByClassName('short-url-container')[0]
    urlContainer.classList.remove("hidden");

    let shortUrlSpan = document.getElementsByClassName('short-urls')

    shortUrlSpan[0].innerHTML = `http://localhost/s/${data.shortId1}`;
    shortUrlSpan[1].innerHTML = `http://localhost/s/${data.shortId2}`;

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
    
}