import { Validator } from '../../components/helper/validator';
import { alertComponent } from '../../components/helper/alert-component';
import { ConfirmComponent } from '../../components/helper/confirm-component';
import { ModalComponent } from '../../components/helper/modal-component';
import { toast } from '../../components/helper/toast';
import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';
import { TableTree } from '../../components/table-tree';
import { ChildProgram } from './child-program';
import NiceSelect from '../../components/helper/nice-select';
import { routeHref } from '../../routes/route';
import { htmlLKT, htmlMucLucHP, htmlKKT, htmlHP, htmlMucLucKKT, renderTreeCTDT } from './program-helper';

export class Program {
    static URL_PROGRAM = location.protocol + '//' + location.host + '/api/admin/program';

    static URL_MAJOR = location.protocol + '//' + location.host + '/api/major/all';
    static URL_PERIOD = location.protocol + '//' + location.host + '/api/period/all';

    static export() {}
    static edit() {}
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
            <label for=""> Tổng tín chỉ</label>
            <input name='tong_tin_chi'  type="text" class="input"rules='required|number' value="" />
        </div>
        <div class="grid-item form-group">
            <label for=""> Thời gian đào tạo</label>
            <input type="text" name='thoi_gian_dao_tao' rules='required|number' class="input" value="" />
        </div>
        <!-- select -->
        <div class="grid-item form-group">
            <label>Ngành</label>

            <select name="nganh_id" rules='required'>

            </select>
        </div>
        <div class="grid-item form-group">
            <label>Chu kỳ</label>

            <select name="chu_ky_id"  rules='required'>

