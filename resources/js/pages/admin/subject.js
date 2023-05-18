import { Validator } from '../../components/helper/validator';
import { alertComponent } from '../../components/helper/alert-component';
import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';
import { ConfirmComponent } from '../../components/helper/confirm-component';
import { ModalComponent } from '../../components/helper/modal-component';
import { toast } from '../../components/helper/toast';

export class Subject {
    static URL_SUBJECT = location.protocol + '//' + location.host + '/api/admin/subject';

    static getAddFormElement(textSubmit = '', tableTem) {
        let formContainer = document.createElement('form');
        formContainer.classList.add('form');
        formContainer.innerHTML = `
        <div class="grid-container-half">
        <div class="grid-item form-group">
            <label for=""> Tên</label>
            <input rules='required' type="text" name='ten' class="input" />
        </div>
        <div class="grid-item form-group">
        <label for=""> Mã học phần</label>
        <input rules='required|number' type="text" name='ma_hoc_phan' class="input" />
        </div>
        <div class="grid-item form-group">
            <label for="">Số tín chỉ</label>
            <input name='so_tin_chi'  type="text" class="input"rules='required|number' value="" />
        </div>
        <div class="grid-item form-group">
            <label for=""> Phần trăm giữa kỳ</label>
            <input name='phan_tram_giua_ki'  type="text" class="input"rules='required|number' value="" />
        </div>
            <div class="grid-item form-group">
            <label for=""> Phần trăm cuối kỳ</label>
            <input name='phan_tram_cuoi_ki'  type="text" class="input"rules='required|number' value="" />
        </div>

        <!-- select -->
        <div class="grid-item form-group">
            <label>Học phần tương đương</label>

            <select name="hoc_phan_tuong_duong_id" rules='required'>

            </select>
        </div>



    </div>


    </div>
    <div class="form-group" style='text-align:left;'>
    <input name='co_tinh_tich_luy'  type="checkbox" class="input"rules='required' value="1" />
    <label for="">Có tính tích lũy</label>
    </div>
    <button class="form-submit">${textSubmit}</button>
        `;

        let selectHP = formContainer.querySelector('select[name="hoc_phan_tuong_duong_id"]');
        axios
            .get(Subject.URL_SUBJECT + '/all')
            .then((res) => {
                return res.data.data;
            })
            .then((data) => {
                let html = '';
                data.forEach((hp) => {
                    html += `<option value="${hp.id}">${hp.ten}</option>`;
                });
                selectHP.innerHTML = html;
            })
            .catch((err) => console.log(err));
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
                .post(Subject.URL_SUBJECT, data)
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
    static getEditFormElement(textSubmit = '', tableTem, rowId) {
        let formContainer = document.createElement('form');
        formContainer.classList.add('form');

        axios
            .get(Subject.URL_SUBJECT + '/' + rowId)
            .then((res) => res.data.data)
            .then((data) => {
                formContainer.innerHTML = `
            <div class="grid-container-half">
            <div class="grid-item form-group">
                <label for=""> Tên</label>
                <input rules='required' type="text" name='ten' class="input" value="${data.ten}" />
            </div>
            <div class="grid-item form-group">
            <label for=""> Mã học phần</label>
            <input  value="${data.ma_hoc_phan}"rules='required|number' type="text" name='ma_hoc_phan' class="input" />
            </div>
            <div class="grid-item form-group">
                <label for="">Số tín chỉ</label>
                <input name='so_tin_chi' value="${data.so_tin_chi}"  type="text" class="input"rules='required|number' value="" />
            </div>
            <div class="grid-item form-group">
                <label for=""> Phần trăm giữa kỳ</label>
                <input value="${data.phan_tram_giua_ki}" name='phan_tram_giua_ki'  type="text" class="input"rules='required|number' value="" />
            </div>
                <div class="grid-item form-group">
                <label for=""> Phần trăm cuối kỳ</label>
                <input value="${data.phan_tram_cuoi_ki}" name='phan_tram_cuoi_ki'  type="text" class="input"rules='required|number' value="" />
            </div>

            <!-- select -->
            <div class="grid-item form-group">
                <label>Học phần tương đương</label>

                <select name="hoc_phan_tuong_duong_id" rules='required'>

                </select>
            </div>



        </div>


        </div>
        <div class="form-group" style='text-align:left;'>
        <input name='co_tinh_tich_luy'  type="checkbox" class="input"rules='required' value="1" />
        <label for="">Có tính tích lũy</label>
        </div>
        <button class="form-submit">${textSubmit}</button>
            `;
                let selectHP = formContainer.querySelector('select[name="hoc_phan_tuong_duong_id"]');
                axios
                    .get(Subject.URL_SUBJECT + '/all')
                    .then((res) => {
                        return res.data.data;
                    })
                    .then((data) => {
                        let html = '';
                        html += `<option value="" >Tất cả</option>`;

                        data.forEach((hp) => {
                            if (data.ma_hoc_phan_tuong_duong_id == hp.ma_hoc_phan_tuong_duong_id) {
                                html += `<option value="${hp.id}" selected>${hp.ten}</option>`;
                            }
                            html += `<option value="${hp.id}">${hp.ten}</option>`;
                        });
                        selectHP.innerHTML = html;
                    })
                    .catch((err) => console.log(err));
            })
            .catch((e) => {
                formContainer.innerHTML = 'Lấy dữ liệu học phần thất bại';
            });

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
            console.log(data);
            axios
                .put(Subject.URL_SUBJECT + '/' + rowId, data)
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
        let subjectContainer = document.createElement('div');
        subjectContainer.classList.add('role-container');
        rootElement.appendChild(subjectContainer);
        let tableTem = new SmartTableTemplate(subjectContainer);

        tableTem.fetchDataTable(Subject.URL_SUBJECT, {
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
            add: (e) => {
                new ModalComponent(Subject.getAddFormElement('Thêm ', tableTem));
            },
            edit: (e) => {
                let rowId = e.target.closest('tr')?.querySelector('[data-attr="id"]')?.getAttribute('data-content');
                if (rowId) new ModalComponent(Subject.getEditFormElement('Cập nhập', tableTem, rowId));
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
