class Route {
    urlRoutes = {}
    get getUrlRoutes() {
        return this.urlRoutes
    }
    addRoute(route, template, callback) {
        urlRoutes[route] = {
            template: template,
            callback: callback,
        }
    }
}
