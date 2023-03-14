import { routeList } from './route-list.js';

const urlPageTitle = 'Quản lý tiến độ học tập';
const urlRoutes = routeList;
function routeHref(href) {
    window.history.pushState({}, '', href);
    urlLocationHandler();
}
// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    // window.history.pushState(state, unused, target link);
    routeHref(event.currentTarget.href);
};

// create a function that handles the url location
const urlLocationHandler = async () => {
    const location = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = '/';
    }
    //   location = localStorage();
    // get the route object from the urlRoutes object
    const route = urlRoutes[location] || urlRoutes['404'];
    // get the html from the template
    const html = await fetch(route.template).then((response) =>
        response.text()
    );
    // set the content of the content div to the html
    document.getElementById('main-content').innerHTML = html;
    // set the title of the document to the title of the route
    // document.title = route.title;
    // set the description of the document to the description of the route
    // document
    //     .querySelector('meta[name="description"]')
    //     .setAttribute('content', route.description);
    if (route.method) {
        route.method.call();
    }
};

// add an event listener to the window that watches for url changes
// window.onpopstate = urlLocationHandler;
window.addEventListener('popstate', (e) => {
    urlLocationHandler();
});
window.route = urlRoute;

// create document click that watches the nav links only
// document.addEventListener('click', (e) => {
//     const { target } = e;
//     if (!target.matches()) {
//         return;
//     }
//     e.preventDefault();
//     urlRoute();
// });
customFuncs.$('.sidebar__nav a', (a) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        urlRoute(e);
        console.log(a);
    });
});
// call the urlLocationHandler function to handle the initial url
window.addEventListener('DOMContentLoaded', () => {
    urlLocationHandler();
});
