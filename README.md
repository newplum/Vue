## 在V-for中使用数组
```html
<ul>
    <li v-for="(item, index) in list"></li>
</ul>
```
可以利用of替代in作为分隔符，因为它更接近迭代器的语法
```html
<div v-for="item of items"></div>
```
## 在V-for中使用对象
```html
<ul>
    <li v-for="(value, key, index) in obj"></li>
</ul>
```
## 可以利用 template 循环一段包含多个元素的内容
```html
<template v-for="item in items">
    <li>{{ item.msg }}</li>
    <span>{{ item.img }}</span>
</template>
```
## 不要把 v-for 和 v-if 同时放在同一个元素上
```html
<div v-for="item in oldData" v-if="item.flag"></div>
```
v-for 的优先级比 v-if 的优先级要高。哪怕只渲染出一小部分活跃用户的元素，在每次重新渲染的时候也会遍历整个列表，不论活跃用户是否发生了变化。
```javascript
// 解决办法是在JS中将要遍历的数据按照需求过滤一遍，不在元素中判断
vm.newData = vm.oldData.filter(data => data.flag)
```
```html
<div v-for="item in newData"></div>
```
## key
### key值类型:number|string
### key值必须唯一
Vue更新使用v-for渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处每个元素.但是在更多的时候，我们并不需要这样去处理，所以，为了给Vue一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，我们需要为每项提供一个唯一key特性，Vue会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。