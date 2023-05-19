import { alertComponent } from "../../components/helper/alert-component";
import NiceSelect from "../../components/helper/nice-select";
import { toast } from "../../components/helper/toast";
import { PaginationService } from "../../components/smart-table-template/services/PaginationService";
import { TableTree } from "../../components/table-tree";
import { routeHref } from "../../routes/route";

export class Analytics {
    static URL_REQ = location.protocol + '//' + location.host + '/api/admin/analytics';
    static URL_CLASS = location.protocol + '//' + location.host + '/api/admin/class';
    static URL_SV = location.protocol + '//' + location.host + '/api/graduate-on-edu-program';
    static URL = location.protocol + '//' + location.host + '/graduate';
    static URL_SV_LIST = location.protocol + '//' + location.host + '/api/admin/get_students_list';

    static async callData(khoa = -1, nganh = -1) {

        let urlAPI = Analytics.URL_REQ;
        let urlCurLocation = new URL(window.location.href);
        
        khoa = (isNaN(khoa) ? -1 : khoa);
        nganh = (isNaN(nganh) ? -1 : nganh);

        let knneg1 = false;
        if (khoa == -1 && nganh == -1) {
            urlCurLocation.searchParams.delete('khoa');
            urlCurLocation.searchParams.delete('nganh');
            window.history.replaceState({}, "Dashboard", urlCurLocation.href);
            knneg1 = true;
        }

        let url = new URL(urlAPI);

        let keys = urlCurLocation.searchParams.keys();

        for (const key of keys) {
            url.searchParams.set(key, urlCurLocation.searchParams.get(key));
        }

        if (khoa != -1 && !knneg1) {
            window.history.replaceState({
                khoa: khoa
            }, "", "?khoa=" + khoa);
        }
        if (nganh != -1 && !knneg1) {
            window.history.replaceState({
                nganh: nganh
            }, "", "?nganh=" + nganh);
        }

        urlAPI = url.href;

        return axios.get(urlAPI).then(function (response) {
            let data = response.data.data;
            return data;
        });
    }

