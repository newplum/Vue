# 组件
组件是可复用的Vue实例，且带有一个名字，例如名字为 new-div，那么我们则可以在一个通过new Vue创建的根实例中，把这个组件作为自定义元素来使用。
```html
<div id="app">
  <new-div></new-div>
</div>
```
# 组件注册
## 全局组件
利用Vue.component创建的组件组件是全局注册的。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中。
```js
Vue.component
```
用法：
```html
<div id="app">
  <new-button></new-button>
</div>
```
```js
const vm = new Vue({
    el: '#app',
})
Vue.component('new-button', {
    data () {
        return {
            msg: 'hello'
        }
    },
    template: `
        <button @click="msg + ',world'">{{ msg }}</button>
    `
})
```
## 局部组件
在components选项中定义要使用的组件。 对于 components 对象中的每一个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。
```js
new Vue({
    el: '#app',
    data: {},
    components: {
        'new-button': {
            data () {
                return {
                    msg: 'hello'
                }
            },
            template: `<button @click="msg + ',world'">{{ msg }}</button>`,
        }
    },
})
```
## 组件复用
可以将组件进行任意次数的复用
```html
<div id="#app">
  <new-button></new-button>
  <new-button></new-button>
  <new-button></new-button>
</div>
```
## 单个根元素
每个组件必须只有一个根元素，当模板的元素大于1时，可以将模板的内容包裹在一个父元素内。
```js
template: `
        <button @click="msg + ',world'">{{ msg }}</button>
        <button @click="msg + ',world'">{{ msg }}</button>
        <button @click="msg + ',world'">{{ msg }}</button>
    `
```
正确用法：
```js
template: `
        <div>
            <button @click="msg + ',world'">{{ msg }}</button>
            <button @click="msg + ',world'">{{ msg }}</button>
            <button @click="msg + ',world'">{{ msg }}</button>
        </div>
    `
```
# 组件 Prop
组件默认只是写好结构、样式和行为，使用的数据应由外界传递给组件。如何传递？注册需要接收的prop，将数据作为一个自定义特性传递给组件。

## 传递静态或动态 Prop

1. ### 传递静态 Prop
```html
<div id="app">
  <new-div title="标题" content="内容"></new-div>
</div>
```
```js
new Vue({
    el: '#app',
    data: {},
    components: {
        'new-div': {
            props: ['title', 'content'],
            template: `<div>{{ title, content }}</div>`,
        }
    },
})
```
在上述模板中，能够在组件实例中访问这个值，就像访问 data 中的值一样

2. ### 传递动态 Prop
#### 分别传递
若想要传递一个动态的值，可以配合v-bind指令进行传递，如：
```html
<div id="app">
  <new-div :title=title :content=content></new-div>
</div>
```
```js
new Vue({
    el: '#app',
    data: {
        title: '标题',
        content: '内容'
    },
    components: {
        'new-div': {
            props: ['title', 'content'],
            template: `<div>{{ title, content }}</div>`,
        }
    },
})
```
#### 一次性传递一个对象里的所有属性
如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind 。例如：
```html
<div id="app">
  <new-div v-bind="article"></new-div>
</div>
```
```js
new Vue({
    el: '#app',
    data: {
        article: {
            title: '标题',
            content: '内容'
        }
    },
    components: {
        'new-div': {
            props: ['title', 'content'],
            template: `<div>{{ title, content }}</div>`,
        }
    },
})
```
## Prop 验证
我们可以为组件的 prop 指定验证要求，例如你可以要求一个 prop 的类型为什么。如果说需求没有被满足的话，那么Vue会在浏览器控制台中进行警告，这在开发一个会被别人用到的组件时非常的有帮助。

