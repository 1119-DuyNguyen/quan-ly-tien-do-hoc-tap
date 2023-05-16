export class ModalComponent {
    modal;

    closeModal(e) {
        e.preventDefault();
        if (this.modal) {
            this.modal.remove();
        }
    }

    constructor(contentElement, title = '', parentEl) {
        // this.modal = el;
        let modal = document.createElement('div');
        this.modal = modal;
        this.modal.classList.add('modal');
        this.parent = document.body || parent;

        if (!this.modal) return;
        this.modal.innerHTML = `

    <div class="modal_overlay"></div>

    <div class="modal_content form">
        <div class="modal-title">${title}</div>
        <div class='modal-content-section'>
        
        </div>
        <button title="Close" class="modal_close">
            <i class="fas fa-times"></i>
        </button>

    </div>

    
    `;
        let modalContentSection = this.modal.querySelector('.modal-content-section');
        if (contentElement) modalContentSection.appendChild(contentElement);
        this._appendModal();
        this.modal.querySelector('.modal_close').addEventListener('click', this.closeModal.bind(this));
        this.modal.querySelector('.modal_overlay').addEventListener('click', this.closeModal.bind(this));
    }

    _appendModal() {
        this.parent.appendChild(this.modal);
    }
}
