export class Analytics {
    static URL_REQ = location.protocol + '//' + location.host + '/api/admin/analytics';
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


        async function callData(khoa = -1, nganh = -1) {

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
                }, "Dashboard", "?khoa=" + khoa);
            }
            if (nganh != -1 && !knneg1) {
                window.history.replaceState({
                    nganh: nganh
                }, "Dashboard", "?nganh=" + nganh);
            }

            urlAPI = url.href;

            return axios.get(urlAPI).then(function (response) {
                let data = response.data.data;
                return data;
            });
        }

        let data = await callData();

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
                callData(parseInt(chon_khoa), parseInt(chon_nganh)).then(async () => {
                    data = await callData(parseInt(chon_khoa), parseInt(chon_nganh));
                    
                    let dataToGet = data;
                    if (chon_dot != -1)
                        dataToGet = data.dot[chon_dot];
                    
                    renderData(analytics__item, dataToGet.tong_sv, dataToGet.sv_tot_nghiep, dataToGet.sv_tre_han, dataToGet.sv_chua_tot_nghiep,
                        dataToGet.sv_bi_canh_cao, dataToGet.sv_bi_bth);
                })
            }
        }
    }
}