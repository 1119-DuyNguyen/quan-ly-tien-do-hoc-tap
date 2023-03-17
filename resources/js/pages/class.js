import { AbjustTab } from '../components/class/adjustTab.js';
import { ToggleForm } from '../components/class/toggleForm.js';

export class Class {
    static index() {
        var adjustTab = new AbjustTab();
        adjustTab.run();
        var toggleForm = new ToggleForm();
        toggleForm.run();
    }
}
