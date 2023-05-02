
/**
 * Round half up ('round half towards positive infinity')
 * 
 * Negative numbers round differently than positive numbers.
 * https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
 */
function round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}

/**
 * Lấy thông tin từ compact hoc_phan
 * @param {data[]} hoc_phan compact truyền vào
 * @param {number} id mã học phần cần lấy
 * @param {string} data nội dung cần lấy
 * @returns giá trị cần lấy
 */
function getFromHocPhan(hoc_phan, id, data = 'ma_hoc_phan') {
    for (let i = 0; i < hoc_phan.length; i++) {
        const hp = hoc_phan[i];
        if (hp.id === id) {
            if (typeof hp[data] == "undefined")
                return "Chưa xác định";
            return hp[data];
        }
    }
}

export default class GraduateCrawler {
    static URL_REQ = location.protocol + '//' + location.host + '/api/graduate';
    static URL_SUGGEST = location.protocol + '//' + location.host + '/api/suggestion';

    returnHKHienTai() {
        return axios.get(GraduateCrawler.URL_SUGGEST)
        .then(function (response) {
            let data = response.data.data;

            return data.hoc_ky_hien_tai.id;
        })
    }

    renderSelectHK(selector) {
        axios.get(GraduateCrawler.URL_REQ)
        .then((response) => {

            let data = response.data.data;

            let bien_che = data.bien_che;
            let bien_che_option;

            bien_che.forEach(hk => {
                bien_che_option = document.createElement('option');

                bien_che_option.text = hk.ten;
                bien_che_option.value = hk.id;
                selector.add(bien_che_option);
            });

        }).catch(function (err) {
            console.error(err);
        })
    }

