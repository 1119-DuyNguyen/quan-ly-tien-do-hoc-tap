export class MarksTable {
    static URL_BANG_DIEM = location.protocol + '//' + location.host + '/api/bang-diem';

    static async show({ id }) {
        let rootElement = document.getElementById('main-content');

        let html = '';
        var transformedData = [];
        var data = {};

        await axios.get(MarksTable.URL_BANG_DIEM + `/${id}`).then(function (response) {
            //console.log(response.data.data);
            response.data.data.forEach((element) => {
                if (!data[element.id]) {
                    data[element.id] = { id: element.id, ten: element.ten, nhom: element.nhom, bai_tap: [] };
                    transformedData.push(data[element.id]);
                }
                data[element.id].bai_tap.push(element.bai_tap);

                var dataId = element.id;
            });
        });

        console.log(data);

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
            <button>Bài tập ${i}</button>
                    </th>`;
        }

        html += `
        <th><button>Thời gian đào tạo</button></th>
        <th><button>Tên ngành</button></th>
        <th><button>Tên chu kỳ</button></th>
        <th><button>Ngày khởi tạo</button></th>
        <th><button>Ngày cập nhập</button></th>
    </tr>
        </thead>
        <tbody class="table-content">
    <tr>
        <td data-attr="id" data-content="1" data-title="id"><div>1</div></td>
        <td data-attr="ten" data-content="Chương trình đào tạo ngành Công nghệ thông tin" data-title="Tên"><div>
            Chương trình đào tạo ngành Công nghệ thông tin</div></td>
    </tr>
    </tbody></table>`;

        rootElement.innerHTML = html;
    }
}