            </select>
        </div>
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
                .post(Program.URL_PROGRAM, data)
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
    static renderTreeProgram(data) {}
    static getEditFormElement(textSubmit = '', tableTem, rowId) {
        let formContainer = document.createElement('form');

        axios
            .get(Program.URL_PROGRAM + '/' + rowId)
            .then((res) => res.data.data)
            .then((data) => {
                formContainer.classList.add('form');

                formContainer.innerHTML = `
                <div class="grid-container-half">
                <div class="grid-item form-group">
                    <label for=""> Tên</label>
                    <input rules='required' type="text" name='ten' class="input" value="${data.ten}" />
                </div>
                <div class="grid-item form-group">
                    <label for=""> Tổng tín chỉ</label>
                    <input name='tong_tin_chi'  type="text" class="input"rules='required|number'
                    value="${data.tong_tin_chi}" />
                </div>
                <div class="grid-item form-group">
                    <label for=""> Thời gian đào tạo</label>
                    <input type="text" name='thoi_gian_dao_tao'
                     rules='required|number' class="input" value="${data.thoi_gian_dao_tao}" />
                </div>
                <!-- select -->
                <div class="grid-item form-group">
                    <label>Ngành</label>

                    <select name="nganh_id" rules='required' data-select='ten_nganh'>

                    </select>
                </div>
                <div class="grid-item form-group">
                    <label>Chu kỳ</label>

                    <select name="chu_ky_id"  rules='required'  data-select='ten_chu_ky'>

                    </select>
                </div>
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

                    formContainer.querySelectorAll(`select[name="chu_ky_id"] option`).forEach((option) => {
                        if (option.value == data.chu_ky_id) {
                            option.selected = true;
                        } else option.selected = false;
                    });
                    formContainer.querySelectorAll(`select[name="nganh_id"] option`).forEach((option) => {
                        if (option.value == data.nganh_id) {
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
                .put(Program.URL_PROGRAM + '/' + rowId, data)
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
        axios.get();
        let programContainer = document.createElement('div');
        programContainer.classList.add('program-container');
        rootElement.appendChild(programContainer);
        let tableTem = new SmartTableTemplate(programContainer);

        tableTem.fetchDataTable(Program.URL_PROGRAM, {
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
                tong_tin_chi: {
                    title: 'Tổng tín chỉ',
                    minWidth: '50px',
                    oneLine: true,
                },
                thoi_gian_dao_tao: {
                    title: 'Thời gian đào tạo',
                    oneLine: true,
                },
                trinh_do_dao_tao: {
                    title: 'Trình độ đào tạo',
                    oneLine: true,
                },
                ten_nganh: {
                    title: 'Tên ngành',
                    oneLine: true,
                },
                ten_chu_ky: {
                    title: 'Tên chu kỳ',
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
            add: true,
            // edit: (e) => {
            //     let rowId = e.target.closest('tr')?.querySelector('[data-attr="id"]')?.getAttribute('data-content');
            //     if (rowId) new ModalComponent(Program.getEditFormElement('Cập nhập', tableTem, rowId));
            // },
            edit: true,
            export: true,
            view: (e) => {
                let rowId = e.target.closest('tr')?.querySelector('[data-attr="id"]')?.getAttribute('data-content');
                if (rowId) new ModalComponent(Program.renderViewCTDT(rowId));
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
    static add() {
        try {
            // ChildProgram.index(id);

            let rootElement = document.getElementById('main-content');
            rootElement.appendChild(Program.renderAddCTDT());
        } catch (err) {
            console.log(err);
            alertComponent('Đã xảy ra lỗi khi khởi tạo biểu mẫu', 'Hãy thử làm mới trang');
        }
    }
    static getDetailProgram(id) {
        return axios.get(Program.URL_PROGRAM + '/' + id).then((res) => res.data.data);
    }
    static getDetailKnowledgeBlock(idProgram) {
        return axios.get(Program.URL_PROGRAM + '/' + idProgram + '/knowledge_block').then((res) => res.data.data);
    }
    static renderAddCTDT() {
        let knowledgeBlockContainer = document.createElement('div');
        knowledgeBlockContainer.classList.add('child-program-container');
        let programContainer = document.createElement('div');

        knowledgeBlockContainer.appendChild(programContainer);
        programContainer.classList.add('program-container');
        let errorMessage = [];
        let promiseListMajor = axios
            .get(Program.URL_MAJOR)
            .then((res) => res.data.data)
            .then((data) => {
                if (data.length < 1) {
                    errorMessage.push('Chưa khởi tạo ngành');
                    return;
                }
                return data;
            })
            .catch((e) => {
                errorMessage.push('Có lỗi khi lấy danh sách ngành');
            });
        let promiseListPeriod = axios
            .get(Program.URL_PERIOD)
            .then((res) => res.data.data)
            .then((data) => {
                if (data.length < 1) {
                    errorMessage.push('Chưa khởi tạo chu kỳ');
                    return;
                }
                return data;
            })
            .catch((e) => {
                errorMessage.push('Có lỗi khi lấy danh sách ngành');
            });
        Promise.all([promiseListMajor, promiseListPeriod]).then(function (values) {
            if (errorMessage.length > 0) {
                errorMessage = errorMessage.join(' ,');
                programContainer.innerHTML = errorMessage.slice(0, errorMessage.length - 1);
                return;
            }
            let listMajor = values[0];
            let htmlOptionMajor = '';
            listMajor.forEach((major) => {
                htmlOptionMajor += `<option value="${major.id}">${major.ten} ( ${major.ma_nganh} ) </option>`;
            });
            let listPeriod = values[1];
            let htmlOptionPeriod = '';
            listPeriod.forEach((period) => {
                htmlOptionPeriod += `<option value="${period.id}"> ${period.ten} ( ${period.nam_bat_dau} - ${period.nam_ket_thuc})</option>`;
            });
            programContainer.innerHTML = `
            <div class="program-container__item program-container__item--primary">
            <form class="">

            <div class="form-group">
            <label for=""> Tên</label>
            <input rules='required' type="text" name='ten' class="input" value="" />
            </div>

            <div class="form-group">
            <label>Trình độ đào tạo: </label>
            <input  rules='required'  name='trinh_do_dao_tao' value="">
            </div>

            <div class="form-group">
            <label>Ngành đào tạo: </label>
            <select  class="full-width" name='nganh_id' placeHolder="Lựa chọn ngành đào tạo" rules='required'>
            <option value="" selected disabled hidden></option>
            ${htmlOptionMajor}
            </select >
            </div>

            <div class="form-group">
            <label>Chu kỳ:</label>
            <select class="full-width" name='chu_ky_id' placeHolder="Lựa chọn chu kỳ" rules='required'>
            <option value="" selected disabled hidden></option>
            ${htmlOptionPeriod}
            </select >
            </div>

            <div class="form-group">
            <label>Hình thức đào tạo: </label>
            <input  rules='required'  name='hinh_thuc_dao_tao' value="">
            </div>

            <div class="form-group">
            <label>Thời gian đào tạo(năm): </label>
            <input  rules='required|number|minNum:0'  name='thoi_gian_dao_tao' value="">
            </div>



            <div class="form-group">
            <label>Tín chỉ tối thiểu: </label>
            <input  rules='required|number|minNum:0'  name='tong_tin_chi' value="0">
            </div>

            <div class="form-group">
            <label>Ghi chú:</label>
            <input  name='ghi_chu' value="">
            </div>
            <input type="submit" class="btn-submit" value="Thêm chương trình đào tao">
            </form>
            </div>
            `;
            let selectElements = programContainer.querySelectorAll('select[name]');
            selectElements.forEach((el) => {
                new NiceSelect(el, { searchable: true });
            });
            let formSubmit = new Validator(programContainer.querySelector('form'));
            formSubmit.onSubmit = function (data) {
                console.log(data);
                axios
                    .post(Program.URL_PROGRAM, data)
                    .then((res) => routeHref(location.protocol + '//' + location.host + '/program'))
                    .catch((err) => {
                        if (err?.response?.data?.message) {
                            alertComponent('Có lỗi khi gửi yêu cầu lên máy chủ', err.response.data.message);
                        }
                    });
            };

            // render chương trình đào tạo
        });

        return knowledgeBlockContainer;
    }
    static renderEditCTDT(id) {
        let knowledgeBlockContainer = document.createElement('div');
        knowledgeBlockContainer.classList.add('child-program-container');
        let programContainer = document.createElement('div');

        let promiseProgram = Program.getDetailProgram(id)
            .then((data) => {
                programContainer.classList.add('program-container');

                if (!data) {
                    programContainer.innerHTML = `<p>Không tìm thấy chương trình đào tạo</p>`;
                    return;
                }

                let errorMessage = [];
                let promiseListMajor = axios
                    .get(Program.URL_MAJOR)
                    .then((res) => res.data.data)
                    .then((data) => {
                        if (data.length < 1) {
                            errorMessage.push('Chưa khởi tạo ngành');
                            return;
                        }
                        return data;
                    })
                    .catch((e) => {
                        errorMessage.push('Có lỗi khi lấy danh sách ngành');
                    });
                let promiseListPeriod = axios
                    .get(Program.URL_PERIOD)
                    .then((res) => res.data.data)
                    .then((data) => {
                        if (data.length < 1) {
                            errorMessage.push('Chưa khởi tạo chu kỳ');
                            return;
                        }
                        return data;
                    })
                    .catch((e) => {
                        errorMessage.push('Có lỗi khi lấy danh sách ngành');
                    });
                Promise.all([promiseListMajor, promiseListPeriod]).then(function (values) {
                    if (errorMessage.length > 0) {
                        errorMessage = errorMessage.join(' ,');
                        programContainer.innerHTML = errorMessage.slice(0, errorMessage.length - 1);
                        return;
                    }
                    let listMajor = values[0];
                    let htmlOptionMajor = '';
                    listMajor.forEach((major) => {
                        htmlOptionMajor += `<option value="${major.id}" ${
                            major.id === data.nganh_id ? 'selected' : ''
                        }>${major.ten} ( ${major.ma_nganh} ) </option>`;
                    });
                    let listPeriod = values[1];
                    let htmlOptionPeriod = '';
                    listPeriod.forEach((period) => {
                        htmlOptionPeriod += `<option value="${period.id}" ${
                            period.id === data.chu_ky_id ? 'selected' : ''
                        }> ${period.ten} ( ${period.nam_bat_dau} - ${period.nam_ket_thuc})</option>`;
                    });
                    programContainer.innerHTML = `
                    <div class="program-container__item program-container__item--primary">
                    <form class="">

                    <div class="form-group">
                    <label for=""> Tên</label>
                    <input rules='required' type="text" name='ten' class="input" value="${data.ten}" />
                    </div>

                    <div class="form-group">
                    <label>Trình độ đào tạo: </label>
                    <input  rules='required'  name='trinh_do_dao_tao' value="${data.trinh_do_dao_tao ?? ''}">
                    </div>

                    <div class="form-group">
                    <label>Ngành đào tạo: </label>
                    <select  class="full-width" name='nganh_id' placeHolder="Lựa chọn ngành đào tạo" rules='required'>
                    <option value="" selected disabled hidden></option>
                    ${htmlOptionMajor}
                    </select >
                    </div>

                    <div class="form-group">
                    <label>Chu kỳ:</label>
                    <select class="full-width" name='chu_ky_id' placeHolder="Lựa chọn chu kỳ" rules='required'>
                    <option value="" selected disabled hidden></option>
                    ${htmlOptionPeriod}
                    </select >
                    </div>

                    <div class="form-group">
                    <label>Hình thức đào tạo: </label>
                    <input  rules='required'  name='hinh_thuc_dao_tao' value="${data.hinh_thuc_dao_tao ?? ''}">
                    </div>

                    <div class="form-group">
                    <label>Thời gian đào tạo(năm): </label>
                    <input  rules='required|number|minNum:0'  name='thoi_gian_dao_tao' value="${
                        data.thoi_gian_dao_tao ?? ''
                    }">
                    </div>



                    <div class="form-group">
                    <label>Tín chỉ tối thiểu: </label>
                    <input  rules='required|number|minNum:0'  name='tong_tin_chi' value="${data.tong_tin_chi ?? ''}">
                    </div>

                    <div class="form-group">
                    <label>Ghi chú:</label>
                    <input  name='ghi_chu' value="${data.ghi_chu ?? ''}">
                    </div>
                    <input type="submit" class="btn-submit" value="Cập nhập chương trình đào tao">
                    </form>
                    </div>
                    `;
                    let selectElements = programContainer.querySelectorAll('select[name]');
                    selectElements.forEach((el) => {
                        new NiceSelect(el, { searchable: true });
                    });
                    let formSubmit = new Validator(programContainer.querySelector('form'));
                    formSubmit.onSubmit = function (data) {
                        console.log(data);
                        axios
                            .post(Program.URL_PROGRAM, data)
                            .then((res) => routeHref(location.protocol + '//' + location.host + '/program'))
                            .catch((err) => {
                                if (err?.response?.data?.message) {
                                    alertComponent('Có lỗi khi gửi yêu cầu lên máy chủ', err.response.data.message);
                                }
                            });
                    };

                    // render chương trình đào tạo
                });
            })
            .catch((err) => {
                alertComponent('Tìm kiếm dữ liệu chương trình đào tạo thất bại');
            });
        // ----------------------RENDER TREE TABLE ------------------------------------------
        let tableContainer = document.createElement('div');

        let promiseKnowledge = Program.getDetailKnowledgeBlock(id)
            .then((data) => {
                renderTreeCTDT(tableContainer, data);
            })
            .catch((err) => {
                console.error(err);
                alertComponent('khởi tạo khối kiến thức chương trình đào tạo thất bại');
            });
        Promise.all([promiseProgram, promiseKnowledge]).then((values) => {
            knowledgeBlockContainer.appendChild(programContainer);
            knowledgeBlockContainer.appendChild(tableContainer);
        });
        return knowledgeBlockContainer;
    }
    static renderViewCTDT(id) {
        let knowledgeBlockContainer = document.createElement('div');
        knowledgeBlockContainer.classList.add('child-program-container');
        let programContainer = document.createElement('div');

        knowledgeBlockContainer.appendChild(programContainer);

        Program.getDetailProgram(id)
            .then((data) => {
                programContainer.classList.add('program-container');

                if (!data) {
                    programContainer.innerHTML = `<p>Không tìm thấy chương trình đào tạo</p>`;
                    return;
                }

                programContainer.innerHTML = `

        <div class="program-container__item program-container__item--primary">
        <h2 >${data.ten}</h2>
        <p>Trình độ đào tạo: ${data.trinh_do_dao_tao ?? ''}</p>

        <p>Ngành đào tạo: ${data.ten_nganh ?? ''}</p>
        <p>Mã ngành: ${data.nganh_id ?? ''}</p>
        <p>Hình thức đào tạo: ${data.hinh_thuc_dao_tao ?? ''}</p>
        <p>Thời gian đào tạo:${data.thoi_gian_dao_tao ?? '0'} năm </p>
        <p>Chu kỳ: ${data.ten_chu_ky}</p>
        <p>Tín chỉ tối thiểu:  ${data.tong_tin_chi}</p>
        <p>Ghi chú:  ${data.ghi_chu ?? 'Không'}</p>


        </div>
        `;
            })
            .catch((err) => {
                alertComponent('Tìm kiếm dữ liệu chương trình đào tạo thất bại');
            });

        let tableContainer = document.createElement('div');
        knowledgeBlockContainer.appendChild(tableContainer);
        let index = 1;
        Program.getDetailKnowledgeBlock(id)
            .then((data) => {
                renderTreeCTDT(tableContainer, data);
            })
            .catch((err) => {
                console.error(err);
                alertComponent('khởi tạo khối kiến thức chương trình đào tạo thất bại');
            });
        return knowledgeBlockContainer;
    }
    static view({ id }) {
        try {
            if (id) {
                // ChildProgram.index(id);

                let rootElement = document.getElementById('main-content');
                rootElement.appendChild(Program.renderEditCTDT(id));
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
