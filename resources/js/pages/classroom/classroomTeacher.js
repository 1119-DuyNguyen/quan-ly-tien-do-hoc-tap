import { ClassroomItem } from '../../components/classroom/classroom-item';
import { Everyone } from '../../components/classroom/group/everyone/everyone';
import { Group } from '../../components/classroom/group/group';
import { Homework } from '../../components/classroom/group/post/Homework';
import { Post } from '../../components/classroom/group/post/post';
import { routeHref } from '../../routes/route';

export class ClassroomTeacher {
    static URL_Classroom = location.protocol + '//' + location.host + '/classroom';
    static index() {
        let classroomItemContainer = document.getElementById('classroom-item-container');
        let classroomItem = new ClassroomItem(classroomItemContainer);
        classroomItem.getTeacherClassData(null);
    }

    static show({ id }) {
        let navBarBtn = document.querySelectorAll('.class-center-container__class-dashboard-tab-btn');
        console.log(navBarBtn);

        //render  header của group page
        let groupHeaderContainer = document.getElementById('class-center-container__class-header');
        let groupHeader = new Group(groupHeaderContainer);
        groupHeader.getGroupData(id);

        //render data bài đăng khi vừa bắt đầu load
        let groupPostContainer = document.getElementById('class-center-container__class-dashboard--post-feed');
        let groupPost = new Post(groupPostContainer);
        groupPost.getTeacherPostData(id, true);

        //render bài đăng của group page
        let baiDangBtn = navBarBtn[0];
        baiDangBtn.addEventListener('click', (e) => {
            let url = new URL(window.location.href);
            url.searchParams.set('page', 1);
            let groupPostContainer = document.getElementById('class-center-container__class-dashboard--post-feed');
            let groupPost = new Post(groupPostContainer);
            groupPost.getTeacherPostData(id, true);
        });

        //render danh sách thành viên của group page
        let moiNguoiBtn = navBarBtn[2];
        moiNguoiBtn.addEventListener('click', (e) => {
            let everyoneContainer = document.getElementById(
                'class-center-container__class-dashboard--everyone tab-content'
            );
            let everyone = new Everyone(everyoneContainer);
            everyone.getEveryoneData(id);
        });

        //add bài đăng mới sau khi submit form
        let newPostForm = document.getElementById('class-center-container__class-dashboard--new-post');
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let groupPostContainer = document.getElementById('class-center-container__class-dashboard--post-feed');
            let groupPost = new Post(groupPostContainer);
            groupPost.addPost(id);
        });

        //Render bài tập
        let taskContainerContainer = document.getElementById('task-container');
        let taskContainer = new Homework(taskContainerContainer);
        let baiTapBtn = navBarBtn[1];
        baiTapBtn.addEventListener('click', (e) => {
            taskContainer.getTeacherBaiTapData(id, 'moiNhat', true);
        });

        let sortBaiTapMoiBtn = document.getElementById('giao_vien_new_bai_tap_btn');
        sortBaiTapMoiBtn.addEventListener('click', (e) => {
            taskContainer.getTeacherBaiTapData(id, 'moiNhat', true);
        });

        let sortBaiTapDeadlineBtn = document.getElementById('giao_vien_deadline_bai_tap_btn');
        sortBaiTapDeadlineBtn.addEventListener('click', (e) => {
            taskContainer.getTeacherBaiTapData(id, 'deadline', true);
        });

        //add bài tập
        let newTaskForm = document.getElementById('class-center-container__class-dashboard--new-homework');
        newTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            taskContainer.addBaiTap(id);
        });

        //right panel
        let rightPanel = document.getElementById('exercise__content');
        let rightPanelItem = new ClassroomItem(rightPanel);
        rightPanelItem.getTeacherClassData(1);

        const classroomRightpanelBtn = document.getElementById('classroom-rightpanel-btn');
        classroomRightpanelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            routeHref(ClassroomTeacher.URL_Classroom);
        });

        const markTableBtn = document.getElementById('mark-table-student');
        markTableBtn.addEventListener('click', (e) => {
            e.preventDefault();
            routeHref(ClassroomTeacher.URL_BANG_DIEM + `/${id}`);
        });
    }
}
