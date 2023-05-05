/**
 *
 */
export class ConfirmComponent {
    constructor({ questionText, trueButtonText, falseButtonText, parent }) {
        console.log(document.body);

        this.questionText = questionText || 'Bạn có chắc chắn?';
        this.trueButtonText = trueButtonText || 'Có';
        this.falseButtonText = falseButtonText || 'Không';
        this.parent = document.body || parent;
        let obj = parent || document.body;
        this.dialog = undefined;
        this.trueButton = undefined;
        this.falseButton = undefined;

        this._createDialog();
        this._appendDialog();
        return this.confirm();
    }

    confirm() {
        return new Promise((resolve, reject) => {
            const somethingWentWrongUponCreation = !this.dialog || !this.trueButton || !this.falseButton;
            if (somethingWentWrongUponCreation) {
                reject('Có lỗi xảy ra khi khởi tạo biểu mẫu xác nhận');
                return;
            }

            this.dialog.showModal();
            this.trueButton.blur();
            this.falseButton.blur();
            this.trueButton.addEventListener('click', () => {
                resolve(true);
                this._destroy();
            });

            this.falseButton.addEventListener('click', () => {
                resolve(false);
                this._destroy();
            });
        });
    }

    _createDialog() {
        this.dialog = document.createElement('dialog');
        this.dialog.classList.add('confirm-dialog');

        const question = document.createElement('div');
        question.textContent = this.questionText;
        question.classList.add('confirm-dialog-question');
        this.dialog.appendChild(question);

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('confirm-dialog-button-group');
        this.dialog.appendChild(buttonGroup);

        this.falseButton = document.createElement('button');
        this.falseButton.classList.add('confirm-dialog-button', 'confirm-dialog-button--false');
        this.falseButton.type = 'button';
        this.falseButton.textContent = this.falseButtonText;
        buttonGroup.appendChild(this.falseButton);

        this.trueButton = document.createElement('button');
        this.trueButton.classList.add('confirm-dialog-button', 'confirm-dialog-button--true');
        this.trueButton.type = 'button';
        this.trueButton.textContent = this.trueButtonText;
        buttonGroup.appendChild(this.trueButton);
    }

    _appendDialog() {
        this.parent.appendChild(this.dialog);
    }

    _destroy() {
        this.parent.removeChild(this.dialog);
        delete this;
    }
}
