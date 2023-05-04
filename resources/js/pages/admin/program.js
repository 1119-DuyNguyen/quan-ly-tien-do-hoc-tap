import { Validator } from '../../components/helper/Validator';
import { alertComponent } from '../../components/helper/alert-component';
import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';

export class Program {
    static URL_Program = location.protocol + '//' + location.host + '/api/admin/program';
    static index() {
        // let smartTable = new SmartTableTemplate();
        //helper function

        let rootElement = document.getElementById('main-content');
        let programContainer = document.createElement('div');
        programContainer.classList.add('program-container');
        rootElement.appendChild(programContainer);
        let tableTem = new SmartTableTemplate(programContainer, {
            khoa: {
                textDefault: 'Chọn khoa',
                urlOptionList: 'Chọn chu kỳ',
            },
            chu_ky: {},
        });

        tableTem.fetchDataTable(Program.URL_Program, {
            formatAttributeHeader: {
                id: {
                    width: '40px',
                    sort: true,
                },
                ten: {
                    title: 'Tên',
                    minWidth: '300px',
                    sort: true,
                },
                tong_tin_chi: {
                    title: 'Tổng tín chỉ',
                    minWidth: '50px',
                    oneLine: true,
                },
                thoi_gian_dao_tao: {
                    title: 'Thời gian đào tạo',
                    oneLine: true,
                },
                trinh_do_dao_tao: {
                    title: 'Trình độ đào tạo',
                    oneLine: true,
                },
                ten_nganh: {
                    title: 'Tên ngành',
                    oneLine: true,
                },
                ten_chu_ky: {
                    title: 'Tên chu kỳ',
                    oneLine: true,
                },

                created_at: {
                    title: 'Ngày khởi tạo',
                    type: 'date',
                    oneLine: true,
                },
                updated_at: {
                    title: 'Ngày cập nhập',
                    type: 'date',
                    oneLine: true,
                },
            },
            pagination: true,
            edit: true,
        });
        // let tableTem = new SmartTableTemplate(tableTest, response.pokedata, {
        //     formatAttributeHeader: {
        //         name: 'Tên',
        //     },
        //     pagination: true,
        //     edit: true,
        // });
    }
    static edit() {
        try {
            let rootElement = document.getElementById('main-content');

            let formValid = new Validator('#role-form');
            formValid.onSubmit = (data) => {
                console.log(data);
            };
        } catch (err) {
            console.log(err);
            alertComponent('Đã xảy ra lỗi khi khởi tạo biểu mẫu', 'Hãy thử làm mới trang');
        }
    }
    // static show({ id }) {
    //     console.log(id);
    // }
}
