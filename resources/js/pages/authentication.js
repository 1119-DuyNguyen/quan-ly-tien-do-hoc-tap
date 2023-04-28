import { routeHref } from '../routes/route.js';

export class Authentication {
    static ACCESS_TOKEN = 'access_token';
    static URL_LOGIN = location.protocol + '//' + location.host + '/api/login';
    static URL_LOGIN_REFRESH = location.protocol + '//' + location.host + '/api/login/refresh';
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
                    //    console.log(data);
                    if (data) {
                        window.localStorage.setItem('roleSlug', data.roleSlug);
                        window.localStorage.setItem('role', data.role);
                        window.localStorage.setItem('user', data.user);
                        window.localStorage.setItem('accessToken', data.accessToken);
                        window.localStorage.setItem('expireToken', data.expireToken);

                        window.axios.defaults.headers.common['Authorization'] = `Bearer ${
                            localStorage.getItem('accessToken') ?? ''
                        }`;
                    } else throw 'Lỗi máy chủ';
                })
                .catch((error) => {
                    window.localStorage.removeItem('roleSlug');
                    window.localStorage.removeItem('role');
                    window.localStorage.removeItem('user');
                    window.localStorage.removeItem('accessToken');
                    window.localStorage.removeItem('expireToken');
                    //alert('Đăng nhập thất bại thử lại sau ít phút');

                    //console.log(error.response.data);
                })
                .finally(() => {
                    routeHref('/');
                });
        });
    }
    static refreshToken() {
        return axios.post(Authentication.URL_LOGIN_REFRESH, null, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
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
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('expireToken');
                window.axios.defaults.headers.common['Authorization'] = axios.getAccessToken();
                routeHref('/');
            })
            .catch((error) => {
                alert('Đăng xuất thất bại thử lại sau ít phút');

                console.log(error.response.data);
            });
    }
    // static show({ id }) {
    //     console.log(id);
    // }
}
