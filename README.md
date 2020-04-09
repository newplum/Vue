- 在内联语句中使用事件对象时，可以利用$event来获取事件源对象 
```
<div id="app">
    <button v-on:click="handle(1, $event)"></button>
</div>
new Vue({
    el: '#app',
    methods: {
    handle: function (num, e) {
        num += 1;
        console.log(e.target)
    }
}
})
```
- 绑定动态事件
```
<div id="app">
    <button v-on:[event]="handle"></button>
</div>
new Vue({
    el: '#app',
    data: {
        event: 'click'
    },
    methods: {
    handle: function () {
       ...
    }
}
})
```
- ###事件修饰符
#### .stop
######相当于调用 event.stop，阻止冒泡事件
```html
<div class="id">
    <div @class="alert('div')">
        <button @click.stop="alert('button')"></button>
</div>
</div>
```
```javascript
new Vue({
    el: '#app',
    methods: {
        alert(param) {
            alert(param);
        }      
    }
})
```
#### .prevent
######相当于调用 event.preventDefault()，阻止默认事件
```html
<div id="app">
  <form @submit.prevent="onSubmit">
    <input type="submit">
  </form>
```
#### .capture
######事件捕获
```html
<!-- 此时先弹出div再弹出button -->
<div id="app">
  <div @click.capture="alert('div')">
    <button @click="alert('button')">点击</button>
  </div>
</div>
```
#### .self
######只当事件是从侦听器绑定的元素本身触发时才触发回调
#### .once
######只触发一次回调
#### .passive
######告诉浏览器不阻止默认事件
###注意：使用修饰符的顺序不同有不同的效果
````
v-on:click.prevent.self 会阻止所有的点击的默认事件
v-on:click.self.prevent 只会阻止对元素自身点击的默认事件
````
- ###按键修饰符
```html
<input type="text" @keyup.enter="submit">
```
- #####自定义按键名
```javascript
// 全局配置
// 使用 @keyup.ent
Vue.config.keyCodes.ent = 13; 
```
```javascript
Vue.config.keyCodes = {  
    ent: 13,
    a: 96
}
```
- ###系统修饰键（组合键）
```javascript
@keyup.ctrl.enter='handle'
```
- ###exact 修饰符
```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```
- ###鼠标按钮修饰符
#####仅当点击特定的鼠标按钮时会处理执行函数
```javascript
.left
.right
.middle
```