window.onload = function () {
    const color = ['color-0', 'color-1', 'color-2', 'color-3', 'color-4'];
    const classItem = document.querySelectorAll('.class-item');
    console.log(classItem);
    random = Math.floor(Math.random() * 100);
    classItem.forEach((element, index) => {
        element.classList.add(`${color[random++ % 5]}`);
    });
};
