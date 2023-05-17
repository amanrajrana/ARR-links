// ===================  Responsive Code ============================= //

function wideScreenSize() {
    const menuItem = ['Home', 'Your urls', 'Create New', 'Order service', 'Notifications', 'Profile', 'Log out'];
    const websiteName = "ARR links";

    const logo = document.getElementById('logo');
    const menu = document.getElementsByClassName('menu-item');
    const nav = document.getElementsByTagName('nav');

    nav[0].style.width = '275px';
    logo.innerText = websiteName;

    for (let i = 0; i < menu.length; i++) {
        menu[i].innerHTML = menuItem[i];
    }
}


function midScreenSize() {
    const logo = document.getElementById('logo');
    const menu = document.getElementsByClassName('menu-item');
    const nav = document.getElementsByTagName('nav');

    nav[0].style.width = '';
    logo.innerText = '';

    for (let i = 0; i < menu.length; i++) {
        menu[i].innerHTML = "";
    }
}

function callWidowSizeFunction(currentWindowWidth) {
    if (currentWindowWidth < 950) {
        midScreenSize();
    } else {
        wideScreenSize();
    }
}

window.addEventListener('resize', () => callWidowSizeFunction(window.innerWidth));
window.addEventListener('load', () => callWidowSizeFunction(window.innerWidth));
