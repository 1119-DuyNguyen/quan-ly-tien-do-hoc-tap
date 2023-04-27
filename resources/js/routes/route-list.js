import { Route } from '../abstract/classes.js';
import { DashBoard } from '../pages/dashboard.js';
import { Graduate } from '../pages/graduate.js';
import { Info } from '../pages/info.js';
import { ClassroomStudent } from '../pages/classroom/classroomStudent.js';
import { ClassroomTeacher } from '../pages/classroom/classroomTeacher.js';

import { Authentication } from '../pages/authentication.js';
import { Role } from '../pages/admin/role.js';
import { HomeworkMark } from '../components/classroom/group/post/HomeworkMark.js';

const route = new Route();

route.addRoute('/', Authentication.login, { title: 'Login' }, 'templates/login.html');
route.addRoute('sinh-vien/dashboard', DashBoard.index, { title: 'DashBoard' }, 'templates/dashboard.html');
route.addRoute('404', '', { title: '404' }, 'templates/404.html');
route.addRoute('sinh-vien/info', Info.index, {}, 'templates/info.html');
route.addRoute('giang-vien/info', Info.index, {}, 'templates/info.html');

route.addRoute('people', DashBoard.index, {}, 'templates/people.html');
route.addRoute('popup', DashBoard.index, {}, 'templates/popup.html');
// Sinh vien
route.addRoute('sinh-vien/graduate', Graduate.index, { title: 'Tốt nghiệp' }, 'templates/gradute.html');
route.addRoute('sinh-vien/graduate/suggest', Graduate.suggest, { title: 'Gợi ý' }, 'templates/suggest_graduate.html');

route.addRoute('giang-vien/classroom', ClassroomTeacher.index, { title: 'Nhóm học' }, 'templates/teacher/class.html');
route.addRoute(
    'giang-vien/classroom/$id',
    ClassroomTeacher.show,
    { title: 'classroom' },
    'templates/teacher/group.html'
);
route.addRoute(
    'giang-vien/classroom/bai-tap/$id',
    HomeworkMark.index,
    { title: 'Bài tập $id' },
    'templates/teacher/homework.html'
);

route.addRoute('sinh-vien/classroom', ClassroomStudent.index, { title: 'Nhóm học' }, 'templates/student/class.html');
route.addRoute(
    'sinh-vien/classroom/$id',
    ClassroomStudent.show,
    { title: 'classroom' },
    'templates/student/group.html'
);
route.addRoute('quan-tri-vien/role', Role.index, { title: 'role' }, '');

export var routeList = route.getUrlRoutes();
