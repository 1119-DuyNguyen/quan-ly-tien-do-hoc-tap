import { AbjustTab } from '../../group/adjustTab.js';
import { ToggleForm } from '../../group/toggleForm.js';

export class Group {
    static URL_GROUP = location.protocol + '//' + location.host + '/api/classes';
    #container;
    // createElement(type = 'div', className = '') {
    //     let element = document.createElement(type);
    //     element.classList.add(className);
    //     return element;
    // }
    /**
     *
     * @param {Element} element
     */
    constructor(element) {
        this.#container = element;
        //xử lý thao tác front-end
        var adjustTab = new AbjustTab();
        adjustTab.run();
        var toggleForm = new ToggleForm();
        toggleForm.run();
    }

    async getGroupData(id) {
        var groupData;
        let html = '';
        let data = await axios.get(Group.URL_GROUP + `/${id}`).then(function (response) {
            return response.data.data;
        });
        groupData = data ? data : [];
        //foreach
        html += `
                <div class="class-center-container__class-header--class-name">${decodeHtml(
                    groupData[0].ten_hoc_phan
                )}</div>
                <div
                    class="class-center-container__class-header--teacher-name class-center-container__class-header--sub-header"
                >
                    <strong>Giảng viên: </strong>${decodeHtml(groupData[0].ten_giang_vien)}
                </div>
                <div
                    class="class-center-container__class-header--subject-code class-center-container__class-header--sub-header"
                >
                    <strong>Mã môn học: </strong>${decodeHtml(groupData[0].ma_hoc_phan)}
                </div>
                <div
                    class="class-center-container__class-header--class-group class-center-container__class-header--sub-header"
                >
                    <strong>Nhóm môn học: </strong>${decodeHtml(groupData[0].stt_nhom)}
                </div>
            `;
        this.#container.innerHTML = html;
    }
}
