import GraduateCrawler from '../../components/dashboard/graduateCrawler.js';
import { alertComponent } from '../../components/helper/alert-component.js';
let graduate = new GraduateCrawler();

export class Graduate {
    static async index() {
        // import ''

        let bien_che_selector = document.querySelector('.graduate__select');
        let graduate__container = document.querySelector('.graduate__container');

        bien_che_selector.addEventListener('change', async (e) => {
            graduate__container.innerHTML = await graduate.renderHK(parseInt(bien_che_selector.value));
        });

        graduate.renderSelectHK(bien_che_selector);
        graduate__container.innerHTML = await graduate.renderHK(-1);

        let CURRENT_DOMAIN = location.protocol + '//' + location.host + '/' +'graduate/suggest';
        document.querySelector("#graduate__suggest__link").href = CURRENT_DOMAIN;
    }
    static async suggest() {
        let graduate__container = document.querySelectorAll('.graduate__container');
        graduate__container[0].innerHTML = await graduate.renderHK(await graduate.returnHKHienTai(), 'suggest');

        if (graduate__container[0].innerHTML.length == 0) {
            graduate__container[0].innerHTML = '<h3>Học kỳ này bạn không đăng ký học phần nào cả.</h3>';
        }

        graduate__container[0].innerHTML += graduate.returnSuggestBtn();

        let goi_y_hoc_phanBtn = document.querySelector('#goi_y_hoc_phan');
        let arr_kqdukien,
            kq_du_kien,
            check = true;
            
        goi_y_hoc_phanBtn.addEventListener('click', async (e) => {
            kq_du_kien = document.querySelectorAll('.ket_qua_du_kien');
            arr_kqdukien = [];
            check = true;

            for (let i = 0; i < kq_du_kien.length; i++) {
                const element = kq_du_kien[i];

                if (element.value.length == 0) {
                    check = false;
                    element.focus();
                    alertComponent("Lỗi", 'Chưa nhập điểm');
                    break;
                }

                if (isNaN(parseFloat(element.value))) {
                    check = false;
                    element.focus();
                    alertComponent("Lỗi", 'Điểm không hợp lệ');
                    break;
                }

                if(parseFloat(element.value) < 0 || parseFloat(element.value) > 10) {
                    check = false;
                    element.focus();
                    alertComponent("Lỗi", 'Điểm phải nằm trong khoảng từ 0 đến 10');
                    break;
                }

                if (parseFloat(element.value) >= 4.0) arr_kqdukien.push(parseInt(element.dataset.hpid));
            }
            if (check) graduate__container[2].innerHTML = await graduate.renderDSGoiY(arr_kqdukien);

            if (graduate.getLocalStorage('listMHChon').length > 0) {
                graduate.renderDSMHchon(arr_kqdukien, graduate.listMHChon);
            }

            graduate.paginatorAction(arr_kqdukien, graduate__container[2]);
        });

        if (graduate.getLocalStorage('listMHChon').length > 0) {
            graduate.renderDSMHchon([], graduate.getLocalStorage('listMHChon'));
        }
    }
}
