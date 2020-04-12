# v-model
在表单元素上创建双向数据绑定，本质上是语法糖
## input
### type=text 语法糖:@input + :value
```html
// @input 监听数据输入数据， :value实现数据驱动视图
<input type="text" @input="msg=$event.target.value" :value="msg">
```
```html
// v-model
<input type="text" v-model="msg">
```
```javascript
new Vue({
    ...,
    data: {
        msg: ''
    }
})
```
### type=checkbox 复选框 语法糖:@change + :checked
#### 单个复选框
```html
// 绑定的数据是布尔值
<input type="checkbox" v-model="checked">
```
```javascript
new Vue({
    ...,
    data: {
        checked: ''
    }
})
```
#### 多个复选框
```html
// 绑定的数据是数组
// 每选择一个复选框，就会向 checkList 数组里 push 该复选框的 value
<input type="checkbox" value="one" v-model="checkList">
<input type="checkbox" value="two" v-model="checkList">
<input type="checkbox" value="three" v-model="checkList">
```
```javascript
new Vue({
    ...,
    data: {
        checkList: []
    }
})
```
### type=radio 单选框 语法糖: @change + :checked
```html
// 绑定的数据是字符串
// 将选择的单选框的 value 赋值给 picked
<input type="radio" value="one" v-model="picked">
<input type="radio" value="two" v-model="picked">
<input type="radio" value="three" v-model="picked">
```
```javascript
new Vue({
    ...,
    data: {
        picked: ''
    }
})
```
## textarea 语法糖: @input + :value
```html
<textarea v-model="text"></textarea>
```
```javascript
new Vue({
    ...,
    data: {
        text: ''
    }
})
```
## select 下拉列表 语法糖: @change + :value
### 单选
```html
// 绑定的是 option 中的值
<select v-model="select">
    <option disabled>请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
```
```javascript
new Vue({
    ...,
    data: {
        select: '请选择'
    }
})
```
### 多选
```html
// 原理同 checkbox 的复选框
<select v-model="selectList" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
```
```javascript
new Vue({
    ...,
    data: {
        selectList: []
    }
})
```

## 修饰符
### .lazy
将 input 事件变为 change 事件
```html
<input type="text" v-model.lazy="msg">
```
### .number
自动将用户的输入值转为数值类型
```html
<input type="number" v-model.number="age">
```
### .trim
自动过滤用户输入的首尾空白字符
```html
<input type="text" v-model.trim="msg">
```