window.customFuncs = {};
customFuncs.$ = function (selector, callback) {
    var selectors = document.querySelectorAll(selector);
    selectors.forEach(callback);
    return selectors;
};
customFuncs.addMultipleEventListener = function (element, events, handler) {
    events.split(' ').forEach((e) => element.addEventListener(e, handler));
};
customFuncs.appendTextNowTime = function (classSelector) {
    //let time = document.querySelector(".calendar__time");
    customFuncs.$(classSelector, (item) => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let timeText = document.createTextNode(`${day}/${month}/${year}`);
        item.appendChild(timeText);
    });
};
customFuncs.randomColorItem = function (classSelector, colorArrayCss) {
    const color = colorArrayCss ? colorArrayCss : ['color-0', 'color-1', 'color-2', 'color-3', 'color-4'];
    //   const classItem = document.querySelectorAll('.class-item')
    const classItem = document.querySelectorAll(classSelector);
    //console.log(classItem)
    var random = Math.floor(Math.random() * 100);
    classItem.forEach((element, index) => {
        element.classList.add(`${color[random++ % 5]}`);
    });
};
customFuncs.detectWidth = function () {
    return (
        window.screen.width ||
        window.innerWidth ||
        window.document.documentElement.clientWidth ||
        Math.min(window.innerWidth, window.document.documentElement.clientWidth) ||
        window.innerWidth ||
        window.document.documentElement.clientWidth ||
        window.document.getElementsByTagName('body')[0].clientWidth
    );
};
window.setCookie = function (cname, value, expirationTimes) {
    var expires = '';
    if (expirationTimes) {
        var date = new Date();
        date.setTime(date.getTime() + expirationTimes);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = cname + '=' + (value || '') + expires + '; path=/';
};

window.eraseCookie = function (cname) {
    document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

window.getCookie = function (cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

// function checkCookie() {
//     let user = getCookie('username');
//     if (user != '') {
//         alert('Welcome again ' + user);
//     } else {
//         user = prompt('Please enter your name:', '');
//         if (user != '' && user != null) {
//             setCookie('username', user, 365);
//         }
//     }
// }
window.decodeHtml = function (html) {
    html = String(html);
    return html.replace(
        /[&<>'"]/g,
        (tag) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;',
            }[tag])
    );
};
