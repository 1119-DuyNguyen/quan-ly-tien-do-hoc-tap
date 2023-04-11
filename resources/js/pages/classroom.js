import { ClassroomItem } from '../components/classroom/classroom-item';
import { Everyone } from '../components/classroom/group/everyone/everyone';
import { Group } from '../components/classroom/group/group';
import { BaiTap } from '../components/classroom/group/post/baitap';
import { Post } from '../components/classroom/group/post/post';

export class Classroom {
    //  /classroom
    static TeacherIndex() {
        let classroomItemContainer = document.getElementById('classroom-item-container');
        let classroomItem = new ClassroomItem(classroomItemContainer);
        classroomItem.getTeacherClassData();
    }

    static StudentIndex() {
        let classroomItemContainer = document.getElementById('classroom-item-container');
        let classroomItem = new ClassroomItem(classroomItemContainer);
        classroomItem.getStudentClassData();
    }

    //  /classroom/$id
    static TeacherShow({ id }) {
        //render  header của group page
        let groupHeaderContainer = document.getElementById('class-center-container__class-header');
        let groupHeader = new Group(groupHeaderContainer);
        groupHeader.getGroupData(id);

        //render bài đăng của group page
        let groupPostContainer = document.getElementById('class-center-container__class-dashboard--post-feed');
        let groupPost = new Post(groupPostContainer);
        groupPost.getTeacherPostData(id);

        //render danh sách thành viên của group page
        let everyoneContainer = document.getElementById(
            'class-center-container__class-dashboard--everyone tab-content'
        );
        let everyone = new Everyone(everyoneContainer);
        everyone.getEveryoneData(id);

        //add bài đăng mới sau khi submit form
        let newPostForm = document.getElementById('class-center-container__class-dashboard--new-post');
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            groupPost.addPost(id);
        });

        //Render bài tập
        let taskContainerContainer = document.getElementById('task-container');
        let taskContainer = new BaiTap(taskContainerContainer);
        taskContainer.getTeacherBaiTapData(id);

        //add bài tập
        let newTaskForm = document.getElementById('class-center-container__class-dashboard--new-homework');
        newTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            taskContainer.addBaiTap(id);
        });
    }

    static StudentShow({ id }) {
        //render  header của group page
        let groupHeaderContainer = document.getElementById('class-center-container__class-header');
        let groupHeader = new Group(groupHeaderContainer);
        groupHeader.getGroupData(id);

        //render bài đăng của group page
        let groupPostContainer = document.getElementById('class-center-container__class-dashboard--post-feed');
        let groupPost = new Post(groupPostContainer);
        groupPost.getStudentPostData(id);

        //Render bài tập
        let taskContainerContainer = document.getElementById('task-container');
        let taskContainer = new BaiTap(taskContainerContainer);
        taskContainer.getStudentBaiTapData(id);

        //render danh sách thành viên của group page
        let everyoneContainer = document.getElementById(
            'class-center-container__class-dashboard--everyone tab-content'
        );
        let everyone = new Everyone(everyoneContainer);
        everyone.getEveryoneData(id);
    }
}
