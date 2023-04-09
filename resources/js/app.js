import './abstract/functions.js';
import './routes/route.js';
import './base/bootstrap';
import './layouts/sidebar.js';
import { LoaderComponent } from './components-html-template/loaderComponent.js';

//define component html
window.customElements.define('loader-component', LoaderComponent);

//route.js;
window.addEventListener('DOMContentLoaded', () => {
    // console.log(window.getCookie('access_token'));
});
