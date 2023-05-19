import { routeHref } from '../../../routes/route.js';
import { assignOption, createElement } from '../helpers/helper.js';
import { SmartTableTemplate } from '../SmartTableTemplate.js';
export class PaginationService {
    option = {
        total: 30,
        perPage: 6,
        totalPage: 5,
        page: 1,
        step: 2,
    };
    #pagination;
    #container;
    #btnsHtml = '';
    #reRenderTableCallBack;
    destroy() {
        if (this.#pagination) this.#pagination.remove();
    }
    /**
     * create pagination element
     * @param {Element} container
     * @param {boolean} isAppend
     */
    constructor(container, reRenderTableCallBack, option = {}) {
        assignOption(this.option, option);
        this.option.totalPage = Math.ceil(this.option.total / this.option.perPage);
        if (this.option.totalPage >= 1) {
            // mặc định là append
            this.#pagination = createElement('ul', 'pagination');
            container.appendChild(this.#pagination);

            this.#reRenderTableCallBack = reRenderTableCallBack;
            let liPrev = createElement('li', 'pagination__item');
            let prevBtn = createElement('a', 'pagination__item__link', '&#8592;');
            prevBtn.addEventListener('click', this.prevPage.bind(this));
            liPrev.appendChild(prevBtn);
            let liNext = createElement('li', 'pagination__item');

            let nextBtn = createElement('a', 'pagination__item__link', '&#8594;');
            nextBtn.addEventListener('click', this.nextPage.bind(this));
            liNext.appendChild(nextBtn);
            this.#container = createElement('span');
            this.#pagination.appendChild(liPrev);
            this.#pagination.appendChild(this.#container);
            this.#pagination.appendChild(liNext);
        }

        //get all btns
        // pagePagination.e = element.getElementsByTagName("span")[0];
        // pagePagination.Buttons(element);
        //create base
    }
    /**
     * returns String
     */
    get currentPage() {
        const url = new URL(window.location.href);
        let currentPage = url.searchParams.get('page');
        if (currentPage && currentPage.match(/^-?\d+$/)) {
            return currentPage;
        } else return '1';
    }
    async renderPagination() {
        if (!this.#reRenderTableCallBack) {
            return false;
        }
        this.handleCreateBtns();
        // let btnPagination = [];

        // for (let i = currentPage; i < this.#totalPage; ++i) {
        // let li = createElement("li", "pagination__item");
        // //
        // let aElement = createElement("a", "pagination__item__link");
        // aElement.dataset.page = i;
        // aElement.innerText = i;
        // if (i === currentPage) {
        //     //disable button
        //     aElement.classList.add("pagination__item__link--disabled");
        // }
        // aElement.addEventListener("click", (e) => {
        //     //Kiểm tra xem có khác page hiện tại không
        //     if (this.#updatePageUrl(e.currentTarget.dataset.page)) {
        //         this.renderPagination();
        //         // SmartTableTemplateObject.createRow();
        //     }
        // });
        // // btnPagination.push(aElement);
        // li.appendChild(aElement);
        // this.#container.appendChild(li);
        // }
        return false;
    }
    /**
     * update page query parameters url
     * @param {String} page
     */
    updatePageUrl(page) {
        const url = new URL(window.location.href);
        page = page > this.option['totalPage'] ? this.option['totalPage'] : page;
        page =page < 1 ? 1 :page;

        // so sánh string
        if (page && page !=this.currentPage) {
            url.searchParams.set('page', page);
            window.history.replaceState(null, null, url);
            this.renderPagination();
            return true;
        }
        return false;
    }

    nextPage() {
        let currentPage = Number.parseInt(this.currentPage) + 1;
        if (this.updatePageUrl(currentPage)) {
            this.#reRenderTableCallBack();
        }

        // pagePagination.Start();
    }
    prevPage() {
        let currentPage = Number.parseInt(this.currentPage) - 1;

        if (this.updatePageUrl(currentPage)) {
            this.#reRenderTableCallBack();
        }

        // pagePagination.Start();
    }
    handleCreateBtns() {
        this.renderBtns();
        this.bindBtns();
    }
    addBtns(start, end) {
        for (var index = start; index < end; index++) {
            this.#btnsHtml += `
            <li class="pagination__item">
            <a class="pagination__item__link" data-page="${index}" > ${index} </a>
            </li>`;
        }
    }
    firstBtn() {
        this.#btnsHtml += `
        <li  class="pagination__item">
        <a class="pagination__item__link" data-page="1">1</a>
        </li>
        <li  class="pagination__item">
        <i class="pagination__item__link pagination__item__link--disabled" >...</i>
        </li>`;
    }
    lastBtn() {
        this.#btnsHtml += `    
        <li  class="pagination__item">
        <i class="pagination__item__link pagination__item__link--disabled" >...</i>
        </li>
        <li  class="pagination__item">
        <a class="pagination__item__link pagination__item__link" data-page="${this.option['totalPage']}">${this.option['totalPage']}</a>
        </li>
        `;
    }
    //render btns
    renderBtns() {
        //getPageURL, vì đang là string nên phải chuyển qua num
        this.#container.innerHTML = '';
        let currentPage = +this.currentPage;
        //min =  step * 2 bên + current page + fist + last Btn + 2 button "..."
        let totalBtn = this.option['step'] * 2 + 5;

        //xác định có nên render icon button "..."

        if (this.option['totalPage'] <= totalBtn) {
            this.addBtns(1, this.option['totalPage'] + 1);
        } else {
            //render ... cuối

            if (currentPage <= this.option['step'] * 2) {
                // start(1) +  2 * step + 1 do btn"..." của first
                // + 1 currentPage(do 1 là current page) + 1( do function )
                this.addBtns(1, this.option['step'] * 2 + 4);
                this.lastBtn();
            }
            //render ... đầu
            // max - 2*step
            else if (currentPage > this.option['totalPage'] - this.option['step'] * 2) {
                this.firstBtn();
                this.addBtns(this.option['totalPage'] - this.option['step'] * 2 - 2, this.option['totalPage'] + 1);
            }
            //render ... cả 2
            else {
                //step*2 + 1  + 2
                this.firstBtn();

                this.addBtns(currentPage - this.option['step'], currentPage + this.option['step'] + 1);
                this.lastBtn();
            }
        }
        this.#container.innerHTML = this.#btnsHtml;
        //reset
        this.#btnsHtml = '';
    }
    bindBtns() {
        var btns = this.#container.querySelectorAll('.pagination__item__link[data-page]');
        let currentPage = this.currentPage;
        btns.forEach((btn) => {
            if (btn.dataset.page === currentPage) {
                btn.classList.add('pagination__item__link--active');
            }
            btn.addEventListener(
                'click',
                (e) => {
                    //Kiểm tra xem có khác page hiện tại không
                    if (this.updatePageUrl(e.currentTarget.dataset.page)) {
                        this.#reRenderTableCallBack();
                    }
                },
                false
            );
        });
    }
}