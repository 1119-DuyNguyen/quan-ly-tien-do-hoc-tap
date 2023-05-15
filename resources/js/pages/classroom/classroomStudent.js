import { ClassroomItem } from '../../components/classroom/classroom-item';
import { Everyone } from '../../components/classroom/group/everyone/everyone';
import { Group } from '../../components/classroom/group/group';
import { Homework } from '../../components/classroom/group/post/Homework';
import { Post } from '../../components/classroom/group/post/post';
import { RightPanel } from '../../components/classroom/group/rightPanel';

export class ClassroomStudent {
    static index() {
        let classroomItemContainer = document.getElementById('classroom-item-container');
        let classroomItem = new ClassroomItem(classroomItemContainer);
        classroomItem.getStudentClassData();
    }

    static show({ id }) {
        let navBarBtn = document.querySelectorAll('.class-center-container__class-dashboard-tab-btn');

        //render data bài đăng khi vừa bắt đầu load
        let groupPostContainer = document.getElementById('class-center-container__class-dashboard--post-feed');
        let groupPost = new Post(groupPostContainer);
        groupPost.getStudentPostData(id);

        //render  header của group page
        let groupHeaderContainer = document.getElementById('class-center-container__class-header');
        let groupHeader = new Group(groupHeaderContainer);
        groupHeader.getGroupData(id);

        //render bài đăng của group page
        let baiDangBtn = navBarBtn[0];
        baiDangBtn.addEventListener('click', (e) => {
            let groupPostContainer = document.getElementById('class-center-container__class-dashboard--post-feed');
            let groupPost = new Post(groupPostContainer);
            groupPost.getStudentPostData(id);
        });

        //Render bài tập
        let taskContainerContainer = document.getElementById('task-container');
        let taskContainer = new Homework(taskContainerContainer);
        let baiTapBtn = navBarBtn[1];
        baiTapBtn.addEventListener('click', (e) => {
            taskContainer.getStudentBaiTapData(id, 'moiNhat');
        });

        let sortBaiTapMoiBtn = document.getElementById('sinh_vien_new_bai_tap_btn');
        sortBaiTapMoiBtn.addEventListener('click', (e) => {
            taskContainer.getStudentBaiTapData(id, 'moiNhat');
        });

        let sortBaiTapDeadlineBtn = document.getElementById('sinh_vien_deadline_bai_tap_btn');
        sortBaiTapDeadlineBtn.addEventListener('click', (e) => {
            taskContainer.getStudentBaiTapData(id, 'deadline');
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

        //load right panel
        let rightPanelContainer = document.getElementById('exercise__content');
        let rightPanel = new RightPanel(rightPanelContainer);
        rightPanel.getBaiTapRightPanel(id);
    }
}
