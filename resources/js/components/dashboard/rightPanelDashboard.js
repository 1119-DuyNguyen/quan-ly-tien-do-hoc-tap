function getBaiTapSinhVien() {
    const URL_RIGHTPANEL_SINHVIEN = location.protocol + '//' + location.host + '/api/right-panel-sinh-vien';
    const URL_BAI_TAP_SINH_VIEN = location.protocol + '//' + location.host + '/api/bai-tap-sinh-vien';
    const rightPanelBaiTapContainer = document.getElementById('right-panel-dashboard__deadline');
    rightPanelBaiTapContainer.innerHTML = `<loader-component></loader-component>`;
    var dataRightPanel;
    var tungBaiTapData;
    let html = '';
    let url = new URL(window.location.href);
    const urlNew = new URL(URL_RIGHTPANEL_SINHVIEN);
    urlNew.searchParams.set('page', url.searchParams.get('page'));
    axios
        .get(urlNew)
        .then((response) => {
            return response.data.data;
        })
        .then(async (data) => {
            dataRightPanel = data.dataObject ? data.dataObject : [];

            let dataTungBaiTap = await axios.get(URL_BAI_TAP_SINH_VIEN).then(function (response) {
                return response.data.data;
            });
            tungBaiTapData = dataTungBaiTap ? dataTungBaiTap : null;

            if (tungBaiTapData == null) {
                rightPanelBaiTapContainer.innerHTML = `<div class="deadline__item">
                    <div class="deadline__item--subject">
                        Không có bài tập nào
                    </div>
                </div>`;
            }

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

                html += `<a href="/classroom/${element.nhom_hoc_id}" style="text-decoration: none;">
                            <div class="deadline__item">
                                <div class="deadline__item--subject">
                                    ${element.tieu_de}
                                </div>
                                <div class="deadline__item--time">${ngay_con_lai} ngày</div>
                                <div class="deadline__item--bio">
                                    ${element.noi_dung}
                                </div>
                            `;

                if (doneBaiTap) {
                    html += `<span>Đã hoàn thành</span>`;
                } else {
                    html += `<span>Chưa hoàn thành</span>`;
                }
                html += `</div></a>`;
            });
            rightPanelBaiTapContainer.innerHTML = html;
        });
}

export class RightPanelDashboard {
    run() {
        getBaiTapSinhVien();
    }
}
