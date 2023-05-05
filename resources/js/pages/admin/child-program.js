import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';
import { Validator } from '../../components/helper/Validator';
import { alertComponent } from '../../components/helper/alert-component';
import { ConfirmComponent } from '../../components/helper/confirm-component';
import { ModalComponent } from '../../components/helper/modal-component';
import { toast } from '../../components/helper/toast';

export class ChildProgram {
    static URL_Program = location.protocol + '//' + location.host + '/api/admin/child-program';
    static export() {}
    static edit() {}
    static getAddFormElement(textSubmit = '', tableTem, idProgram) {
        let formContainer = document.createElement('form');
        formContainer.classList.add('form');
        formContainer.innerHTML = `
        <div class="grid-container-half">
        <div class="grid-item form-group">
            <label for=""> Tên</label>
            <input rules='required' type="text" name='ten' class="input" />
        </div>
        <div class="grid-item form-group">
            <label for=""> Tổng tín chỉ tự chọn</label>
            <input name='tong_tin_chi_ktt_tu_chon'  type="text" class="input"rules='required|number' value="" />
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
        }
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
            .get(ChildProgram.URL_Program + '/' + rowId)
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
    static index(idProgram) {
        // let smartTable = new SmartTableTemplate();
        //helper function

        let rootElement = document.getElementById('main-content');

        let childProgramContainer = document.createElement('div');
        childProgramContainer.classList.add('child-program-container');
        rootElement.appendChild(childProgramContainer);
        let tableTem = new SmartTableTemplate(childProgramContainer);

        tableTem.fetchDataTable(ChildProgram.URL_Program, {
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
                tong_tin_chi_ktt_tu_chon: {
                    title: 'Tổng tín chỉ tự chọn',
                    minWidth: '50px',
                    oneLine: true,
                },
                tong_tin_chi_ktt_bat_buoc: {
                    title: 'Tổng tín chỉ bắt buộc',
                    minWidth: '50px',

                    oneLine: true,
                },
                tong_tin_chi: {
                    title: 'Tổng tín chỉ',
                    minWidth: '50px',

                    oneLine: true,
                },
                ten_lkt: {
                    title: 'Loại khối kiến thức',
                    oneLine: true,
                },
                ten_ctdt: {
                    title: 'Tên chương trình đào tạo',
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
            add: (e) => {
                new ModalComponent(ChildProgram.getAddFormElement('Thêm ', tableTem, idProgram));
            },
            edit: (e) => {
                let rowId = e.target.closest('tr')?.querySelector('[data-attr="id"]')?.getAttribute('data-content');
                if (rowId) new ModalComponent(ChildProgram.getEditFormElement('Cập nhập', tableTem, rowId, idProgram));
            },
            view: true,
        });
        // let tableTem = new SmartTableTemplate(tableTest, response.pokedata, {
        //     formatAttributeHeader: {
        //         name: 'Tên',
        //     },
        //     pagination: true,
        //     edit: true,
        // });
    }
    static view({ id }) {
        try {
            if (id) {
                let rootElement = document.getElementById('main-content');

                let formValid = new Validator('#role-form');
                formValid.onSubmit = (data) => {
                    console.log(data);
                };
            } else {
            }
        } catch (err) {
            console.log(err);
            alertComponent('Đã xảy ra lỗi khi khởi tạo biểu mẫu', 'Hãy thử làm mới trang');
        }
    }
    // static show({ id }) {
    //     console.log(id);
    // }
}
