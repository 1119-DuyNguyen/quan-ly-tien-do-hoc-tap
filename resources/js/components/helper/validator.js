function getParent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}
function isNumeric(str) {
    if (typeof str != 'string') return false; // we only process strings!
    return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}
const validatorRules = {
    required: function (value) {
        return value.trim() ? undefined : 'Vui lòng nhập trường này';
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
    maxNum: function (max) {
        max = isNumeric(max) ? Number.parseFloat(max) : 0;

        return function (value) {
            let num = isNumeric(value) ? Number.parseFloat(value) : 0;
            return num <= max ? undefined : `Không được nhập giá trị quá ${max} `;
        };
    },
    minNum: function (min) {
        min = isNumeric(min) ? Number.parseFloat(min) : 0;

        return function (value) {
            let num = isNumeric(value) ? Number.parseFloat(value) : 0;
            return num >= min ? undefined : `Không được nhập giá trị nhỏ hơn ${min} `;
        };
    },
    number: function (value) {
        var regex = /^-?\d+\.?\d*$/;
        return regex.test(value) ? undefined : 'Trường chỉ chấp nhận định dạng là số';
    },
    firstLetter: function (value) {
        var regex = /^[A-Za-z][A-Za-z0-9 -]*$/;
        return regex.test(value) ? undefined : 'Kí tự đầu phải là chữ';
    },
    file: function (value) {},
};
export class Validator {
    errorMessageEl;
    constructor(formElement, { formGroup, errorSelector } = {}) {
        if (!formGroup) formGroup = '.form-group';
        if (!errorSelector) errorSelector = '.form-message'; // thẻ span
        var _this = this; // object Validator
        var rulesCollector = {};
        // var formElement = document.querySelector(formElement);

        function addErrorMessage(inputElement, errorMessage) {
            var parent = getParent(inputElement, formGroup);
            if (parent) {
                //thẻ span
                let formMessage = parent.querySelector(errorSelector);
                if (!formMessage) {
                    formMessage = document.createElement('span');
                    formMessage.classList.add(errorSelector.replace('.', ''));
                    inputElement.dataset.borderColorBackup = window
                        .getComputedStyle(inputElement, null)
                        .getPropertyValue('border-color');

                    parent.appendChild(formMessage);
                }
                if (errorMessage) {
                    // .form-group.invalid .form-control {
                    //     border-color: #f33a58;
                    // }

                    formMessage.innerHTML = errorMessage;
                    formMessage.style = `
                    color:var(--danger-color);
                    background-color:  var(--primary-color-text);
                    opacity:0.8;
                    border-radius:4px;
                    padding-left:0.5em;
                    font-weight:bold;
                    `;
                    inputElement.style.borderColor = '#f33a58';
                    // formMessage.style.color = 'var(--danger-color)';
                    // formMessage.style.backgroundColor = 'var(--secondary-color)';
                    // formMessage.style.borderRadius = '4px';
                }
                //invalid vào div -> nhìn giống lỗi
                parent.classList.add('invalid');
            }
        }
        function removeErrorMessage(inputElement) {
            var parent = getParent(inputElement, formGroup);
            if (parent) {
                //thẻ span
                let formMessage = parent.querySelector(errorSelector);
                if (formMessage) formMessage.remove();
                //invalid vào div -> nhìn giống lỗi
                inputElement.style.borderColor = inputElement.dataset.borderColorBackup;

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
                input.onchange = function (e) {
                    removeErrorMessage(e.target);
                };
            }
            var validateRule;

            for (var rule of rules) {
                var ruleInfo;
                //rule min:6
                if (rule.includes(':')) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }
                if (validatorRules[rule]) validateRule = validatorRules[rule];
                else continue;
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
}
