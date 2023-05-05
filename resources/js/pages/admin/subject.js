import { Validator } from '../../components/helper/Validator';
import { alertComponent } from '../../components/helper/alert-component';
import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';

export class Subject {
    static URL_Subject = location.protocol + '//' + location.host + '/api/admin/subject';
    static index() {
        // let smartTable = new SmartTableTemplate();
        //helper function

        let rootElement = document.getElementById('main-content');
        let subjectContainer = document.createElement('div');
        subjectContainer.classList.add('role-container');
        rootElement.appendChild(subjectContainer);
        let tableTem = new SmartTableTemplate(subjectContainer);

        tableTem.fetchDataTable(Subject.URL_Subject, {
            formatAttributeHeader: {
                id: {
                    width: '40px',
                    sort: true,
                },
                ten: {
                    title: 'Tên',
                    minWidth: '140px',
                    oneLine: true,
                    sort: true,
                },
                co_tinh_tich_luy: {
                    title: 'Có tính tích lũy',
                    minWidth: '140px',
                    oneLine: true,
                },
                phan_tram_giua_ki: {
                    title: 'Phần trăm giữa kỳ',
                    width: '200px',
                    ellipsis: true,
                },
                phan_tram_cuoi_ki: {
                    title: 'Phần trăm cuối kỳ',
                    width: '200px',
                    ellipsis: true,
                },
                created_at: {
                    title: 'Ngày khởi tạo',
                    type: 'date',
                    ellipsis: true,
                },
                updated_at: {
                    title: 'Ngày cập nhập',
                    type: 'date',
                    ellipsis: true,
                },
            },
            pagination: true,
            edit: true,
            add: true,
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
