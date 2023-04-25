import { ClassroomItem } from '../../components/classroom/classroom-item';
import { Everyone } from '../../components/classroom/group/everyone/everyone';
import { Group } from '../../components/classroom/group/group';
import { Homework } from '../../components/classroom/group/post/Homework';
import { Post } from '../../components/classroom/group/post/post';

export class ClassroomTeacher {
    static index() {
        let classroomItemContainer = document.getElementById('classroom-item-container');
        let classroomItem = new ClassroomItem(classroomItemContainer);
        classroomItem.getTeacherClassData();
    }

    static show({ id }) {
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
        let taskContainer = new Homework(taskContainerContainer);
        taskContainer.getTeacherBaiTapData(id);

        //add bài tập
        let newTaskForm = document.getElementById('class-center-container__class-dashboard--new-homework');
        newTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            taskContainer.addBaiTap(id);
        });
    }
}
