import GraduateCrawler from '../components/dashboard/graduateCrawler.js';
let graduate = new GraduateCrawler();

export class Graduate {
    static async index() {
        // import ''

        let bien_che_selector = document.querySelector(".graduate__select");
        let graduate__container = document.querySelector('.graduate__container');
        
        bien_che_selector.addEventListener('change', async e => {
            graduate__container.innerHTML = await graduate.renderHK(parseInt(bien_che_selector.value));
        })
        
        graduate.renderSelectHK(bien_che_selector);
        graduate__container.innerHTML = await graduate.renderHK(-1);
    }
    static async suggest() {
        let graduate__container = document.querySelectorAll('.graduate__container');
        graduate__container[0].innerHTML = await graduate.renderHK(await graduate.returnHKHienTai());

        if (graduate__container[0].innerHTML.length == 0) {
            graduate__container[0].innerHTML = "<h3>Học kỳ này bạn không đăng ký học phần nào cả.</h3>"
        }

        graduate__container[1].innerHTML = await graduate.renderDSGoiY();
    }
}