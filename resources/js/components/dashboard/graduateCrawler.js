export class GraduateCrawler {
    static URL_REQ = location.protocol + '//' + location.host + '/api/graduate';
    run() {
        axios.get(GraduateCrawler.URL_REQ)
        .then(function (response) {
            let data = response.data.data;

            let bien_che = data.bien_che;
            let hoc_phan = data.hoc_phan;

            function getFromHocPhan(id, data = 'ma_hoc_phan') {
                for (let i = 0; i < hoc_phan.length; i++) {
                    const hp = hoc_phan[i];
                    if (hp.id === id)
                        return hp[data];
                }
            }

            let ket_qua = data.ket_qua;

            let graduate__container = document.querySelector('.graduate__container');
            graduate__container.innerHTML = '';
            let stt = 0, html, list = ``, stc_dat, tong_stc;
            bien_che.forEach(hk => {
                // Init
                stt = 0;
                stc_dat = 0;
                tong_stc = 0;
                list = ``;
                for (let i = 0; i < ket_qua.length; i++) {
                    const kq = ket_qua[i];
                    if (hk.id == kq.bien_che_id) {
                        stt++;
                        list += `<tr>
                            <td>${stt}</td>
                            <td>${getFromHocPhan(kq.hoc_phan_id)}</td>
                            <td>${getFromHocPhan(kq.hoc_phan_id, 'ten')}</td>
                            <td>${getFromHocPhan(kq.hoc_phan_id, 'so_tin_chi')}</td>
                            <td>${kq.diem_tong_ket}</td>
                            <td>${kq.loai_he_4}</td>
                            <td>${(kq.qua_mon == 1) ? 'Đạt' : 'X' }</td>
                            <td>
                                <a href="#" class="graduate__more">Chi tiết</a>
                                <div class="graduate__tooltip">
                                    <div class="graduate__tooltip__item">
                                        Giữa kỳ: ${kq.diem_qua_trinh} <br>
                                        Cuối kỳ: ${kq.diem_cuoi_ky}
                                    </div>
                                </div>
                            </td>
                        </tr>`
                        if (kq.qua_mon == 1) stc_dat += parseInt(getFromHocPhan(kq.hoc_phan_id, 'so_tin_chi'));
                        tong_stc += parseInt(getFromHocPhan(kq.hoc_phan_id, 'so_tin_chi'));
                    }
                }
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
                                <td colspan="5">Trung bình học kỳ: ...</td>
                            </tr>
                        </table>
                    </div>
                </div>`;

                graduate__container.innerHTML += html;
            });

        }).catch(function (err) {
            console.error(err);
        })
    }
}