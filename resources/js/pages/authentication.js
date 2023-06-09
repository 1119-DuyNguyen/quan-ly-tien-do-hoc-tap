import { Validator } from '../components/helper/validator.js';
import { toast } from '../components/helper/toast.js';
import { routeHref } from '../routes/route.js';

export class Authentication {
    static ACCESS_TOKEN = 'access_token';
    static URL_LOGIN = location.protocol + '//' + location.host + '/api/login';
    static URL_LOGIN_REFRESH = location.protocol + '//' + location.host + '/api/login/refresh';
    static URL_LOGOUT = location.protocol + '//' + location.host + '/api/logout';
    static login() {
        var form = document.getElementById('login-form');
        let formValidate = new Validator(form);
        let isSubmit = false;

        formValidate.onSubmit = function (formData) {
            // var inputs = form.querySelectorAll('input');
            //var formData = new FormData(form);

            // const data = new FormData(form);
            // const formData = {};
            // for (const [key, value] of data) {
            //     formData[key] = value;
            // }
            if (isSubmit) return;
            isSubmit = true;
            var submitBtn = form.querySelector('[type="submit"]');
            submitBtn.classList.add('process');
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
                    // if (error?.response?.data?.message) {
                    //     alertComponent('Có lỗi sai', error.response.data.message);
                    // }
                    window.localStorage.removeItem('roleSlug');
                    window.localStorage.removeItem('role');
                    window.localStorage.removeItem('user');
                    window.localStorage.removeItem('accessToken');
                    window.localStorage.removeItem('expireToken');
                    //alert('Đăng nhập thất bại thử lại sau ít phút');

                    //console.log(error.response.data);
                })
                .finally(() => {
                    submitBtn.classList.remove('process');
                    isSubmit = false;

                    routeHref('/');
                });
        };
        // form.addEventListener('submit', (e) => {

        // });
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
                toast({ message: 'Đăng xuất thất bại thử lại sau ít phút', type: 'error', duration: 4000 });

                console.log(error.response.data);
            });
    }
    // static show({ id }) {
    //     console.log(id);
    // }
}
