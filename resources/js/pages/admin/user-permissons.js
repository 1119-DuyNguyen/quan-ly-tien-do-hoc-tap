import { Validator } from '../../components/helper/validator';
import { toast } from '../../components/helper/toast';
export class UserPermissions {
    static URL = location.protocol + '//' + location.host + '/api/admin/user-permissions';
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