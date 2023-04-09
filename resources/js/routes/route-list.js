import { Route } from '../abstract/classes.js';
import { DashBoard } from '../pages/dashboard.js';
import { Classroom } from '../pages/classroom';
import { Login } from '../pages/login.js';

const route = new Route();

route.addRoute('/', Login.index, { title: 'Login' }, 'templates/login.html');
route.addRoute('dashboard', DashBoard.index, { title: 'DashBoard' }, 'templates/dashboard.html');
route.addRoute('404', '', { title: '404' }, 'templates/404.html');
route.addRoute('info', '', {}, 'templates/info.html');
route.addRoute('people', DashBoard.index, {}, 'templates/people.html');
route.addRoute('popup', DashBoard.index, {}, 'templates/popup.html');
route.addRoute('classroom', Classroom.index, { title: 'classroom' }, 'templates/class.html');
route.addRoute('classroom/$id', Classroom.show, { title: 'classroom' }, 'templates/group.html');
// route.addRoute('group', Group.index, { title: 'group' }, 'templates/group.html');

export var routeList = route.getUrlRoutes();
