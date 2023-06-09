import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';
import { alertComponent } from '../../components/helper/alert-component';
import { ConfirmComponent } from '../../components/helper/confirm-component';
import { ModalComponent } from '../../components/helper/modal-component';
import { toast } from '../../components/helper/toast';
import { TreeTable } from '../../components/helper/tree-table';
import { Program } from './program';
import { Validator } from '../../components/helper/validator';
export class ChildProgram {
    static URL_Program = location.protocol + '//' + location.host + '/api/admin/program';
    static URL_LKT = location.protocol + '//' + location.host + '/api/admin/loai-kien-thuc/all';
    static URL_MUCLUC = location.protocol + '//' + location.host + '/api/admin/muc-luc/all';

    static export() {}
    static edit() {}
    static getAddFormElement(textSubmit = '', callback, idProgram) {
        let formContainer = document.createElement('form');
        formContainer.classList.add('form');
        let errorMessage = [];
        let promiseListLKT = axios
            .get(ChildProgram.URL_LKT)
            .then((res) => res.data.data)
            .then((data) => {
                return data;
            })
            .catch((e) => {
                errorMessage.push('Có lỗi khi lấy danh sách loại kiến thức');
            });
        let promiseListMucLuc = axios
            .get(ChildProgram.URL_MUCLUC)
            .then((res) => res.data.data)
            .then((data) => {
                return data;
            })
            .catch((e) => {
                errorMessage.push('Có lỗi khi lấy danh sách mục lục');
            });
        Promise.all([promiseListLKT, promiseListMucLuc]).then(function (values) {
            if (errorMessage.length > 0) {
                errorMessage = errorMessage.join(' ,');
                formContainer.innerHTML = errorMessage.slice(0, errorMessage.length - 1);
                return;
            }
            let listLKT = values[0];
            let htmlLKT = '';
            listLKT.forEach(
                (lkt) =>
                    (htmlLKT += `
            <option value="${lkt.id}">
            ${lkt.ten}</option>`)
            );
            let listMucLuc = values[1];
            let htmlML = '';

            listMucLuc.forEach(
                (ml) =>
                    (htmlML += `
            <option value="${ml.id}">
            ${ml.ten}</option>`)
            );
            formContainer.innerHTML = `
            <div class="grid-container-half">
            <div class="grid-item form-group">
                <label for=""> Tên</label>
                <input rules='required' type="text" name='ten' class="input" />
            </div>
            <div class="grid-item form-group">
                <label for=""> Tổng tín chỉ tự chọn</label>
                <input name='tong_tin_chi_ktt_tu_chon'  type="text" class="input"rules='required|number|minNum:0' value="" />
            </div>

            <!-- select -->
            <div class="grid-item form-group">
                <label>Loại kiến thức</label>

                <select name="loai_kien_thuc_id" rules=''>
            <option value=""></option>

                ${htmlLKT}
                </select>


            </div>
            <div class="grid-item form-group">
            <label>Mục lục</label>

            <select name="muc_luc_id" rules='required'>
            <option value=""></option>
            ${htmlML}
            </select>


             </div>
        <input type="hidden" name="chuong_trinh_dao_tao_id" value="${idProgram}"/>

        </div>
        <div class="grid-item form-group" style="text-align: left;">
        <label for=""> Đại cương</label>
        <input name='dai_cuong'  type="checkbox" class="input" rules='required' value="0" />
        </div>
        <button class="form-submit">${textSubmit}</button>
            `;
            let selectElements = formContainer.querySelectorAll('select[name]');
            selectElements.forEach((el) => {
                new NiceSelect(el, { searchable: true, searchOrCreate: true });
            });
            let handleValidator = new Validator(formContainer);
            handleValidator.onSubmit = function (data) {
                //  console.log(data);
                axios
                    .post(ChildProgram.URL_Program + `/${idProgram}/knowledge-block`, data)
                    .then((res) => {
                        if (callback) callback();
                        console.log(callback);
                    })
                    .catch((err) => {
                        console.log(err.response);
                        if (err?.response?.data?.message) {
                            alertComponent('Có lỗi khi gửi yêu cầu lên máy chủ', err.response.data.message);
                        }
                    });
            };
        });

        return formContainer;
    }
    static getEditFormElement(textSubmit = '', callback, idProgram, rowId) {
        let formContainer = document.createElement('form');
        formContainer.classList.add('form');
        let errorMessage = [];

        axios
            .get(ChildProgram.URL_Program + '/' + idProgram + '/knowledge-block/' + rowId)
            .then((res) => res.data.data)
            .then((data) => {
                console.log(data);

                let promiseListLKT = axios
                    .get(ChildProgram.URL_LKT)
                    .then((res) => res.data.data)
                    .then((data) => {
                        return data;
                    })
                    .catch((e) => {
                        errorMessage.push('Có lỗi khi lấy danh sách loại kiến thức');
                    });
                let promiseListMucLuc = axios
                    .get(ChildProgram.URL_MUCLUC)
                    .then((res) => res.data.data)
                    .then((data) => {
                        return data;
                    })
                    .catch((e) => {
                        errorMessage.push('Có lỗi khi lấy danh sách mục lục');
                    });
                Promise.all([promiseListLKT, promiseListMucLuc]).then(function (values) {
                    if (errorMessage.length > 0) {
                        errorMessage = errorMessage.join(' ,');
                        formContainer.innerHTML = errorMessage.slice(0, errorMessage.length - 1);
                        return;
                    }
                    let listLKT = values[0];
                    let htmlLKT = '';
                    listLKT.forEach(
                        (lkt) =>
                            (htmlLKT += `
            <option value="${lkt.id}" ${data.loai_kien_thuc_id === lkt.id ? 'selected' : ''}>
            ${lkt.ten}</option>`)
                    );
                    let listMucLuc = values[1];
                    let htmlML = '';

                    listMucLuc.forEach(
                        (ml) =>
                            (htmlML += `
            <option value="${ml.id}"  ${data.muc_luc_id === ml.id ? 'selected' : ''}>
            ${ml.ten}

            </option>`)
                    );
                    formContainer.innerHTML = `
                    <div class="grid-container-half">
                    <div class="grid-item form-group">
                        <label for=""> Tên</label>
                        <input rules='required' value="${data.ten}" type="text" name='ten' class="input" />
                    </div>
                    <div class="grid-item form-group">
                        <label for=""> Tổng tín chỉ tự chọn</label>
                        <input name='tong_tin_chi_ktt_tu_chon' value="${data.tong_tin_chi_ktt_tu_chon}"  type="text" class="input"rules='required|number|minNum:0' value="" />
                    </div>

                    <!-- select -->
                    <div class="grid-item form-group">
                        <label>Loại kiến thức</label>

                        <select name="loai_kien_thuc_id" rules=''>
                    <option value=""></option>

                        ${htmlLKT}
                        </select>


                    </div>
                    <div class="grid-item form-group">
                    <label>Mục lục</label>

                    <select name="muc_luc_id" rules='required'>
                    <option value=""></option>
                    ${htmlML}
                    </select>


                     </div>
                <input type="hidden" name="chuong_trinh_dao_tao_id" value="${idProgram}"/>

                </div>
                <div class="grid-item form-group" style="text-align: left;">
                <label for=""> Đại cương</label>
                <input name='dai_cuong'  type="checkbox" class="input" rules='required' value="0" />
                </div>
                <button class="form-submit">${textSubmit}</button>
                    `;
                    let selectElements = formContainer.querySelectorAll('select[name]');
                    selectElements.forEach((el) => {
                        new NiceSelect(el, { searchable: true, searchOrCreate: true });
                    });
                    let handleValidator = new Validator(formContainer);
                    handleValidator.onSubmit = function (data) {
                        //  console.log(data);
                        axios
                            .put(ChildProgram.URL_Program + `/${idProgram}/knowledge-block/${rowId}`, data)
                            .then((res) => {
                                if (callback) callback();
                                console.log(callback);
                            })
                            .catch((err) => {
                                console.log(err.response);
                                if (err?.response?.data?.message) {
                                    alertComponent('Có lỗi khi gửi yêu cầu lên máy chủ', err.response.data.message);
                                }
                            });
                    };
                });
            });
        return formContainer;
    }

