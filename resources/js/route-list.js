import DashBoard from './pages/dashboard.js'

export const route = new Route()
route.addRoute('/', './templates/dashboard.html', DashBoard.index)
