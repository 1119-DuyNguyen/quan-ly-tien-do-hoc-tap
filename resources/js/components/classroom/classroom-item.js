import { routeHref } from '../../routes/route';

export class ClassroomItem {
    static URL_CLASSROOM = location.protocol + '//' + location.host + '/api/class';
    static URL_LINK_TO_GROUP = location.protocol + '//' + location.host + '/classroom';
    #container;
    createElement(type = 'div', className = '') {
        let element = document.createElement(type);
        element.classList.add(className);
        return element;
    }
    /**
     *
     * @param {Element} element
     */
    constructor(element) {
        this.#container = element;
    }
    async getTeacherClassData() {
        this.#container.innerHTML = `<loader-component></loader-component>`;
        var classData;
        let html = '';
        let data = await axios.get(ClassroomItem.URL_CLASSROOM).then(function (response) {
            return response.data.data;
        });
        classData = data ? data : [];
        classData.forEach((element, index) => {
            html += `
                <a href="${
                    ClassroomItem.URL_LINK_TO_GROUP + `/${element.nhom_hoc_id}`
                }" class="class-item" id="nhom_hoc_${element.nhom_hoc_id}">
                    <div class="class-item__text">
                        <h3>${element.ten_hoc_phan}</h3>
                    </div>
                    <div class="class-item__bar">
                        <div class="class-item__bar--progress"></div>
                        <span>10 tasks | 56%</span>
                    </div>
                </a>
            `;
        });
        this.#container.innerHTML = html;
        this.addColorForClassItem(this.#container);
        this.routeClassroom();
    }

    async getStudentClassData() {
        this.#container.innerHTML = `<loader-component></loader-component>`;
        var classData;
        let html = '';
        let data = await axios.get(ClassroomItem.URL_CLASSROOM).then(function (response) {
            return response.data.data;
        });
        classData = data ? data : [];
        classData.forEach((element, index) => {
            html += `
                <a href="${
                    ClassroomItem.URL_LINK_TO_GROUP + `/${element.nhom_hoc_id}`
                }" class="class-item" id="nhom_hoc_${element.nhom_hoc_id}">
                    <div class="class-item__text">
                        <h3>${element.ten_hoc_phan}</h3>
                    </div>
                    <div class="class-item__bar">
                        <div class="class-item__bar--progress"></div>
                        <span>10 tasks | 56%</span>
                    </div>
                </a>
            `;
        });
        this.#container.innerHTML = html;
        this.addColorForClassItem(this.#container);
        this.routeClassroom();
    }

    //hàm set màu cho mấy cục class
    addColorForClassItem(containerElement) {
        const color = ['color-0', 'color-1', 'color-2', 'color-3', 'color-4'];
        const classItem = containerElement.querySelectorAll('.class-item');
        var random = Math.floor(Math.random() * 100);
        classItem.forEach((element, index) => {
            element.classList.add(`${color[random++ % 5]}`);
        });
    }

    routeClassroom() {
        let classItems = document.querySelectorAll('.class-item');
        classItems.forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                routeHref(event.currentTarget.href);
            });
        });
    }
}
