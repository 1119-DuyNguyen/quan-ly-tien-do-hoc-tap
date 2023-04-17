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
                },
                ten: {
                    title: 'Tên',
                    minWidth: '140px',
                    ellipsis: true,
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
