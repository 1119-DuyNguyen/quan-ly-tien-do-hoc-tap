import { routeHref } from '../routes/route';

export class Authentication {
    static ACCESS_TOKEN = 'access_token';
    static URL_LOGIN = location.protocol + '//' + location.host + '/api/login';
    static URL_LOGOUT = location.protocol + '//' + location.host + '/api/logout';
    static login() {
        var form = document.getElementById('login-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // var inputs = form.querySelectorAll('input');
            //var formData = new FormData(form);

            const data = new FormData(form);
            const formData = {};
            for (const [key, value] of data) {
                formData[key] = value;
            }
            axios
                .post(Authentication.URL_LOGIN, formData, {
                    headers: {
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    var data = res.data.data;
                    console.log(data);
                    if (data && data.roleSlug) {
                        window.localStorage.setItem('roleSlug', data.roleSlug);
                        window.localStorage.setItem('role', data.role);
                        window.localStorage.setItem('user', data.user);
                        routeHref('/');
                    }
                })
                .catch((error) => console.log(error));
        });
    }
    static logout(event) {
        event.preventDefault();
        axios
            .post(Authentication.URL_LOGOUT, '', {
                headers: {
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                window.localStorage.removeItem('roleSlug');
                window.localStorage.removeItem('role');
                window.localStorage.removeItem('user');

                routeHref('/');
            })
            .catch((error) => console.log(error));
    }
    // static show({ id }) {
    //     console.log(id);
    // }
}
