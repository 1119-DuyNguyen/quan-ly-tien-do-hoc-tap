import { Route } from '../abstract/classes.js';
import { DashBoard } from '../pages/dashboard.js';

const route = new Route();
route.addRoute('/', './templates/dashboard.html', DashBoard.index);
route.addRoute('404', './templates/404.html');
route.addRoute('/info', './templates/dashboard.html', DashBoard.index);
route.addRoute('/people', './templates/people.html', DashBoard.index);
route.addRoute('/tasks', './templates/tasks.html', DashBoard.index);
route.addRoute('/popup', './templates/popup.html', DashBoard.index);

export var routeList = route.getUrlRoutes();