    static async index() {

        function renderData(elem, tong_sv, sv_tot_nghiep, sv_tre_han, sv_chua_tot_nghiep, sv_bi_canh_cao, sv_bi_bth, chon_khoa = -1, chon_dot = -1) {
            elem[0].innerHTML = tong_sv;
            
            let ty_le_sv_tot_nghiep = parseFloat((sv_tot_nghiep / tong_sv) * 100).toFixed(2);
            elem[1].innerHTML = (isNaN(ty_le_sv_tot_nghiep)) ? 0 : ty_le_sv_tot_nghiep + "%";

            let ty_le_sv_tre_han = parseFloat((sv_tre_han / sv_chua_tot_nghiep) * 100).toFixed(2);
            elem[2].innerHTML = (isNaN(ty_le_sv_tre_han)) ? 0 : ty_le_sv_tre_han + "%";
            
            let ty_le_sv_chua_tot_nghiep = parseFloat((sv_chua_tot_nghiep / tong_sv) * 100).toFixed(2);
            elem[3].innerHTML = (isNaN(ty_le_sv_chua_tot_nghiep)) ? 0 : ty_le_sv_chua_tot_nghiep + "%";

            elem[4].innerHTML = sv_bi_canh_cao;
            elem[5].innerHTML = sv_bi_bth;

            document.querySelector('#second__part').setAttribute('style', 'display: grid;');

            document.querySelector('#non_graduated').innerHTML = `<div id="dssv_chua_tn" class="graduate__container">
                <div class="graduate__item__content">
                    <table>
                        <tbody></tbody>
                    </table>
                </div>
            </div>`
            document.querySelector('#suspended').innerHTML = `<div id="dssv_bth">
                <div class="graduate__item__content">
                    <table>
                        <tbody></tbody>
                    </table>
                </div>
            </div>`

            axios.get(Analytics.URL_SV_LIST + '/' + chon_khoa + '/' + 'type/non_graduated').then(response => {
                let data = response.data.data;

                if (data.dataObject.length > 0) {

                    const renderDataChuaTN = async () => {
                        const queryString = window.location.search;
                        const urlParams = new URLSearchParams(queryString);
                        const page = (urlParams.get('page') === null) ? 1 : urlParams.get('page');

                        let dssv = await axios.get(Analytics.URL_SV_LIST + '/' + chon_khoa + '/' + 'type/non_graduated?page='+page).then(response => response.data.data)

                        document.querySelector("#non_graduated tbody").innerHTML = `<tr>
                            <th>Mã sinh viên</th>
                            <th>Tên sinh viên</th>
                        </tr>`
                        dssv.dataObject.forEach(element => {
                            let html = `<tr>
                                <td>${element.ten_dang_nhap}</td>
                                <td>${element.ten}</td>
                            </tr>`;
                            document.querySelector("#non_graduated tbody").insertAdjacentHTML('beforeend', html);
                        });
                    }

                    let paginateContainer = new PaginationService(document.querySelector('#dssv_chua_tn'), renderDataChuaTN, data.paginationOption);
                    paginateContainer.renderPagination();

                    renderDataChuaTN();
                } else {
                    document.querySelector('#non_graduated').innerHTML = ">>> Không tìm thấy sinh viên <<<";
                }
            })
            axios.get(Analytics.URL_SV_LIST + '/' + chon_khoa + '/' + 'type/suspended').then(response => {
                let data = response.data.data

                if (data.dataObject.length > 0) {

                    const renderDataBTH = async () => {
                        const queryString = window.location.search;
                        const urlParams = new URLSearchParams(queryString);
                        const page = (urlParams.get('page') === null) ? 1 : urlParams.get('page');

                        let dssv = await axios.get(Analytics.URL_SV_LIST + '/' + chon_khoa + '/' + 'type/suspended?page='+page).then(response => response.data.data)

                        document.querySelector("#suspended tbody").innerHTML = `<tr>
                            <th>Mã sinh viên</th>
                            <th>Tên sinh viên</th>
                        </tr>`
                        dssv.dataObject.forEach(element => {
                            let html = `<tr>
                                <td>${element.ten_dang_nhap}</td>
                                <td>${element.ten}</td>
                            </tr>`;
                            document.querySelector("#suspended tbody").insertAdjacentHTML('beforeend', html);
                        });
                    }

                    let paginateContainer = new PaginationService(document.querySelector('#dssv_bth'), renderDataBTH, data.paginationOption);
                    paginateContainer.renderPagination();

                    renderDataBTH();
                } else {
                    document.querySelector('#suspended').innerHTML = ">>> Không tìm thấy sinh viên <<<";
                }
            })

            
        }

        let data = await Analytics.callData();

        init();

        function init() {
            let analytics__item = document.querySelectorAll(".analytics__item__title");

            document.querySelector('#second__part').setAttribute('style', 'display: none;');

            renderData(analytics__item, data.tong_sv, data.sv_tot_nghiep, data.sv_tre_han, data.sv_chua_tot_nghiep, data.sv_bi_canh_cao, data.sv_bi_bth);

            let analytics__selector = document.querySelector("#analytics__selector");
            let analytics__khoa__selector = document.querySelector("#analytics__khoa__selector");
            let analytics__nganh__selector = document.querySelector("#analytics__nganh__selector");

            let chon_khoa = -1, chon_nganh = -1, chon_dot = -1;
            
            data.moc_thoi_gian_tot_nghiep.forEach(moc_tg => {
                let elem;
                elem = document.createElement('option');
                elem.innerText = moc_tg.ten;
                elem.value = moc_tg.id;
                analytics__selector.add(elem);
            });

            let niceSelectorDot = new NiceSelect(analytics__selector, {
                searchable: true,
                maxSelectedOption: 1
            })
            data.khoa.forEach(khoa => {
                let elem;
                elem = document.createElement('option');
                elem.innerText = khoa.ten;
                elem.value = khoa.id;
                analytics__khoa__selector.add(elem);
            });

            analytics__khoa__selector.onchange = () => {
                analytics__nganh__selector.innerHTML = '<option value="-1" selected>Tất cả ngành thuộc khoa</option>';
                chon_khoa = analytics__khoa__selector.value;

                data.nganh.forEach(nganh => {
                    let elem;
                    if (nganh.khoa_id == analytics__khoa__selector.value) {
                        elem = document.createElement('option');
                        elem.innerText = nganh.ten;
                        elem.value = nganh.id;
                        analytics__nganh__selector.add(elem);
                    }
                });

                niceSelectorNganh.destroy();
                niceSelectorNganh = new NiceSelect(analytics__nganh__selector, {
                    searchable: true,
                    maxSelectedOption: 1
                })
            }

            let niceSelectorKhoa = new NiceSelect(analytics__khoa__selector, {
                searchable: true,
                maxSelectedOption: 1
            })

            analytics__nganh__selector.onchange = () => {
                chon_nganh = analytics__nganh__selector.value;
            }

            analytics__selector.onchange = () => {
                chon_dot = analytics__selector.value;
            }

            let niceSelectorNganh = new NiceSelect(analytics__nganh__selector, {
                searchable: true,
                maxSelectedOption: 1
            })

            document.querySelector("#filter").onclick = () => {
                Analytics.callData(parseInt(chon_khoa), parseInt(chon_nganh)).then(async () => {
                    data = await Analytics.callData(parseInt(chon_khoa), parseInt(chon_nganh));
                    
                    let dataToGet = data;
                    if (chon_dot != -1)
                        dataToGet = data.dot[chon_dot];
                    
                    renderData(analytics__item, dataToGet.tong_sv, dataToGet.sv_tot_nghiep, dataToGet.sv_tre_han, dataToGet.sv_chua_tot_nghiep,
                        dataToGet.sv_bi_canh_cao, dataToGet.sv_bi_bth, chon_khoa, chon_dot);
                })
            }
        }
    }

