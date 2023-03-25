export class Route {
    urlRoutes = {};

    getUrlRoutes() {
        return this.urlRoutes;
    }
    addRoute(route, callback, pageInfo = { title: '', keyWord: '' }, template) {
        template = template.replace(/^\/+|\/+$/g, '');

        if (template) {
            template = location.protocol + '//' + location.host + '/' + template;
        }

        this.urlRoutes[route] = {
            template: template,
            method: callback,
            pageInfo: pageInfo,
        };
    }
}
