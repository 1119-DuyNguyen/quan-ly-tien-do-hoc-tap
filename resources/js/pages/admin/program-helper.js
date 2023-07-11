import { alertComponent } from '../../components/helper/alert-component';
import { ConfirmComponent } from '../../components/helper/confirm-component';
import { ModalComponent } from '../../components/helper/modal-component';
import { TableTree } from '../../components/table-tree';
import { ChildProgram } from './child-program';
import { Program } from './program';
import { Subject } from './subject';
function htmlEdit(type) {
    if (type)
        return `
    <td style="text-align: center;">
    <input type="radio" name="row" data-type="${type}">
    </td>`;
    else {
        return `<td></td>`;
    }
}
/**
 *
 * @param {*} depthHP
 * @param {*} stc
 * @param {*} stcmax
 * @param {0,1} batBuoc  : 0 là học phần không tự chọn, 1 là học phần bắt buộc
 * @param {*} isEdit
 * @returns
 */
//    ${isEdit ? htmlEdit('hp-' + batBuoc) : ''}
export function htmlMucLucHP(depthHP, stc, stcmax, batBuoc, isEdit = false) {
    return `
    <tr data-depth="${depthHP}" class='collapse'>
    ${isEdit ? htmlEdit() : ''}

    <td colspan="3" class='toggle'>${batBuoc ? 'Các học phần bắt buộc' : 'Các học phần tự chọn'}</td>
    <td colspan="1">${stc}/${stcmax}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    `;
}
/**
 *
 * @param {*} listHP
 * @param {*} depth
 * @param {*} index
 * @returns
 */
export function htmlHP(listHP, depth, index, isEdit = false) {
    let html = '';
    Object.keys(listHP).forEach((key) => {
        let hp = listHP[key];
        html += `
                                <tr data-depth="${depth}" class='collapse' data-hp="${hp.id}">
                                ${isEdit ? htmlEdit('hp') : ''}

                                <td rowspan="1">${index++}</td>
                                <td rowspan="1">${hp.ma_hoc_phan}</td>
                                <td rowspan="1">${hp.ten}</td>
                                <td rowspan="1">${hp.so_tin_chi}</td>
                                ${htmlTdHocKy(9, hp.hoc_ky_goi_y)}
                                <td rowspan="1">${hp.hoc_phan_tuong_duong_id ? hp.hoc_phan_tuong_duong_id : ''}</td>
                                </tr>
                                `;
    });
    return html;
}
/**
 *
 * @param {*} depth
 * @param {*} value
 * @param {*} name
 * @param {*} stc
 * @param {*} stcMax
 * @returns
 */
export function htmlLKT(depth = '', value = '', name = '', stc = '', stcMax = '', isEdit = false) {
    return `
        <tr data-depth="${depth}" class='collapse lkt' data-value="${value}">
        ${isEdit ? htmlEdit('') : ''}

        <td colspan="3" class='toggle'>${name}</td>
        <td colspan="1">${stc + '/' + stcMax}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
                                   `;
}
/**
 *
 * @param {*} depthKKT
 * @param {*} value
 * @param {*} name
 * @param {*} stc
 * @param {*} stcMax
 * @returns
 */
export function htmlKKT(depthKKT, value, name, stc, stcMax, isEdit = false) {
    let html = `
    <tr data-depth="${depthKKT}" class='collapse' data-value="${value}">
    ${isEdit ? htmlEdit('kkt') : ''}
    <td colspan="3" class='toggle'>${name}</td>
    <td colspan="1">${stc}/${stcMax}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    `;
    return html;
}
/**
 *
 * @param {*} depthKKT
 * @param {*} value
 * @param {*} name
 * @param {*} stc
 * @param {*} stcMax
 * @returns
 */
export function htmlRootEdit() {
    let html = `
    <tr data-depth="0" class='collapse' data-value="">
    ${htmlEdit('root')}
    <td colspan="14" style="color:var(--primary-color); font-weight:bold;">Thêm 1 khối kiến thức</td>
    </tr>
    `;
    return html;
}
/**
 *
 * @param {*} num
 * @param {*} arrayCheck
 * @returns
 */
