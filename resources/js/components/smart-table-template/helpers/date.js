// export function formatDate(date) {
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     var strTime = hours + ':' + minutes + ' ' + ampm;
//     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '  ' + strTime;
// }
// // in ra: 24/2/2023 1:23 pm

export function formatDate(date, locale = 'vi-VN') {
    return Intl.DateTimeFormat(locale, {
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        year: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh',
    }).format(date); // Thứ Tư, 1 tháng 9, 2021
}
