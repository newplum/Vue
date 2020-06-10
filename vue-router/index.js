import install from './install';
import history from './history'

class VueRouter {
    constructor (options) {
        this.routeMap = this.createRoutesMap(options.routes || []);
        this.history = new History();
        this.mode = options.mode || 'hash';
        this.init();
    }
    createRoutesMap (routes) {
        const routeMap = {};

        for (let i = 0; i < routes.length; i ++) {
            routeMap[routes[i].path] = routes[i].component;
        }

        return routeMap;
    }
    init () {
        if (this.mode == 'hash') {
            location.hash ? '' : location.hash = '/';

            document.addEventListener("DOMContentLoaded", () => {
                this.history.current.path = location.hash.slice(1);
            })
            window.addEventListener("hashchange", () => {
                this.history.current.path = location.hash.slice(1);
            })
        }else {
            document.addEventListener("DOMContentLoaded", () => {
                this.history.current.path = location.pathname;
            })
            window.addEventListener("popstate", () => {
                this.history.current.path = location.pathname;
            })
        }
    }
}

VueRouter.install = install

export default VueRouter;