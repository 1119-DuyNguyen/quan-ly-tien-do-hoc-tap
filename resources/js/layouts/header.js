import { alertComponent } from '../components/helper/alert-component';
function preventClick(e) {
    e.preventDefault();

    if (!localStorage.getItem('role')) {
        alertComponent('Bạn chưa đăng nhập !!!', 'Hãy đăng nhập để sử dụng tính năng');
        return;
    }
}
export class header {
    static isBinding = false;
    static bind() {
        if (header.isBinding) return;
        header.isBinding = true;
        try {
            let headerElment = document.getElementById('header-nav');
            let navLinkList = headerElment.querySelectorAll('.nav-link');
            navLinkList.forEach((nav) => {
                nav.addEventListener('click', preventClick);
            });
            let navTheme = document.getElementById('navTheme');
            navTheme.removeEventListener('click', preventClick);
            let icon = {
                lightTheme: `<i class="fa-solid fa-sun"></i>`,
                darkTheme: `<i class="fa-solid fa-moon"></i>`,
            };
            //check storage if dark mode was on or off
            function darkmode() {
                document.body.classList.add('dark');
                navTheme.dataset.mode = 'dark';
                navTheme.innerHTML = icon.darkTheme;
                localStorage.setItem('mode', 'dark');
            }

            function nodark() {
                document.body.classList.remove('dark');
                navTheme.dataset.mode = '';
                navTheme.innerHTML = icon.lightTheme;
                localStorage.setItem('mode', 'light');
            }
            if (localStorage.getItem('mode') == 'dark') {
                darkmode(); //if dark mode was on, run this funtion
            } else {
                nodark(); //else run this funtion
            }

            navTheme.addEventListener('click', (e) => {
                e.preventDefault();
                if (navTheme.dataset.mode == 'dark') {
                    nodark();
                } else {
                    darkmode();
                }
            });
        } catch (e) {
            alertComponent({ title: 'Có lỗi khi khởi tạo thanh điều khiển', message: 'Hãy thử làm mới trang' });
        }
    }
}
