const one_day=1000*60*60*24;

/**
 * Date relating fuctions
 */

/**
     * Hàm thực hiện việc tính toán thời gian từ thời điểm hiện tại (kèm/không kèm tham số) đến 6 ngày kế tiếp trong tuần.
     * @param {number} ammountOfDays lượng thời gian thêm vào so với thời điểm hiện tại
     * @returns ngày đầu và ngày cuối của một tuần
     */
function returnDateInWeek(date = new Date()) {
    let first = date; // First day is the current date
    let last = new Date(first.getTime() + (6 * one_day)); // last day is the first day + 6

    return {
        first,
        last
    }
}

/**
 * Hàm trả về ngày tháng năm theo định dạng dd/mm/yyyy dựa theo tham số unixDate.
 * @param {number} unixDate 
 * @returns dd/mm/yyyy
 */
function returnFullDate(unixDate) {
    let dateObj = new Date(unixDate);
    return dateObj.getDate() + "/" + (dateObj.getMonth() + 1);
}

function returnDaysRowHTML(date = new Date()) {
    let obj = returnDateInWeek(date);
    let first = obj.first, last = obj.last;
    
    return `<div class="chart__content__row chart__content__row__date">
        <div class="chart__content__col chart__content__col__date">${returnFullDate(first.getTime())}</div>
        <div class="chart__content__col chart__content__col__date">${returnFullDate(first.getTime() + one_day)}</div>
        <div class="chart__content__col chart__content__col__date">${returnFullDate(first.getTime() + one_day * 2)}</div>
        <div class="chart__content__col chart__content__col__date">${returnFullDate(first.getTime() + one_day * 3)}</div>
        <div class="chart__content__col chart__content__col__date">${returnFullDate(last.getTime() - one_day * 2)}</div>
        <div class="chart__content__col chart__content__col__date">${returnFullDate(last.getTime() - one_day)}</div>
        <div class="chart__content__col chart__content__col__date">${returnFullDate(last.getTime())}</div>
    </div>`;
}

/**
* @param {String} html representing a single element
* @return child node or null if not found
* https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
* biến HTML thành phần tử
*/
function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

