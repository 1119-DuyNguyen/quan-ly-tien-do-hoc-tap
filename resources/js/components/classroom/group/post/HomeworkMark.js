export class HomeworkMark {
    static URL_ROLE = location.protocol + '//' + location.host + '/api/bai-tap-sinh-vien';
    static URL_THAMGIA = location.protocol + '//' + location.host + '/api/tham-gia-nhom-hoc';
    static URL_CHAMDIEM = location.protocol + '//' + location.host + '/api/cham-diem';

    static show({ id }) {
        axios
            .get(HomeworkMark.URL_CHAMDIEM + '/' + id)
            .then((response) => {
                let data = response.data.data;
                console.log(data);

                let list = ``;

                let table = document.querySelector('.homework__container table');

                data.forEach((element, i) => {
                    list += `
                            <td>${i + 1}</td>
                            <td>${element.ten_sinh_vien}</td> 
                            <td><a href="${element.link_file === null ? '' : element.link_file}">${
                        element.link_file === null ? 'Không tìm thấy link file' : 'Link file ở đây'
                    }</a></td>
                            <td>${element.ngay_nop}</td>
                        `;

                    let trangThai = element.han_nop >= element.ngay_nop ? 1 : 0;
                    if (trangThai >= 1) {
                        list += `<td>Đúng hạn</td>`;
                    } else {
                        list += `<td>Nộp trễ</td>`;
                    }

                    list += `
                    <td><input class='homework__marks' type='text' data-svid='${element.sinh_vien_id}' value="${element.diem}"></td></tr>`;
                });

                let html = `<tbody>
                <tr>
                    <th>STT</th>
                    <th>Tên sinh viên</th>
                    <th>Bài tập đã nộp</th>
                    <th>Ngày nộp</th>
                    <th>Trạng thái</th>
                    <th>Điểm</th>
                </tr>
                ${list}
            </tbody>`;

                table.innerHTML = html;
            })
            .catch((error) => {
                console.error(error);
            });

        document.querySelector('#homework__submit').addEventListener('click', function (e) {
            let homework__marks = document.querySelectorAll('.homework__marks');

            let object = {},
                list_sv = [],
                check = true;
            for (let i = 0; i < homework__marks.length; i++) {
                const elem = homework__marks[i];
                const diem = parseFloat(elem.value);
                object = {};

                if (elem.value.length == 0) continue;

                if (isNaN(diem)) {
                    alert('Điểm phải là số nguyên!');
                    elem.focus();
                    check = false;
                    break;
                }

                if (diem > 10 || diem < 0) {
                    alert('Điểm không hợp lệ!');
                    elem.focus();
                    check = false;
                    break;
                }

                object.sinh_vien_id = elem.dataset.svid;
                object.diem = diem;
                list_sv.push(object);
            }

            if (check) {
                axios
                    .post(HomeworkMark.URL_CHAMDIEM, {
                        bai_tap_id: id,
                        noi_dung_cham: list_sv,
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    }
}
