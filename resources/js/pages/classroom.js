import { ClassroomItem } from '../components/classroom/classroom-item';
import { Group } from '../components/classroom/group/group';

export class Classroom {
    static index() {
        let classroomItemContainer = document.getElementById('classroom-item-container');
        let classroomItem = new ClassroomItem(classroomItemContainer);
    }

    static show({ id }) {
        let groupHeaderContainer = document.getElementById('class-center-container__class-header');
        let groupHeader = new Group(groupHeaderContainer);
        groupHeader.getGroupData(id);
    }
}