export function htmlTdHocKy(num, arrayCheck) {
    let html = '';
    for (let i = 1; i <= num; ++i) {
        if (arrayCheck && arrayCheck.includes(i)) html += '<td style="text-align:center;">X</td>';
        else html += '<td ></td>';
    }
    return html;
}
export function htmlMucLucKKT(depthMucLuc, name, isEdit = false) {
    return `
                    <tr data-depth="${depthMucLuc}" class='collapse'>
                    ${isEdit ? htmlEdit('') : ''}
                    <td colspan="3" class='toggle'>${name}</td>
                    <td colspan="1"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                    `;
}
/**
 *
 * @param {*} tableContainer
 * @param {Object} data
 */
export function renderTreeCTDT(tableContainer, data = {}) {
    if (!data || !tableContainer) throw 'Không được truyền tham số rỗng';
    //create Loại & Khối kiến thức
    let html = '';
    let index = 1;

    if (data.constructor.name == 'Object') {
        Object.keys(data).forEach((mucLucID) => {
            let currentLKT = {
                id: undefined,
            };
            let stcKKT = 0;
            let htmlListKKT = '';

            let depthMucLuc = 0;
            let depthLKT = depthMucLuc + 1;

            // Vì kkt có thể có hoặc không có loại kiến thức
            // Để lần đầu render được mục lục
            let isRenderMucLuc = true;

            data[mucLucID].forEach((kkt) => {
                if (!currentLKT.id && kkt.loai_kien_thuc_id) {
                    currentLKT.id = kkt.loai_kien_thuc_id;
                    currentLKT.ten = kkt.ten_loai_kien_thuc;
                }
                if (isRenderMucLuc) {
                    isRenderMucLuc = false;
                    html += htmlMucLucKKT(depthMucLuc, kkt.ten_muc_luc);
                }
                let htmlCurrentKKT = '';

                let depthKKT = kkt.loai_kien_thuc_id ? depthLKT + 1 : depthLKT;
                let depthHP = depthKKT + 1;
                htmlCurrentKKT += htmlKKT(
                    depthKKT,
                    kkt.id,
                    kkt.ten,
                    kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon,
                    kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon
                );

                if (kkt.hpBatBuoc) {
                    htmlCurrentKKT += htmlMucLucHP(
                        depthHP,
                        kkt.tong_tin_chi_ktt_bat_buoc,
                        kkt.tong_tin_chi_ktt_bat_buoc,
                        1
                    );
                    htmlCurrentKKT += htmlHP(kkt.hpBatBuoc, depthHP + 1, index);
                    index += kkt.hpBatBuoc.length;
                }

                if (kkt.hpTuChon) {
                    htmlCurrentKKT += htmlMucLucHP(
                        depthHP,
                        kkt.tong_tin_chi_ktt_tu_chon,
                        kkt.tong_tin_chi_ktt_tu_chon,
                        0
                    );
                    htmlCurrentKKT += htmlHP(kkt.hpTuChon, depthHP + 1, index);
                    index += kkt.hpTuChon.length;
                }

                if (kkt.loai_kien_thuc_id && currentLKT.id != kkt.loai_kien_thuc_id) {
                    //in khi chuyển tiếp lkt sang lkt
                    if (currentLKT.id) {
                        html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten, stcKKT, stcKKT);
                        html += htmlListKKT;
                        currentLKT = {
                            id: undefined,
                        };
                        stcKKT = 0;
                    }
                    currentLKT.id = kkt.loai_kien_thuc_id;
                    currentLKT.ten = kkt.ten_loai_kien_thuc;
                    htmlListKKT = htmlCurrentKKT;

                    stcKKT = kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon;
                } else if (kkt.loai_kien_thuc_id && currentLKT.id === kkt.loai_kien_thuc_id) {
                    stcKKT += kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon;
                    htmlListKKT += htmlCurrentKKT;
                } else {
                    //in khi chuyển tiếp lkt sang kkt
                    if (currentLKT.id) {
                        html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten ?? '', stcKKT, stcKKT);
                        html += htmlListKKT;
                    }
                    currentLKT = {
                        id: undefined,
                    };
                    stcKKT = 0;
                    htmlListKKT = '';
                }

                if (depthKKT == depthLKT) {
                    html += htmlCurrentKKT;
                }
            });
            // in lần cuối
            if (currentLKT.id) {
                html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten, stcKKT, stcKKT);
            }
        });
    } else {
        // throw Error('Data phải là object');
    }

    tableContainer.innerHTML = `

                                <div class="table-container">
                                <table class="table-graduate">
                                <colgroup>
                                <col span="1" style="width: 5%; min-width:40px;">
                                <col span="1" style="width: 10%; min-width:60px;">
                                <col span="1" style="width: 40%; min-width:320px;">
                                <col span="1" style="width: 10%;min-width:80px;">
                                <col span="9" style="width: 15px; ">
                                <col span="1" style="width: 10%; min-width:60px;">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th rowspan="2">TT</th>
                                    <th rowspan="2">Mã học phần</th>
                                    <th rowspan="2">Tên Học phần</th>
                                    <th rowspan="2">Số tín chỉ</th>
                                    <th rowspan="1" colspan="9">HỌC KỲ</th>
                                    <th rowspan="2">Mã học phần trước</th>
                                </tr>
                                <tr>

                                <th rowspan="1">1</th>
                                <th rowspan="1">2</th>
                                <th rowspan="1">3</th>
                                <th rowspan="1">4</th>
                                <th rowspan="1">5</th>
                                <th rowspan="1">6</th>
                                <th rowspan="1">7</th>
                                <th rowspan="1">8</th>
                                <th rowspan="1">9</th>

                                </tr>
                                </thead>
                                <tbody>
                                ${html}
                                </tbody>
                            </table>
                        </div>
                                `;
    tableContainer.querySelectorAll('table').forEach((table) => {
        TableTree.bind(table);
    });
}
export function renderEditTreeCTDT(tableContainer, idProgram) {
    return Program.getDetailKnowledgeBlock(idProgram)
        .then((data) => {
            if (!data || !tableContainer) throw 'Không được truyền tham số rỗng';
            //create Loại & Khối kiến thức
            let html = htmlRootEdit();
            let index = 1;

            if (data.constructor.name == 'Object') {
                Object.keys(data).forEach((mucLucID) => {
                    let currentLKT = {
                        id: undefined,
                    };
                    let stcKKT = 0;
                    let htmlListKKT = '';

                    let depthMucLuc = 0;
                    let depthLKT = depthMucLuc + 1;

                    // Vì kkt có thể có hoặc không có loại kiến thức
                    let shouldRenderMucLuc = true;
                    // Để lần đầu render được mục lục
                    let isRenderMucLuc = true;

                    data[mucLucID].forEach((kkt) => {
                        if (!currentLKT.id && kkt.loai_kien_thuc_id) {
                            currentLKT.id = kkt.loai_kien_thuc_id;
                            currentLKT.ten = kkt.ten_loai_kien_thuc;
                        }
                        if (isRenderMucLuc) {
                            isRenderMucLuc = false;
                            html += htmlMucLucKKT(depthMucLuc, kkt.ten_muc_luc, true);
                        }
                        let htmlCurrentKKT = '';

                        let depthKKT = kkt.loai_kien_thuc_id ? depthLKT + 1 : depthLKT;
                        let depthHP = depthKKT + 1;
                        htmlCurrentKKT += htmlKKT(
                            depthKKT,
                            kkt.id,
                            kkt.ten,
                            kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon,
                            kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon,
                            true
                        );

                        if (kkt.hpBatBuoc) {
                            htmlCurrentKKT += htmlMucLucHP(
                                depthHP,
                                kkt.tong_tin_chi_ktt_bat_buoc,
                                kkt.tong_tin_chi_ktt_bat_buoc,
                                1,
                                true
                            );
                            htmlCurrentKKT += htmlHP(kkt.hpBatBuoc, depthHP + 1, index, true);
                            if (Array.isArray(kkt.hpBatBuoc)) {
                                index = index + kkt.hpBatBuoc.length;
                            } else index += 1;
                        }

                        if (kkt.hpTuChon) {
                            htmlCurrentKKT += htmlMucLucHP(
                                depthHP,
                                kkt.tong_tin_chi_ktt_tu_chon,
                                kkt.tong_tin_chi_ktt_tu_chon,
                                0,
                                true
                            );
                            htmlCurrentKKT += htmlHP(kkt.hpTuChon, depthHP + 1, index, true);
                            if (Array.isArray(kkt.hpTuChon)) {
                                index = index + kkt.hpTuChon.length;
                            } else index += 1;
                        }

                        if (kkt.loai_kien_thuc_id && currentLKT.id != kkt.loai_kien_thuc_id) {
                            //in khi chuyển tiếp lkt sang lkt
                            if (currentLKT.id) {
                                html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten, stcKKT, stcKKT, true);
                                html += htmlListKKT;
                                currentLKT = {
                                    id: undefined,
                                };
                                stcKKT = 0;
                            }

                            currentLKT.id = kkt.loai_kien_thuc_id;
                            currentLKT.ten = kkt.ten_loai_kien_thuc;
                            htmlListKKT = htmlCurrentKKT;
                            stcKKT = kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon;
                        } else if (kkt.loai_kien_thuc_id && currentLKT.id === kkt.loai_kien_thuc_id) {
                            stcKKT += kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon;
                            htmlListKKT += htmlCurrentKKT;
                        } else {
                            //in khi chuyển tiếp lkt sang kkt
                            if (currentLKT.id) {
                                html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten ?? '', stcKKT, stcKKT, true);
                                html += htmlListKKT;
                            }
                            currentLKT = {
                                id: undefined,
                            };
                            stcKKT = 0;
                            htmlListKKT = '';
                        }

                        if (depthKKT == depthLKT) {
                            html += htmlCurrentKKT;
                        }
                    });
                    // in lần cuối
                    if (currentLKT.id) {
                        html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten, stcKKT, stcKKT, true);
                        html += htmlListKKT;
                    }
                });
            } else {
                // throw Error('Data phải là object');
            }
            let groupControl = document.createElement('div');
            groupControl.classList.add('group-control');
            let addBtn = document.createElement('div');
            addBtn.classList.add('btn', 'btn--primary');
            addBtn.innerHTML = `
    <i class="fa-solid fa-circle-plus" style="margin-right:8px"></i>
    Thêm
    `;
            //Thêm con
            addBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let allRadioCheckbox = tableContainer.querySelectorAll('input[type=radio][data-type]:checked');
                if (allRadioCheckbox.length < 1) {
                    alertComponent('Bạn chưa chọn, hãy chọn để thực hiện hành động');
                }

                allRadioCheckbox.forEach((radioEl) => {
                    switch (radioEl.dataset.type) {
                        case 'root':
                            new ModalComponent(
                                ChildProgram.getAddFormElement(
                                    'Thêm',
                                    renderEditTreeCTDT.bind(this, tableContainer, idProgram),
                                    idProgram
                                )
                            );
                            break;
                        case 'kkt':
                            let rowID = radioEl.closest('tr').dataset.value;
                            if (rowID)
                                new ModalComponent(
                                    Subject.getAddKKTFormElement(
                                        'Thêm',
                                        renderEditTreeCTDT.bind(this, tableContainer, idProgram),
                                        rowID,
                                        idProgram
                                    )
                                );
                            else {
                                alertComponent('Có lỗi xảy ra, hãy liên hệ hỗ trợ');
                            }

                            break;
                        case 'hp-0':
                            break;
                        case 'hp-1':
                            break;
                        case 'hp':
                            break;
                        case 'default':
                            'Hãy chọn dòng để thêm hoặc sửa';
                    }
                });
            });
            //Sửa bản thân
            let editBtn = document.createElement('div');
            editBtn.classList.add('btn', 'btn--warning');
            editBtn.innerHTML = `
    <i class="fa-regular fa-pen-to-square" style="margin-right:8px"></i>
    Sửa`;
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let allRadioCheckbox = tableContainer.querySelectorAll('input[type=radio][data-type]:checked');
                if (allRadioCheckbox.length < 1) {
                    alertComponent('Bạn chưa chọn ô, hãy chọn để thực hiện hành động');
                }
                allRadioCheckbox.forEach((radioEl) => {
                    switch (radioEl.dataset.type) {
                        case 'root':
                            alertComponent('ô này không hỗ trợ sửa');
                            break;
                        case 'kkt':
                            let rowID = radioEl.closest('tr').dataset.value;
                            if (rowID)
                                new ModalComponent(
                                    ChildProgram.getEditFormElement(
                                        'Cập nhập',
                                        renderEditTreeCTDT.bind(this, tableContainer, idProgram),
                                        idProgram,
                                        rowID
                                    )
                                );
                            else {
                                alertComponent('Có lỗi xảy ra, hãy liên hệ hỗ trợ');
                            }
                            break;
                        case 'hp':
                            break;
                        case 'default':
                            'Hãy chọn dòng để thêm hoặc sửa';
                    }
                });
            });
            let deleteBtn = document.createElement('div');
            deleteBtn.classList.add('btn', 'btn--danger');
            deleteBtn.innerHTML = 'Xoá';
            deleteBtn.addEventListener('click', (e) => {
                let rowID;
                e.preventDefault();
                let allRadioCheckbox = tableContainer.querySelectorAll('input[type=radio][data-type]:checked');
                if (allRadioCheckbox.length < 1) {
                    alertComponent('Bạn chưa chọn ô, hãy chọn để thực hiện hành động');
                }
                allRadioCheckbox.forEach((radioEl) => {
                    switch (radioEl.dataset.type) {
                        case 'root':
                            alertComponent('ô này không hỗ trợ xoá');
                            break;
                        case 'kkt':
                            rowID = radioEl.closest('tr').dataset.value;
                            if (rowID) {
                                new ConfirmComponent({
                                    questionText: 'Bạn chắc chắn muốn xoá',
                                    trueButtonText: 'Chắc chắn',
                                    falseButtonText: 'Để sau',
                                }).then((data) => {
                                    if (data == 1) {
                                        axios
                                            .delete(
                                                ChildProgram.URL_Program + '/' + idProgram + '/knowledge-block/' + rowID
                                            )
                                            .then(() => {
                                                renderEditTreeCTDT(tableContainer, idProgram);
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    }
                                });
                            } else {
                                alertComponent('Có lỗi xảy ra, hãy liên hệ hỗ trợ');
                            }
                            break;
                        case 'hp':
                            let tr = radioEl.closest('tr');
                            let hp_id = tr.dataset.hp;
                            let depth = tr.dataset.depth;
                            let el = tr.previousElementSibling;
                            while (el) {
                                if (el.dataset.depth && parseInt(el.dataset.depth) == parseInt(depth) - 2) break;
                                el = el.previousElementSibling;
                            }
                            let kkt_id = el.dataset.value;
                            if (hp_id && kkt_id) {
                                new ConfirmComponent({
                                    questionText: 'Bạn chắc chắn muốn xoá',
                                    trueButtonText: 'Chắc chắn',
                                    falseButtonText: 'Để sau',
                                }).then((data) => {
                                    if (data == 1) {
                                        axios
                                            .delete(
                                                ChildProgram.URL_Program +
                                                    '/' +
                                                    idProgram +
                                                    '/knowledge-block/' +
                                                    kkt_id +
                                                    '/subject/' +
                                                    hp_id
                                            )
                                            .then(() => {
                                                renderEditTreeCTDT(tableContainer, idProgram);
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    }
                                });
                            } else {
                                alertComponent('Có lỗi xảy ra, hãy liên hệ hỗ trợ');
                            }
                            break;
                        case 'default':
                            'Hãy chọn dòng để thêm hoặc sửa';
                    }
                });
            });
            groupControl.appendChild(editBtn);
            groupControl.appendChild(addBtn);
            groupControl.appendChild(deleteBtn);

            tableContainer.innerHTML = `
                                <div class="table-container">
                                <table class="table-graduate">
                                <colgroup>
                                <col span="1" style="width: 5%; min-width:40px;">

                                <col span="1" style="width: 5%; min-width:40px;">
                                <col span="1" style="width: 10%; min-width:60px;">
                                <col span="1" style="width: 40%; min-width:320px;">
                                <col span="1" style="width: 10%;min-width:80px;">
                                <col span="9" style="width: 15px; ">
                                <col span="1" style="width: 10%; min-width:60px;">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th rowspan="2"></th>
                                    <th rowspan="2">TT</th>
                                    <th rowspan="2">Mã học phần</th>
                                    <th rowspan="2">Tên Học phần</th>
                                    <th rowspan="2">Số tín chỉ</th>
                                    <th rowspan="1" colspan="9">HỌC KỲ</th>
                                    <th rowspan="2">Mã học phần trước</th>
                                </tr>
                                <tr>

                                <th rowspan="1">1</th>
                                <th rowspan="1">2</th>
                                <th rowspan="1">3</th>
                                <th rowspan="1">4</th>
                                <th rowspan="1">5</th>
                                <th rowspan="1">6</th>
                                <th rowspan="1">7</th>
                                <th rowspan="1">8</th>
                                <th rowspan="1">9</th>

                                </tr>
                                </thead>
                                <tbody>
                                ${html}
                                </tbody>
                            </table>
                        </div>
                                `;
            tableContainer.insertAdjacentElement('afterbegin', groupControl);

            tableContainer.querySelectorAll('table').forEach((table) => {
                TableTree.bind(table);
            });
        })
        .catch((err) => {
            console.error(err);
            alertComponent('khởi tạo khối kiến thức chương trình đào tạo thất bại');
        });
}
