import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';
import { Validator } from '../../components/helper/Validator';
import { alertComponent } from '../../components/helper/alert-component';
import { ConfirmComponent } from '../../components/helper/confirm-component';
import { ModalComponent } from '../../components/helper/modal-component';
import { toast } from '../../components/helper/toast';

export class User {
    static URL_USER = location.protocol + '//' + location.host + '/api/admin/user';

    static getAddFormElement(textSubmit = '', tableTem, idProgram) {
        // "id" => $this->id,
        // "ten" => $this->ten,
        // "tai_khoan" => $this->ten_dang_nhap,
        // "email" => $this->email,
        // "sdt" => $this->sdt,
        // "gioi_tinh" => $this->gioi_tinh ? "Nam" : "Nữ",
        // "ngay_sinh" => $this->ngay_sinh,
        // "khoa" => $this->ten_khoa,
        // "quyen" => $this->ten_quyen,
        // "updated_at" => $this->updated_at,
        // "created_at" => $this->created_at,

        let formContainer = document.createElement('form');
        formContainer.classList.add('form');
        formContainer.innerHTML = `
        <div class="grid-container-half">
        <div class="grid-item form-group">
            <label for=""> Tên</label>
            <input rules='required' type="text" name='ten' class="input" />
        </div>
        <div class="grid-item form-group">
            <label for=""> Tên đăng nhập</label>
            <input name='ten_dang_nhap'  type="text" class="input"rules='required' value="" />
        </div>
        <div class="grid-item form-group">
            <label for=""> email</label>
            <input name='email'  type="email" class="input"rules='required' value="" />
        </div>
            <div class="grid-item form-group">
            <label for=""> Số điện thoại</label>
            <input name='sdt'  type="text" class="input"rules='required' value="" />
        </div>
        <div class="grid-item form-group">
        <label for=""> Ngày sinh</label>
        <input name='ngay_sinh'  type="date" class="input"rules='required' value="" />
    </div>

        <!-- select -->
        <div class="grid-item form-group">
            <label>Khoa</label>

            <select name="khoa_id" rules='required'>
        
            </select>
            

        </div>
        <div class="grid-item form-group">
        <label>Vai trò</label>

        <select name="role_id" rules='required'>

        </select>
        

    </div>
    <input type="hidden" name="chuong_trinh_dao_tao_id" value="${idProgram}"/>
       
    </div>
    <button class="form-submit">${textSubmit}</button>
        `;
        // let selectContainer = tableTem.renderSelectList(tableTem.getDataSelectList);
        // if (selectContainer) {
        //     let selectList = selectContainer.querySelectorAll('select') ?? [];
        //     selectList.forEach((select) => {
        //         let selectForm = formContainer.querySelector(`select[name="${select.getAttribute('name')}"`);
        //         if (selectForm) {
        //             selectForm.innerHTML = select.innerHTML;
        //         }
        //     });
        // }
        let handleValidator = new Validator(formContainer);
        handleValidator.onSubmit = function (data) {
            //  console.log(data);
            axios
                .post(ChildProgram.URL_Program, data)
                .then((res) => tableTem.reRenderTable())
                .catch((err) => {
                    console.log(err.response);
                    if (err?.response?.data?.message) {
                        alertComponent('Có lỗi khi gửi yêu cầu lên máy chủ', err.response.data.message);
                    }
                });
        };

        return formContainer;
    }
    static getEditFormElement(textSubmit = '', tableTem, rowId, idProgram) {
        let formContainer = document.createElement('form');

        axios
            .get(User.URL_Program + '/' + rowId)
            .then((res) => res.data.data)
            .then((data) => {
                formContainer.classList.add('form');

                formContainer.innerHTML = `
                <div class="grid-container-half">
                <div class="grid-item form-group">
                    <label for="">Tên</label>
                    <input rules='required' type="text" name='ten' class="input" 
                    value="${data.ten}"
                    />
                </div>
                <div class="grid-item form-group">
                    <label for=""> Tổng tín chỉ tự chọn</label>
                    <input name='tong_tin_chi'  type="text" class="input"rules='required|number' value="${data.tong_tin_chi_ktt_tu_chon}" />
                </div>
        
                <!-- select -->
                <div class="grid-item form-group">
                    <label>Loại kiến thức</label>
        
                    <select name="loai_kien_thuc_id" rules='required'>
        
                    </select>
                </div>
                 <input type="hidden" name="chuong_trinh_dao_tao_id" value="${idProgram}"/>

            </div>
            <button class="form-submit">${textSubmit}</button>
                `;
                let selectContainer = tableTem.renderSelectList(tableTem.getDataSelectList);

                if (selectContainer) {
                    let selectList = selectContainer.querySelectorAll('select') ?? [];
                    selectList.forEach((select) => {
                        let selectForm = formContainer.querySelector(`select[name="${select.getAttribute('name')}"`);
                        if (selectForm) {
                            selectForm.innerHTML = select.innerHTML;
                        }
                    });

                    formContainer.querySelectorAll(`select[name="loai_kien_thuc_id"] option`).forEach((option) => {
                        if (option.value == data.loai_kien_thuc_id) {
                            option.selected = true;
                        } else option.selected = false;
                    });
                }
            })
            .catch((e) => {
                formContainer.innerHTML = `Có lỗi khi lấy dữ liệu từ máy chủ`;
            });
        let handleValidator = new Validator(formContainer);
        handleValidator.onSubmit = function (data) {
            //  console.log(data);
            axios
                .put(ChildProgram.URL_Program + '/' + rowId, data)
                .then((res) => tableTem.reRenderTable())
                .catch((err) => {
                    console.log(err.response);
                    if (err?.response?.data?.message) {
                        alertComponent('Có lỗi khi gửi yêu cầu lên máy chủ', err.response.data.message);
                    }
                });
        };
        return formContainer;
    }
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
                    title: 'Tài khoản',
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
                email: {
                    title: 'Email',
                    oneLine: true,
                },
            },
            pagination: true,
            add: (e) => {
                new ModalComponent(User.getAddFormElement('Thêm ', tableTem));
            },
            edit: (e) => {
                let rowId = e.target.closest('tr')?.querySelector('[data-attr="id"]')?.getAttribute('data-content');
                if (rowId) new ModalComponent(User.getEditFormElement('Cập nhập', tableTem, rowId));
            },
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
