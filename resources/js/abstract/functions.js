window.customFuncs = {};
customFuncs.$ = function (selector, callback) {
    var selectors = document.querySelectorAll(selector);
    selectors.forEach(callback);
    return selectors;
};
customFuncs.addMultipleEventListener = function (element, events, handler) {
    events.split(" ").forEach((e) => element.addEventListener(e, handler));
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
