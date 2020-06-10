# 路由原理
通过 hash、history 的无需刷新页面渲染视图的特性
## hash模式下
监听浏览器的 hashchange 方法，获取到对应的路径，通过路径来找到相应的组件进行渲染。
```html
<!-- router-link -->
<a href="#/">首页</a>
<a href="#/about">关于</a>

<!-- router-view -->
<div id="view"></div>
```
```js
// 监听切换路由时 hash 值的改变，并通过改变的 hash 值渲染视图
window.addEventListener('hashchange', () => {
    view.innerHTML = location.hash.slice(1);
})
// 当 DOM 加载完成后，需要自动渲染的组件
document.addEventListener('DOMContentLoaded', () => {
    view.innerHTML = location.hash.slice(1);
})
```

## history 模式下
结合 history.pushState 方法和监听 window 上的 popstate 事件来实现
```html
<a onclick="routerChange('/')">首页</a>
<a onclick="routerChange('/about')">关于</a>
```
```js
// 实现路由的切换，但当使用浏览器的前进、后退功能时，不能重新渲染视图
function routerChange (path) {
    history.pushState(null, null, path);
    view.innerHTML = location.pathname;
}
// 监听 popstate 事件，能在使用浏览器的前进、后退功能时重新渲染页面
window.addEventListener('popstate', () => {
    view.innerHTML = location.pathname;
})
```
## hash 和 history 区别
### hash
1. 通过锚点（#）进行跳转
2. 浏览器可以前进和后退
3. 浏览器不刷新
4. 不会产生请求，不会和服务端进行交流

### history
1. 没有锚点（#）
2. 浏览器前进、后退
3. 浏览器刷新
4. 会发出请求，和服务端产生交流