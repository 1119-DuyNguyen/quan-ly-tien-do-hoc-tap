import { routeList } from './route-list.js';
const routeObj = {};
const PAGE_TITLE = 'Quản lý tiến độ học tập';
const PAGE_DESCRIPTION = 'Quản lý tiến độ, sgu';
routeObj.listRoutes = routeList ? routeList : [];
routeObj.currentPage = '';
routeObj.previousPage = '';
const SIGN_VARIABLE_URL = '$';
/**
 *
 * @param {String} href
 */
function routeHref(href) {
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, '', href);
    urlLocationHandler();
}

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();

    routeHref(event.currentTarget.href);
};
// get params đã tạo
// params url và route phải có length bằng nhau
function checkParams(urlParams, routeParams) {
    let paramObject = {};
    let lengthParams = urlParams.length;
    let matchUrl = 0;
    console.log(urlParams, routeParams);
    for (var i = 0; i < lengthParams; i++) {
        //:page => ['','page']

        if (routeParams[i].indexOf(SIGN_VARIABLE_URL) >= 0) {
            var nameParam = routeParams[i].split(SIGN_VARIABLE_URL)[1];
            paramObject[nameParam] = urlParams[i];
            matchUrl++;
        } else if (routeParams[i] === urlParams[i]) {
            matchUrl++;
        }
    }
    console.log(paramObject);
    if (matchUrl === lengthParams) {
        return paramObject;
    }
    return false;
}
/**
 *
 * @param {Object} route { template, js}
 * @returns
 */
async function routeTo(route, _params) {
    //  const route = routingList[href] || routingList['404'];

    // get the html from the template
    var html;
    try {
        // This async call may fail.
        html = await fetch(route.template).then((response) => response.text());
    } catch (error) {
        console.error('không load được template');
        return false;
    }

    if (html) {
        document.getElementById('main-content').innerHTML = html;
    }

    document.title = route.title ? route.title : PAGE_TITLE;

    document
        .querySelector('meta[name="keywords"]')
        .setAttribute(
            'content',
            route.description ? route.description : PAGE_DESCRIPTION
        );
    if (route.method) {
        route.method.call(null, _params);
    }
    return true;
}

//thực hiện 'function(s)' theo 'url' tương ứng
//cùng với các tham số đã phân tích được
//Ví dụ:
//:     /$page/$pageid
//:     /home/3434434
//giá trị page=>home và pageid=>3434434

const urlLocationHandler = async () => {
    var location = window.location.pathname;
    var _params;
    if (location.length === 0) {
        location = '/';
    }
    if (routeObj.currentPage !== location) {
        routeObj.previousPage = routeObj.currentPage;
        routeObj.currentPage = location;
        // filter vì user có thể nhập nhầm "//"h

        var urlParams = location.split('/').filter(function (h) {
            return h.length > 0;
        });

        let listRoutes = routeObj.listRoutes;
        if (urlParams.length > 1) {
            for (const href in listRoutes) {
                // '/' => ['',''] nên filter cho mất
                let routeParams = href.split('/').filter(function (h) {
                    return h.length > 0;
                });
                if (routeParams.length === urlParams.length) {
                    _params = checkParams(urlParams, routeParams);
                    console.log(_params);

                    if (_params) {
                        location = href;
                        break;
                    }
                }
            }
        }

        // xóa đi "/" ở đầu và cuối;
        location = location.replace(/^\/+|\/+$/g, '');
        if (!location) location = '/';
        const route = listRoutes[location] || listRoutes['404'];

        return routeTo(route, _params);
    } else {
        // bật lên toast nếu cùng trang ?
        return false;
    }
};

// add an event listener to the window that watches for url changes
// window.onpopstate = urlLocationHandler;
window.addEventListener('popstate', (e) => {
    urlLocationHandler();
});
window.route = urlRoute;

customFuncs.$('.sidebar__nav a', (a) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        urlRoute(e);
        //    console.log(a);
    });
});
// call the urlLocationHandler function to handle the initial url
window.addEventListener('DOMContentLoaded', () => {
    urlLocationHandler();
});
