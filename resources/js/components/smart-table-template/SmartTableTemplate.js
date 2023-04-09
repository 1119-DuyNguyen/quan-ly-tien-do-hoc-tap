import { assignOption, createElement, getArrayDepth, getDataJsonKeys, sortDataWithParam } from './helpers/helper.js';
import { PaginationService } from './services/PaginationService.js';
import { formatDate } from './helpers/date.js';
// const decodeHtml = (str) =>
//     str.replace(
//         /[&<>'"]/g,
//         (tag) =>
//             ({
//                 '&': '&amp;',
//                 '<': '&lt;',
//                 '>': '&gt;',
//                 "'": '&#39;',
//                 '"': '&quot;',
//             }[tag])
//     );
// window.customElements.define('loader-component', LoaderComponent);
export class SmartTableTemplate {
    #container;
    #content;
    #header;
    #headerBtns = [];
    #body;

    #paginationService;

    /**
     * @var options Object
     * formatAttributeHeader : convert name json to format
     * edit : if true then allow CRUD else only read. Based restful-api
     */
    #option = {
        formatAttributeHeader: {},
        edit: false,
        pagination: false,
        urlAPI: '',
        rowPerPage: '',
    };
    // formatAttributeHeader
    // key object json => utf8 name
    // {name: '123'}, format=['name'=>"tên"]
    //render => tên: 123

    createControlBtns() {
        let container = createElement('div', 'control-container');
        let containerBtns = createElement('div', 'control-btns');
        let addBtn = createElement(
            'button',
            'btn btn--primary',
            '<i class="fa-solid fa-circle-plus" style="margin-right:8px"></i>Thêm'
        );
        let addSection = createElement('div', 'add-section');
        addSection.innerHTML = `
        <form>

        </form>
        
        `;
        containerBtns.appendChild(addBtn);
        container.appendChild(containerBtns);
        container.appendChild(addSection);
        return container;
    }
    constructor(rootElement) {
        try {
            if (!rootElement) {
                throw 'Element is not valid';
            }
            this.#container = createElement('div', 'smart-table-template');
            rootElement.appendChild(this.#container);
        } catch (e) {
            console.error(err);
            return;
        }
    }
    /**
     * element append child - table with dataJson and options
     * @param {*} dataJson
     * @param {Object} option
     * @returns
     */
    init(dataJson, option, paginationOption = {}) {
        this.#content = createElement('table', 'table');
        this.#header = createElement('thead', 'table-header');
        this.#headerBtns = [];
        this.#body = createElement('tbody', 'table-content');
        try {
            this.#container.innerHTML = '';
            option = assignOption(this.#option, option);
            //header create edit delete
            //container
            if (dataJson.length < 1) {
                throw new Error('Data cant be null');
            }

            if (getArrayDepth(dataJson) > 2) {
                throw new Error('Deep array muse be smaller than 2');
            }
            if (option['edit']) {
                //action;
                this.#container.appendChild(this.createControlBtns());
            }

            //content

            let containerTable = createElement('div', 'container-table');
            containerTable.appendChild(this.#content);
            this.#container.appendChild(containerTable);

            let headers = getDataJsonKeys(dataJson);
            if (!headers) {
                throw new Error('get headers faild');
            } else {
            }
            this.#header.appendChild(this.#createRowHeader(headers));
            this.#content.appendChild(this.#header);
            //body
            if (!this.createRow(dataJson)) {
                throw new Error('Unvalid data');
            }
            this.#content.appendChild(this.#body);
            if (option['pagination']) {
                this.handleCreatePagination(paginationOption);
            }
        } catch (err) {
            console.error(err);
        }
    }
    handleCreatePagination(paginationOption) {
        this.#paginationService = new PaginationService(this.#container, this, paginationOption);

        this.#paginationService.renderPagination();
    }
    /**
     *
     * @param {Array} headers
     * @returns
     */
    #createRowHeader(headers) {
        function addDirAndSortColumnParameter(dir, column) {
            const url = new URL(window.location.href);
            url.searchParams.set('dir', dir);
            url.searchParams.set('order-column', column);
            window.history.replaceState(null, null, url);
        }
        //tách header
        let trHeader = createElement('tr');
        const url = new URL(window.location.href);
        let currentKey = url.searchParams.get('order-column') ?? 'id';
        let dir = url.searchParams.get('dir') ?? '';
        headers.forEach((header) => {
            let th = createElement('th');
            let btn = createElement('button');
            btn.dataset.key = header;
            if (header === currentKey) {
                if (dir == 'desc') {
                    btn.setAttribute('data-dir', 'asc');
                }
                if (dir == 'asc') {
                    btn.setAttribute('data-dir', 'desc');
                }
            }
            btn.addEventListener('click', (e) => {
                //reset btn
                this.#headerBtns.map((button) => {
                    if (button !== e.target) {
                        button.removeAttribute('data-dir');
                    }
                });
                let data;
                if (e.target.getAttribute('data-dir') == 'desc') {
                    addDirAndSortColumnParameter('desc', e.target.dataset.key);
                    e.target.setAttribute('data-dir', 'asc');
                } else {
                    addDirAndSortColumnParameter('asc', e.target.dataset.key);

                    e.target.setAttribute('data-dir', 'desc');
                }
                this.reRenderTable();
            });
            let title = header;
            let options = this.#option['formatAttributeHeader'][header];
            if (options) {
                if (options.max) {
                    th.style.minWidth = options.width;
                }
                if (options.minWidth) {
                    th.style.minWidth = options.minWidth;
                }
                if (options.title) {
                    title = options.title ? options.title : header;
                }
            }
            btn.textContent = title;
            this.#headerBtns.push(btn);
            th.appendChild(btn);
            trHeader.appendChild(th);
        });
        // render checkbox, action

        if (this.#option['edit']) {
            // header show/update/ delete button
            let actionTitle = createElement('th', 'btns-action');
            actionTitle.textContent = 'Hành động';
            trHeader.appendChild(actionTitle);
        }
        return trHeader;
    }
    /**
     * generate row based obj
     * @param {Object} obj
     * @returns
     */
    #createRowBasedObject(obj) {
        const row = document.createElement('tr');

        //render data and assign key
        const objKeys = Object.keys(obj);
        objKeys.map((key) => {
            const cell = document.createElement('td');
            cell.setAttribute('data-attr', key);
            //
            let type = '';
            let options = this.#option['formatAttributeHeader'][key];
            if (options) {
                type = options.type ? options.type : type;
            }
            switch (type) {
                case 'date':
                    cell.innerHTML = formatDate(new Date(obj[key]));
                    break;
                default:
                    cell.innerHTML = obj[key];
            }

            row.appendChild(cell);
        });

        // render checkbox, action
        if (this.#option['edit']) {
            //show/update/ delete button
            let btnActions = createElement('td', 'group-action');
            let showBtn = createElement('button', 'btn btn--primary', 'i');
            let deleteBtn = createElement('button', 'btn btn--danger', 'x');
            btnActions.appendChild(showBtn);
            btnActions.appendChild(deleteBtn);
            row.appendChild(btnActions);
        }
        return row;
    }
    /**
     * insert row into body table
     * @param {*} dataBody
     * @returns
     */
    async createRow(dataBody) {
        //add loading
        // + 1 vì còn header của action
        this.#body.innerHTML = `<td colspan="${this.#headerBtns.length + 1}"  style="text-align:center;">
        <div>
        <loader-component width="40px" height="40px" ></loader-component>
        </div>
        </td>`;

        //reset
        this.#body.innerHTML = '';
        if (Array.isArray(dataBody)) {
            dataBody.forEach((data) => this.#body.appendChild(this.#createRowBasedObject(data)));
            return true;
        }
        if (dataBody.constructor.name === 'Object') {
            this.#body.appendChild(this.#createRowBasedObject(dataBody));
            return true;
        }
        return false;
    }

    /**
     * generate new table with data from url and options
     * @param {Element} element
     * @param {String} urlAPI
     * @returns
     */
    async fetchDataTable(urlAPI, option = {}) {
        let urlCurLocation = new URL(window.location.href);
        let url = new URL(urlAPI);
        let keys = urlCurLocation.searchParams.keys();

        for (const key of keys) {
            url.searchParams.set(key, urlCurLocation.searchParams.get(key));
        }

        urlAPI = url.href;

        let jsonData = await fetch(urlAPI)
            .then((res) => {
                return res.json();
            })
            .catch((e) => {
                return [];
            });
        if (jsonData) {
            option.urlAPI = urlAPI;
            this.init(jsonData.data.dataObject, option, jsonData.data.paginationOption);
            return true;
        } else return false;
    }
    reRenderTable() {
        this.fetchDataTable(this.#option.urlAPI);
    }
}
