import { Validator } from '../../components/helper/Validator';
import { alertComponent } from '../../components/helper/alert-component';
import { ConfirmComponent } from '../../components/helper/confirm-component';
import { ModalComponent } from '../../components/helper/modal-component';
import { toast } from '../../components/helper/toast';
import { SmartTableTemplate } from '../../components/smart-table-template/SmartTableTemplate';
import { TableTree } from '../../components/table-tree';
import { ChildProgram } from './child-program';

export class Program {
    static URL_Program = location.protocol + '//' + location.host + '/api/admin/program';
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
                .post(Program.URL_Program, data)
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

        axios
            .get(Program.URL_Program + '/' + rowId)
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
                .put(Program.URL_Program + '/' + rowId, data)
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

        tableTem.fetchDataTable(Program.URL_Program, {
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
            add: (e) => {
                new ModalComponent(Program.getAddFormElement('Thêm ', tableTem));
            },
            edit: (e) => {
                let rowId = e.target.closest('tr')?.querySelector('[data-attr="id"]')?.getAttribute('data-content');
                if (rowId) new ModalComponent(Program.getEditFormElement('Cập nhập', tableTem, rowId));
            },
            export: true,
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
    static getDetailProgram(id) {
        return axios.get(Program.URL_Program + '/' + id).then((res) => res.data.data);
    }
    static getDetailKnowledgeBlock(idProgram) {
        return axios.get(Program.URL_Program + '/' + idProgram + '/knowledge_block').then((res) => res.data.data);
    }
    static view({ id }) {
        try {
            if (id) {
                // ChildProgram.index(id);

                let rootElement = document.getElementById('main-content');
                let knowledgeBlockContainer = document.createElement('div');
                knowledgeBlockContainer.classList.add('child-program-container');
                rootElement.appendChild(knowledgeBlockContainer);
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
                <div class="" >
        
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
                </div>
                `;
                    })
                    .catch((err) => {
                        alertComponent('Tìm kiếm dữ liệu chương trình đào tạo thất bại');
                    });

                let tableContainer = document.createElement('div');
                knowledgeBlockContainer.appendChild(tableContainer);

                Program.getDetailKnowledgeBlock(id)
                    .then((data) => {
                        //create Loại & Khối kiến thức
                        let html = '';
                        //  data.forEach((kkt) => {});
                        tableContainer.innerHTML = `
 
                        <div class="table-container">
                        <table class="table-graduate">
                        <colgroup>
                        <col span="1" style="width: 5%; min-width:40px;">
                        <col span="1" style="width: 15%; min-width:120px;">
                        <col span="1" style="width: 40%; min-width:320px;">
                        <col span="1" style="width: 10%;min-width:80px;">
                        <col span="1" style="width: 15%;min-width:200px; ">
                        <col span="1" style="width: 15%; min-width:120px;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th rowspan="2">TT</th>
                            <th rowspan="2">Mã học phần</th>
                            <th rowspan="2">Tên Học phần</th>
                            <th rowspan="2">Số tín chỉ</th>
                            <th rowspan="2">HỌC KỲ</th>
                            <th rowspan="2">Mã học phần trước</th>
                        </tr>
                
                        </thead> 
                        <tbody>
                        <tr data-depth="0" class='collapse'>
                        <td colspan="3" class='toggle'>Loại kiến thức a</td>
                        <td colspan="1">25/25</td>
                        <td colspan="2"></td>
                        </tr>
                        <tr data-depth="1" class='collapse'>
                            <td colspan="3" class='toggle'>Khối kiến thức a</td>
                            <td colspan="1">25/25</td>
                            <td colspan="2"></td>
                        </tr>
                        <tr data-depth="2" class='collapse'>
                            <td colspan="3" class='toggle'>Các học phần bắt buộc</td>
                            <td colspan="1">37/37</td>
                            <td colspan="2"></td>
                        </tr>
                
                        <tr>
                            <td>February</td>
                            <td>$80</td>
                            <td>$80</td>
                            <td>$80</td>
                            <td>
                            <label>
                            <input type="checkbox" value="1" name="">
                            1
                            </label>
                            <label>
                            <input type="checkbox" value="2" name="">
                            2
                            </label>
                            <label>
                            <input type="checkbox" value="3" name="">
                            3
                            </label>
                            <label>
                            <input type="checkbox" value="4" name="">
                            4
                            </label>
                            <label>
                            <input type="checkbox" value="5" name="">
                            5
                            </label>
                            <label>
                            <input type="checkbox" value="6" name="">
                            6
                            </label>

                            </td>
                
                
                            <td>$80</td>
                        </tr>
                        <tr data-depth="2" class='collapse'>
                        <td colspan="3" class='toggle'>Các học phần tự chọn</td>
                        <td colspan="1">37/37</td>
                        <td colspan="2"></td>
                        </tr>
                        <tr data-depth="0" class='collapse'>
                        <td colspan="3" class='toggle'>Loại kiến thức b</td>
                        <td colspan="1">25/25</td>
                        <td colspan="2"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                        `;
                        tableContainer.querySelectorAll('table').forEach((table) => {
                            TableTree.bind(table);
                        });
                        console.log(data);
                    })
                    .catch((err) => {
                        console.error(err);
                        alertComponent('khởi tạo khối kiến thức chương trình đào tạo thất bại');
                    });
                // let treeTable = new TreeTable(childProgramContainer);
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