Date.daysBetween = function(date1, date2) {
    //Get 1 day in milliseconds
    let one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    let date1_ms = date1.getTime();
    let date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    let difference_ms = date2_ms - date1_ms;
    
    if (difference_ms < 0)
        return Math.floor(difference_ms/one_day); 
    // Convert back to days and return
    return Math.floor(difference_ms/one_day); 
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * 
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function returnDateTimeFormally(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10? '0' + day : day;
    return year+"-"+month+"-"+day;
}

/**
 * End
 */

document.addEventListener('DOMContentLoaded', () => {
    const chart__content = document.getElementById('chart__content');
    chart__content.insertBefore(htmlToElement(returnDaysRowHTML()), chart__content.firstChild); // thêm dòng date vào cuối ds node của chart__content

    const chart__header = document.getElementById('chart__header');
    let currentDate = new Date();

    const chart__header__next = document.querySelector('.chart__header .chart__header__next');
    const chart__header__prev = document.querySelector('.chart__header .chart__header__prev');

    let num = 0;

    chart__header.value = returnDateTimeFormally(currentDate);

    chart__header__next.addEventListener('click', () => {
        chart__content.innerHTML = "";

        currentDate = new Date(currentDate.getTime() + one_day * 7);
        chart__content.append(htmlToElement(returnDaysRowHTML(currentDate)));

        chart__header.value = returnDateTimeFormally(currentDate);

        innerMultipleTasks(subjects, currentDate);
    })

    chart__header__prev.addEventListener('click', () => {
        chart__content.innerHTML = "";

        // Phải đặt ngay tại đây nếu không sẽ lỗi logic hiển thị
        currentDate = new Date(currentDate.getTime() - one_day * 7);
        chart__content.append(htmlToElement(returnDaysRowHTML(currentDate)));

        chart__header.value = returnDateTimeFormally(currentDate);

        innerMultipleTasks(subjects, currentDate);
    })

    chart__header.addEventListener('change', () => {
        chart__content.innerHTML = "";

        currentDate = new Date(chart__header.value);
        num = 0;

        chart__content.append(htmlToElement(returnDaysRowHTML(currentDate)));

        innerMultipleTasks(subjects, currentDate);
    })

    const subjects = [
        {
            tenNhomHoc: "Testing",
            tasks: [
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/01/01',
                    ngayKetThuc: '2023/03/14',
                }
            ]
        },
        {
            tenNhomHoc: "UX Research",
            tasks: [
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/09',
                    ngayKetThuc: '2023/03/10',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/09',
                    ngayKetThuc: '2023/03/11',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/09',
                    ngayKetThuc: '2023/03/10',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/11',
                    ngayKetThuc: '2023/03/12',
                }
            ]
        },
        {
            tenNhomHoc: "Analysis",
            tasks: [
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/08',
                    ngayKetThuc: '2023/03/10',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/08',
                    ngayKetThuc: '2023/03/10',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/08',
                    ngayKetThuc: '2023/03/09',
                }
            ]
        },
        {
            tenNhomHoc: "Blender",
            tasks: [
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/07',
                    ngayKetThuc: '2023/03/08',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/08',
                    ngayKetThuc: '2023/03/09',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/07',
                    ngayKetThuc: '2023/03/08',
                }
            ]
        },
        {
            tenNhomHoc: "UI Animation",
            tasks: [
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/07',
                    ngayKetThuc: '2023/03/08',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/08',
                    ngayKetThuc: '2023/03/10',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/07',
                    ngayKetThuc: '2023/03/09',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/09',
                    ngayKetThuc: '2023/03/10',
                }
            ]
        },
        {
            tenNhomHoc: "Graphic Design",
            tasks: [
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/08',
                    ngayKetThuc: '2023/03/10',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/09',
                    ngayKetThuc: '2023/03/10',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/08',
                    ngayKetThuc: '2023/03/09',
                },
                {
                    loaiND: 'baitap',
                    ngayBatDau: '2023/03/09',
                    ngayKetThuc: '2023/03/11',
                }
            ]
        },
    ]

    innerMultipleTasks(subjects);
    
    // Functions definitions

    function createTasks(subject, currentDate = new Date()) {
        // Khởi tạo
        let count = 0;
        let starts = [], ends = [];

        let courseName = subject.tenNhomHoc;
        let tasks = subject.tasks;
        // Lặp
        for (let i = 0; i < tasks.length; i++){
            if (tasks[i].loaiND == 'baitap') { // nếu là baitap
                count++;
                starts.push(new Date(tasks[i].ngayBatDau));
                ends.push(new Date(tasks[i].ngayKetThuc));
            }
        }
        // Sắp xếp
        starts.sort(function (a, b) {return a.getTime() - b.getTime()})
        ends.sort(function (a, b) {return a.getTime() - b.getTime()})

        let earliestStart = starts[0];
        let latestEnd = ends[ends.length - 1];

        // Chiều dài toàn khoá học (tính theo số tasks)
        let lengthOfCourse = Date.daysBetween(earliestStart, latestEnd) + 1;
        let colors_arr = ['bluepurple', 'green', 'orange', 'red', 'blue'];

        if (typeof subject.color == 'undefined') {
            subject.color = colors_arr[getRandomInt(0, colors_arr.length-1)];
        }
        
        let width;

        if (Date.daysBetween(latestEnd, currentDate) > 0 || Date.daysBetween(currentDate, earliestStart) >= 6) 
            return ""; // Task đã hết hạn hoặc task chưa nằm trong tuần đang xét
        else if (Date.daysBetween(earliestStart, currentDate) >= 0) { // start trước/ngay ngày hiện tại
            width = lengthOfCourse; // ngay ngày hiện tại

            width = (width > 7) ? 7 : width; // chiếm 1 tuần
                
            
            if (Date.daysBetween(earliestStart, currentDate) > 0) // trước ngày hiện tại nhưng nằm trong tuần đang xét
            {
                width = lengthOfCourse - Date.daysBetween(earliestStart, currentDate);
                width = (width > 7) ? 7 : width;
            }

            if (width > 1) // task chiếm hơn 1 ngày
                return `<div class="chart__content__row">
                    <div class="chart__content__col chart__content__col--w${width} chart__content__col--${subject.color}">
                        <div class="chart__content__title">
                            ${courseName}
                        </div>
                        <div class="chart__content__tasks">
                            <div class="chart__content__tasks__title">Tasks</div>
                            ${count}
                        </div>
                    </div>
                </div>`;
            return `<div class="chart__content__row">
                <div class="chart__content__col chart__content__col--${subject.color}">
                    <div class="chart__content__title">
                        ${courseName}
                    </div>
                    <div class="chart__content__tasks">
                        <div class="chart__content__tasks__title">Tasks</div>
                        ${count}
                    </div>
                </div>
            </div>`

        } else { // < 0

            let betweenDays = Math.abs(Date.daysBetween(earliestStart, currentDate));
            width = lengthOfCourse;

            if (lengthOfCourse > 7 - betweenDays) // task chiếm hết tuần (kể từ ngày start)
                width = 7 - betweenDays;
            
            let part1 = '', part2 = '';
            if (betweenDays > 1)
                part1 = `<div class="chart__content__col chart__content__col--w${betweenDays}"></div>`;
            else part1 = `<div class="chart__content__col"></div>`;

            if (width > 1)
                part2 = `<div class="chart__content__col chart__content__col--w${width} chart__content__col--${subject.color}">
                    <div class="chart__content__title">
                        ${courseName}
                    </div>
                    <div class="chart__content__tasks">
                        <div class="chart__content__tasks__title">Tasks</div>
                        ${count}
                    </div>
                </div>`
            else part2 = `<div class="chart__content__col chart__content__col--${subject.color}">
                <div class="chart__content__title">
                    ${courseName}
                </div>
                <div class="chart__content__tasks">
                    <div class="chart__content__tasks__title">Tasks</div>
                    ${count}
                </div>
            </div>`

            return `<div class="chart__content__row">
                ${part1}
                ${part2}
            </div>`;
        }
    }

    function innerMultipleTasks(listOfSubjects, dateToInner = new Date()) {
        let element, htmlElement;
        listOfSubjects.forEach(subject => {
            element = createTasks(subject, dateToInner)
    
            if (element.length != 0) {
                htmlElement = htmlToElement(element);
                chart__content.appendChild(htmlElement);
            }
        });
        return true;
    }
});