export class LoaderComponent extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        let width = this.getAttribute('width') ?? '120px';
        let height = this.getAttribute('height') ?? '120px';
        template.innerHTML = `
            <style>
            .loader {
                border: 16px solid #f3f3f3; /* Light grey */
                border: 16px solid var(--secondary-color);

                border-top: 16px solid #3498db; /* Blue */
                border-top: 16px solid var(--primary-color);

                border-radius: 50%;
                width: ${width};
                height: ${height};
                -webkit-animation: spin 1s linear infinite; /* Safari */
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            </style>
            <div class="loader"></div> `;
        // keeps component’s behaviour independent and from the rest of the Html.
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {}
}
