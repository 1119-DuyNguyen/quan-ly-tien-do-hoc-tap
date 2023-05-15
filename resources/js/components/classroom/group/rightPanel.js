export class RightPanel {
    static URL_RIGHTPANEL_SINHVIEN = location.protocol + '//' + location.host + '/api/right-panel-sinh-vien';
    static URL_POST = location.protocol + '//' + location.host + '/api/posts';
    static URL_BAI_TAP_SINH_VIEN = location.protocol + '//' + location.host + '/api/bai-tap-sinh-vien';
    #container;
    constructor(element) {
        this.#container = element;
    }

    async getBaiTapRightPanel(id_nhom_hoc) {
        this.#container.innerHTML = `<loader-component></loader-component>`;
        var dataRightPanel;
        var tungBaiTapData;
        let html = '';
        let url = new URL(window.location.href);
        const urlNew = new URL(RightPanel.URL_RIGHTPANEL_SINHVIEN + `/${id_nhom_hoc}`);
        urlNew.searchParams.set('page', url.searchParams.get('page'));
        axios
            .get(urlNew)
            .then((response) => {
                return response.data.data;
            })
            .then(async (data) => {
                dataRightPanel = data.dataObject ? data.dataObject : [];

                let dataTungBaiTap = await axios.get(RightPanel.URL_BAI_TAP_SINH_VIEN).then(function (response) {
                    return response.data.data;
                });
                tungBaiTapData = dataTungBaiTap ? dataTungBaiTap : [];

                dataRightPanel.forEach((element) => {
                    let doneBaiTap = false;
                    tungBaiTapData.forEach((ele, index) => {
                        if (ele.bai_tap_id === element.bai_dang_id) {
                            doneBaiTap = true;
                        }
                    });

                    let now = new Date();
                    let ngay_ket_thuc = new Date(element.ngay_ket_thuc);
                    let ngay_con_lai = Math.round(Math.abs(now - ngay_ket_thuc) / 86400000);

                    html += `
                        <div class="exercise__content--item">
                            <div class="exercise__content--item--name">
                                ${element.tieu_de}
                            </div>
                            <div class="exercise__content--item--time">${ngay_con_lai} d</div>
                            <div class="exercise__content--item--status">`;

                    if (doneBaiTap) {
                        html += `<span>Đã hoàn thành</span>`;
                    } else {
                        html += `<span>Chưa hoàn thành</span>`;
                    }

                    html += `<img src="../img/clock.png" />
                                </div>
                            <div class="exercise__content--item--option">Nộp bài</div>
                        </div>`;
                });
                this.#container.innerHTML = html;
            });
    }
}
