//ES6
function getParent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

export function Validator(formSelector, { formGroup, errorSelector } = {}) {
    if (!formGroup) formGroup = '.form-group';
    if (!errorSelector) errorSelector = '.form-message'; // thẻ span
    var _this = this; // object Validator
    var rulesCollector = {};
    var formElement = document.querySelector(formSelector);
    const validatorRules = {
        required: function (value) {
            if (typeof value == 'string') return value.trim() ? undefined : 'Vui lòng nhập trường này';
            else {
                return value ? undefined : 'Vui lòng nhập trường này';
            }
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'vui lòng nhập lại email';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `vui lòng nhập tối thiểu ${min} ký tự`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length >= max ? undefined : `vui lòng nhập tối đa ${max} ký tự`;
            };
        },
        phone: function (value) {
            //10 so
            var regex = /^[0-9]{10}$/g;
            return regex.test(value) ? undefined : 'Số điện thoại không hợp lệ';
        },
        password: function (value) {
            if (value.length >= 6) {
                curPassword = value;
                return undefined;
            } else return `Mật khẩu phải tối thiểu 6 ký tự `;
        },
        repeatPassword: function (nameInput) {
            //console.log(`[name="${nameInput}]`);
            let input = formElement.querySelector(`[name="${nameInput}"]`);
            return function (value) {
                //console.log(input.value, value);
                return value === input.value ? undefined : `Mật khẩu nhập lại không đúng`;
            };
        },
        file: function (value) {},
    };
    function addErrorMessage(inputElement, errorMessage) {
        var parent = getParent(inputElement, formGroup);
        if (parent) {
            //thẻ span
            formMessage = parent.querySelector(errorSelector);
            if (!formMessage) {
                formMessage = document.createElement('span');
                formMessage.classList.add(errorSelector.replace('.', ''));
                parent.appendChild(formMessage);
            }
            if (errorMessage) formMessage.innerHTML = errorMessage;
            //invalid vào div -> nhìn giống lỗi
            parent.classList.add('invalid');
        }
    }
    function removeErrorMessage(inputElement) {
        var parent = getParent(inputElement, formGroup);
        if (parent) {
            //thẻ span
            formMessage = parent.querySelector(errorSelector);
            if (formMessage) formMessage.innerHTML = '';
            //invalid vào div -> nhìn giống lỗi
            parent.classList.remove('invalid');
        }
    }
    function handleError(event) {
        var input = event.target;
        var errorMessage;
        var rules = rulesCollector[input.name];
        if (!rules) return '';
        for (var rule of rules) {
            errorMessage = rule(input.value);
            if (errorMessage) break;
        }
        if (errorMessage) {
            addErrorMessage(input, errorMessage);
        } else {
            removeErrorMessage(input);
        }
        return errorMessage;
    }
    function validateGetInputRules(input) {
        var rules = input.getAttribute('rules');
        if (!rules) rules = [];
        else {
            rules = rules.split('|');
            input.onblur = handleError;
            input.oninput = function (e) {
                removeErrorMessage(e.target);
            };
        }
        for (var rule of rules) {
            var ruleInfo;
            //rule min:6
            if (rule.includes(':')) {
                ruleInfo = rule.split(':');
                rule = ruleInfo[0];
            }
            validateRule = validatorRules[rule];
            if (ruleInfo) {
                validateRule = validateRule(ruleInfo[1]);
            }
            if (Array.isArray(rulesCollector[input.name])) {
                rulesCollector[input.name].push(validateRule);
            } else {
                rulesCollector[input.name] = [validateRule];
            }
        }
    }
    if (formElement) {
        //lấy input mà có rules để validate
        var inputs = formElement.querySelectorAll('[rules]');

        for (var input of inputs) {
            validateGetInputRules(input);
        }

        formElement.onsubmit = function (e) {
            e.preventDefault();
            var inputs = formElement.querySelectorAll('[name]');
            var isFormValid = true;

            for (var input of inputs) {
                if (handleError({ target: input })) isFormValid = false;
            }

            if (isFormValid) {
                if (_this.onSubmit) {
                    _this.onSubmit(new FormData(formElement));
                } else {
                    formElement.submit();
                }
            }
        };
    } else {
        console.error('formElement không tìm thấy');
    }
}
