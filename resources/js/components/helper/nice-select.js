// utility functions
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
function triggerClick(el) {
    //var event = document.createEvent("MouseEvents");
    var event = new MouseEvent('click', {
        bubbles: true,
        cancelable: false,
        view: window,
    });
    // event.initEvent("click", true, false);
    el.dispatchEvent(event);
}

function triggerChange(el) {
    var event = new Event('change');
    el.dispatchEvent(event);
}

function triggerFocusIn(el) {
    var event = new Event('focusin');

    el.dispatchEvent(event);
}

function triggerFocusOut(el) {
    var event = new Event('focusout');
    el.dispatchEvent(event);
}

function triggerModalOpen(el) {
    var event = new UIEvent('modalopen');
    el.dispatchEvent(event);
}

function triggerModalClose(el) {
    var event = new UIEvent('modalclose');
    el.dispatchEvent(event);
}
/**
 * getAtrribute của element hay Object[key]
 * @param {Element|Object} el
 * @param {String} key
 * @returns
 */
function attr(el, key) {
    if (el[key] != undefined) {
        return el[key];
    }
    return el.getAttribute(key);
}
function data(el, key) {
    return el.getAttribute('data-' + key);
}

function hasClass(el, className) {
    if (el) {
        return el.classList.contains(className);
    } else {
        return false;
    }
}

function addClass(el, className) {
    if (el) return el.classList.add(className);
}

function removeClass(el, className) {
    if (el) return el.classList.remove(className);
}

function triggerValidationMessage(el, type) {
    if (type == 'invalid') {
        addClass(this.dropdown, 'invalid');
        removeClass(this.dropdown, 'valid');
    } else {
        addClass(this.dropdown, 'valid');
        removeClass(this.dropdown, 'invalid');
    }
}

export default class NiceSelect {
    elSelectReal;
    config;
    /** @type {Array||null} là mảng data của các option */
    data = null;
    selectOptions;
    placeHolder;
    searchText;
    selectedtext;
    elNiceSelect = null;
    multiple;
    disabled;
    defaultOptions = {
        searchable: false,
        showSelectedItems: true,
        maxSelectedOption: 2,
    };
    shouldCloseModal = false;
    /**
     * Biến 1 select bình thường thành phi thường
     * @param {Element} element
     * @param {Object} options
     * @example     defaultOptions = {
        searchable: false,
        showSelectedItems: true,
        maxSelectedOption: 2,
    };
     */
    constructor(element, options) {
        this.elSelectReal = element;
        this.config = Object.assign({}, this.defaultOptions, options || {});
        this.selectedOptions = [];

        this.placeholder = attr(this.elSelectReal, 'placeholder') || this.config.placeholder || 'Lựa chọn';
        this.searchtext = attr(this.elSelectReal, 'searchtext') || this.config.searchtext || 'Tìm kiếm';
        this.selectedtext = attr(this.elSelectReal, 'selectedtext') || this.config.selectedtext || 'Đã chọn';

        this.multiple = attr(this.elSelectReal, 'multiple');
        this.disabled = attr(this.elSelectReal, 'disabled');

        this.create();
    }
}
/**
 * Tạo nice select box
 */
NiceSelect.prototype.create = function () {
    this.hideRealSelectBox(this.data);
    this.extractData();
    this.renderElementNiceSelect();
    this.bindEvent();
};
/**
 * Ẩn select box thực tế
 */
NiceSelect.prototype.hideRealSelectBox = function () {
    this.elSelectReal.style.opacity = '0';
    this.elSelectReal.style.width = '0';
    this.elSelectReal.style.padding = '0';
    this.elSelectReal.style.height = '0';
};
/**
 * Biến các option của select thành option của NiceSelect
 */
NiceSelect.prototype.extractData = function () {
    var options = this.elSelectReal.querySelectorAll('option,optgroup');
    var optionList = [];
    var allOptions = [];
    var selectedOptions = [];

    options.forEach((optionElement) => {
        var option;
        if (optionElement.tagName == 'OPTGROUP') {
            option = {
                text: optionElement.label,
                value: 'optgroup',
            };
        } else {
            let text = optionElement.innerText;
            if (!optionElement.value) return;
            if (optionElement.dataset.display != undefined) {
                text = optionElement.dataset.display;
            }
            option = {
                text: text,
                value: optionElement.value,
                selected: optionElement.getAttribute('selected') != null,
                disabled: optionElement.getAttribute('disabled') != null,
            };
        }

        var attributes = {
            selected: optionElement.getAttribute('selected') != null,
            disabled: optionElement.getAttribute('disabled') != null,
            optgroup: optionElement.tagName == 'OPTGROUP',
        };

        optionList.push(option);
        allOptions.push({ data: option, attributes: attributes });
    });

    this.data = optionList;
    this.options = allOptions;
    this.options.forEach((item) => {
        if (item.attributes.selected) {
            selectedOptions.push(item);
        }
    });

    this.selectedOptions = selectedOptions;
};
/**
 * Tạo ra dropdown
 */