    static graduate() {
        let url = location.protocol + '//' + location.host + '/graduate';

        document.getElementById('graduate__faculty').addEventListener('click', () => routeHref(url + '/faculty'))
        document.getElementById('graduate__class').addEventListener('click', () => routeHref(url + '/class'))
        document.getElementById('graduate__student').addEventListener('click', () => routeHref(url + '/student'))
    }

    static renderTTLop(class_idn, type) {
        document.querySelector(".analytics__container").innerHTML = "";

        let param = (type == "chi_tiet") ? "tt_lop" : "lop";

        axios.get(Analytics.URL_REQ+`?${param}=`+class_idn).then(async response => {
            let data = response.data.data;
            
            let html = ``, ma_lop_lay_duoc = null;

            if (typeof data.lop.length == "undefined") {

                const ma_lop = data.lop.ma_lop;
                ma_lop_lay_duoc = data.lop.ma_lop;
                const nd_lop = data.noi_dung_lop[0];

                html += `<div class="analytics__item analytics__item--blue">`;
                html += `<h3>${ma_lop}</h3>`
                html += `<p>Số lượng sinh viên: ${nd_lop.tong_sv}</p>`
                html += `<p>Số lượng sinh viên bị trễ tiến độ: ${nd_lop.sv_tre_han}</p>`
                html += `<p>Số lượng tín chỉ trung bình đạt được: ${nd_lop.stc_trung_binh}</p>`
                html += `<p>Số lượng sinh viên đã tốt nghiệp: ${nd_lop.sv_tot_nghiep}</p>`
                html += `<p>Số lượng sinh viên bị cảnh cáo: ${nd_lop.sv_bi_canh_cao}</p>`
                html += `<p>Số lượng sinh viên bị buộc thôi học: ${nd_lop.sv_bi_bth}</p>`
                html += `</div>`

                html += `<div class="analytics__item analytics__item">`

                html += `<h3>Danh sách sinh viên thuộc lớp ${ma_lop}</h3>`
                
                html += `<div id="dssv_table" class="graduate__container">
                    <div class="graduate__item__content">
                        <table>
                            <tr>
                                <th>Mã sinh viên</th>
                                <th>Tên sinh viên</th>
                                <th>Hành động</th>
                            </tr>
                        </table>
                    </div>
                </div>`

                html += `</div>`

            } else for (let i = 0; i < data.lop.length; i++) {
                const ma_lop = data.lop[i].ma_lop;
                const nd_lop = data.noi_dung_lop[i];
                
                html += `<div class="analytics__item analytics__item--blue">`;
                html += `<h3>${ma_lop}</h3>`
                html += `<p>Số lượng sinh viên: ${nd_lop.tong_sv}</p>`
                html += `<p>Số lượng sinh viên bị trễ tiến độ: ${nd_lop.sv_tre_han}</p>`
                html += `<p>Số lượng tín chỉ trung bình đạt được: ${nd_lop.stc_trung_binh}</p>`
                html += `<p>Số lượng sinh viên đã tốt nghiệp: ${nd_lop.sv_tot_nghiep}</p>`
                html += `<p>Số lượng sinh viên bị cảnh cáo: ${nd_lop.sv_bi_canh_cao}</p>`
                html += `<p>Số lượng sinh viên bị buộc thôi học: ${nd_lop.sv_bi_bth}</p>`
                html += `<p><a href="${Analytics.URL + '/class/' +ma_lop}" class="xem__chi__tiet__lop">Xem chi tiết</a></p>`
                html += `</div>`
            }

            document.querySelector(".analytics__container").innerHTML = html;

            document.querySelectorAll('.xem__chi__tiet__lop').forEach(elem => {
                elem.addEventListener('click', () => routeHref(elem.href))
            })

            document.querySelector(".analytics__container").classList.add("analytics__container--1_column");

            toast({
                title: 'Thành công',
                message: 'Truy vấn thành công',
                type: 'success',
                duration: 3000
            })

            //  Sau khi render table

            if (typeof data.lop.length != "undefined") return;

            let dssv_table = document.querySelector("#dssv_table");
            let dssv = await axios.get(Analytics.URL_CLASS + '/' + class_idn + '/students').then(response => response.data.data)

            const renderDataPhanTrang = async () => {

                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const page = (urlParams.get('page') === null) ? 1 : urlParams.get('page');

                let dssv = await axios.get(Analytics.URL_CLASS + '/' + ma_lop_lay_duoc + '/students?page='+page).then(response => response.data.data)
                document.querySelector("#dssv_table tbody").innerHTML = `<tr>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Hành động</th>
                    </tr>`;
                dssv.dataObject.forEach(element => {
                    let html = `<tr>
                        <td>${element.ten_dang_nhap}</td>
                        <td>${element.ten}</td>
                        <td><a class='xem__chi__tiet__sv' href='${Analytics.URL + '/class/' + ma_lop_lay_duoc + '/' + element.ten_dang_nhap}'>Xem chi tiết</a></td>
                    </tr>`;
                    document.querySelector("#dssv_table tbody").insertAdjacentHTML('beforeend', html);
                });
                document.querySelectorAll('.xem__chi__tiet__sv').forEach(elem => {
                    elem.addEventListener('click', () => routeHref(elem.href))
                })
            };

            renderDataPhanTrang();

            let paginateContainer = new PaginationService(dssv_table, renderDataPhanTrang,dssv.paginationOption);
            paginateContainer.renderPagination();
        }).catch(err => {
            console.error(err);
            if (err.response.status === 404) {
                toast({
                    title: "Lỗi",
                    message: "Không tìm thấy lớp cần tìm.",
                    type: "error",
                    duration: 3000
                })
            } else {
                console.error(err);
                toast({
                    title: "Lỗi",
                    message: "Xảy ra lỗi phía máy chủ.",
                    type: "error",
                    duration: 3000
                })
            }
        });
    }

