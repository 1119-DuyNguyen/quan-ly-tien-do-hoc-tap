export class Analytics {
    static URL_REQ = location.protocol + '//' + location.host + '/api/admin/analytics';
    static async index() {
        axios.get(Analytics.URL_REQ).then(function (response) {
            let data = response.data.data;

            console.log(data);
        })
    }
}