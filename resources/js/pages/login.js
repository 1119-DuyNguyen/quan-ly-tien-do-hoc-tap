export class Login {
    static ACCESS_TOKEN = 'access_token';
    static URL_LOGIN = location.protocol + '//' + location.host + '/api/login';
    static index() {
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
                .post(Login.URL_LOGIN, formData, {
                    headers: {
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    var data = res.data.data;
                    setCookie(Login.ACCESS_TOKEN, data['access_token'], data['expires_in']);
                    console.log(getCookie('access_token'));
                })
                .catch((error) => console.log(error));
        });
    }
    // static show({ id }) {
    //     console.log(id);
    // }
}
