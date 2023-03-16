function toggleForm() {
    var classDashboardBtn = document.querySelectorAll('.class-dashboard-btn');
    var classDashboardBtnCancel = document.querySelectorAll(
        '.class-dashboard-btn-cancel'
    );

    classDashboardBtn.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            element.style.display = 'none';
            element.nextElementSibling.style.display = 'block';
        });
    });

    classDashboardBtnCancel.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            element.form.style.display = 'none';
            element.form.previousElementSibling.style.display = 'block';
        });
    });
}

export class ToggleForm {
    run() {
        toggleForm();
    }
}
