// addevent toggle mobile

import { alertComponent } from '../components/helper/alert-component';
import { Authentication } from '../pages/authentication';
import { routeHref, urlRoute } from '../routes/route';

let navPage = {
    dashboard: {
        role: ['sinh-vien', 'quan-tri-vien'],
        icon: 'fa-solid fa-house icon',
        text: 'Trang chủ',
    },
    // chart: {
    //     role: ['quan-tri-vien'],
    //     icon: 'fa-solid fa-chart-simple icon',
    //     text: 'Thống kê',
    // },
    info: {
        // role: ['sinh-vien', 'giang-vien', 'quan-tri-vien', 'co-van-hoc-tap'],
        role: ['*'],
        icon: 'fa-regular fa-address-card icon',
        text: 'Thông tin cá nhân',
    },

    graduate: {
        // role: ['sinh-vien', 'giang-vien', 'quan-tri-vien', 'co-van-hoc-tap'],
        role: ['sinh-vien', 'quan-tri-vien', 'co-van-hoc-tap'],
        icon: 'fa-regular fa-user-graduate icon',
        text: 'Tiến độ tốt nghiệp',
    },
    program: {
        // role: ['sinh-vien', 'giang-vien', 'quan-tri-vien', 'co-van-hoc-tap'],
        role: ['quan-tri-vien'],
        icon: 'fa-regular fa-school icon',
        text: 'Chương trình đào tạo',
    },

    classroom: {
        role: ['sinh-vien', 'giang-vien', ''],
        icon: 'fa-solid fa-chalkboard icon',
        text: 'Lớp học',
    },
    role: {
        role: ['quan-tri-vien'],
        icon: 'fa-solid fa-building-shield icon',
        text: 'Quyền',
    },
    user: {
        role: ['quan-tri-vien'],
        icon: 'fa-regular fa-user icon',
        text: 'Tài khoản',
    },
    subject: {
        role: ['quan-tri-vien'],
        text: 'Học phần',
        icon: 'fa-regular fa-book-open"',
    },
    logout: {
        role: ['*'],
        icon: 'fa-solid fa-arrow-right-from-bracket icon',
        text: 'Đăng xuất',
    },
};
export function convertHrefToText(text) {
    for (let key in navPage) {
        if (key === text) {
            text = navPage[key].text;
            break;
        }
    }

    return text;
}
function createParams() {
    let roleUser = window.localStorage.getItem('roleSlug');
    let params = [];
    for (let key in navPage) {
        let nav = navPage[key];
        //  console.log(nav, nav.role.includes(roleUser), roleUser);
        if (nav.role.includes(roleUser) || nav.role.includes('*')) {
            let param = { href: key, icon: nav.icon, text: nav.text };
            params.push(param);
        }
    }
    return params;
}
function addOneTimeEventListener(element, event, callback) {
    const wrapper = (e) => {
        let isComplete = false;
        try {
            isComplete = callback(e);
        } finally {
            if (isComplete) element.removeEventListener(event, wrapper);
        }
    };
    element.addEventListener(event, wrapper);
}
export class Sidebar {
    #sidebar;
    #currentTab;
    static isFirstInit = false;
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
            this.#sidebar = element;
            // this.#slider = document.createElement('aside');
            // this.#slider.classList.add('main-sidebar');
            //    document.getElementById('main-sidebar');
            this.#sidebar.innerHTML = '';
            let containerSidebar = this.createElementSidebar(params, user);
            let btnControlSidebar = document.getElementById('btn-control-sidebar');
            let mainEl = document.getElementById('container-page');

            let sidebarEl = this.#sidebar;
            if (Sidebar.isFirstInit == false) {
                btnControlSidebar.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!localStorage.getItem('role')) {
                        //alertComponent('Bạn chưa đăng nhập', 'Hãy đăng nhập để sử dụng tính năng');
                        return;
                    }
                    if (this.#sidebar.classList.contains('hide')) {
                        this.#sidebar.classList.remove('hide');
                        let widthDevice = customFuncs.detectWidth();

                        if (widthDevice > 1550) {
                            if (widthDevice > 300 * 3) mainEl.style.marginLeft = '300px';
                            else mainEl.style.marginLeft = '30vw';
                        } else {
                            mainEl.style.marginLeft = '0vw';
                            addOneTimeEventListener(document, 'click', (e) => {
                                let sidebar = e.target.closest('.main-sidebar');
                                if (sidebar && sidebar.isSameNode(sidebarEl)) return false;

                                if (sidebarEl && !sidebarEl.classList.contains('hide')) {
                                    sidebarEl.classList.add('hide');
                                }
                                return true;
                            });
                        }
                    } else {
                        mainEl.style.marginLeft = '0vw';
                        sidebarEl.classList.add('hide');
                    }
                    //transition = 0.5
                });
            }
            Sidebar.isFirstInit = true;

            this.#sidebar.appendChild(containerSidebar);

            // this.hoverSidebarMobile();

            //route to first
        } catch (err) {
            console.error('create side bar fail, err:', err);
        }
    }
    resetSideBar() {
        let mainEl = document.getElementById('container-page');
        if (mainEl && this.#sidebar) {
            mainEl.style.marginLeft = '0vw';
            if (!this.#sidebar.classList.contains('hide')) this.#sidebar.classList.add('hide');
            this.#sidebar.innerHTML = '';
            this.#sidebar.dataset.isInit = '';
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
    createElementSidebar(
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
    // hoverSidebarMobile() {
    //     let slider = this.#slider;
    //     if (customFuncs.detectWidth() < 769) {
    //         //reset hết tất cả nav active
    //         customFuncs.addMultipleEventListener(slider, 'touchstart touchend', (e) => {
    //             //	e.target.closest(".sidebar__nav__link").classList.toggle("hover");
    //             slider.classList.toggle('hover');
    //             slider.querySelectorAll('.sidebar__nav__link').forEach((nav) => nav.classList.remove('hover'));
    //         });
    //         function removeActiveNavs() {
    //             slider.querySelectorAll('.sidebar__nav__link').forEach((btn) => btn.classList.remove('hover'));
    //         }
    //         function hoverSidebarChild(e) {
    //             var touches = e.changedTouches[0];
    //             var element = document.elementFromPoint(touches.clientX, touches.clientY);
    //             if (element) {
    //                 var navE = element.closest('.sidebar__nav__link');
    //                 removeActiveNavs();
    //                 if (navE) navE.classList.add('hover');
    //             }
    //         }

    //         slider.querySelectorAll('.sidebar__nav__link').forEach((btn) => {
    //             btn.addEventListener('touchmove', hoverSidebarChild);
    //             btn.addEventListener('touchend', (e) => {
    //                 var link = slider.querySelector('.sidebar__nav__link.hover');
    //                 if (link) {
    //                     removeActiveNavs();
    //                     if (link.href) {
    //                         console.log('h');
    //                         console.log(link.href);
    //                         routeHref(link.href);
    //                     } else Authentication.logout(e);
    //                 }
    //             });
    //         });
    //         //code check xem href có ăn được không
    //         // document.querySelectorAll('a[href]').forEach((a) =>
    //         //     a.addEventListener('click', (e) => {
    //         //         if (e.target.closest('a').querySelector('span'))
    //         //             alert(e.target.closest('a').querySelector('span').textContent)
    //         //     })
    //         // )
    //     }
    // }
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
