export class RightPanel {
    static URL_CLASS_POST = location.protocol + '//' + location.host + '/api/class';
    static URL_POST = location.protocol + '//' + location.host + '/api/posts';
    #container;
    constructor(element) {
        this.#container = element;
    }

    async getBaiTapRightPanel(id_nhom_hoc) {}
}
