# 插槽
和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：
```html
<my-cmp>
  Something bad happened.
</my-cmp>
```
但是页面上是不会显示用这种方式传递的内容的，可以使用插槽解决
```html
<my-cmp>
  Something bad happened.
</my-cmp>
```
```js
Vue.compopnent('my-cmp', {
  template: `
    <button>
      <slot></slot>
    </button>
  `
})
```
当组件渲染时，<slot></slot>将会被替换为“Something bad happened.”。 插槽内可以包含任何模板代码，包括HTML和其他组件。 如果<my-cmp>没有包含<slot>元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

## 编译作用域
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

## 后备内容
如果给插槽设置了默认的内容，那么当组件中没有使用插槽的时候，默认插槽生效；如：
```html
<my-cmp></my-cmp>
```
```js
Vue.compopnent('my-cmp', {
  template: `
    <button>
      <slot>hello, world</slot>
    </button>
  `
})
//页面上出现 hello, world
```
反之，组件中使用了插槽；组件中的插槽内容会替换模板中的插槽内容；如：
```html
<my-cmp>some words</my-cmp>
```
```js
Vue.compopnent('my-cmp', {
  template: `
    <button>
      <slot>hello, world</slot>
    </button>
  `
})
//页面上出现 some words
```
## 具名插槽
给<slot>用上特殊属性 name; 如：
```js
<slot name="header"></slot>
<slot></slot>
<slot name="footer"></slot>
```
在组件中使用的时候：
```html
<div id='app'>
  <template v-slot:header> // 指定这个插槽用于模板中的位置：插槽 name = header 的位置
    <div> header </div>
  </template>
  <template v-slot:default>
    <div> main </div>
  </template>
  <template v-slot:footer>
    <div> footer </div>
  </template>
</div>
```
### 具名插槽缩写
v-slot => #
```html
<my-cmp>
  <template #header>
    <h1>头部</h1>
  </template>

  <template #default>
    <p>内容</p>
    <p>内容</p>
  </template>

  <template #footer>
    <p>底部</p>
  </template>
</my-cmp>
```

## 作用域插槽
为了能够让插槽内容访问子组件的数据，我们可以将子组件的数据作为<slot>元素的一个特性绑定上去
```js
Vue.component('my-cmp', {
  data () {
    return {
      user: {
        name: 'Tom',
        age: 18,
      }
    }
  },
  template: `
    <span>
      <slot v-bind:user="user"></slot>
    </span>
  `,
})
```
绑定在 <slot> 元素上的特性被称为插槽 prop。 那么在父级作用域中，可以给v-slot 一个值来定义我们提供的插槽prop的名字：
```html
<div id="app">
  <my-cmp>
    <template v-slot:default="slotProps">
      {{ slotProps.user.name }}
    </template>
  </my-cmp>
</div>
```
### 解构插槽
我们可以对插槽prop进行解构，如：
```html
<my-cmp v-slot="{ user }">
  {{ user.name }}
</my-cmp>
```
这样模板会更简洁，尤其是在为插槽提供了多个prop时。 此外还可以有其他可能，如prop重命名：
```html
<my-cmp v-slot="{ user : person }">
  {{ person.name }}
</my-cmp>
```