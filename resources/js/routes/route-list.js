import { Route } from '../abstract/classes.js';
import { ClassroomStudent } from '../pages/classroom/classroomStudent.js';
import { ClassroomTeacher } from '../pages/classroom/classroomTeacher.js';
import { DashBoard } from '../pages/dashboard.js';
import { Graduate } from '../pages/graduate/graduate.js';
import { Info } from '../pages/info.js';

import { HomeworkMark } from '../components/classroom/group/post/HomeworkMark.js';
import { User } from '../pages/admin/User.js';
import { Analytics } from '../pages/admin/analytics.js';
import { Program } from '../pages/admin/program.js';
import { Role } from '../pages/admin/role.js';
import { Subject } from '../pages/admin/subject.js';
import { UserPermissions } from '../pages/admin/user-permissons.js';
import { Authentication } from '../pages/authentication.js';
import { import_file } from '../pages/import-file.js';

const route = new Route();
console.log('hi');
route.addRoute('/', Authentication.login, { title: 'Login' }, 'templates/login.html');
route.addRoute('404', '', { title: '404' }, 'templates/404.html');

route.addRoute('people', DashBoard.index, {}, 'templates/people.html');
route.addRoute('popup', DashBoard.index, {}, 'templates/popup.html');
// Sinh vien
route.addRoute('sinh-vien/dashboard', DashBoard.index, { title: 'DashBoard' }, 'templates/dashboard.html');
route.addRoute('sinh-vien/info', Info.index, {}, 'templates/info.html');
route.addRoute('sinh-vien/graduate', Graduate.index, { title: 'Tốt nghiệp' }, 'templates/gradute.html');
route.addRoute('sinh-vien/graduate/suggest', Graduate.suggest, { title: 'Gợi ý' }, 'templates/suggest_graduate.html');
route.addRoute('sinh-vien/graduate/edu_program', Graduate.edu_program, { title: 'Kết quả theo tiến độ' }, 'templates/graduate_on_edu_program.html');
route.addRoute('sinh-vien/classroom', ClassroomStudent.index, { title: 'Nhóm học' }, 'templates/student/class.html');
route.addRoute(
    'sinh-vien/classroom/$id',
    ClassroomStudent.show,
    { title: 'classroom' },
    'templates/student/group.html'
);
// Giang vien
route.addRoute('giang-vien/info', Info.index, {}, 'templates/info.html');
route.addRoute('giang-vien/classroom', ClassroomTeacher.index, { title: 'Nhóm học' }, 'templates/teacher/class.html');
route.addRoute(
    'giang-vien/classroom/$id',
    ClassroomTeacher.show,
    { title: 'classroom' },
    'templates/teacher/group.html'
);
route.addRoute(
    'giang-vien/classroom/bai-tap/$id',
    HomeworkMark.show,
    { title: 'Bài tập $id' },
    'templates/teacher/homework.html'
);

route.addRoute('quan-tri-vien/dashboard', Analytics.index, { title: 'Thống kê' }, 'templates/admin/dashboard.html');
route.addRoute(
    'quan-tri-vien/graduate/',
    Analytics.graduate,
    { title: 'Tiến độ học tập' },
    'templates/admin/graduate.html'
);
route.addRoute('quan-tri-vien/graduate/class', Analytics.class, { title: 'Tiến độ lớp' }, 'templates/admin/class.html');

route.addRoute(
    'quan-tri-vien/graduate/class/$class_idn',
    Analytics.class,
    { title: 'Tiến độ lớp' },
    'templates/admin/class.html'
);
route.addRoute(
    'quan-tri-vien/graduate/class/$class_idn/$sv_username',
    Analytics.class,
    { title: 'Tiến độ sinh viên' },
    'templates/admin/class.html'
);
route.addRoute(
    'quan-tri-vien/graduate/faculty',
    Analytics.faculty,
    { title: 'Tiến độ ngành' },
    'templates/admin/faculty.html'
);
route.addRoute(
    'quan-tri-vien/graduate/student',
    Analytics.student,
    { title: 'Tiến độ sinh viên' },
    'templates/admin/student.html'
);
route.addRoute(
    'quan-tri-vien/graduate/student/$sv_username',
    Analytics.student,
    { title: 'Tiến độ sinh viên' },
    'templates/admin/student.html'
);

route.addRoute('quan-tri-vien/program', Program.index, { title: 'Chương trình đào tạo' }, '');
route.addRoute('quan-tri-vien/program/$id', Program.view, { title: 'Chương trình đào tạo' }, '');
route.addRoute('quan-tri-vien/info', Info.index, {title: 'Thông tin cá nhân'}, 'templates/info.html')
route.addRoute('quan-tri-vien/role', Role.index, { title: 'Quyền' }, '');
route.addRoute('quan-tri-vien/role/edit', Role.edit, { title: 'Quyền' }, 'templates/admin/role-edit.html');
route.addRoute('quan-tri-vien/role/edit/$id', UserPermissions.edit, { title: 'Quyền' }, 'templates/admin/role-edit.html');
// route.addRoute('quan-tri-vien/subject', Sub.edit, { title: 'Quyền' }, 'templates/admin/role-edit.html');
route.addRoute('quan-tri-vien/subject', Subject.index, { title: 'Học phần' }, '');

route.addRoute('quan-tri-vien/user', User.index, { title: 'Người dùng' }, '');

route.addRoute('quan-tri-vien/import', import_file.index, {title: 'Nhập dữ liệu'}, '/templates/import-file.html');

export var routeList = route.getUrlRoutes();
