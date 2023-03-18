export class Login {
    static index() {
        var form = document.getElementById('login-form');
        let HEADERS = { 'Content-Type': 'application/json' };
        var currentURL =
            location.protocol + '//' + location.host + '/api/login';

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
                .post(currentURL, JSON.stringify(formData), {
                    headers: {
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    console.log(res);
                    //  console.log(res.data);
                })
                .catch((error) => console.log(error));
        });
    }
    static show({ id }) {
        console.log(id);
    }
}
