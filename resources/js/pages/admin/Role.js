import { Validator } from '../../components/helper/validator';
import { alertComponent } from '../../components/helper/alert-component';
import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';

export class Role {
    static URL_ROLE = location.protocol + '//' + location.host + '/api/admin/role';
    static index() {
        // let smartTable = new SmartTableTemplate();
        //helper function

        let rootElement = document.getElementById('main-content');
        let roleContainer = document.createElement('div');
        roleContainer.classList.add('role-container');
        rootElement.appendChild(roleContainer);
        let tableTem = new SmartTableTemplate(roleContainer);

        tableTem.fetchDataTable(Role.URL_ROLE, {
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
                ten_slug: {
                    title: 'Slug',
                    minWidth: '140px',
                    oneLine: true,
                },
                ghi_chu: {
                    title: 'Ghi chú',
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
            edit: false,
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
            let formContainer = document.querySelector('#role-form');
            let formValid = new Validator(formContainer);
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
