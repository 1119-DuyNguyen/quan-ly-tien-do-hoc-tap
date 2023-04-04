import { Route } from '../abstract/classes.js';
import { DashBoard } from '../pages/dashboard.js';
import { Class } from '../pages/class.js';
import { Login } from '../pages/login.js';

const route = new Route();

route.addRoute('/', Login.index, { title: 'Login' }, 'templates/login.html');
route.addRoute('dashboard', DashBoard.index, { title: 'DashBoard' }, 'templates/dashboard.html');
route.addRoute('404', '', { title: '404' }, 'templates/404.html');
route.addRoute('info', '', {}, 'templates/info.html');
route.addRoute('people', DashBoard.index, {}, 'templates/people.html');
route.addRoute('popup', DashBoard.index, {}, 'templates/popup.html');
route.addRoute('class', Class.index, { title: 'classroom' }, 'templates/class.html');
// Sinh vien
route.addRoute('sinhvien/graduate', DashBoard.index, { title: 'Tốt nghiệp' }, 'templates/gradute.html');
route.addRoute('sinhvien/graduate/suggest', DashBoard.index, { title: 'Gợi ý' }, 'templates/suggest_graduate.html');

export var routeList = route.getUrlRoutes();
