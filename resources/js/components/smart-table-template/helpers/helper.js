export function getArrayDepth(value) {
    return Array.isArray(value) ? 1 + Math.max(0, ...value.map(getArrayDepth)) : 0;
}
export function createElement(type = 'div', className = '', text = '') {
    let el = document.createElement(type);
    if (className) {
        className.split(' ').forEach((name) => {
            el.classList.add(name);
        });
    }
    if (text) el.innerHTML = text;
    return el;
}
export function getDataJsonKeys(dataJson) {
    //object
    if (dataJson.constructor.name === 'Object') {
        return Object.keys(dataJson);
    }
    if (Array.isArray(dataJson)) {
        return Object.keys(dataJson[0]);
    }

    return [];
}
/**
 * sort data according to number, string, datetime, automate type casting
 * @param {*} data
 * @param {String} param
 * @param {String} direction "asc/desc"
 * @returns
 */
export function sortDataWithParam(data, param, direction = 'asc') {
    let sortedData;
    switch (direction) {
        case 'asc':
            sortedData = data.sort(function (a, b) {
                let first = a[param] ? a[param] : 0;
                let second = b[param] ? b[param] : 0;
                if (first < second) {
                    return -1;
                }
                if (first > second) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'desc':
            sortedData = data.sort(function (a, b) {
                let first = a[param] ? a[param] : 0;
                let second = b[param] ? b[param] : 0;
                if (first < second) {
                    return 1;
                }
                if (first > second) {
                    return -1;
                }
                return 0;
            });
            break;
        default:
            sortedData = data;
    }

    return sortedData;
}
/**
 *
 * @param {Object} receiveOption
 * @param {Object} assignOption
 * @returns
 */
export function assignOption(receiveOption, assignOption = {}) {
    for (const property in receiveOption) {
        if (assignOption[property]) {
            receiveOption[property] = assignOption[property];
        }
    }
    return receiveOption;
}
