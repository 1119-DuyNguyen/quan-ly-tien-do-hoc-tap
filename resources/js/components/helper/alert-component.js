export function alertComponent(title = '', message = '') {
    let form = document.createElement('form');

    form.classList.add('alert-component');
    form.innerHTML = `

    <div class="alert-component_overlay"></div>
    <div class="alert-component_content">
        <!-- Dynamic Section -->
        <div class="alert-component-title">${title}</div>
        <!-- input -->
        <p>
           ${message}
        </p>

        <div class="alert-component_footer">
            <input type="submit" value="Đã hiểu" />
        </div>
    </div>
`;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.remove();
    });

    document.body.appendChild(form);
}
