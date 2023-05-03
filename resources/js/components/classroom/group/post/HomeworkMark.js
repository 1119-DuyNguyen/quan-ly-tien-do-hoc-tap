import { SmartTableTemplate } from '../../../smart-table-template/SmartTableTemplate';

export class HomeworkMark {
    static URL_ROLE = location.protocol + '//' + location.host + '/api/bai-tap-sinh-vien';
    static URL_THAMGIA = location.protocol + '//' + location.host + '/api/tham-gia-nhom-hoc';
    static URL_CHAMDIEM = location.protocol + '//' + location.host + '/api/cham-diem';

    static index() {
        let rootElement = document.getElementById('main-content');
        let homeworkMarkContainer = document.createElement('div');
        homeworkMarkContainer.classList.add('homework-mark-container');
        rootElement.appendChild(homeworkMarkContainer);
        let tableTem = new SmartTableTemplate(homeworkMarkContainer);

        
    }

    static show({ id }) {
        console.log(id);

        axios.get(HomeworkMark.URL_THAMGIA+"/"+id).then((response) => {
            let data = response.data.data;

            let dssv = data.dssv_tham_gia;
            let dsbt = data.dsbt;
            let list = ``;
            
            let table = document.querySelector(".homework__container table");

            for (let i = 0; i < dssv.length; i++) {
                const sv = dssv[i];
                
                let found = dsbt.find(bt => {
                    return bt.sinh_vien_id == sv.sinh_vien_id;
                })

                if (found) {
                    list += `<tr>
                            <td>${i+1}</td>
                            <td>${sv.ten_sinh_vien}</td>
                            <td>${(found.link_file === null) ? 'Chưa nộp' : 'Link file ở đây'}</td>
                            <td><input class='homework__marks' type='text' data-svid='${sv.sinh_vien_id}' value="${found.diem}"></td>
                        </tr>`
                } else {
                    list += `<tr>
                            <td>${i+1}</td>
                            <td>${sv.ten_sinh_vien}</td>
                            <td>Chưa nộp</td>
                            <td><input class='homework__marks' type='text' data-svid='${sv.sinh_vien_id}'></td>
                        </tr>`
                }
            }

            
            let html = `<tbody>
                <tr>
                    <th>STT</th>
                    <th>Tên sinh viên</th>
                    <th>Bài tập đã nộp</th>
                    <th>Điểm</th>
                </tr>
                ${list}
            </tbody>`;

            table.innerHTML = html;
            
        }).catch((error) => {
            console.error(error);
        })


        document.querySelector('#homework__submit').addEventListener('click', function (e) {
            let homework__marks = document.querySelectorAll('.homework__marks');

            let object = {}, list_sv = [], check = true;
            for (let i = 0; i < homework__marks.length; i++) {
                const elem = homework__marks[i];
                const diem = parseFloat(elem.value);
                object = {}

                if (elem.value.length == 0)
                    continue;

                if (isNaN(diem)) {
                    alert("Điểm phải là số nguyên!");
                    elem.focus();
                    check = false;
                    break;
                }

                if (diem > 10 || diem < 0) {
                    alert("Điểm không hợp lệ!");
                    elem.focus();
                    check = false;
                    break;
                }
                
                object.sinh_vien_id = elem.dataset.svid;
                object.diem = diem;
                list_sv.push(object);
            }

            if (check) {

                axios.post(HomeworkMark.URL_CHAMDIEM, {
                    'bai_tap_id': id,
                    'noi_dung_cham': list_sv
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.error(err);
                })
            }
        })
    }
}