    static index(idProgram) {
        // let smartTable = new SmartTableTemplate();
        //helper function

        let rootElement = document.getElementById('main-content');

        let childProgramContainer = document.createElement('div');
        childProgramContainer.classList.add('child-program-container');
        rootElement.appendChild(childProgramContainer);
        childProgramContainer.innerHTML = `
        <div class="program-container" >

        <div class="program-container__item program-container__item--primary">
        <h4 style="text-align:center;">CHƯƠNG TRÌNH ĐÀO TẠO NGÀNH KỸ THUẬT PHẦN MỀM</h4>
        <p>Trình độ đào tạo: Đại học</p>

        <p>Ngành đào tạo: Công nghệ thông tin (cấp bằng Kỹ sư ngành Công nghệ thông tin)</p>
        <p>Mã ngành: 7480201</p>
        <p>Hình thức đào tạo: Chính quy, Hệ đào tạo Chất lượng cao</p>
        <p>Thời gian đào tạo: 4.5 năm</p>
        <p>Chu kỳ: 2020-2021</p>
        <p>Tín chỉ tối thiểu: 140</p>
        <p>Ghi chú: Giáo dục thể chất và GDQP bắt buộc phải học và cấp chứng chỉ trước khi ra trường</p>


        </div>
        </div>
        <div class="table-container"></div>
        <table class="table-graduate">
        <colgroup>
        <col span="1" style="width: 10%;">
        <col span="1" style="width: 15%;">
        <col span="1" style="width: 35%;">
        <col span="1" style="width: 10%;">
        <col span="1" style="width: 15%;">
        <col span="1" style="width: 15%;">


        </colgroup>
        <thead>
        <tr>
            <th rowspan="2">Thứ tự</th>
            <th rowspan="2">Mã học phần</th>
            <th rowspan="2">Tên Học phần</th>
            <th rowspan="2">Số tín chỉ</th>

            <th rowspan="1" colspan='9'>HỌC KỲ</th>
            <th rowspan="2">Mã học phần trước</th>
        </tr>
        <tr>
        <td colspan=""></td>
        <td colspan=""></td>

        <td colspan=""></td>

        <td colspan=""></td>
        <td>1</td>
        <td>1</td>

        <td>1</td>

        <td>2</td>

        <td>3</td>

        <td>4</td>

        <td>5</td>

        <td>6</td>

        <td>7</td>

        <td>8</td>
        <td>9</td>
        <td></td>

        </tr>
        </thead>
        <tbody>
        <tr>
            <td colspan="3">Khối kiến thức a</td>
            <td colspan="1">25/25</td>
            <td colspan="10"></td>
        </tr>
        <tr>
            <td colspan="3">Các học phần bắt buộc</td>
            <td colspan="1">37/37</td>
            <td colspan="10"></td>

        </tr>

        <tr>
            <td>February</td>
            <td>$80</td>
            <td>$80</td>
            <td>$80</td>
            <td>January</td>


            <td>$80</td>
        </tr>
        </tbody>
    </table>
</div>
        `;
        let treeTable = new TreeTable(childProgramContainer);
        // let tableTem = new SmartTableTemplate(childProgramContainer);

        // tableTem.fetchDataTable(ChildProgram.URL_Program, {
        //     formatAttributeHeader: {
        //         id: {
        //             width: '40px',
        //             sort: true,
        //         },
        //         ten: {
        //             title: 'Tên',
        //             minWidth: '300px',
        //             sort: true,
        //         },
        //         tong_tin_chi_ktt_tu_chon: {
        //             title: 'Tổng tín chỉ tự chọn',
        //             minWidth: '50px',
        //             oneLine: true,
        //         },
        //         tong_tin_chi_ktt_bat_buoc: {
        //             title: 'Tổng tín chỉ bắt buộc',
        //             minWidth: '50px',

        //             oneLine: true,
        //         },
        //         tong_tin_chi: {
        //             title: 'Tổng tín chỉ',
        //             minWidth: '50px',

        //             oneLine: true,
        //         },
        //         ten_lkt: {
        //             title: 'Loại khối kiến thức',
        //             oneLine: true,
        //         },
        //         ten_ctdt: {
        //             title: 'Tên chương trình đào tạo',
        //             oneLine: true,
        //         },

        //         created_at: {
        //             title: 'Ngày khởi tạo',
        //             type: 'date',
        //             oneLine: true,
        //         },
        //         updated_at: {
        //             title: 'Ngày cập nhập',
        //             type: 'date',
        //             oneLine: true,
        //         },
        //     },
        //     pagination: true,
        //     add: (e) => {
        //         new ModalComponent(ChildProgram.getAddFormElement('Thêm ', tableTem, idProgram));
        //     },
        //     edit: (e) => {
        //         let rowId = e.target.closest('tr')?.querySelector('[data-attr="id"]')?.getAttribute('data-content');
        //         if (rowId) new ModalComponent(ChildProgram.getEditFormElement('Cập nhập', tableTem, rowId, idProgram));
        //     },
        //     view: true,
        // });
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
