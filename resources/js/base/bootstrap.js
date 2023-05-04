/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axiosLibrary from 'axios';
import { Authentication } from '../pages/authentication.js';
import { toast } from '../components/helper/toast.js';
import { routeHref } from '../routes/route.js';
//window.axios = axios;
window.axios = axiosLibrary.create({
    baseURL: location.protocol + '//' + location.host,
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    },
});
window.axios.getAccessToken = function () {
    let token = localStorage.getItem('accessToken');
    if (!token) token = '';
    return `Bearer ${token}`;
};

// setup request before send to server
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = axios.getAccessToken();
// Gửi có cookie
axios.defaults.withCredentials = true;

// Response interceptor for API calls
let isRefreshing = false;
let failedQueue = []; // promise array
//https://stackoverflow.com/questions/57890667/axios-interceptor-refresh-token-for-multiple-requests
// queue lại nếu như thằng chạy vô đầu không thành công => báo lỗi đỏ lòm
const processQueue = (error, token) => {
    failedQueue.forEach((prom) => {
        if (error) {
            // console.log('hiii');
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

window.axios.interceptors.response.use(
    (response) => {
        //  console.log('hi', response.data);

        if (response.data.message)
            toast({ title: '', message: response.data.message, type: 'success', duration: 3000 });
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (!error.response) {
            toast({
                title: 'Gửi yêu cầu lên máy chủ thất bại',
                message: 'Hãy thử lại sau vài phút ',
                type: 'error',
                duration: 5000,
            });
            return Promise.reject(error);
        }
        if (error.response.status === 500) {
            let response500 = error.response;
            let mes500 = '';
            if (response500.data.message) mes500 += response500.data.message;
            if (!mes500) {
                mes500 = 'Hãy thử lại sau vài phút ';
            }
            toast({
                title: 'Máy chủ đang bận',
                message: mes500,
                type: 'error',
                duration: 5000,
            });
            return Promise.reject(error);
        }

        if (error.response.status === 400) {
            let response400 = error.response;
            if (response400.data.message)
                toast({ title: '', message: response400.data.message, type: 'error', duration: 3000 });
            return Promise.reject(error);
        }
        //unauthorization
        else if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axios(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            // console.log(error);

            return new Promise(function (resolve, reject) {
                Authentication.refreshToken()
                    .then((res) => {
                        var data = res.data.data;
                        //    console.log(data);
                        window.localStorage.setItem('accessToken', data.accessToken);
                        window.localStorage.setItem('expireToken', data.expireToken);

                        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;

                        processQueue(null, data.accessToken);
                        resolve(axios(originalRequest));
                    })
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.status == 407) {
                                toast({ title: 'phiên đăng nhập quá hạn', type: 'info', duration: 4000 });
                                window.localStorage.removeItem('roleSlug');
                                window.localStorage.removeItem('role');
                                window.localStorage.removeItem('user');
                                window.localStorage.removeItem('accessToken');
                                window.localStorage.removeItem('expireToken');
                                routeHref('/');
                            }
                        }
                        processQueue(error, null);
                        reject(error);
                    })
                    .finally(() => {
                        //console.log(isRefreshing);
                        isRefreshing = false;
                    });
            });
            // const isRefreshSuccess = await ;
            // console.log(isRefreshSuccess);

            // if (isRefreshSuccess) {
            //     // thử request lại
            //     //console.log('hi');
            //     originalRequest._retry = true;
            //     originalRequest.headers['Authorization'] = axios.getAccessToken();

            //     return axios(originalRequest);
            // } else {
            //     let response = error.response;
            //     if (response.data.message)
            //         toast({ title: '', message: response.data.message, type: 'error', duration: 3000 });
            // }

            // axios.defaults.headers.common['Authorization'] = axios.getAccessToken();
        }
        return Promise.reject(error);
    }
);
// window.axios.interceptors.response.use(
//     (response) => {
//         //  console.log('hi', response.data);

//         if (response.data.message)
//             toast({ title: '', message: response.data.message, type: 'success', duration: 3000 });
//         return response;
//     },
//     async function (error) {
//         const originalRequest = error.config;

//         //unauthorization
//         if (error.response.status === 401 && !originalRequest._retry) {
//             // console.log(error);
//             const isRefreshSuccess = await Authentication.refreshToken();
//             console.log(isRefreshSuccess);

//             if (isRefreshSuccess) {
//                 // thử request lại
//                 //console.log('hi');
//                 originalRequest._retry = true;
//                 originalRequest.headers['Authorization'] = axios.getAccessToken();

//                 return axios(originalRequest);
//             } else {
//                 let response = error.response;
//                 if (response.data.message)
//                     toast({ title: '', message: response.data.message, type: 'error', duration: 3000 });
//             }

//             // axios.defaults.headers.common['Authorization'] = axios.getAccessToken();
//         }
//         return Promise.reject(error);
//     }
// );
// axios.defaults.headers.common['X-CSRF-TOKEN'] = document
//     .querySelector('meta[name="csrf-token"]')
//     .getAttribute('content');
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