    /**
     * Hàm render dữ liệu từ server
     * @param {number} id id của học kỳ cần render, mặc định là -1, ứng với mọi học kỳ
     */
    renderHK(id = -1, type = 'kq') {

        id = (id === -1) ? "" : (isNaN(id) ? "" : "/"+id);

        return axios.get(GraduateCrawler.URL_REQ+id)
        .then(function (response) {
            let data = response.data.data;

            let bien_che = data.bien_che;
            
            let hoc_phan = data.hoc_phan;

            let ket_qua = data.ket_qua;
            let stt = 0, found=0, html, htmlReturn = "", list = ``, stc_dat, tong_stc, tong_diem;
            
            bien_che.forEach(hk => {
                // Init
                stt = 0;
                stc_dat = 0;
                tong_stc = 0;
                tong_diem = 0;
                list = ``;
                found = 0;

                if (type == 'suggest') {
                    for (let i = 0; i < ket_qua.length; i++) {
                        const kq = ket_qua[i];
                        if (hk.id == kq.bien_che_id) {
                            found = 1;
                            stt++;
                            list += `<tr>
                                <td>${stt}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id)}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'ten')}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi')}</td>
                                <td>${(kq.diem_tong_ket == null) ? `<input style="width: 45px" data-hpid="${kq.hoc_phan_id}" class="ket_qua_du_kien">` : kq.diem_tong_ket}</td>
                                <td>${(kq.loai_he_4 == null) ? "" : kq.loai_he_4}</td>
                                <td>${(kq.qua_mon == 1) ? 'Đạt' : 'X' }</td>
                                <td>
                                    <a href="#" class="graduate__more">Chi tiết</a>
                                    <div class="graduate__tooltip">
                                        <div class="graduate__tooltip__item">
                                            Giữa kỳ: ${(kq.diem_qua_trinh == null) ? "" : kq.diem_qua_trinh} <br>
                                            Cuối kỳ: ${(kq.diem_cuoi_ky == null) ? "" : kq.diem_cuoi_ky}
                                        </div>
                                    </div>
                                </td>
                            </tr>`
                            if (kq.qua_mon == 1) stc_dat += parseInt(getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));
                            tong_stc += parseInt(getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));
    
                            tong_diem += parseFloat(kq.diem_tong_ket * getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));
                        }
                    }
                } else {
                    for (let i = 0; i < ket_qua.length; i++) {
                        const kq = ket_qua[i];
                        if (hk.id == kq.bien_che_id) {
                            found = 1;
                            stt++;
                            list += `<tr>
                                <td>${stt}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id)}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'ten')}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi')}</td>
                                <td>${(kq.diem_tong_ket == null) ? "" : kq.diem_tong_ket}</td>
                                <td>${(kq.loai_he_4 == null) ? "" : kq.loai_he_4}</td>
                                <td>${(kq.qua_mon == 1) ? 'Đạt' : 'X' }</td>
                                <td>
                                    <a href="#" class="graduate__more">Chi tiết</a>
                                    <div class="graduate__tooltip">
                                        <div class="graduate__tooltip__item">
                                            Giữa kỳ: ${(kq.diem_qua_trinh == null) ? "" : kq.diem_qua_trinh} <br>
                                            Cuối kỳ: ${(kq.diem_cuoi_ky == null) ? "" : kq.diem_cuoi_ky}
                                        </div>
                                    </div>
                                </td>
                            </tr>`
                            if (kq.qua_mon == 1) stc_dat += parseInt(getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));
                            tong_stc += parseInt(getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));
    
                            tong_diem += parseFloat(kq.diem_tong_ket * getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));
                        }
                    }
                }

                tong_diem /= tong_stc;

                if (found != 0)
                    html = `<div class="graduate__item">
                        <div class="graduate__item__title">
                            ${hk.ten}
                        </div>
                        <div class="graduate__item__content">
                            <table>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã học phần</th>
                                    <th>Tên học phần</th>
                                    <th>STC</th>
                                    <th>Điểm</th>
                                    <th>Điểm chữ</th>
                                    <th>Kết quả</th>
                                    <th>Chi tiết</th>
                                </tr>
                                ${list}
                                <tr>
                                    <td colspan="3">Số tín chỉ đạt (${stc_dat}) + Số tín chỉ chưa đạt (${tong_stc - stc_dat}) =</td>
                                    <td>${tong_stc}</td>
                                    <td colspan="5">Trung bình học kỳ: ${round(tong_diem, 2)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>`;
                else html = ""

                htmlReturn += html;
            });

            if (type == 'suggest') {
                htmlReturn += "<div style='text-align: center'><button class='btn btn--primary' style='margin-top: 1rem;' id='goi_y_hoc_phan'>Gợi ý học phần học kỳ kế</button></div>";
            }

            return htmlReturn;

        })
    }

    renderDSGoiY(dsmon_da_pass = []) {
        return axios.get(GraduateCrawler.URL_SUGGEST)
        .then(function (response) {
            let data = response.data.data;

            let ds_goi_y = data.goi_y;

            let stt = 0;
            let list = ``;
            let check;

            for (let i = 0; i < ds_goi_y.length; i++) {
                const kq = ds_goi_y[i];

                check = false;
                for (let i = 0; i < dsmon_da_pass.length; i++) {
                    const mon_da_pass = dsmon_da_pass[i];
                    if (mon_da_pass == kq.hoc_phan_id) {
                        check = true;
                        break;
                    }
                }

                if (!check) {
                    stt++;
                    list += `<tr>
                        <td>${stt}</td>
                        <td>${kq.hoc_phan_id}</td>
                        <td>${kq.ten}</td>
                        <td>${kq.so_tin_chi}</td>
                    </tr>`
                }
            }

            let html = `<div class="graduate__item">
                <div class="graduate__item__title">
                    Danh sách môn học gợi ý cho kỳ kế
                </div>
                <div class="graduate__item__content">
                    <table>
                        <tr>
                            <th>STT</th>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                            <th>STC</th>
                        </tr>
                        ${list}
                    </table>
                </div>
            </div>`;
                

            return html;
        })
    }
}