// addevent toggle mobile

import { Authentication } from '../pages/authentication';
import { routeHref, urlRoute } from '../routes/route';

let navPage = {
    dashboard: {
        role: ['sinh-vien', 'giang-vien', 'quan-tri-vien'],
        icon: 'fa-solid fa-house icon',
        text: 'Trang chủ ',
    },
    info: {
        role: ['sinh-vien', 'giang-vien', 'quan-tri-vien'],
        icon: 'fa-regular fa-user icon',
        text: 'Thông tin',
    },
    chart: {
        role: ['quan-tri-vien'],
        icon: 'fa-solid fa-chart-simple icon',
        text: 'Thống kê',
    },
    classroom: {
        role: ['sinh-vien', 'giang-vien', 'quan-tri-vien'],
        icon: 'fa-solid fa-chalkboard icon',
        text: 'Lớp học',
    },
    logout: {
        role: ['sinh-vien', 'giang-vien', 'quan-tri-vien'],
        icon: 'fa-solid fa-arrow-right-from-bracket icon',
        text: 'Đăng xuất',
    },
};
function createParams() {
    let roleUser = window.localStorage.getItem('roleSlug');
    let params = [];
    for (let key in navPage) {
        let nav = navPage[key];
        //  console.log(nav, nav.role.includes(roleUser), roleUser);
        if (nav.role.includes(roleUser)) {
            let param = { href: key, icon: nav.icon, text: nav.text };
            params.push(param);
        }
    }
    return params;
}
export class Sidebar {
    #slider;
    #currentTab;
    static CURRENT_DOMAIN = location.protocol + '//' + location.host + '/';
    constructor(element) {
        if (!element) {
            console.error('no exist constructor element sidebar');
        }
        let user = {};
        user.username = localStorage.getItem('user');
        user.role = localStorage.getItem('role');
        try {
            let params = createParams();
            this.#slider = element;
            // this.#slider = document.createElement('aside');
            // this.#slider.classList.add('main-sidebar');
            //    document.getElementById('main-sidebar');
            this.#slider.innerHTML = '';
            this.#slider.appendChild(this.createHTMLElementSidebar(params, user));
            this.hoverSidebarMobile();

            //route to first
        } catch (err) {
            console.error('create side bar fail, err:', err);
        }
    }
    routeToFirstTab() {
        //reset all active
        slider.querySelectorAll('.sidebar__nav__link').forEach((nav) => nav.classList.remove('hover'));
        //add active first
        this.#currentTab.classList.add('sidebar__nav__link--active');
        routeHref(this.#currentTab.href);
    }

    enableActiveLink(a) {
        if (this.#currentTab) {
            this.#currentTab.classList.remove('sidebar__nav__link--active');
        }

        this.#currentTab = a;
        this.#currentTab.classList.add('sidebar__nav__link--active');
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

        let ulElement = document.createElement('ul');
        ulElement.classList.add('sidebar__nav');
        //let htmlHeader =
        ulElement.innerHTML = `<li>
        <div class="sidebar__nav__static">
            <div class="sidebar__nav__img rectangle_image">
                <img src="${user.img ? user.img : Sidebar.CURRENT_DOMAIN + '/img/icon.png'}" alt="" />
            </div>
            <div class="sidebar__nav__title">
                <h3 class="sidebar__nav__title__header">
                    ${user.username}
                </h3>  <span class="sidebar__nav__title__description">
  
                     <i class="fa-solid fa-id-badge icon"></i>
                     </i>${user.role}</span>

            </div>
        </div>
    </li>`;

        // param = {href : '/dashboard',icon,text }
        try {
            params.forEach((param) => {
                let liE = document.createElement('li');
                let a = document.createElement('a');

                a.classList.add('sidebar__nav__link');
                if (!this.#currentTab) {
                    this.#currentTab = a;
                }
                let icon = param.icon;
                let text = param.text;
                a.innerHTML = `
                <i class="${icon} icon"></i>
                <span class="sidebar__nav__text">${text}</span>
                `;
                if (param.href === 'logout') {
                    a.addEventListener('click', Authentication.logout);
                } else {
                    a.href = Sidebar.CURRENT_DOMAIN + param.href;
                    a.addEventListener('click', urlRoute);
                }

                liE.appendChild(a);
                ulElement.appendChild(liE);
            });
        } catch (e) {
            console.error(e);
        }
        let container = document.createElement('div');
        container.classList.add('container');
        container.appendChild(ulElement);
        return container;
    }
    hoverSidebarMobile() {
        let slider = this.#slider;
        if (customFuncs.detectWidth() < 769) {
            //reset hết tất cả nav active
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

                        routeHref(link.href);
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
function disableScroll() {
    // Get the current page scroll position in the vertical direction
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Get the current page scroll position in the horizontal direction

    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () {};
}
