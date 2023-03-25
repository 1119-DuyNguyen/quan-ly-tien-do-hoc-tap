// addevent toggle mobile
class Slider {
    #slider;
    static CURRENT_DOMAIN = location.protocol + '//' + location.host + '/';
    constructor(element, params, user) {
        if (!element) {
            console.error('no exist constructor element sidebar');
        }
        try {
            this.#slider = document.createElement('aside');
            this.#slider.classList.add('main-sidebar');
            //    document.getElementById('main-sidebar');
            this.slider = this.createHTMLElementSidebar(params, user);
            this.hoverSidebarMobile();
        } catch (err) {
            console.error('create side bar fail, err:', err);
        }
    }
    /**
     *
     * @param {Array} params - param = {href : '/dashboard',icon,text }
     * @param {Object} user
     * @returns element
     */
    createHTMLElementSidebar(
        params,
        user = {
            img: 'img/icon.png',
            username: 'Nguyễn Thanh Duy Nguyễn Thanh Duy Nguyễn Thanh Duy',
            role: 'sinh viên',
        }
    ) {
        if (!Array.isArray(params)) {
            throw 'params for create element sidebar not array';
        }
        let container = document.createElement('div');
        container.classList.add('container');
        let ulElement = document.createElement('ul');
        ulElement.classList.add('sidebar__nav');
        //let htmlHeader =
        ulElement.innerHTML =
            `<li>
        <div class="sidebar__nav__static">
            <div class="sidebar__nav__img circular_image">
                <img src="${user.img}" alt="" />
            </div>
            <div class="sidebar__nav__title">
                <h3 class="sidebar__nav__title__header">
                    ${user.username}
                </h3>` +
            // <span class="sidebar__nav__title__description">
            //     <i class="fa-solid fa-graduation-cap icon"></i>${user.role}</span>
            `
            </div>
        </div>
    </li>`;

        // param = {href : '/dashboard',icon,text }
        try {
            params.forEach((param) => {
                let liE = document.createElement('li');
                let a = document.createElement('a');
                liE.appendChild(a);
                a.classList.add('sidebar__nav__link');

                a.href = this.CURRENT_DOMAIN + param.href;
                let icon = param.icon;
                let text = param.text;
                a.innerHTML = `
                <i class="${icon} icon"></i>
                <span class="sidebar__nav__text">${text}</span>
                `;
                ulElement.appendChild(liE);
            });
        } catch (e) {
            console.err(e);
        }
        return ulElement;
    }
    hoverSidebarMobile() {
        let slider = this.#slider;
        if (customFuncs.detectWidth() < 769) {
            customFuncs.addMultipleEventListener(slider, 'touchstart touchend', (e) => {
                //	e.target.closest(".sidebar__nav__link").classList.toggle("hover");
                slider.classList.toggle('hover');
                slider.querySelectorAll('.sidebar__nav__link').forEach((nav) => nav.classList.remove('hover'));
            });
            function removeActiveNavs() {
                slider.querySelectorAll('.sidebar__nav__link').forEach((btn) => btn.classList.remove('hover'));
            }
            function hoverSidebarChild(e) {
                var touches = e.changedTouches[0];
                var element = document.elementFromPoint(touches.clientX, touches.clientY);
                if (element) {
                    var navE = element.closest('.sidebar__nav__link');
                    removeActiveNavs();
                    if (navE) navE.classList.add('hover');
                }
            }

            slider.querySelectorAll('.sidebar__nav__link').forEach((btn) => {
                btn.addEventListener('touchmove', hoverSidebarChild);
                btn.addEventListener('touchend', (e) => {
                    var link = slider.querySelector('.sidebar__nav__link.hover');
                    if (link) {
                        removeActiveNavs();

                        link.click();
                    }
                });
            });
            //code check xem href có ăn được không
            // document.querySelectorAll('a[href]').forEach((a) =>
            //     a.addEventListener('click', (e) => {
            //         if (e.target.closest('a').querySelector('span'))
            //             alert(e.target.closest('a').querySelector('span').textContent)
            //     })
            // )
        }
    }
}
