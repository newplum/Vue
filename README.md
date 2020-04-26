# 组件间通信
1. ## prop
父组件传递数据给子组件时，可以通过特性传递。

推荐使用这种方式进行父->子通信。

2. ## $emit
子组件传递数据给父组件时，触发事件，从而抛出数据。

推荐使用这种方式进行子->父通信。

3. ## $attrs
当父组件的传递的特性未被注册时，在子组件中使用 $attrs 就可以获取到该特性。  

祖先组件传递数据给子孙组件时，可以利用$attrs传递。

demo或小型项目可以使用$attrs进行数据传递，中大型项目不推荐，数据流会变的难于理解。

$attrs的真正目的是撰写基础组件，将非Prop特性赋予某些DOM元素。

4. ## $listeners
$listeners 存放的是所有子组件监听的事件的方法，通过传递参数实现数据传递  

可以在子孙组件中执行祖先组件的函数，从而实现数据传递。

demo或小型项目可以使用$listeners进行数据传递，中大型项目不推荐，数据流会变的难于理解。

$listeners的真正目的是将所有的事件监听器指向这个组件的某个特定的子元素。

5. ## $root
可以在子组件中访问根实例的数据。

对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

6. ## $parent 
可以在子组件中访问父实例的数据。

对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

7. ## $children
可以在父组件中访问子实例的数据。

对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

8. ## $ref
可以在父组件中访问子实例的数据。  

尽管存在prop和事件，但是有时候仍可能需要在JS里直接访问一个子组件，可以通过 ref 特性为子组件赋予一个ID引用：
```html
<my-cmp ref="cmp"></my-cmp>
```
这样就可以通过this.$refs.cmp 来访问<my-cmp>实例。 ref 也可以 对指定DOM元素进行访问，如:
```html
<input ref="input" />
```
可以通过 this.$refs.input 来访问到该DOM元素。
当ref 和 v-for 一起使用时，得到的引用将会是一个包含了对应数据源的这些子组件的数组。

注意: $refs 只会在组件渲染完成之后生效，并且它们不是响应式的，适用于demo或小型项目。

9. ## provide & inject
祖先组件提供数据（provide），子孙组件按需注入（inject）。
### provide
provide 选项允许我们指定想要提供给后代组件的数据/方法，例如:
```js
Vue.component('cmp-parent', {
  provide () {
    return {
      share: this.share,
    }
  },
  data () {
    return {
      share: 'share',
    }
  },
  template: `<div>cmp-parent</div>`
})
```
然后再任何后代组件中，我们都可以使用 inject 选项来接受指定想要添加在实例上的属性。
### inject
```js
Vue.component('cmp-a', {
  inject: ['share'],
  template: `<div>cmp-a</div>`
})
```
会将组件的阻止方式，耦合在一起，从而使组件重构困难，难以维护。不推荐在中大型项目中使用，适用于一些小组件的编写。

10. ## eventBus(事件总线)
在 Vue 原型链上添加一个 $bus 属性，$bus 为一个新的 Vue 实例。那么所有的 Vue 实例上都有 $bus 这个属性，通过 $bus 监听和触发事件（$emit() 和 $on()），用传参的方式传递数据。
```js
Vue.prototype.$bus = new Vue();
```
```js
Vue.component('cmp-a', {
  data () {
    return {
      a: 'a'
    }
  },
  methods: {
    onClick () {
      this.$bus.$emit('click', this.a)
    }
  },
  template: `
    <div>
      <button @click="onClick">点击</button>
    </div>
  `,
})
Vue.component('cmp-a', {
  mounted () {
    this.$bus.$on('click', data => {
      console.log(data);
    })
  },
  template: `
    <div>b</div>
  `,
})
```
非父子组件通信时，可以使用这种方法，但仅针对于小型项目。中大型项目使用时，会造成代码混乱不易维护。

11. ## Vuex