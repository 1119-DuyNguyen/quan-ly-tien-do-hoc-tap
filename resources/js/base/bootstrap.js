/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;
// setup request before send to server

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.post['Authorization'] = `Bearer ${getCookie('access_token')}`;
console.log(getCookie('access_token'));
// setup response parse
// instance.interceptors.response.use((response) => {

//     const {code, auto} = response.data
//     if (code === 401) {
//         if(auto === 'yes'){

//             console.log('get new token using refresh token', getLocalRefreshToken())
//             return refreshToken().then(rs => {
//                 console.log('get token refreshToken>>', rs.data)
//                 const { token } = rs.data
//                 instance.setToken(token);
//                 const config = response.config
//                 config.headers\['x-access-token'\] = token
//                 config.baseURL = 'http://localhost:3000/'
//                 return instance(config)

//             })
//         }
//     }
//     return response
// }, error => {
//     console.warn('Error status', error.response.status)
//     // return Promise.reject(error)
//     if (error.response) {
//         return parseError(error.response.data)
//     } else {
//         return Promise.reject(error)
//     }
// })
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