NiceSelect.prototype.renderElementNiceSelect = function () {
    var classes = [
        'nice-select',
        attr(this.elSelectReal, 'class') || '',
        this.disabled ? 'disabled' : '',
        this.multiple ? 'has-multiple' : '',
    ];
    var html = `<div class="${classes.join(' ')}" tabindex="${this.disabled ? null : 0}">`;

    html += `<span class="${this.multiple ? 'multiple-options' : 'current'}"></span>`;
    html += `<div class="nice-select-dropdown">`;
    var searchInputHtml = `
    <div class="nice-select-search-box">
    <input type="text" class="nice-select-search" placeholder="${this.searchtext}..." title="search"/>
    </div>
    `;
    html += `${this.config.searchable ? searchInputHtml : ''}`;
    html += `<ul class="list"></ul>`;
    html += `</div>`;

    html += `</div>`;

    this.elSelectReal.insertAdjacentHTML('afterend', html);

    this.elNiceSelect = this.elSelectReal.nextElementSibling;
    this._renderPlaceHolderNiceSelect();
    this._renderItems();
};
/**
 * Render placeholder dựa theo số lượng các option đã select
 * @if (multipleSelect) {

 }
 */
NiceSelect.prototype._renderPlaceHolderNiceSelect = function () {
    //Chọn nhiều lựa chọn
    if (this.multiple) {
        var selectedHtml = '';
        var placeHolderElementNiceSelect = this.elNiceSelect.querySelector('.multiple-options');
        if (
            this.config.showSelectedItems ||
            (this.config.maxSelectedOption && this.selectedOptions.length < this.config.maxSelectedOption)
        ) {
            this.selectedOptions.forEach(function (item) {
                selectedHtml += `<span class="current">${item.data.text}</span>`;
            });

            selectedHtml = selectedHtml == '' ? this.placeholder : selectedHtml;
        } else {
            selectedHtml = this.selectedOptions.length + ' ' + this.selectedtext;
        }

        placeHolderElementNiceSelect.innerHTML = selectedHtml;
    } else {
        //Chọn 1 lựa chọn

        var html = this.selectedOptions.length > 0 ? this.selectedOptions[0].data.text : this.placeholder;

        this.elNiceSelect.querySelector('.current').innerHTML = html;
    }
};

/*
--------------------------------------------Xử lý item--------------------------------

*/
/**
 * Render các option khi dropdown select
 */
NiceSelect.prototype._renderItems = function () {
    var ul = this.elNiceSelect.querySelector('ul');
    this.options.forEach((option) => {
        ul.appendChild(this._renderItem(option));
    });
};
/**
 * Render option
 * @param {Object} option
 * @returns Element
 */
NiceSelect.prototype._renderItem = function (option) {
    var el = document.createElement('li');

    el.innerHTML = option.data.text;

    if (option.attributes.optgroup) {
        addClass(el, 'optgroup');
    } else {
        el.setAttribute('data-value', option.data.value);
        var classList = [
            'option',
            option.attributes.selected ? 'selected' : '',
            option.attributes.disabled ? 'disabled' : '',
        ];

        el.addEventListener('click', this._onItemClicked.bind(this, option));
        el.classList.add(...classList.filter((className) => className.trim() != ''));
    }

    option.element = el;
    return el;
};
/**
 * Xử lý sự kiện click item , toggle select
 * @param {*} option
 * @param {*} e
 */
NiceSelect.prototype._onItemClicked = function (option, e) {
    var optionEl = e.target;

    if (!hasClass(optionEl, 'disabled')) {
        if (this.multiple) {
            // check xem có phần tử rồi remove nó đi :)))

            if (hasClass(optionEl, 'selected')) {
                removeClass(optionEl, 'selected');
                this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
                this.elSelectReal
                    .querySelector(`option[value="${optionEl.dataset.value}"]`)
                    .removeAttribute('selected');
            } else {
                addClass(optionEl, 'selected');
                this.selectedOptions.push(option);
            }
        } else {
            // Vì chỉ có 1 phần tử được chọn nên sau khi chọn sẽ đóng lại:)))
            this.selectedOptions.forEach(function (item) {
                removeClass(item.element, 'selected');
            });

            addClass(optionEl, 'selected');
            this.selectedOptions = [option];
            // Close select box modal
            this.shouldCloseModal = true;
        }

        this._renderPlaceHolderNiceSelect();
        this.updateSelectValue();
    }
};
/**
 * Cập nhập giá trị ở NiceSelect sang  real select
 */
NiceSelect.prototype.updateSelectValue = function () {
    if (this.multiple) {
        var select = this.elSelectReal;
        this.selectedOptions.forEach(function (item) {
            var el = select.querySelector(`option[value="${item.data.value}"]`);
            if (el) {
                el.setAttribute('selected', true);
            }
        });
    } else if (this.selectedOptions.length > 0) {
        this.elSelectReal.value = this.selectedOptions[0].data.value;
    }
    triggerChange(this.elSelectReal);
};

//Bind Event

