import link from './components/link'
import view from './components/view'

export default function install (Vue) {
    Vue.mixin({
        beforeCreate () {
            if (this.$options.router) {
                this._router = this.$options.router;
                // 通过 Vue 的响应式工具定义 _route ，这样定义的好处是，当定义的值变了，页面会重新渲染
                Vue.util.defineReactive(this, '_route', this._router.history.current);
            }
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get () {
            return this.$root._router;
        }
    })
    Object.defineProperty(Vue.prototype, '$route', {
        get () {
            return this.$root._route;
        }
    })
    Vue.component('router-link', link)
    Vue.component('router-view', view)
}  