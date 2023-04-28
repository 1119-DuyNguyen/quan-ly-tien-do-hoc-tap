import { Sidebar } from '../layouts/sidebar.js';
import { routeList } from './route-list.js';
const routeObj = {};
const PAGE_TITLE = 'Quản lý tiến độ học tập';
const PAGE_KEYWORD = 'Quản lý tiến độ, sgu';
const DOMAIN = location.protocol + '//' + location.host;
routeObj.listRoutes = routeList ? routeList : [];
routeObj.currentPage = '';
routeObj.previousPage = '';
const SIGN_VARIABLE_URL = '$';
/**
 *
 * @param {String} href
 */
export function routeHref(href) {
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, '', href);
    urlLocationHandler();
}
export function routePreviousPage() {
    window.history.pushState({}, '', routeObj.previousPage);
    urlLocationHandler();
}
export const urlRoute = (event) => {
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
    //  console.log(urlParams, routeParams);
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
    //  console.log(paramObject);
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
async function routeTo(route, _params, is404 = false) {
    //  const route = routingList[href] || routingList['404'];

    // get the html from the template
    let html;
    try {
        // This async call may fail.

        if (route.template) {
            if (window.axios) {
                html = await fetch(route.template).then((response) => response.text());
                //html = await axios.get(route.template).then((response) => response.data);
            } else html = await fetch(route.template).then((response) => response.text());
        }
    } catch (error) {
        console.error('không load được template', error);
        return false;
    }
    //loadMainSideBar
    let role = localStorage.getItem('roleSlug');
    let sidebarEl = document.getElementById('main-sidebar');

    if (role) {
        //console.log(sidebarEl);
        if (!sidebarEl.dataset.isInit) {
            // sidebarEl.style.visibility = 'visible';
            sidebarEl.style.display = 'block';

            sidebarEl.dataset.isInit = 'true';
            // console.log('here');
            let sidebar = new Sidebar(sidebarEl);
        }
    } else {
        sidebarEl.innerHTML = '';
        //sidebarEl.style.visibility = 'hidden';
        sidebarEl.style.display = 'none';

        sidebarEl.dataset.isInit = '';
    }
    if (html) {
        let rootEl = document.getElementById('main-content');
        rootEl.innerHTML = '';
        if (!is404) {
            let briefContainer = generateBriefMap(rootEl);
            if (briefContainer) rootEl.appendChild(briefContainer);
        }

        rootEl.insertAdjacentHTML('beforeend', html);
    }

    document.title = 'QLTDHT : ' + (route.pageInfo.title ? route.pageInfo.title : PAGE_TITLE);

    document
        .querySelector('meta[name="keywords"]')
        .setAttribute('content', route.pageInfo.keyWord ? route.pageInfo.keyWord : PAGE_KEYWORD);
    if (route.method) {
        try {
            route.method.call(null, _params);
        } catch (error) {
            console.error(error);
        }
    }
    window.scrollTo(0, 0);
    return true;
}

//thực hiện 'function(s)' theo 'url' tương ứng
//cùng với các tham số đã phân tích được
//Ví dụ:
//:     /$page/$pageid
//:     /home/3434434
//giá trị page=>home và pageid=>3434434
const generateBriefMap = (element) => {
    let role = localStorage.getItem('roleSlug');
    if (!role) return false;
    let arrayPathname = window.location.pathname;
    //lọc nếu không có brief map
    arrayPathname = arrayPathname.split('/').filter(function (h) {
        return h.length > 0;
    });
    let getHrefBrief = function (location, index) {
        let href = '';
        for (let i = 0; i < location.length; ++i) {
            href += location[i] + '/';
            if (index === i) break;
        }
        return href;
    };
    let containerLink = document.createElement('div');
    containerLink.classList.add('container-link');
    //sinh-vien/dashboard
    for (let i = 0; i < arrayPathname.length; ++i) {
        let a = document.createElement('a');

        a.innerText = arrayPathname[i] + '/';
        a.classList.add('btn');
        if (i === arrayPathname.length - 1) {
            a.classList.add('btn--link');
            a.classList.add('disabled');
        } else {
            a.href = DOMAIN + '/' + getHrefBrief(arrayPathname, i);
            a.addEventListener('click', urlRoute);

            a.classList.add('btn--link');
        }
        containerLink.append(a);
    }
    return containerLink;
};
const urlLocationHandler = async () => {
    // lọc href

    var location = window.location.pathname;
    var _params;
    //Kiểm tra đã đăng nhập chưa, tự thêm prefix
    let role = localStorage.getItem('roleSlug');
    location = location.replace(/\/{2,}/g, '/');

    if (role) {
        // xóa nơi nào có / lớn hơn 2 liên tục

        if (!location || location === '/') {
            //route mặc định
            // location = role + '/dashboard';
            routeHref(DOMAIN + '/dashboard');
            return;
        } else location = role + '/' + location;
        //  routeHref(re);
    } else {
        if (location !== '/') {
            routeHref('/');

            return;
        }
    }
    if (location.length === 0) {
        location = '/';
    }
    if (routeObj.currentPage !== location) {
        routeObj.previousPage = routeObj.currentPage;
        routeObj.currentPage = location;
        // filter vì user có thể nhập nhầm "//"h

        // var urlParams = location.split('/').filter(function (h) {
        //     return h.length > 0;
        // });

        // Đã xử lý từ regex ở trên
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
                    // console.log(_params);

                    if (_params) {
                        location = href;

                        break;
                    }
                }
            }
        }
        // xóa đi "/" ở đầu và cuối;
        //  location = location.replace(/^\/+|\/+$/g, '');

        if (!location) location = '/';
        //addPrefix

        //  console.log(location);
        const route = listRoutes[location] || listRoutes['404'];

        if (route === listRoutes['404']) {
            // console.log(route);
            return routeTo(route, _params, true);
        } else return routeTo(route, _params);
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