为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：
```js
new Vue({
    el: '#app',
    data: {
        msg: 'hello',
        age: 12,
        flag: false,
        callback: function () {},
        commentIds: [],
        author: {},
        contactsPromise: new Promise()
    }
})
Vue.component('my-component', {
  props: {
    msg: String,  // 指定传递的 prop 值类型为 String
    age: Number,
    flag: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise
  }
})
```
上述代码中，对prop进行了基础的类型检查，类型值可以为下列原生构造函数中的一种：String、Number、Boolean、Array、Object、Date、Function、Symbol、任何自定义构造函数、或上述内容组成的数组。 需要注意的是null 和 undefined 会通过任何类型验证。 除基础类型检查外，我们还可以配置高级选项，对prop进行其他验证，如：类型检测、自定义验证和设置默认值。 如：
```js
Vue.component('my-component', {
  props: {
    msg: {  // 对 msg 进行验证
      type: String, // 检查 prop 是否为给定的类型
      default: '这是一个默认值',   // 为该 prop 指定一个默认值，对象或数组的默认值必须从一个工厂函数返回，如：default () { return {a: 1, b: 10} },
      required: true, // 定义该 prop 是否是必填项
      validator (prop) {  // 自定义验证函数，该prop的值回作为唯一的参数代入，若函数返回一个falsy的值，那么就代表验证失败
        return prop.length < 140;
      }
    },
    age: { // 对 age 进行验证

    }
  }
})
```

## 单向数据流
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
这里有两种常见的试图改变一个 prop 的情形：
1. 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用，在后续操作中，会将这个值进行改变。在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter // 如果传递的是对象或数组，则需要进行深度克隆
  }
}
```
2. 这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：
```js 
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

## 非 Prop 特性
非Prop特性指的是，一个未被组件注册的特性。  
当组件接收了一个非Prop特性时，该特性会被添加到这个组件的根元素上。而被注册过的特性则不会出现在该组件根元素上。
```html
<div id='#app'>
  <new-div a='1' b='2'></new-div>
</div>

<script>
  Vue.component('new-div',{
    props: ['a'],
    template: `
      <div>hello, world</div>
    `
  })
</script>
// 在页面上只能看到 div 中未被注册的 b 特性
```
非 prop 特性会替换已有特性，但 class/style 特性会进行合并
```html
<div id='#app'>
  <new-div a='1' b='2'></new-div>
</div>

<script>
  Vue.component('new-div',{
    props: ['a'],
    template: `
      <div b='3'>hello, world</div>
    `
  })
</script>
// 在页面中根元素 div 中的 b 特性的被组件中的覆盖，值为 2
```
### 禁用特性继承
如果不希望组件的根元素继承特性，那么可以在组件选项中设置 inheritAttrs: false。如：
```js
Vue.component('new-div', {
  inheritAttrs: false,
  ...
})
```
组件实例存在 $attrs 属性，$attrs 为一个对象，key为未被注册的特性名，value为该特性值 
```js
Vue.component('new-div',{
    inheritAttrs: false,
    template: `
      <div v-bind="$attrs">hello, world</div>
    `
    // inheritAttrs: false 和 v-bind 配合 $attrs 使用，可以手动决定这些特性会被赋予哪个元素
  })
```
注意：inheritAttrs: false 选项不会影响 style 和 class 的绑定。

## 监听组件事件
### 监听自定义事件
- 在父组件监听自定义一个事件，在子组件中触发。使用 $emit()
```html
<div id='#app'>
  <new-div @add-num='add' :num='num'></new-div>
</div>

<script>
  Vue.component('new-div',{
    props: ['num'],
    template: `
      <div @click="$emit('add-num', 1)">{{ num }}</div>
    `
  })
  new Vue({
    el: '#app',
    data: {
      num: 1,
    },
    methods: {
      add (temp) {
        this.num += temp;
      }
    }
  })
</script>
```
$emit() 接收两个参数，第一个是触发事件的名字，第二个可以是传给被触发事件函数的数据。传过去的数据是被触发事件函数的第一个参数

### 监听原生事件
1. 加修饰符: @click.native
2. Vue提供了一个$listeners属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。有了这个 $listeners 属性，我们可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素

### 在组件上使用 v-model
一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。碰到这样的情况，我们可以利用 model 选项来避免冲突：
```html
<div id='app'>
  <new-checkbox v-model="checked" :checked="checked"></new-checkbox>
</div>
```
```js
Vue.component('new-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input type="checkbox">
  `
})
new Vue({
  el: '#app',
  data: {
    checked: false
  }
})
```