    static async class({class_idn, sv_username}) {

        if (typeof sv_username === "string") {
            document.querySelector(".analytics__search.analytics__select__container").innerHTML = "";
            document.querySelector(".analytics__container").classList.add("analytics__container--1_column");
            Analytics.renderTTSV(sv_username, true);
        } else if (typeof class_idn === "string") {
            document.querySelector(".analytics__search.analytics__select__container").innerHTML = "";
            Analytics.renderTTLop(class_idn, "chi_tiet")
        } else {
            let searchbox = document.querySelector(".analytics__search input");
            let searchBtn = document.querySelector(".analytics__search button");

            searchbox.placeholder = "Nhập mã lớp";

            searchBtn.addEventListener("click", () => {
                if (searchbox.value.length > 0) {
                    
                    Analytics.renderTTLop(searchbox.value, "")

                } else {
                    alertComponent("Lỗi", "Nhập lớp cần tìm!");
                }
            });
        }
    }

    static async faculty() {
        let data = await Analytics.callData();

        let analytics__selector = document.querySelector("#analytics__selector");
        let analytics__khoa__selector = document.querySelector("#analytics__khoa__selector");

        let chon_khoa = 1, chon_dot = -1;
            
        data.moc_thoi_gian_tot_nghiep.forEach(moc_tg => {
            let elem;
            elem = document.createElement('option');
            elem.innerText = moc_tg.ten;
            elem.value = moc_tg.id;
            analytics__selector.add(elem);
        });
        data.khoa.forEach(khoa => {
            let elem;
            elem = document.createElement('option');
            elem.innerText = khoa.ten;
            elem.value = khoa.id;
            analytics__khoa__selector.add(elem);
        });

        analytics__selector.onchange = () => {
            chon_dot = analytics__selector.value;
        }

        analytics__khoa__selector.onchange = () => {
            chon_khoa = analytics__khoa__selector.value;
        }

        document.querySelector("#filter").onclick = () => {
            Analytics.callData(parseInt(chon_khoa)).then(async () => {
                data = await Analytics.callData(parseInt(chon_khoa));
                let ten_khoa = '';
                for (let i = 0; i < data.khoa.length; i++) {
                    const element = data.khoa[i];

                    if (element.id == chon_khoa)
                        ten_khoa = element.ten;
                }

                let dataToGet = data;
                if (chon_dot != -1)
                    dataToGet = data.dot[chon_dot];

                let html = ``;

                html += `<div class="analytics__item analytics__item--blue">`;
                html += `<h3>Khoa ${ten_khoa}</h3>`
                html += `<p>Số lượng sinh viên: ${dataToGet.tong_sv}</p>`
                html += `<p>Số lượng sinh viên bị trễ tiến độ: ${dataToGet.sv_tre_han}</p>`
                html += `<p>Số lượng sinh viên đã tốt nghiệp đúng hạn: ${dataToGet.sv_tot_nghiep}</p>`
                html += `<p>Số lượng sinh viên bị cảnh cáo: ${dataToGet.sv_bi_canh_cao}</p>`
                html += `<p>Số lượng sinh viên bị buộc thôi học: ${dataToGet.sv_bi_bth}</p>`
                html += `</div>`

                if (typeof dataToGet.ds_lop != 'undefined') {
                    if (dataToGet.ds_lop.length > 0) {
                        html += `<div class="analytics__item">`;
                        html += `<h3>Danh sách lớp thuộc khoa ${ten_khoa}</h3>`

                        let list = ``;
                        
                        dataToGet.ds_lop.forEach(element => {
                            list += `<tr>
                                <td>${element.ma_lop}</td>
                                <td>${element.ten_lop}</td>
                                <td>${element.so_luong_sinh_vien}</td>
                                <td><a class='xem__chi__tiet__lop' href="${Analytics.URL + '/class/' +element.ma_lop}">Xem chi tiết</a></td>
                            </tr>`;
                        });

                        html += `<div class="graduate__container">
                            <div class="graduate__item__content" style="max-height: 15rem; overflow-y: auto">
                                <table>
                                    <tr>
                                        <th>Mã lớp</th>
                                        <th>Tên lớp</th>
                                        <th>Số lượng sinh viên</th>
                                        <th>Hành động</th>
                                    </tr>
                                    ${list}
                                </table>
                            </div>
                        </div>`

                        html += `</div>`
                    }
                }

                document.querySelector(".analytics__container").innerHTML = html;

                document.querySelectorAll('.xem__chi__tiet__lop').forEach(elem => {
                    elem.addEventListener('click', () => routeHref(elem.href))
                })
            })
        }
    }

