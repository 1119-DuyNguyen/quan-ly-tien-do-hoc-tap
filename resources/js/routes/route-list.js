import { Route } from '../abstract/classes.js';
import { DashBoard } from '../pages/dashboard.js';
import { Login } from '../pages/login.js';
import { ClassroomStudent } from '../pages/classroom/classroomStudent.js';
import { ClassroomTeacher } from '../pages/classroom/classroomTeacher.js';

const route = new Route();

route.addRoute('/', Login.index, { title: 'Login' }, 'templates/login.html');
route.addRoute('dashboard', DashBoard.index, { title: 'DashBoard' }, 'templates/dashboard.html');
route.addRoute('404', '', { title: '404' }, 'templates/404.html');
route.addRoute('info', '', {}, 'templates/info.html');
route.addRoute('people', DashBoard.index, {}, 'templates/people.html');
route.addRoute('popup', DashBoard.index, {}, 'templates/popup.html');

route.addRoute('giang-vien/classroom', ClassroomTeacher.index, { title: 'Nhóm học' }, 'templates/teacher/class.html');
route.addRoute(
    'giang-vien/classroom/$id',
    ClassroomTeacher.show,
    { title: 'classroom' },
    'templates/teacher/group.html'
);

route.addRoute('sinh-vien/classroom', ClassroomStudent.index, { title: 'Nhóm học' }, 'templates/student/class.html');
route.addRoute(
    'sinh-vien/classroom/$id',
    ClassroomStudent.show,
    { title: 'classroom' },
    'templates/student/group.html'
);

export var routeList = route.getUrlRoutes();
