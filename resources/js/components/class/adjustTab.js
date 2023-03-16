function adjustTab() {
    var tabBtn = document.querySelectorAll(
        '.center-container__class-dashboard-tab-btn'
    );
    var tabContent = document.querySelectorAll('.tab-content');
    tabContent[0].style.display = 'block';
    tabBtn[0].classList.add('class-active');

    tabBtn.forEach((element, i) => {
        element.addEventListener('click', (e) => {
            tabBtn.forEach((element) => {
                tabContent.forEach((tabElement) => {
                    tabElement.style.display = 'none';
                });
                if (element.classList.contains('class-active')) {
                    element.classList.remove('class-active');
                }
            });
            if (!element.classList.contains('class-active')) {
                e.target.classList.add('class-active');
                tabContent[i].style.display = 'block';
            }
        });
    });
}

export class AbjustTab {
    run() {
        adjustTab();
    }
}
