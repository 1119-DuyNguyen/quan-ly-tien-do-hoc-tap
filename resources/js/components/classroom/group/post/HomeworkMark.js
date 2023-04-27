import { SmartTableTemplate } from '../../../smart-table-template/SmartTableTemplate';

export class HomeworkMark {
    static URL_ROLE = location.protocol + '//' + location.host + '/api/bai-tap-sinh-vien';

    static index() {
        let rootElement = document.getElementById('main-content');
        let homeworkMarkContainer = document.createElement('div');
        homeworkMarkContainer.classList.add('homework-mark-container');
        rootElement.appendChild(homeworkMarkContainer);
        let tableTem = new SmartTableTemplate(homeworkMarkContainer);
    }
}
