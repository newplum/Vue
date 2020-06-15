# Vuex
使用方式：
```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: { // 存储数据

    },
    getters: { //可以通过 state 里数据的改变返回一个新的数据，相当于组件里的 computed

    },
    mutations: { // 操作 state 里数据

    },
    actions: { // 执行异步方法

    }
})
new Vue({
    // 将 Vuex 挂到 Vue 根实例上
    store
})
```
## 1. State
```js
new Vuex.Store({
    state: {
        name: 'xxx',
        age: 1
    }
})
```

### 获取 state 里数据的方式
#### 1. $store.state.xxx
在 html 中直接获取
```html
<template>
    <div> {{ $store.state.name }} </div>
</template>
```
在组件中获取
```js
export default {
    data () {
        return {
            name: this.$store.state.name
        }
    }
}
```
但是，如果通过其他方法将state 里面的 name 值 改为了 'Tom'，data 里的 name 是不会监听到这个改变的，仍然是第一次从 state 里拿到的值：'xxx'。如果想要随时拿到最新的值，可以采用计算属性:
```js
export default {
    computed: {
        name () {
            return this.$store.state.name
        }
    }
}
```
这样就能跟随 state 里面值得改动而改动了。
#### 2. mapState 辅助函数
mapState()返回值是一个对象，对象里面就是以属性名命名的函数，可以配合计算属性使用
```js
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['name', 'age'])
    }
}
// 最终 computed 里面是这样的:
// computed: {
//     name () {
//         return this.$store.state.name;
//     },
//     age () {
//         return this.$store.state.age;
//     }
// }
```
如果 state 里面的数据名和组件内部的数据名冲突了，可以修改 state 里面的数据名
```js
export default {
    data () {
        return {
            name: 'Bob',
            age: 2
        }
    },
    computed: {
        ...mapState({
            // 函数名为修改之后的名字，返回值为数据值
            storeName: state => state.name, //这里接收的参数 state 相当于 this.$store.state
            // 如果不想对 state 里的值进行更改，想直接拿到值，也可以直接这样写
            storeAge: 'age'
        })
    }
}
```
总之，修改 state 里面数据名的核心就是，要赋予一个新名字，还要给它一个值，这个值可以直接赋予，也可以使用函数的返回值

## 2. getters
使用方法：
```js
new Vuex.Store({
    state: {
        name: 'xxx',
        age: 2
    },
    getters: { 
        person (state) {
            // 返回值为一个指定的值
            return `姓名：${state.name} 年龄：${state.age}`;
        },
        addAge (state) {
            // 返回一个函数，通过使用 getters 的 addAge 方法时，传递参数
            return num => state.age + num
        }
    }
})
```
使用 getters 里面的数据、方法，和 state 类似
### 1. $store.getters.xxx
```js
export default {
    created () {
        console.log(this.$store.getters.person); // => 姓名：xxx 年龄：2
        console.log(this.$store.getters.addAge(3));// => 5
    }
}
```
### 2. mapGetters(['xxx'])
```js
export default {
    computed: {
        ...mapGetters(['person', 'addAge'])
    }
}
```
## 3. mutations
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
```js
new Vuex.Store({
    // 开启严格模式后，只能在 mutations 里面更改 state 数据；只在开发环境下开启
    strict: process.env.NODE_ENV !== 'production',
    state: {
        num: 1
    },
    mutations: {
        // 第一个参数为 state，第二个参数一般为一个对象来接收多个参数
        numAdd (state, {number}) {
            state.num += number;
        }
    }
})
```
使用 mutations 
```js
// 直接调用 numAdd 方法
this.$store.commit('numAdd', {number: 10})
// 或
methods: {
    // 这样就能在其他地方调用 numAdd 方法了
    ...mapMutations(['numAdd']),
    handleClick () {
        this.numAdd({number: 10})
    }
}
```

## 4. actions
类似于 mutation，不同在：
    - action 提交的是 mutation，而不是直接变更状态
    - action 可以包含异步操作
action 函数接收一个与 store 实例具有相同方法和属性的 context 对象，所以可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters
```js
const store = new Vuex.Store({
    state:{
     num: 1   
    },
    mutations: {
        mutation_numAdd (state, {number}) {
            state.num += number;
        }
    },
    actions: {
        action_numAdd (context, {number}) {
            context.commit('mutation_numAdd', {number})
        }
    }
    // 使用 action 提交 mutation 的顺序：
    // 1. 通过 dispatch 分发指定 action，并且传参
    // 2. 执行 action 里面的方法，接收参数
    // 3. 在 actions 的方法里面提交指定 mutation，并将接收到的参数作为参数传给 mutation
    // 4. 执行 mutation 里面的方法
})
```
使用 action
```js
this.$store.dispatch('action_numAdd', {number: 10});
// 或者
methods: {
    ...mapActions(['action_numAdd']),
    handle () {
        // 调用 action_numAdd
        this.action_numAdd({number: 10})
    }
}
```  
