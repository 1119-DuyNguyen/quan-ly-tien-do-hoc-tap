import { TableTree } from '../../components/table-tree';

/**
 *
 * @param {*} depth
 * @param {*} stc
 * @param {*} stcmax
 * @returns
 */
export function htmlMucLucHP(depthHP, stc, stcmax) {
    return `
    <tr data-depth="${depthHP}" class='collapse'>
    <td colspan="3" class='toggle'>Các học phần bắt buộc</td>
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
export function htmlHP(listHP, depth, index) {
    let html = '';
    Object.keys(listHP).forEach((key) => {
        let hp = listHP[key];
        html += `
                                <tr data-depth="${depth}" class='collapse' data-hp="${hp.id}">
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
export function htmlLKT(depth = '', value = '', name = '', stc = '', stcMax = '') {
    return `
        <tr data-depth="${depth}" class='collapse lkt' data-value="${value}">
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
export function htmlKKT(depthKKT, value, name, stc, stcMax) {
    let html = `
    <tr data-depth="${depthKKT}" class='collapse' data-value="${value}">
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
export function htmlMucLucKKT(depthMucLuc, name) {
    return `
                    <tr data-depth="${depthMucLuc}" class='collapse'>
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
            function resetCurrrentLKT() {
                currentLKT = {
                    id: undefined,
                };
                stcKKT = 0;
                htmlListKKT = '';
            }
            let depthMucLuc = 0;
            let depthLKT = depthMucLuc + 1;

            // Vì kkt có thể có hoặc không có loại kiến thức
            let htmlCurrentKKT = '';
            let shouldRenderMucLuc = true;
            // Để lần đầu render được mục lục
            let idMucLuc;
            data[mucLucID].forEach((kkt) => {
                shouldRenderMucLuc = idMucLuc === kkt.muc_luc_id ? false : true;

                if (shouldRenderMucLuc) {
                    idMucLuc = mucLucID;
                    html += htmlMucLucKKT(depthMucLuc, kkt.ten_muc_luc);
                }

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
                        kkt.tong_tin_chi_ktt_bat_buoc
                    );
                    htmlCurrentKKT += htmlHP(kkt.hpBatBuoc, depthHP + 1, index);
                    index += kkt.hpBatBuoc.length;
                }

                if (kkt.hpTuChon) {
                    htmlCurrentKKT += htmlMucLucHP(depthHP, kkt.tong_tin_chi_ktt_tu_chon, kkt.tong_tin_chi_ktt_tu_chon);
                    htmlCurrentKKT += htmlHP(kkt.hpTuChon, depthHP + 1, index);
                    index += kkt.hpTuChon.length;
                }

                if (kkt.loai_kien_thuc_id && currentLKT.id != kkt.loai_kien_thuc_id) {
                    //in khi chuyển tiếp lkt sang lkt

                    if (currentLKT.id) {
                        html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten, stcKKT, stcKKT);
                        html += htmlListKKT;
                        resetCurrrentLKT();
                    }
                    currentLKT.id = kkt.loai_kien_thuc_id;
                    currentLKT.ten = kkt.ten_loai_kien_thuc;
                    htmlListKKT += htmlCurrentKKT;
                    stcKKT = kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon;
                } else if (kkt.loai_kien_thuc_id && currentLKT.id == kkt.loai_kien_thuc_id) {
                    stcKKT += kkt.tong_tin_chi_ktt_bat_buoc + kkt.tong_tin_chi_ktt_tu_chon;
                    htmlListKKT += htmlCurrentKKT;
                } else {
                    //in khi chuyển tiếp kkt sang lkt
                    if (currentLKT.id) {
                        html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten ?? '', stcKKT, stcKKT);

                        html += htmlListKKT;
                    }
                    resetCurrrentLKT();
                }

                if (depthKKT == depthLKT) {
                    html += htmlCurrentKKT;
                }
            });
            // in lần cuối
            if (currentLKT.id) {
                html += htmlLKT(depthLKT, currentLKT.id, currentLKT.ten, stcKKT, stcKKT);
                html += htmlListKKT;
            }
        });
    } else {
        throw Error('Data phải là object');
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
