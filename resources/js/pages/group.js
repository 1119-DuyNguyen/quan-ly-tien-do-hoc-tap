import { AbjustTab } from '../components/group/adjustTab.js';
import { ToggleForm } from '../components/group/toggleForm.js';

export class Group {
    static index() {
        var adjustTab = new AbjustTab();
        adjustTab.run();
        var toggleForm = new ToggleForm();
        toggleForm.run();
    }
}
