import './abstract/functions.js';
import './routes/route.js';
import './base/bootstrap';
import './layouts/sidebar.js';

import { LoaderComponent } from './components-html-template/loaderComponent.js';

//define component html
window.customElements.define('loader-component', LoaderComponent);

Echo.channel(`add-something`).listen('AnythingBePosted', (e) => {
    //khi post data thì cái hàm này đc gọi nè
    const notiIcon = document.getElementsByClassName('badge');
    var notiCount = notiIcon.innerHTML + 1;
    notiIcon.innerText = notiCount;
});
