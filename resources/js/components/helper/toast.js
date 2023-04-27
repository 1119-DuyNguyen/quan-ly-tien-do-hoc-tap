export function toast(
    { title = '', message = '', type = '', duration = '' },
    animationAppear = 'slideDown',
    animationDissapear = 'fadeOut'
) {
    type = type.toLowerCase();
    const toastList = document.getElementById('toast');
    if (toastList) {
        const icons = {
            success: 'icon-checkbox-checked',
            warning: 'icon-notification',
            info: 'icon-info',
            error: 'icon-cancel-circle',
        };
        const icon = icons[type];
        const delay = duration / 1000;
        var toast = document.createElement('div');

        toast.style.animation = `${animationAppear} ease 0.3s, ${animationDissapear} linear ${delay}s forwards`;

        toast.classList.add('toast');
        toast.classList.add('toast--' + type);

        toast.innerHTML = `
    
        <div class="toast__icon">
          <span class="${icon} toast-icon-background">  </span>
        </div>
        <div class="toast__body">
          <h2 class="toast__title">
            ${title}
            </h2>
          <span class="toast__message">
            ${message}
    
          </span>
        </div>
        </div>  `;
        toastList.insertAdjacentElement('afterbegin', toast);
        setTimeout(function () {
            toastList.removeChild(toast);
        }, duration + 500);
    }
}

/*example function*/

// export function showSuccessToast() {
//     toast({
//         title: 'Success',
//         message: ' Đăng ký thành công',
//         type: 'success',
//         duration: 3000,
//     });
// }
// export function showErrorToast() {
//     toast({
//         title: 'Error',
//         message: 'Đã có lỗi xảy ra xin vui lòng liên hệ quản trị viên',
//         type: 'Error',
//         duration: 10000,
//     });
// }
// export function showInfoToast() {
//     toast({
//         title: 'Info',
//         message: 'Đã có lỗi xảy ra xin vui lòng liên hệ quản trị viên',
//         type: 'Info',
//         duration: 3000,
//     });
// }

// export function showWarningToast() {
//     toast({
//         title: 'Warning',
//         message: 'Đã có lỗi xảy ra xin vui lòng liên hệ quản trị viên',
//         type: 'Warning',
//         duration: 3000,
//     });
// }
