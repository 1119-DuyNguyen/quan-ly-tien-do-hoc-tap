import { routeHref } from '../../routes/route';

function getNameUser() {
    let username = localStorage.getItem('user');
    const classroomHeader = document.querySelector('#classroom__header');
    classroomHeader.innerHTML = `
        <h1 class="classroom__header__title">Xin chào ${username}</h1>
        <div class="classroom__header__description">
            <!-- Thứ 2, ngày 3 tháng 2 năm 2023 -->
        </div>`;
}

async function addClassToCenter() {
    const URL_CLASSROOM = location.protocol + '//' + location.host + '/api/class';
    const URL_LINK_TO_GROUP = location.protocol + '//' + location.host + '/classroom';
    let html = '';
    const classCenterContainer = document.querySelector('.home-container .home-center-container .class-item-container');

    var nums = [];

    classCenterContainer.innerHTML = `<loader-component></loader-component>`;

    let data = await axios
        .get(URL_CLASSROOM)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.log(error);
        });
    let classData = data ? data : [];

    for (let i = 0; i < 6; i++) {
        let index = i;
        html += `
                <a href="${URL_LINK_TO_GROUP + `/${classData[index].nhom_hoc_id}`}" class="class-item" id="nhom_hoc_${
            classData[index].nhom_hoc_id
        }">
                    <div class="class-item__text">
                        <h3>${classData[index].ten_hoc_phan}</h3>
                    </div>
                </a>
            `;
        classCenterContainer.innerHTML = html;
    }
}

//hàm set màu cho mấy cục class
function addColorForClassItem() {
    const color = ['color-0', 'color-1', 'color-2', 'color-3', 'color-4'];
    const classItem = document.querySelectorAll('.class-item');
    var random = Math.floor(Math.random() * 100);
    classItem.forEach((element, index) => {
        element.classList.add(`${color[random++ % 5]}`);
    });
}

function routeClassroom() {
    let classItems = document.querySelectorAll('.class-item');
    classItems.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            routeHref(event.currentTarget.href);
        });
    });
}

export class ClassCenter {
    async run() {
        getNameUser();
        await addClassToCenter();
        routeClassroom();
        addColorForClassItem();
    }
}
