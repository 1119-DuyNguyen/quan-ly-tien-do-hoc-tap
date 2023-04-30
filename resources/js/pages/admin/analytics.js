export class Analytics {
    static URL_REQ = location.protocol + '//' + location.host + '/api/admin/analytics';
    static async index() {

        function renderData(elem, tong_sv, sv_tot_nghiep, sv_tre_han, sv_chua_tot_nghiep) {
            elem[0].innerHTML = tong_sv;
            elem[1].innerHTML = parseFloat((sv_tot_nghiep / tong_sv) * 100) + "%";
            elem[2].innerHTML = parseFloat((sv_tre_han / sv_chua_tot_nghiep) * 100) + "%";
            elem[3].innerHTML = parseFloat((sv_chua_tot_nghiep / tong_sv) * 100) + "%";
        }

        axios.get(Analytics.URL_REQ).then(function (response) {
            let data = response.data.data;

            console.log(data);
            
            let analytics__item = document.querySelectorAll(".analytics__item__title");

            renderData(analytics__item, data.tong_sv, data.sv_tot_nghiep, data.sv_tre_han, data.sv_chua_tot_nghiep);

            let analytics__selector = document.querySelector("#analytics__selector");
            
            data.moc_thoi_gian_tot_nghiep.forEach(moc_tg => {
                let elem;
                elem = document.createElement('option');
                elem.innerText = moc_tg.ten;
                elem.value = moc_tg.id;
                analytics__selector.add(elem);
            });

            analytics__selector.onchange = () => {
                if (analytics__selector.value != -1) {

                    let dataToGet = data.dot[analytics__selector.value];

                    renderData(analytics__item, dataToGet.tong_sv, dataToGet.sv_tot_nghiep, dataToGet.sv_tre_han, dataToGet.sv_chua_tot_nghiep);

                } else renderData(analytics__item, data.tong_sv, data.sv_tot_nghiep, data.sv_tre_han, data.sv_chua_tot_nghiep);
            }
        })
    }
}