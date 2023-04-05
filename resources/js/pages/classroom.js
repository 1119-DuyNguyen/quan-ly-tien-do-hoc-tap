import { ClassroomItem } from '../components/classroom/classroom-item';
import { Everyone } from '../components/classroom/group/everyone/everyone';
import { Group } from '../components/classroom/group/group';
import { Post } from '../components/classroom/group/post/post';

export class Classroom {
    //  /classroom
    static index() {
        let classroomItemContainer = document.getElementById('classroom-item-container');
        let classroomItem = new ClassroomItem(classroomItemContainer);
    }

    //  /classroom/$id
    static show({ id }) {
        //render  header của group page
        let groupHeaderContainer = document.getElementById('class-center-container__class-header');
        let groupHeader = new Group(groupHeaderContainer);
        groupHeader.getGroupData(id);

        //render bài đăng của group page
        let groupPostContainer = document.getElementById('class-center-container__class-dashboard--post-feed');
        let groupPost = new Post(groupPostContainer);
        groupPost.getPostData(id);

        //render bài đăng của group page
        let everyoneContainer = document.getElementById(
            'class-center-container__class-dashboard--everyone tab-content'
        );
        let everyone = new Everyone(everyoneContainer);
        everyone.getEveryoneData(id);
    }
}