NiceSelect.prototype.bindEvent = function () {
    this.elNiceSelect.addEventListener('click', this._onClicked.bind(this));
    // Event nice select map to event real select

    this.elNiceSelect.addEventListener('focusin', triggerFocusIn.bind(this, this.elSelectReal));
    this.elNiceSelect.addEventListener('focusout', triggerFocusOut.bind(this, this.elSelectReal));
    this.elSelectReal.addEventListener('invalid', triggerValidationMessage.bind(this, this.elSelectReal, 'invalid'));

    if (this.config.searchable) {
        this._bindSearchEvent();
    }
};
NiceSelect.prototype.update = function () {
    this.extractData();
    if (this.elNiceSelect) {
        var open = hasClass(this.elNiceSelect, 'open');
        this.elNiceSelect.parentNode.removeChild(this.elNiceSelect);
        this.create();

        if (open) {
            triggerClick(this.elNiceSelect);
        }
    }

    if (attr(this.elSelectReal, 'disabled')) {
        this.disable();
    } else {
        this.enable();
    }
};

NiceSelect.prototype.disable = function () {
    if (!this.disabled) {
        this.disabled = true;
        addClass(this.elNiceSelect, 'disabled');
    }
};

NiceSelect.prototype.enable = function () {
    if (this.disabled) {
        this.disabled = false;
        removeClass(this.elNiceSelect, 'disabled');
    }
};

NiceSelect.prototype.clear = function () {
    this.resetSelectValue();
    this.selectedOptions = [];
    this._renderPlaceHolderNiceSelect();
    this.update();

    triggerChange(this.elSelectReal);
};

NiceSelect.prototype.destroy = function () {
    if (this.elNiceSelect) {
        this.elNiceSelect.parentNode.removeChild(this.elNiceSelect);
        this.elSelectReal.style.display = '';
    }
};

NiceSelect.prototype._bindSearchEvent = function () {
    var searchBox = this.elNiceSelect.querySelector('.nice-select-search');
    searchBox.addEventListener('input', this._onSearchChanged.bind(this));
};

/**
 *
 * @param {Event} e
 */
NiceSelect.prototype._onClicked = function (e) {
    e.preventDefault();

    if (!hasClass(this.elNiceSelect, 'open')) {
        //    this.shouldCloseModal = false;

        addClass(this.elNiceSelect, 'open');
        addClass(this.elNiceSelect, 'focus');

        addOneTimeEventListener(document, 'click', this._onClickedOutside.bind(this));

        triggerModalOpen(this.elSelectReal);
    }
    // else if (!this.multiple) {
    //     //Để đóng lại nếu như chưa chọn select
    //     removeClass(this.elNiceSelect, "open");
    //     triggerModalClose(this.elSelectReal);
    // }

    if (hasClass(this.elNiceSelect, 'open')) {
        var search = this.elNiceSelect.querySelector('.nice-select-search');
        if (search) {
            search.value = '';
            search.focus();
        }

        var t = this.elNiceSelect.querySelector('.focus');
        removeClass(t, 'focus');
        t = this.elNiceSelect.querySelector('.selected');
        addClass(t, 'focus');
        this.elNiceSelect.querySelectorAll('ul li').forEach(function (item) {
            item.style.display = '';
        });
    } else {
        this.elNiceSelect.focus();
    }
};

NiceSelect.prototype.resetSelectValue = function () {
    if (this.multiple) {
        var select = this.elSelectReal;
        this.selectedOptions.forEach(function (item) {
            var el = select.querySelector(`option[value="${item.data.value}"]`);
            if (el) {
                el.removeAttribute('selected');
            }
        });
    } else if (this.selectedOptions.length > 0) {
        this.elSelectReal.selectedIndex = -1;
    }

    triggerChange(this.elSelectReal);
};
/**
 *
 * @param {Event} e
 * @returns
 */
NiceSelect.prototype._onClickedOutside = function (e) {
    // Để tránh việc nó truyền tới mấy đứa con

    if (!this.elNiceSelect.contains(e.target) || this.shouldCloseModal) {
        removeClass(this.elNiceSelect, 'open');
        removeClass(this.elNiceSelect, 'focus');

        triggerModalClose(this.elSelectReal);
        this.shouldCloseModal = false;
        return true;
    }
    return false;
};

NiceSelect.prototype._onSearchChanged = function (e) {
    var open = hasClass(this.elNiceSelect, 'open');
    var text = e.target.value;
    text = text.toLowerCase();

    if (text == '') {
        this.options.forEach(function (item) {
            item.element.style.display = '';
        });
    } else if (open) {
        this.options.forEach(function (item) {
            var optionText = item.data.text.toLowerCase();
            console.log(optionText, text);
            var matched = optionText.includes(text);
            item.element.style.display = matched ? '' : 'none';
        });
    }

    this.elNiceSelect.querySelectorAll('.focus').forEach(function (item) {
        removeClass(item, 'focus');
    });
};

export function bind(el, options) {
    return new NiceSelect(el, options);
}
