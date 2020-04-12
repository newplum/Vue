# 计算属性
```html
<div id="app">
    <span>{{ add }}</span>
</div>
```
```javascript
new Vue({
    el: '#app',
    data: {
        num: 1
    },
    computed: {
        add: function () {
            // 返回的值就是计算属性最终的值
            return this.num ++;
        }
    }
})
```

## 计算属性与方法的区别
计算属性是基于响应式依赖进行缓存的，计算属性的值一直存于缓存中，只要它依赖的data数据不改变，每次访问计算属性，都会立刻返回缓存的结果，而不是再次执行函数。而方法则是每次触发重新渲染，调用方法将总会再次执行函数。

## 计算属性的另一种写法
```javascript
new Vue({
    el: '#app',
    data: {
        num1: 1,
        num2: 2
    },
    computed: {
        sum: {
            get () {
              return this.num1
            },
            set (v) {
              console.log('setter', v);
            }     
        }   
    }
})
```
- get 函数是在获取计算属性的值的时候执行的
- set 函数是在对计算属性进行设置的时候执行的