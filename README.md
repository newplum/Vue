# VueRouter_过渡动效-滚动行为
## 过渡动效
`<router-view></router-view>`是基本的动态组件，所以可以用`transition`组件给它添加一些过渡效果。
```html
<transition>
    <router-view></router-view>
</transition>
```

## 滚动行为
使用前端路由，当切换到新路由时，想要页面滚动到顶部，或者是保持原先的滚动位置，就像重新加载页面那样，vue-router 可以自定义路由切换时页面如何滚动
###### 注意：这个功能只在支持 history.pushState 的浏览器中可用。
当创建一个 Router 实例，可以提供一个 scrollBhhavior 方法：
```js
const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个位置
        return {
            // 滚动到顶部
            x: 0,
            y: 0
        }
        // return savedPosition 回退到上个页面的位置
    }
})
```
scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate(通过浏览器的前进、后退按钮触发) 导航时才可用。
