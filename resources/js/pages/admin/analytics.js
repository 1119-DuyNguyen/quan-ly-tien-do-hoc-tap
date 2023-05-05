import { alertComponent } from "../../components/helper/alert-component";
import { toast } from "../../components/helper/toast";

export class Analytics {
    static URL_REQ = location.protocol + '//' + location.host + '/api/admin/analytics';

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

        function renderData(elem, tong_sv, sv_tot_nghiep, sv_tre_han, sv_chua_tot_nghiep, sv_bi_canh_cao, sv_bi_bth) {
            elem[0].innerHTML = tong_sv;
            
            let ty_le_sv_tot_nghiep = parseFloat((sv_tot_nghiep / tong_sv) * 100);
            elem[1].innerHTML = (isNaN(ty_le_sv_tot_nghiep)) ? 0 : ty_le_sv_tot_nghiep + "%";

            let ty_le_sv_tre_han = parseFloat((sv_tre_han / sv_chua_tot_nghiep) * 100);
            elem[2].innerHTML = (isNaN(ty_le_sv_tre_han)) ? 0 : ty_le_sv_tre_han + "%";
            
            let ty_le_sv_chua_tot_nghiep = parseFloat((sv_chua_tot_nghiep / tong_sv) * 100);
            elem[3].innerHTML = (isNaN(ty_le_sv_chua_tot_nghiep)) ? 0 : ty_le_sv_chua_tot_nghiep + "%";

            elem[4].innerHTML = sv_bi_canh_cao;
            elem[5].innerHTML = sv_bi_bth;
        }

        let data = await Analytics.callData();

        init();

        function init() {
            let analytics__item = document.querySelectorAll(".analytics__item__title");

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
            }

            analytics__nganh__selector.onchange = () => {
                chon_nganh = analytics__nganh__selector.value;
            }

            analytics__selector.onchange = () => {
                chon_dot = analytics__selector.value;
            }

            document.querySelector("#filter").onclick = () => {
                Analytics.callData(parseInt(chon_khoa), parseInt(chon_nganh)).then(async () => {
                    data = await Analytics.callData(parseInt(chon_khoa), parseInt(chon_nganh));
                    
                    let dataToGet = data;
                    if (chon_dot != -1)
                        dataToGet = data.dot[chon_dot];
                    
                    renderData(analytics__item, dataToGet.tong_sv, dataToGet.sv_tot_nghiep, dataToGet.sv_tre_han, dataToGet.sv_chua_tot_nghiep,
                        dataToGet.sv_bi_canh_cao, dataToGet.sv_bi_bth);
                })
            }
        }
    }

    static graduate() {
        let url = location.protocol + '//' + location.host + '/graduate';

        document.getElementById('graduate__faculty').href = url + '/faculty';
        document.getElementById('graduate__class').href = url + '/class';
        document.getElementById('graduate__student').href = url + '/student';
    }

    static async class() {
        let searchbox = document.querySelector(".analytics__search input");
        let searchBtn = document.querySelector(".analytics__search button");

        searchbox.placeholder = "Nhập mã lớp";

        searchBtn.addEventListener("click", () => {
            if (searchbox.value.length > 0) {
                document.querySelector(".analytics__container").innerHTML = "";

                axios.get(Analytics.URL_REQ+"?lop="+searchbox.value).then(response => {
                    let data = response.data.data;
                    
                    let html = ``;

                    for (let i = 0; i < data.lop.length; i++) {
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
                        html += `</div>`
                    }

                    document.querySelector(".analytics__container").innerHTML = html;

                    toast({
                        title: 'Thành công',
                        message: 'Truy vấn thành công',
                        type: 'success',
                        duration: 3000
                    })
                }).catch(err => {
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

            } else {
                alertComponent("Lỗi", "Nhập lớp cần tìm!");
            }
        });
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
                    
                    console.log(element);

                    if (element.id == chon_khoa)
                        ten_khoa = element.ten;
                }

                let dataToGet = data;
                if (chon_dot != -1)
                    dataToGet = data.dot[chon_dot];
                    
                console.log(dataToGet);

                let html = ``;

                html += `<div class="analytics__item analytics__item--blue">`;
                html += `<h3>Khoa ${ten_khoa}</h3>`
                html += `<p>Số lượng sinh viên: ${dataToGet.tong_sv}</p>`
                html += `<p>Số lượng sinh viên bị trễ tiến độ: ${dataToGet.sv_tre_han}</p>`
                html += `<p>Số lượng sinh viên đã tốt nghiệp đúng hạn: ${dataToGet.sv_tot_nghiep}</p>`
                html += `<p>Số lượng sinh viên bị cảnh cáo: ${dataToGet.sv_bi_canh_cao}</p>`
                html += `<p>Số lượng sinh viên bị buộc thôi học: ${dataToGet.sv_bi_bth}</p>`
                html += `</div>`

                document.querySelector(".analytics__container").innerHTML = html;
            })
        }
    }

    static async student() {
        let searchbox = document.querySelector(".analytics__search input");
        let searchBtn = document.querySelector(".analytics__search button");

        searchbox.placeholder = "Nhập mã sinh viên";

        searchBtn.addEventListener("click", () => {

            if (searchbox.value.length > 0) {
                document.querySelector(".analytics__container").innerHTML = "";

                axios.get(Analytics.URL_REQ+"?sv="+searchbox.value).then(response => {
                    let data = response.data.data;

                    let html = ``;

                    html += `<div class="analytics__item analytics__item--blue">`;
                    html += `<h3>Thông tin cá nhân</h3>`
                    html += `<p>Mã sinh viên: ${data.ten_dang_nhap}</p>`
                    html += `<p>Họ tên: ${data.ten}</p>`
                    html += `<p>Ngày sinh: ${(data.ngay_sinh === null) ? '' : data.ngay_sinh}</p>`
                    html += `<p>Số điện thoại: ${(data.sdt === null) ? "" : data.sdt}</p>`
                    html += `<p>Giới tính: ${(data.gioi_tinh == 0) ? "Nam" : "Nữ" }</p>`
                    html += `</div>`

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
                }).catch(err => {
                    if (err.response.status === 404) {
                        toast({
                            title: "Lỗi",
                            message: "Không tìm thấy sinh viên.",
                            type: "error",
                            duration: 3000
                        })
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

            } else {
                alertComponent("Lỗi", "Nhập mã sinh viên cần tìm!");
            }
        })
    }
}