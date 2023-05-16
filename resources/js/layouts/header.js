import { alertComponent } from '../components/helper/alert-component';

export class header {
    static isBinding = false;
    static bind() {
        if (header.isBinding) return;
        header.isBinding = true;
        try {
            let headerElment = document.getElementById('header-nav');
            let navLinkList = headerElment.querySelectorAll('.nav-link');
            navLinkList.forEach((nav) => {
                nav.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!localStorage.getItem('role')) {
                        alertComponent('Bạn chưa đăng nhập !!!', 'Hãy đăng nhập để sử dụng tính năng');
                        return;
                    }
                });
            });
        } catch (e) {
            alertComponent({ title: 'Có lỗi khi khởi tạo thanh điều khiển', message: 'Hãy thử làm mới trang' });
        }
    }
}
