# VueRouter路由
## 安装路由
```js
npm install vue-router
```
## 使用路由---基础
### JavaScript部分
1. 引入路由  
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
```
2. 使用路由
```js
Vue.use(VueRouter);
```
3. 定义路由组件
```js
// 定义组件Home.vue 、About.vue
```
4. 引入路由组件
```js
// 引入组件
import Home from './components/Home.vue'
import About from './components/About.vue'
// 也可以在路由配置中异步的引入
```
5. 定义路由
```js
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/About',
        component: About
        // 或
        // component: () => import('./components/About')
    }
]
```
6. 创建 router 实例，然后传入routes 配置
```js
const router = new VueRouter({
    routes
})
```
7. 创建和挂载根实例
```js
const app = new Vue({
    router
}).$mount('#app')
```
### Html 部分
```html
<div id='app'>
    <h1>hello app</h1>
    <p>
        <!-- 使用 router-link 内置组件来导航 -->
        <!-- 通过传入 'to' 属性指定链接 -->
        <!-- <router-link> 默认会被渲染成一个 <a> 标签，通过 tag 属性改变默认值 -->
        <router-link to="/">Go to Home</router-link>
        <router-link to="/About" tag="div">Go to About</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在 router-view 组件的位置 -->
    <router-view></router-view>
<div>
```

## 其他属性
### router-link class
`router-link-exact-active`和`router-link-active`  
1. router-link-exact-active：当路径和 router-link 里 to 指向的路径完全相同时
2. router-link-active: 当路径包含了 router-link 里 to 指向的路径时
如果觉得这两个属性名太长，可以通过 VueRouter 配置更改 class 名
```js
VueRouter({
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'link-exact-active'
})
```
### hash 模式
vue-router 默认使用 hash 模式；使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL改变时，页面不会重新加载
### history 模式
history 模式 利用 histor.pushState API 来完成 URL 跳转而无须重新加载页面。
```js
// 在路由配置中设置
VueRouter({
    mode: 'history'
})
```
## 命名路由-嵌套路由-重定向-别名
### 1. 嵌套路由
一个被 router-view 渲染的组件想要包含自己的嵌套 router-view 时，可以使用嵌套路由。
```js
// 在 About 组件里嵌套一个 guess 组件
VueRouter({
    {
        path: '/About',
        component: () => import('./components/About'),
        children: [
            // path 可以简写成：guess，可以只保留子路由路径信息
            path: '/About/guess',
            component: () => import('./components/guess')
        ]
    }
})
```
### 2. 命名路由
可以通过一个名称标识一个路由，这样在有些路由过长时会方便很多。
```js
VueRouter({
    {
        path: '/About',
        component: () => import('./components/About'),
        children: [
            path: 'guess',
            // 在 router-link 的 to 属性里使用
            name: 'guess',
            component: () => import('./components/guess')
        ]
    }
})
```
```html
<router-link :to={name: 'guess'}>留言</router-link>
```
### 3. 重定向
重定向到一个完整的路径
```js
// 从 /a 重定向到 /b
VueRouter({
    routes: [
        {
            path: '/a',
            redirect: '/b'
        }
    ]
})
```
重定向的目标也可以是一个命名的路由
```js
VueRouter({
    routes: [
        {
            path: '/a',
            redirect: {name: 'b'}
        }
    ]
})
```
还可以是一个方法，动态返回重定向目标
```js
VueRouter({
    routes: [
        {
            path: '/a',
            redirect: to => {
                // 方法接收目标路由作为参数
                // return 重定向的字符串路径对象
                return {
                    name: 'b'
                }
            }
        }
    ]
})
```
### 4. 别名
```js
VueRouter({
    routes:[
        {
            path:'/home',
            component: () => import('./components/home'),
            // 别名，当访问 / 路径时，URL虽然是 / ，但实际访问的是 Home 组件的内容。它不影响访问 /home 路径
            alias: '/'
        }
    ]
})
```

## 编程式导航
通过在 Vue 根实例的 router 配置传入 router 实例， $router、$route两个属性会被注入到每个子组件中。
```js
// $router 路由实例对象
// $route 只读，路由的信息对象
```
### 1. $router
`$router.push`、`replace`和`go`
```js
new Vue({
    methods: {
        handleClick () {
            // this.$router.push() 方法是将指定路径添加到浏览器的浏览路径记录里面
            this.$router.push('/home');
            // 或者
            this.$router.replace('/home');
            // this.$router.replace() 方法是在浏览记录里将当前路径替换为指定路径
            //或
            this.$router.go(1) // 为1和-1时，等同于 history.forward()和history.back()
            // go()方法接收的参数为 n ，就前进 n 个页面；为 -n，则回退 n 页面
        }
    }
})
// 当触发这个方法时，页面就会跳转到指定路径
```
### 2. $route
#### 1. $route.path
字符串，对应当前路由的路径，总是解析为绝对路径，如："/About/guess"
#### 2. $route.params
一个 key/value 对象，包含了动态路由的参数，如果没有路由参数，就是一个空对象
#### 3. $route.query
一个 key/value 对象，表示 URL 查询参数。如："/About/guess?user='tom'，则有 this.$route.query.user = 'tom'
#### 4. $route.hash
路由的 hash 值（带#），如果没有 hash 值，则为空字符串
#### 5. $route.fullPath
完成解析后的 URL，包含查询参数和 hash 的完整路径
#### 6. $route.matched
包含了路由的嵌套信息
#### 7. $route.name
当前路由的名称，如果有
#### 8. $route.redirectedFrom
如果存在重定向，即为重定向来源路由的名字

## 动态路由匹配
当需要把某种模式匹配到的所有路由，全都映射到同个组件。可以在 vue-router 的路由路径中使用“动态路径参数”来达到这个效果。
```js
const router = new VueRouter({
    routes: [
        {
            path: '/user/:id',
            name: user,
            component: User
        }
    ]
})
```
```html
<router-link :to="{name: 'user', params: {id: user.id}}"></router-link>
```
经过设置后，像 /user/001和 /user/002 都将映射到相同的路由  
一个“路径参数”使用冒号 ：标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件中使用。

## 命名视图
想同时展示多个视图时，并且每个视图展示不同的组件时，可以使用命名视图。  
可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。
```html
<router-view></router-view>
<router-view name="about"></router-view>
```
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置：
```js
const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                default: () => import('./components/home'),
                about: () => import('./components/about')
            }
        }
    ]
})
```
## 路由组件传参
在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL上使用，限制了其灵活性。  
使用 props 将组件和路由解耦。
### 布尔模式
如果在路由配置中 props 被设置为 true，$route.params将会被设置为组件属性
```js
const router = new VueRouter({
    routes:[
        {
            path:'/about',
            component: about,
            props: true
        }
    ]
})
```
设置时候，在 about 组件中就会有 props 这个属性，通过注册就能使用了
### 函数模式
可以创建一个函数返回 props。函数的第一个参数是 route。
```js
const router = new VueRouter({
    routes:[
        {
            path:'/about',
            component: about,
            porps: route => {
                // 这个 route 就是 $route
                return {
                     
                }
            }
        }
    ]
})
```  
