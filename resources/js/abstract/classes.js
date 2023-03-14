export class Route {
    urlRoutes = {};
    getUrlRoutes() {
        return this.urlRoutes;
    }
    addRoute(route, template, callback) {
        this.urlRoutes[route] = {
            template: template,
            method: callback,
        };
    }
}