    static renderTTSV(sv_username, show_ttcn) {
        document.querySelector(".analytics__container").innerHTML = "<loader-component></loader-component>";

        let url = '';

        if (show_ttcn) url = Analytics.URL_REQ+"?sv="+sv_username;
        else url = Analytics.URL_SV;

        axios.get(url).then(response => {
            const data = response.data.data;

            console.log(data);

            let html = ``;

            if (show_ttcn) {
                html += `<div class="analytics__item analytics__item--blue">`;
                html += `<h3>Thông tin cá nhân</h3>`
                html += `<p>Mã sinh viên: ${data.ten_dang_nhap}</p>`
                html += `<p>Họ tên: ${data.ten}</p>`
                html += `<p>Ngày sinh: ${(data.ngay_sinh === null) ? '' : data.ngay_sinh}</p>`
                html += `<p>Số điện thoại: ${(data.sdt === null) ? "" : data.sdt}</p>`
                html += `<p>Giới tính: ${(data.gioi_tinh == 0) ? "Nam" : "Nữ" }</p>`
                html += `</div>`
            }

            // Chương trình đào tạo

            if (data.chuong_trinh_dao_tao !== null)
                html += `<div class="analytics__item analytics__item--green">
                    <h2>${data.chuong_trinh_dao_tao.ten}</h2>
                    <p>Trình độ đào tạo: ${data.chuong_trinh_dao_tao.trinh_do_dao_tao ?? ''}</p>
                    <p>Ngành đào tạo: ${data.chuong_trinh_dao_tao.ten_nganh ?? ''}</p>													
                    <p>Mã ngành: ${data.chuong_trinh_dao_tao.nganh_id ?? ''}</p>													
                    <p>Hình thức đào tạo: ${data.chuong_trinh_dao_tao.hinh_thuc_dao_tao ?? ''}</p>													
                    <p>Thời gian đào tạo:${data.chuong_trinh_dao_tao.thoi_gian_dao_tao ?? '0'} năm </p>													
                    <p>Chu kỳ: ${data.chuong_trinh_dao_tao.ten_chu_ky}</p>													
                    <p>Tín chỉ tối thiểu:  ${data.chuong_trinh_dao_tao.tong_tin_chi}</p>													
                    <p>Ghi chú:  ${data.chuong_trinh_dao_tao.ghi_chu ?? 'Không'}</p>													                       
                </div>`
            else document.querySelector(".analytics__container").innerHTML = "Không tìm thấy chương trình đào tạo!";


            // Danh sách học phần theo tiến độ

            html += `<div class="analytics__item analytics__item">`

            let list = ``, check, sltc;
            
            data.dshp = Object.values(data.dshp)
            
            let depth;
            data.dshp.forEach(kkt => {

                if (typeof kkt == 'string')
                {
                    html += `<h3>Danh sách học phần theo tiến độ ${kkt}</h3>`
                    return;
                }

                depth = 0;

                list += `<tr data-depth="${depth++}" class='collapse'>
                    <td colspan="8" style='text-align: left; font-weight: bold' class='toggle'>${kkt.ten_muc_luc}</td>
                </tr>`;

                if (kkt.ten_loai_kien_thuc !== null) {
                    list += `<tr data-depth="${depth++}" class='collapse'>
                        <td colspan="8" style='text-align: left; font-weight: bold' class='toggle'>${kkt.ten_loai_kien_thuc}</td>
                    </tr>`;
                }

                if (typeof kkt.ds_hp_batbuoc != 'undefined')
                {
                    sltc = 0;
                    kkt.ds_hp_batbuoc.forEach(hp => sltc += hp.so_tin_chi)

                    if (kkt.ds_hp_batbuoc.length > 0)
                        list += `<tr data-depth="${depth}" class='collapse'>
                            <td colspan="8" style='text-align: left; font-weight: bold' class='toggle'>${kkt.ten}</td>
                        </tr>
                        <tr data-depth="${depth+1}" style="height: 2rem" class='collapse'>
                            <td colspan="4" style="text-align: left" class='toggle'>Bắt buộc</td>
                            <td style="text-align: center"><i>${sltc}</i></td>
                            <td colspan="2"></td>
                        </tr>`;
                    kkt.ds_hp_batbuoc.forEach(hp => {
                        check = false;
                        for (let i = 0; i < data.dshp_sv.length; i++) {
                            const hpsv = data.dshp_sv[i];
                            if (hpsv.id == hp.hoc_phan_id && hpsv.diem_tong_ket !== null) {
                                list += `<tr data-depth="${depth+2}">
                                    <td>${hp.ma_hoc_phan}</td>
                                    <td style='text-align: left'>${hp.ten}</td>
                                    <td style='text-align: center'>${hpsv.diem_tong_ket}</td>
                                    <td>${(hpsv.diem_he_4 === null) ? '' : hpsv.diem_he_4}</td>
                                    <td>${hp.so_tin_chi}</td>
                                    <td>${(hpsv.qua_mon == 1) ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>'}</td>
                                    <td><input type="checkbox" checked disabled></td>
                                </tr>`;
                                check = true;
                                break;
                            }
                        }
                        if (!check) {
                            list += `<tr data-depth="${depth+2}">
                                <td>${hp.ma_hoc_phan}</td>
                                <td style='text-align: left'>${hp.ten}</td>
                                <td></td>
                                <td></td>
                                <td>${hp.so_tin_chi}</td>
                                <td></td>
                                <td><input type="checkbox" disabled></td>
                            </tr>`;
                        }
                    })
                }

                if (typeof kkt.ds_hp_tuchon != 'undefined')
                {
                    sltc = 0;
                    kkt.ds_hp_tuchon.forEach(hp => sltc += hp.so_tin_chi)
                    if (kkt.ds_hp_tuchon.length > 0)
                        list += `<tr data-depth="${depth+1}" class='collapse'>
                            <td colspan="4" style='text-align: left' class='toggle'>Tự chọn</td>
                            <td style="text-align: center;"><i>${sltc}</i></td>
                            <td colspan="2"></td>
                        </tr>`;
                    kkt.ds_hp_tuchon.forEach(hp => {
                        check = false;
                        for (let i = 0; i < data.dshp_sv.length; i++) {
                            const hpsv = data.dshp_sv[i];
                            if (hpsv.id == hp.hoc_phan_id && hpsv.diem_tong_ket !== null) {
                                list += `<tr data-depth="${depth+2}">
                                    <td>${hp.ma_hoc_phan}</td>
                                    <td style='text-align: left'>${hp.ten}</td>
                                    <td style='text-align: center'>${hpsv.diem_tong_ket}</td>
                                    <td>${(hpsv.diem_he_4 === null) ? '' : hpsv.diem_he_4}</td>
                                    <td>${hp.so_tin_chi}</td>
                                    <td>${(hpsv.qua_mon == 1) ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>'}</td>
                                    <td><input type="checkbox" checked disabled></td>
                                </tr>`;
                                check = true;
                                break;
                            }
                        }
                        if (!check) {
                            list += `<tr data-depth="${depth+2}">
                                <td>${hp.ma_hoc_phan}</td>
                                <td style='text-align: left'>${hp.ten}</td>
                                <td></td>
                                <td></td>
                                <td>${hp.so_tin_chi}</td>
                                <td></td>
                                <td><input type="checkbox" disabled></td>
                            </tr>`;
                        }
                    })
                }

                });

            html += `<div class="graduate__container" style="max-height: 32rem; overflow-y: auto">
                <div class="graduate__item__content table-container">
                    <table>
                        <tr>
                            <th>Mã học phần</th>
                            <th style='width: 35%; text-align: left'>Tên học phần</th>
                            <th style='width: auto; text-align: center'>Điểm tổng kết</th>
                            <th>Điểm hệ 4</th>
                            <th>STC</th>
                            <th>Qua môn</th>
                            <th>Đã học</th>
                        </tr>
                        ${list}
                    </table>
                </div>
            </div>`

            html += `</div>`

            // tiến độ

            html += `<div class="analytics__item analytics__item--blue">`;
            html += `<h3>Tiến độ học tập</h3>`
            html += `<p>Số tín chỉ tích luỹ: ${data.stc_dat}</p>`
            html += `<p>Số tín chỉ chưa đạt: ${data.stc_chuadat}</p>`
            html += `<p>Điểm trung bình học kỳ toàn khoá (hệ 10): ${data.tong_dtb_hk}</p>`
            html += `<p>Điểm trung bình học kỳ toàn khoá (hệ 4): ${data.tong_dtb_hk4}</p>`
            html += `<p>Số tín chỉ đã đạt học kỳ gần nhất: ${data.stc_dat_gannhat}</p>`
            html += `<p>Điểm trung bình học kỳ gần nhất (hệ 10): ${data.dtb_hk_gan_nhat}</p>`
            html += `<p>Điểm trung bình học kỳ gần nhất (hệ 4): ${data.dtb_hk4_gan_nhat}</p>`
            html += `</div>`

            document.querySelector(".analytics__container").innerHTML = html;

            // Sau khi render bảng

            document.querySelectorAll('table').forEach(elem => TableTree.bind(elem));
        }).catch(err => {
            console.error(err);
            if (err.response.status === 404) {
                toast({
                    title: "Lỗi",
                    message: "Không tìm thấy sinh viên.",
                    type: "error",
                    duration: 3000
                })
                document.querySelector(".analytics__container").innerHTML = "";
            } else {
                toast({
                    title: "Lỗi",
                    message: "Xảy ra lỗi phía máy chủ.",
                    type: "error",
                    duration: 3000
                })
                console.error(err);
            }
        })
    }

    static async student({sv_username}) {

        if (typeof sv_username === "string") {
            document.querySelector(".analytics__search.analytics__select__container").innerHTML = "";
            Analytics.renderTTSV(sv_username, true);
        } else {
            let searchbox = document.querySelector(".analytics__search input");
            let searchBtn = document.querySelector(".analytics__search button");

            searchbox.placeholder = "Nhập mã sinh viên";

            searchBtn.addEventListener("click", () => {

                if (searchbox.value.length > 0) {
                    
                    Analytics.renderTTSV(searchbox.value, true);

                } else {
                    alertComponent("Lỗi", "Nhập mã sinh viên cần tìm!");
                }
            })
        }
    }
}