import { toast } from "../helper/toast";

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

    saveLocalStorage(keyName, value) {
        window.localStorage.setItem(keyName, JSON.stringify(value));
    }

    getLocalStorage(keyName) {
        if (window.localStorage.getItem(keyName) === null)
            this.saveLocalStorage(keyName, []);

        return JSON.parse(window.localStorage.getItem(keyName));
    }

    returnHKHienTai() {
        return axios.get(GraduateCrawler.URL_SUGGEST)
        .then(function (response) {
            let data = response.data.data;

            return data.hoc_ky_hien_tai.id;
        }).catch(err => {
            toast({
                title: "",
                message: err.data.message,
                type: 'error',
                duration: 3000
            })
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

        }).catch(err => {
            toast({
                title: "",
                message: err.data.message,
                type: 'error',
                duration: 3000
            })
        })
    }

    returnSuggestBtn() {
        return "<div style='text-align: center'><button class='btn btn--primary' style='margin-top: 1rem;' id='goi_y_hoc_phan'>Gợi ý học phần học kỳ kế</button></div>";
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

            return htmlReturn;

        }).catch(err => {
            toast({
                title: "",
                message: err.data.message,
                type: 'error',
                duration: 3000
            })
        })
    }

    listMHChon = this.getLocalStorage('listMHChon');

    static async returnDSMH(dsmon_da_pass = []) {
        return axios.get(GraduateCrawler.URL_SUGGEST)
        .then((response) => {
            let data = response.data.data;

            let ds_goi_y = Object.values(data.goi_y);

            ds_goi_y = ds_goi_y.filter(monTrongDS => {
                return !(dsmon_da_pass.indexOf(monTrongDS.hoc_phan_id) > -1);
            })
            
            return ds_goi_y;
        }).catch(err => {
            console.log(err);
            toast({
                title: "",
                message: err.data.message,
                type: 'error',
                duration: 3000
            })
        })
    }

    async renderDSMHchon(dsmon_da_pass = [], dsmon_da_chon = []) {
        let list = ``;
        let ds_goi_y = await GraduateCrawler.returnDSMH(dsmon_da_pass); // lọc theo ds đã chọn
        
        ds_goi_y = ds_goi_y.filter(hp => {
            return (dsmon_da_chon.indexOf(hp.hoc_phan_id) > -1);
        })

        for (let i = 0; i < ds_goi_y.length; i++) {
            const kq = ds_goi_y[i];
            list += `<tr>
                <td>${kq.hoc_phan_id}</td>
                <td>${kq.ten}</td>
                <td>${kq.so_tin_chi}</td>
            </tr>`
        }

        let html = ``;
        
        if (list.length > 0)
            html = `<div class="graduate__item">
                <div class="graduate__item__title">
                    Danh sách môn học gợi ý đã chọn
                </div>
                <div class="graduate__item__content">
                    <table>
                        <tr>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                            <th>STC</th>
                        </tr>
                        ${list}
                    </table>
                </div>
            </div>`;

        document.querySelector("#graduate__selected_list").innerHTML = html;
    }

    async renderDSGoiY(dsmon_da_pass = [], page = 1) {
        let ds_goi_y = await GraduateCrawler.returnDSMH(dsmon_da_pass);

        page = (page == -1) ? 1 : page;

        let list = ``;
        let itemsPerPage = 10;
        
        let totalPages = Math.ceil(ds_goi_y.length / itemsPerPage);
        let selectPage = `<select id='select_mhgoiy'>`;
        selectPage += `<option value='-1' disabled selected>Chọn trang</option>`;
        for (let i = 0; i < totalPages; i++) {
            if (page == i+1)
                selectPage += `<option value='${i+1}' selected>${i+1}</option>`;
            else
                selectPage += `<option value='${i+1}'>${i+1}</option>`;
        }
        selectPage += `</select>`;

        let start = (page - 1) * 10;
        let end = (start + itemsPerPage > ds_goi_y.length) ? ds_goi_y.length : start + itemsPerPage;
        let next_page = end < ds_goi_y.length;
        let prev_page = start - itemsPerPage >= 0;

        this.listMHChon = this.getLocalStorage("listMHChon");

        for (let i = start; i < end; i++) {
            const kq = ds_goi_y[i];

            list += `<tr>
                <td><input type='checkbox' class='chon_mh_goiy' data-hpid='${kq.hoc_phan_id}' ${(this.listMHChon.indexOf(kq.hoc_phan_id) > -1) ? 'checked' : '' }></td>
                <td>${kq.hoc_phan_id}</td>
                <td>${kq.ten}</td>
                <td>${kq.so_tin_chi}</td>
            </tr>`
        }

        let html = ``;
        
        if (list.length > 0)
            html = `<div class="graduate__item">
                <div class="graduate__item__title">
                    Danh sách môn học gợi ý cho kỳ kế
                </div>
                <div class="graduate__item__content">
                    <table>
                        <tr>
                            <th></th>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                            <th>STC</th>
                        </tr>
                        ${list}
                    </table>
                    <div class="graduate__button__container">
                    ${(prev_page) ? "<button class='btn btn--success' id='prev_mhgoiy' data-page='"+parseInt(page-1)+"'>Trang trước</button>" : '<div></div>'}
                    ${selectPage}
                    ${(next_page) ? "<button class='btn btn--success' id='next_mhgoiy' data-page='"+parseInt(page+1)+"'>Trang kế</button>" : '<div></div>'}
                    </div>
                </div>
            </div>
            <div>
                <button class='btn btn--primary' id='xac_nhan_mh_goiy' style='margin: .5rem 0'>Xác nhận</button>
            </div>`;

        return html;
    }

    paginatorAction(arr_kqdukien = [], elementToInner) {
        
        let btn_trang_truoc = document.querySelector("#prev_mhgoiy");

        if (btn_trang_truoc !== null) {
            btn_trang_truoc.addEventListener('click', async () => {
                elementToInner.innerHTML = await this.renderDSGoiY(arr_kqdukien, parseInt(btn_trang_truoc.dataset.page));
                this.paginatorAction(arr_kqdukien, elementToInner); // gọi lại để set tiếp
            })
        }

        let btn_trang_ke = document.querySelector("#next_mhgoiy");

        if (btn_trang_ke !== null) {
            btn_trang_ke.addEventListener('click', async () => {
                elementToInner.innerHTML = await this.renderDSGoiY(arr_kqdukien, parseInt(btn_trang_ke.dataset.page));
                this.paginatorAction(arr_kqdukien, elementToInner); // gọi lại để set tiếp
            })
        }

        let select_mhgoiy = document.querySelector("#select_mhgoiy");
        
        if (select_mhgoiy !== null) {
            select_mhgoiy.addEventListener('change', async () => {
                elementToInner.innerHTML = await this.renderDSGoiY(arr_kqdukien, parseInt(select_mhgoiy.value));
                this.paginatorAction(arr_kqdukien, elementToInner); // gọi lại để set tiếp
            })
        }

        let xacNhanBtn = document.querySelector("#xac_nhan_mh_goiy");
        let chon_mh_goiy = document.querySelectorAll(".chon_mh_goiy");
        
        xacNhanBtn.addEventListener('click', () => {
            this.listMHChon = this.getLocalStorage('listMHChon');

            this.renderDSMHchon(arr_kqdukien, this.listMHChon);
        })

        chon_mh_goiy.forEach(elem => {
            elem.addEventListener('click', () => {

                if (elem.checked) 
                    this.listMHChon.push(parseInt(elem.dataset.hpid));
                else
                    this.listMHChon.splice(this.listMHChon.indexOf(elem.dataset.hpid), 1);

                this.saveLocalStorage('listMHChon', this.listMHChon);
            })
        })
    }
}