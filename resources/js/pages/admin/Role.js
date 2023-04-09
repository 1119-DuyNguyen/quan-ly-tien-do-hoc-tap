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
                id: {},
                ten: {
                    title: 'Tên',
                    minWidth: '140px',
                },
                ghi_chu: {
                    title: 'Ghi chú',
                    minWidth: '200px',
                },
                created_at: {
                    title: 'Ngày khởi tạo',
                    type: 'date',
                    minWidth: '172px',
                },
                updated_at: {
                    title: 'Ngày cập nhập',
                    minWidth: '172px',
                    type: 'date',
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
