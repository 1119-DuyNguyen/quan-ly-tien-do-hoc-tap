import { Route } from '../abstract/classes.js';
import { Class } from '../pages/class.js';

import { DashBoard } from '../pages/dashboard.js';
import { Info } from "../pages/info.js";
import { Login } from '../pages/login.js';

import { Authentication } from '../pages/authentication.js';
import { Role } from '../pages/admin/role.js';


const route = new Route();

route.addRoute('/', Authentication.login, { title: 'Login' }, 'templates/login.html');
route.addRoute('sinh-vien/dashboard', DashBoard.index, { title: 'DashBoard' }, 'templates/dashboard.html');
route.addRoute('404', '', { title: '404' }, 'templates/404.html');
route.addRoute('info', Info.index, {}, 'templates/info.html');
route.addRoute('people', DashBoard.index, {}, 'templates/people.html');
route.addRoute('popup', DashBoard.index, {}, 'templates/popup.html');
route.addRoute('class', Class.index, { title: 'classroom' }, 'templates/class.html');
route.addRoute('admin/role', Role.index, { title: 'role' }, '');

export var routeList = route.getUrlRoutes();
