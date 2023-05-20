import { Validator } from '../../components/helper/validator';
import { toast } from '../../components/helper/toast';
import { alertComponent } from '../../components/helper/alert-component';
import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';
export class UserPermissions {
    static URL = location.protocol + '//' + location.host + '/api/admin/user-permissions';
    static URL_ROLE = location.protocol + '//' + location.host + '/api/admin/role';
    static index() {
        // let smartTable = new SmartTableTemplate();
        //helper function

        let rootElement = document.getElementById('main-content');
        let roleContainer = document.createElement('div');
        roleContainer.classList.add('role-container');
        rootElement.appendChild(roleContainer);
        let tableTem = new SmartTableTemplate(roleContainer);

        tableTem.fetchDataTable(UserPermissions.URL_ROLE, {
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

    static edit({id}) {
        try {
            let rootElement = document.getElementById('main-content');
            let formContainer = document.querySelector('#role-form');

            let ds_chuc_nang = formContainer.querySelector('#ds_chuc_nang');

            axios.get(UserPermissions.URL + '/' + id).then(response => {
                const data = response.data.data;

                if (data === null) return;

                document.querySelector('[name=ten]').value = data.tt_quyen.ten;
                document.querySelector('[name=ghi_chu]').innerHTML = data.tt_quyen.ghi_chu;

                console.log(data.cn_quyen);

                data.ds_chuc_nang.forEach(chuc_nang => {
                    const check_box = document.createElement('input');
                    const label = document.createElement('label');
                    check_box.type = 'checkbox';
                    check_box.id = 'chuc_nang' + chuc_nang.id;
                    check_box.name = 'chuc_nang[]';
                    check_box.value = chuc_nang.id;

                    data.cn_quyen.forEach(cn => {
                        if (check_box.value == cn.chuc_nang_id) {
                            check_box.checked = true;
                            return;
                        }
                    })

                    label.setAttribute('for', check_box.id);
                    label.innerHTML = chuc_nang.ten + " ";
                    const container = document.createElement('div');
                    container.appendChild(label)
                    container.appendChild(check_box)

                    ds_chuc_nang.appendChild(container)
                });
            })

            let formValid = new Validator(formContainer);
            formValid.onSubmit = (data) => {
                axios.put(UserPermissions.URL + '/' + id, data).then(response => {
                    const data = response.data.data;
                    if (response.status == 200) {
                        toast({
                            title: 'Thành công',
                            message: data,
                            type: 'success'
                        })
                    } else {
                        toast({
                            title: 'Lỗi',
                            message: data,
                            type: 'error'
                        })
                    }
                }).catch(
                    error => {
                        console.error(error);
                    }
                )
            };
        } catch (err) {
            console.log(err);
            alertComponent('Đã xảy ra lỗi khi khởi tạo biểu mẫu', 'Hãy thử làm mới trang');
        }
    }
}