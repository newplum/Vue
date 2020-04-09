const data = {
    name: 'tom',
    sex: 'male',
    arr: [1, 2, 3, 4, 5],
    son: {
        name: 'bod',
        age: 5
    }
}

// 数据劫持不会监听数组，但为了在数组类型的数据改变时能渲染页面，需要改变以前数组的方法
// 创建一个新的数组原型是为了不污染原来的数组原型
const newArrayMethods= Object.create(Array.prototype);
['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach( (ele) => {
    // 改变原数组的方法
    newArrayMethods[ele] = function () {
        Array.prototype[ele].call(this, ...arguments);
        render();
    }
})

function render () {
    console.log('渲染页面');
}

function defineProperty (obj, key, value) {
    // 递归的方式判断value是否是对象，只有对象才能进行数据劫持
    observe(value);
    Object.defineProperty(obj, key, {
        get() {
            return value;
        },
        set(v) {
            // 如果新赋的值和原来的值一样，不渲染页面
            if (value === v) {
                return;
            }
            value = v;
            render();
        }
    })
}
function observe (obj) {
    if (Array.isArray(obj)) {
        obj.__proto__ = newArrayMethods;
        return;
    }
    if (typeof obj == 'object') {
        for (var key in obj) {
            defineProperty(obj, key, obj[key]);
        }
    }
}

function $set (obj, key, value) {
    if (Array.isArray(obj)) {
        obj.splice(key, 1, value);
        return value;
    }
    defineProperty(obj, key, value);
    render();
    return value;
}

function $delete(obj, key) {
    if (Array.isArray(obj)) {
        obj.splice(key, 1);
        return;
    }
    delete obj[key];
    render();
}

observe(data);


