
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

export class GraduateCrawler {
    static URL_REQ = location.protocol + '//' + location.host + '/api/graduate';
    run() {
        let bien_che_selector = document.querySelector(".graduate__select");
        let bien_che_option, bien_che_list = false;

        bien_che_selector.addEventListener('change', e => {
            renderHK(parseInt(bien_che_selector.value));
        })

        function getFromHocPhan(hoc_phan, id, data = 'ma_hoc_phan') {
            for (let i = 0; i < hoc_phan.length; i++) {
                const hp = hoc_phan[i];
                if (hp.id === id)
                    return hp[data];
            }
        }

        function renderHK(id = -1) {

            id = (id === -1) ? "" : (isNaN(id) ? "" : "/"+id);

            axios.get(GraduateCrawler.URL_REQ+id)
            .then(function (response) {
                let data = response.data.data;

                let bien_che = data.bien_che;
                
                let hoc_phan = data.hoc_phan;

                let ket_qua = data.ket_qua;

                let graduate__container = document.querySelector('.graduate__container');
                graduate__container.innerHTML = '';
                let stt = 0, html, list = ``, stc_dat, tong_stc, tong_diem;
                
                bien_che.forEach(hk => {
                    bien_che_option = document.createElement('option');
                    
                    if (!bien_che_list) {
                        bien_che_option.text = hk.ten;
                        bien_che_option.value = hk.id;
                        bien_che_selector.add(bien_che_option);
                    }
    
                    // Init
                    stt = 0;
                    stc_dat = 0;
                    tong_stc = 0;
                    tong_diem = 0;
                    list = ``;
                    for (let i = 0; i < ket_qua.length; i++) {
                        const kq = ket_qua[i];
                        if (hk.id == kq.bien_che_id) {
                            stt++;
                            list += `<tr>
                                <td>${stt}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id)}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'ten')}</td>
                                <td>${getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi')}</td>
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
                            if (kq.qua_mon == 1) stc_dat += parseInt(getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));
                            tong_stc += parseInt(getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));

                            tong_diem += parseFloat(kq.diem_tong_ket * getFromHocPhan(hoc_phan, kq.hoc_phan_id, 'so_tin_chi'));
                        }
                    }

                    tong_diem /= tong_stc;
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
    
                    graduate__container.innerHTML += html;
                });

                bien_che_list = true;

            }).catch(function (err) {
                console.error(err);
            })
        }

        renderHK();
    }
}