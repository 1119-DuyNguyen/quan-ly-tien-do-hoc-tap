/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axiosLibrary from 'axios';
import { Authentication } from '../pages/authentication.js';
import { toast } from '../components/helper/toast.js';
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

//cau hinh axios
// const instance = axios.create({
//     baseURL: location.protocol + '//' + location.host,
//     timeout: 300000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

//console.log(`Bearer ${localStorage.getItem('accessToken') ?? ''}`);
// setup response parse

// Response interceptor for API calls
window.axios.interceptors.response.use(
    (response) => {
        //  console.log('hi', response.data);

        if (response.data.message)
            toast({ title: '', message: response.data.message, type: 'success', duration: 3000 });
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        //unauthorization
        if (error.response.status === 401 && !originalRequest._retry) {
            // console.log(error);
            const isRefreshSuccess = await Authentication.refreshToken();
            // console.log(isRefreshSuccess);
            if (isRefreshSuccess) {
                // thử request lại
                //console.log('hi');
                originalRequest._retry = true;
                originalRequest.headers['Authorization'] = axios.getAccessToken();

                return window.axios.request(originalRequest);
            } else {
                let response = error.response;
                if (response.data.message)
                    toast({ title: '', message: response.data.message, type: 'error', duration: 3000 });
                tu;
            }

            // axios.defaults.headers.common['Authorization'] = axios.getAccessToken();
        }
        return Promise.reject(error);
    }
);
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
