# VueRouter_导航守卫
导航：路由正在发生变化  
导航首位主要用来通过跳转或取消的方式守卫导航  
导航守卫被分为三种：全局的、单个路由独享的、组件内的

## 全局守卫
指路由实例上直接操作的钩子函数，触发路由就会触发这些钩子函数

### 1. 全局前置守卫 beforeEach
在路由跳转之前触发，一般被用于登录验证
```js
const router = new VueRouter({...})
router.beforeEach((to, from, next) => {
    // ...
})
```
参数说明：
- to: 目标路由信息对象（相当于 route）
- from: 即将要离开的路由信息对象（相当于 route）
- next: 三个参数中最重要的
    - 必须调用  next() 才能进行跳转
    - 若要中断当前的导航，可以调用 next(false)
    - 可以使用 next 跳转到一个不同的地址。终止当前导航，进入一个新的导航。next 参数值和 $router.push() 一致
    - next(error)。2.4+，如果传入 Error实例，导航被终止，且该错误会被传递给 router.onError()

### 2. 全局解析守卫 beforeResolve
和 beforeEach 类似，路由跳转前触发  
和 beforeEach 的区别：在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
```js
const router = new VueRouter({...})
router.beforeEach((to, from, next) => {
    // ...
})
```
### 3. 全局后置守卫 afterEach
在路由跳转完成之后触发
```js
const router = new VueRouter({...})
router.afterEach((to, from) => {
    // ...
})
```

## 路由独享守卫
给指定路由配置的钩子函数

### 1. beforeEnter
和 beforeEach 完全相同，如果两个都设置，则紧接着在 beforeEach 之后执行
```js
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: home,
            beforeEach((to, from, next) => {
                // ...
            })
        }
    ]
})
```

## 组件内守卫
在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加的生命周期钩子函数

### 1. beforeRouteEnter
路由进入之前调用  
在该守卫内访问不到组件实例，this 值为 undefined（因为还没有进入组件）。可以通过传一个回调函数给 next 来访问组件实例。在导航被确认的时候执行，并且把组件实例作为回调函数的参数。  
可以在这个守卫中发出请求，当成功获取并能进入路由时，调用 next 并在回调中通过 vm 访问组件实例，进行赋值等操作。（next 中函数的调用在 mounted 之后）
```js
const vm = new Vue({
    mounted () {

    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // vm 就是组件实例
        })
    }
})
```

### 2. beforeRouteUpdate
在当前路由改变时，并且该组件被复用时调用，可以通过 this 访问实例。  
组件何时被复用？
    - 动态路由间相互跳转
    - 路由 query 变更
```js
const vm = new Vue({
    beforeRouteEnter (to, from, next) {
        
    }
})
```

### 3. beforeRouteLeave
在离开一个路由的时候调用，可以访问组件实例 this

## 完整的导航解析流程
1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave 守卫
3. 调用全局的 beforeEach 守卫
4. 在复用的组件里调用 beforeRouteUpdate 守卫
5. 在路由配置里调用 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里调用 beforeRouteEnter 守卫
8. 调用全局的 beforeResolve 守卫
9. 导航被确认
10. 调用全局的 afterEach 钩子
11. 触发 DOM 更新
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数

## VueRouter_路由元信息
定义路由的时候可以配置 meta 字段，用于自定义一些信息。
```js
const router = VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            meta: {
                a: 1,
                b: 2
            }
        }
    ]
})
```
在设置了路由元信息之后，可以在组件内访问到：$route.meta