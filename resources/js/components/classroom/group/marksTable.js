export class MarksTable {
    static URL_BANG_DIEM = location.protocol + '//' + location.host + '/api/bang-diem';

    static async show({ id }) {
        let rootElement = document.getElementById('main-content');
        rootElement.innerHTML = `<loader-component></loader-component>`;

        let html = '';
        var dsnb;
        var transformedData = [];
        var data = {};
        var finalData = [];
        var dataId;

        await axios.get(MarksTable.URL_BANG_DIEM + `/${id}`).then(function (response) {
            //console.log(response.data.data);
            response.data.data.dssv.forEach((element) => {
                if (!data[element.id]) {
                    data[element.id] = { id: element.id, ten: element.ten, nhom: element.nhom, bai_tap: [] };
                    transformedData.push(data[element.id]);
                }
                data[element.id].bai_tap.push(element.bai_id);

                dataId = element.id;
            });

            dsnb = response.data.data.dsnb;
        });

        finalData = Object.entries(data).map(([name, obj]) => ({ name, ...obj }));

        console.log(dsnb);

        html += `<div class="program-container">
                    <div class="smart-table-template">
                        <div class="container-table">
                            <table class="table">
                                <colgroup>
                                <col>   
                                <col style="width: 40px;">
                                <col style="min-width: 300px;">
                                <col style="min-width: 50px;">
                                <col>
                                <col>
                                <col>
                                <col>
                                <col>
                                </colgroup>
                                <thead class="table-header">
                                    <tr>
                                        <th class="btns-action">STT</th>
                                        <th class="sort"><button data-key="id">MSSV</button></th>
                                        <th class="sort"><button data-key="ten">Tên SV</button></th>`;
        for (let i = 0; i < data[`${dataId}`].bai_tap.length; i++) {
            html += `<th>
            <button>Bài tập ${i + 1}</button>
                    </th>`;
        }

        html += `
        <th><button>Điểm trung bình</button></th>
    </tr>
        </thead>
        <tbody class="table-content">`;

        finalData.forEach((element, index) => {
            let diem = [];
            let diemTB = 0;
            html += `<tr>
            <td data-attr="stt" data-content="${index + 1}" data-title="STT"><div>${index + 1}</div></td>
            <td data-attr="id" data-content="${element.id}" data-title="MSSV"><div>${element.id}</div></td>
            <td data-attr="tensv" data-content="${element.ten}" data-title="Tên SV"><div>${element.ten}</div></td>`;

            element.bai_tap.forEach((btElement, index) => {
                let done = false;
                let nbData;
                dsnb.forEach((nbElement) => {
                    if (nbElement.sinh_vien_id == element.id && nbElement.bai_tap_id == btElement) {
                        done = true;
                        nbData = nbElement;
                    }
                });

                if (done) {
                    html += `<td data-attr="bt${index + 1}" data-content="${nbData.diem}" data-title="Bài tập ${
                        index + 1
                    }"><div>${nbData.diem}</div></td>`;
                    diem.push(nbData.diem);
                } else {
                    html += `<td data-attr="bt${index + 1}" data-content="0" data-title="Bài tập ${
                        index + 1
                    }"><div>Chưa nộp</div></td>`;
                    diem.push(0);
                }
            });

            diem.forEach((diemItem) => {
                diemTB += diemItem;
            });

            diemTB = diemTB / diem.length;

            html += `<td data-attr="dtb" data-content="${diemTB}" data-title="Điểm trung bình"><div>${diemTB}</div></td>`;

            html += `</tr>`;
        });

        html += `</tbody></table>`;

        rootElement.innerHTML = html;

        const chamDiemQuayVeBtn = document.getElementById('cham-diem-quay-ve-btn');
        chamDiemQuayVeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            history.back();
        });
    }
}
