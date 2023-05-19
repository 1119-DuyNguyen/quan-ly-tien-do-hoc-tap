import { assignOption, createElement, getArrayDepth, getDataJsonKeys, sortDataWithParam } from './helpers/helper.js';
import { PaginationService } from './services/PaginationService.js';
import { formatDate } from './helpers/date.js';
import { routeHref } from '../../routes/route.js';
import { ConfirmComponent } from '../helper/confirm-component.js';
import { toast } from '../helper/toast.js';
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
    isFirstInit = false;
    #selectDataList;
    /**
     * @var options Object
     *  @example
     *     #option = {
        formatAttributeHeader: {},
        edit: false,
        pagination: false,
        urlAPI: '',
        rowPerPage: '',
        view: false,
        export: false,
        add: false,
    };
        @example formatAttributeHeader
         {
                ten: {
                    title: 'Tên',
                    minWidth: '300px',
                    sort: true,
                },
           },
     * avaiable option: width, title, minWidth, maxWidth, ellipsis
     * Want whiteSpace nowrap ?
     * then @example{ellipsis:true}
     *   dont set width
     * formatAttributeHeader : convert name json to format
     * edit : if true then allow CRUD else only read. Based restful-api
     */
    #option = {
        formatAttributeHeader: {},
        edit: false,
        pagination: false,
        urlAPI: '',
        rowPerPage: '',
        view: false,
        export: false,
        add: false,
    };
    // formatAttributeHeader
    // key object json => utf8 name
    // {name: '123'}, format=['name'=>"tên"]
    //render => tên: 123
    get getDataSelectList() {
        return this.#selectDataList;
    }
    createControlBtns() {
        if (this.#option['add']) {
            let container = createElement('div', 'control-container');
            let containerBtns = createElement('div', 'control-btns');
            let addBtn = createElement(
                'a',
                'btn btn--primary',
                '<i class="fa-solid fa-circle-plus" style="margin-right:8px"></i>Thêm'
            );

            if (typeof this.#option['add'] == 'function') {
                addBtn.addEventListener('click', this.#option['add']);
            } else {
                addBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    routeHref(location.protocol + '//' + location.host + location.pathname + '/add');
                });
            }

            containerBtns.appendChild(addBtn);
            container.appendChild(containerBtns);
            return container;
        }
    }
    constructor(rootElement) {
        try {
            if (!rootElement) {
                throw 'Element is not valid';
            }
            this.#container = createElement('div', 'smart-table-template');
            this.#container.innerHTML = '<loader-component></loader-component>';
            rootElement.appendChild(this.#container);
        } catch (e) {
            console.error(e);
            return;
        }
    }
    /**
     *
     * @param {Object} dataSelect
     * @example {name: [] option array}
     */
    renderSelectList(dataSelect = []) {
        let selectContainer = document.createElement('div');
        selectContainer.classList.add('select-container');
        this.#selectDataList = dataSelect;
        dataSelect.forEach((selectList) => {
            let html = `<option value="">Tất cả</option>`;
            if (selectList.text) {
                html = `<option value="">${selectList.text}</option>`;
                delete selectList.text;
            }
            for (let key in selectList) {
                //create select
                let select = document.createElement('select');
                select.setAttribute('name', key);
                const url = new URL(window.location.href);
                selectList[key].forEach((option) => {
                    let currentSelect = url.searchParams.get(key) == option.id ? 'selected' : '';
                    html += `<option value=${option.id ?? ''} ${currentSelect}>${option.ten ?? ''}</option>`;
                });
                select.innerHTML = html;

                selectContainer.appendChild(select);
            }
        });
        //binding action

        let selectList = selectContainer.querySelectorAll('select[name]');
        selectList.forEach((select) => {
            select.onchange = (e) => {
                let value = select.value;
                const url = new URL(window.location.href);
                url.searchParams.set(select.getAttribute('name'), value);
                window.history.replaceState(null, null, url);
                this.reRenderTable();
            };
        });
        return selectContainer;
    }
    /**
     * element append child - table with dataJson and options
     * @param {*} dataJson
     * @param {Object} option
     * @returns
     */
    init(dataJson, option, paginationOption, selectDataList) {
        try {
            option = assignOption(this.#option, option);
            //header create edit delete
            //container
            // if (dataJson.length < 1) {
            //     throw new Error('Data cant be null');
            // }
            if (getArrayDepth(dataJson) > 2) {
                throw new Error('Deep array muse be smaller than 2');
            }
            if (!this.isFirstInit) {
                this.#container.innerHTML = '';

                if (selectDataList) {
                    this.#container.appendChild(this.renderSelectList(selectDataList));
                }
                //action;
                let controlBtns = this.createControlBtns();
                if (controlBtns) this.#container.appendChild(controlBtns);
                let containerTable = createElement('div', 'container-table');
                this.#content = createElement('table', 'table');
                containerTable.appendChild(this.#content);
                this.#container.appendChild(containerTable);
                this.isFirstInit = true;
            } else {
                this.#content.innerHTML = '';
            }
            if (option['pagination'] && paginationOption) {
                if (this.#paginationService) {
                    this.#paginationService.destroy();
                }
                this.handleCreatePagination(paginationOption);
            }

            this.#header = createElement('thead', 'table-header');
            this.#headerBtns = [];
            this.#body = createElement('tbody', 'table-content');
            //content
            let headers = getDataJsonKeys(dataJson);
            if (!headers || !Array.isArray(headers) || headers.length < 1) {
                this.#content.innerHTML = 'Không tìm thấy dữ liệu';

                return;
            }
            this.#header.appendChild(this.#createRowHeader(headers));
            this.#content.appendChild(this.#header);
            //body
            if (!this.createRow(dataJson)) {
                throw new Error('Unvalid data');
            }
            this.#content.appendChild(this.#body);
        } catch (err) {
            console.error(err);
            return;
        }
    }
    handleCreatePagination(paginationOption) {
        this.#paginationService = new PaginationService(
            this.#container,
            this.reRenderTable.bind(this),
            paginationOption
        );

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
        // tạo col group
        let colGroup = document.createElement('colgroup');

        //tách header
        let trHeader = createElement('tr');

        const url = new URL(window.location.href);
        let currentKey = url.searchParams.get('order-column') ?? 'id';
        let dir = url.searchParams.get('dir') ?? '';
        if (this.#option['edit']) {
            let colE = document.createElement('col');
            colGroup.appendChild(colE);
            // header show/update/ delete button
            let actionTitle = createElement('th', 'btns-action');
            actionTitle.textContent = 'Hành động';
            trHeader.appendChild(actionTitle);
        }
        headers.forEach((header) => {
            let th = createElement('th');
            let btn = createElement('button');

            let title = header;
            let options = this.#option['formatAttributeHeader'][header];
            let iconHeader = '';
            let colE = document.createElement('col');

            if (options) {
                if (options.max) {
                    colE.style.minWidth = options.width;
                }
                if (options.minWidth) {
                    colE.style.minWidth = options.minWidth;
                }
                if (options.width) {
                    colE.style.width = options.width;
                }
                if (options.title) {
                    title = options.title ? options.title : header;
                }
                if (options.ellipsis) {
                }
                if (options.sort) {
                    if (!trHeader.dataset.shouldSort) {
                        trHeader.dataset.shouldSort = true;
                    }
                    th.classList.add('sort');
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
                }
            }
            btn.textContent = title + iconHeader;

            this.#headerBtns.push(btn);
            th.appendChild(btn);
            trHeader.appendChild(th);
            colGroup.appendChild(colE);
        });
        // render checkbox, action
        this.#content.insertAdjacentHTML('afterbegin', colGroup.outerHTML);

        return trHeader;
    }
    /**
     * generate row based obj
     * @param {Object} obj
     * @returns
     */
    #createRowBasedObject(obj) {
        const row = document.createElement('tr');
        // render checkbox, action
        if (this.#option['edit'] || this.#option['export'] || this.#option['view']) {
            //show/update/ delete button
            let btnActions = createElement('td');
            let divContainer = createElement('div', 'group-action');
            btnActions.appendChild(divContainer);
            if (this.#option['export']) {
                let exportBtn = createElement(
                    'button',
                    'btn btn--success',
                    '<i class="fa-regular fa-floppy-disk"></i>'
                );
                if (typeof this.#option['export'] === 'function') {
                    exportBtn.addEventListener('click', this.#option['export']);
                }

                divContainer.appendChild(exportBtn);
            }
            if (this.#option['view']) {
                let viewBtn = createElement('button', 'btn btn--primary', '<i class="fa-regular fa-eye"></i>');
                if (typeof this.#option['view'] === 'function') {
                    viewBtn.addEventListener('click', this.#option['view']);
                } else {
                    viewBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        let rowId = row.querySelector('[data-attr="id"] ');
                        if (rowId) {
                            routeHref(
                                location.protocol +
                                    '//' +
                                    location.host +
                                    location.pathname +
                                    '/' +
                                    rowId.getAttribute('data-content')
                            );
                        }
                    });
                }

                divContainer.appendChild(viewBtn);
            }
            if (this.#option['edit']) {
                let editBtn = createElement(
                    'button',
                    'btn btn--warning',
                    '<i class="fa-regular fa-pen-to-square"></i>'
                );
                if (typeof this.#option['edit'] === 'function') {
                    editBtn.addEventListener('click', this.#option['edit']);
                } else {
                    editBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.preventDefault();
                        let rowId = row.querySelector('[data-attr="id"] ');
                        if (rowId) {
                            routeHref(
                                location.protocol +
                                    '//' +
                                    location.host +
                                    location.pathname +
                                    '/' +
                                    rowId.getAttribute('data-content')
                            );
                        }
                    });
                }

                let deleteBtn = createElement('button', 'btn btn--danger', '<i class="fa-regular fa-trash-can"></i>');
                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let rowId = row.querySelector('[data-attr="id"]');
                    if (rowId) {
                        try {
                            new ConfirmComponent({
                                questionText: 'Bạn có chắc chắn muốn xóa không ?',
                                trueButtonText: 'Có',
                                falseButtonText: 'Không',
                            }).then((data) => {
                                if (data) {
                                    let url = new URL(this.#option.urlAPI);
                                    axios
                                        .delete(url.origin + url.pathname + '/' + rowId.getAttribute('data-content'))
                                        .then((res) => {
                                            let url = new URL(window.location.href);
                                            url.searchParams.set('page',1);
                                            window.history.replaceState(null,null,url);
                                            this.reRenderTable()
                                        })
                                        .catch(e=> console.error(e));
                                }
                            });
                        } catch (e) {
                            console.error(e);
                            toast({
                                title: 'Thao tác xóa thất bại',
                                message: 'Vui lòng thử lại sau ít phút',
                                duration: 4000,
                                type: 'error',
                            });
                        }
                    }
                    console.log('here', rowId);
                });

                divContainer.appendChild(editBtn);
                divContainer.appendChild(deleteBtn);
            }

            row.appendChild(btnActions);
        }
        //render data and assign key
        const objKeys = Object.keys(obj);
        objKeys.map((key) => {
            const cell = document.createElement('td');
            cell.setAttribute('data-attr', key);
            let divContent = createElement('div');
            cell.appendChild(divContent);
            //
            let type = '';
            let options = this.#option['formatAttributeHeader'][key];
            let dataTitle = options.title ? options.title : key;

            if (options) {
                type = options.type ? options.type : type;
                if (options.ellipsis) {
                    if (options.width) {
                        divContent.style.width = options.width;
                    }
                    divContent.style.whiteSpace = 'nowrap';
                    divContent.style.overflow = 'hidden';
                    divContent.style.textOverflow = 'ellipsis';
                }
                if (options.oneLine) {
                    divContent.style.whiteSpace = 'nowrap';
                }
            }
            switch (type) {
                case 'date':
                    divContent.innerHTML = formatDate(new Date(obj[key]));
                    break;
                default:
                    divContent.innerHTML = obj[key];
            }
            cell.setAttribute('data-content', divContent.innerHTML);
            cell.setAttribute('data-title', dataTitle);

            row.appendChild(cell);
        });

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
     * fetch data and render
     * @param {String} urlAPI
     * @param {Object} option
     * @example
     *     #option = {
        formatAttributeHeader: {},
        edit: false,
        pagination: false,
        urlAPI: '',
        rowPerPage: '',
        view: false,
        export: false,
        add: false,
    };
        @example formatAttributeHeader
         {
                ten: {
                    title: 'Tên',
                    minWidth: '300px',
                    sort: true,
                },
           },
     * avaiable option: width, title, minWidth, maxWidth, ellipsis
     * Want whiteSpace nowrap ?
     * then @example{ellipsis:true}
     *   dont set width
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
        let jsonData;
        if (window.axios) {
            jsonData = await axios.get(urlAPI).then((res) => {
                return res.data;
            });
        } else {
            jsonData = await fetch(urlAPI)
                .then((res) => {
                    return res.json();
                })
                .catch((e) => {
                    return [];
                });
        }

        if (jsonData) {
            option.urlAPI = urlAPI;
            option = assignOption(this.#option, option);
            this.init(jsonData.data.dataObject, option, jsonData.data.paginationOption, jsonData.data.selectDataList);
            return true;
        } else return false;
    }
    reRenderTable() {
        this.#content.innerHTML = '<loader-component></loader-component>';
        this.fetchDataTable(this.#option.urlAPI);
    }
}
