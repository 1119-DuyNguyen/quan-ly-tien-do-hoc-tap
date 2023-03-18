export class Route {
    urlRoutes = {};
    getUrlRoutes() {
        return this.urlRoutes;
    }
    addRoute(route, template, callback) {
        template = template.replace(/^\/+|\/+$/g, '');
        this.urlRoutes[route] = {
            template: location.protocol + '//' + location.host + '/' + template,
            method: callback,
        };
    }
}
