import { Route } from '../abstract/classes.js';
import { DashBoard } from '../pages/dashboard.js';
import { Class } from '../pages/class.js';
import { Login } from '../pages/login.js';

const route = new Route();
route.addRoute('/', './templates/dashboard.html', DashBoard.index);
route.addRoute('404', './templates/404.html');
route.addRoute('/info', './templates/info.html', '');
route.addRoute('/people', './templates/people.html', DashBoard.index);
route.addRoute('/popup', './templates/popup.html', DashBoard.index);
route.addRoute('/class', './templates/class.html', Class.index);
route.addRoute('/login', './templates/login.html', Login.index);

export var routeList = route.getUrlRoutes();
