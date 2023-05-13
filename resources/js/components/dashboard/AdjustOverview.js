// /**
//  *
//  * @param {number} taskCompleted
//  * @param {number} allTasks
//  */
// function adjustPercentageCircle(taskCompleted, allTasks) {
//     let pText = document.querySelector('.percentage__circle--text');
//     let pCircle = document.querySelector('.percentage__circle--circle');
//     let completedTask = document.querySelector('.percentage__text--completed');
//     let allTask = document.querySelector('.percentage__text--task');

//     let percentage = Math.round((taskCompleted / allTasks) * 100);

//     let text = document.createTextNode(`${percentage}%`);
//     let completedTasktext = document.createTextNode(
//         `${taskCompleted} đã hoàn thành`
//     );
//     let allTaskstext = document.createTextNode(
//         `trong tổng số ${allTasks} công việc`
//     );

//     pText.appendChild(text);
//     completedTask.appendChild(completedTasktext);
//     allTask.appendChild(allTaskstext);
//     // if (percentage < 25) {
//     //     pCircle.classList.add("red");
//     // } else if (percentage < 50) {
//     //     pCircle.classList.add("orange");
//     // } else if (percentage < 75) {
//     //     pCircle.classList.add("yellow");
//     // } else {
//     //     pCircle.classList.add("green");
//     // }
//     pCircle.classList.add(`p${percentage}`);
// }

// export class AdjustOverview {
//     run() {
//         adjustPercentageCircle(50, 100);
//         customFuncs.appendTextNowTime('.calendar__time');
//         customFuncs.randomColorItem('.class-item');
//     }
// }
