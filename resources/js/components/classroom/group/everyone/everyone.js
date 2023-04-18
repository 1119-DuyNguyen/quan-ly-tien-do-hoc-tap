// import axios from 'axios';

export class Everyone {
    static URL_EVERYONE = location.protocol + '//' + location.host + '/api/everyone';
    static URL_GROUP = location.protocol + '//' + location.host + '/api/classes';
    #container;
    constructor(element) {
        this.#container = element;
    }

    async getEveryoneData(id) {
        var everyoneData;
        var teacherData;
        let html = '';

        //lấy data giảng viên bằng cách hưởng sái data giảng viên từ nhóm học
        let teacherFunData = await axios.get(Everyone.URL_GROUP + `/${id}`).then(function (response) {
            return response.data.data;
        });
        teacherData = teacherFunData ? teacherFunData : [];
        teacherData.forEach((element) => {
            html += `<div class="class-center-container__class-dashboard--everyone--teacher">
                <div class="class-center-container__class-dashboard--everyone--teacher-header">
                    <div class="class-center-container__class-dashboard--everyone--teacher-header-lefttext">
                        Giảng viên
                    </div>
                    <div class="class-center-container__class-dashboard--everyone--teacher-header-righttext">
                        ${decodeHtml(teacherData.length)}
                    </div>
                </div>
                <div class="class-center-container__class-dashboard--everyone--teacher-member">
                    <div class="class-center-container__class-dashboard--everyone--teacher-member-item">
                        <img src="../../img/teacher.png" />
                        <span>${decodeHtml(element.ten_giang_vien)}</span>
                    </div>
                </div>
            </div>`;
        });

        //lấy data danh sách sinh viên
        let data = await axios.get(Everyone.URL_EVERYONE + `/${id}`).then(function (response) {
            return response.data.data;
        });
        everyoneData = data ? data : [];
        html += `
            <div class="class-center-container__class-dashboard--everyone--student">
                <div class="class-center-container__class-dashboard--everyone--student-header">
                    <div class="class-center-container__class-dashboard--everyone--student-header-lefttext">
                        Sinh viên
                    </div>
                    <div class="class-center-container__class-dashboard--everyone--student-header-righttext">
                        ${decodeHtml(everyoneData.length)}
                    </div>
                </div>
        `;
        everyoneData.forEach((element, index) => {
            html += `
                <div class="class-center-container__class-dashboard--everyone--student-member">
                    <div class="class-center-container__class-dashboard--everyone--student-member-item">
                        <img src="../../img/icon.png" />
                        <span>${decodeHtml(element.ten)}</span>
                    </div>
                </div>
            </div>`;
        });
        this.#container.innerHTML = html;
    }
}
