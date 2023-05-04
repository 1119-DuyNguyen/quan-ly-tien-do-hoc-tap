import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';

export class User {
    static URL_USER = location.protocol + '//' + location.host + '/api/admin/user';
    static index() {
        // let smartTable = new SmartTableTemplate();
        //helper function

        let rootElement = document.getElementById('main-content');
        let roleContainer = document.createElement('div');
        roleContainer.classList.add('role-container');
        rootElement.appendChild(roleContainer);
        let tableTem = new SmartTableTemplate(roleContainer);

        tableTem.fetchDataTable(User.URL_USER, {
            formatAttributeHeader: {
                id: {
                    width: '40px',
                    sort: true,
                },
                ten: {
                    title: 'Tên',
                    minWidth: '140px',
                    ellipsis: true,
                    sort: true,
                },
                tai_khoan: {
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
                sdt: {
                    title: 'Số điện thoại',
                },
                ngay_sinh: {
                    title: 'Ngày sinh',
                    type: 'date',
                },
                gioi_tinh: {
                    title: 'Giới tính',
                    oneLine: true,
                },
                khoa: {
                    title: 'Khoa',
                    minWidth: '140px',
                },
                quyen: {
                    title: 'Quyền',
                    minWidth: '200px',
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
    // static show({ id }) {
    //     console.log(id);
    // }
}
