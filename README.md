# axios
axios是基于promise的HTTP库,，可以用在浏览器和 node.js 中。  
浏览器支持情况：Chrome、Firefox、Safari、Edge、IE8+、Opera

## 引入方式
1. node
```
npm install axios
```
2. cdn
```js
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
## API
- axios(config)
- axios(url, [config])

### config 配置对象
最常用配置：
```js
axios({
    method: 'get', // post、get、put...
    baseUrl: '', //域名，基本地址
    url: '', // 请求的路径
    params: {}, // 请求参数，会拼接到url上
    data: {}, // 请求参数，会放到请求体中
    headers: {} // 设置请求头， 如token等
    timeout: 1000, // 设置请求超时时长，单位：ms
})
```
### 方法别名
```js
axios.request(config)
axios.get(url, [config])
axios.post(url, [config])
axios.delete(url, [config])
axios.head(url, [config])
axios.put(url, [data], [config])
axios.patch(url, [data], [config])
axios.options(url, [config])
```

### 全局配置
```js
axios.defaults.baseURL = '';
axios.defaults.timeout = 1000;
```

### 创建实例配置
```js
const instance = axios.create({
    baseURL: '',
    timeout: 1000
})
instance.get(url).then()
```

### 请求配置
```js
const instance = axios.create();
instance.get(url, {
    timeout: 2000
})
```

### 配置的优先顺序
全局 < 实例 < 请求

### 并发请求
- axios.all(iterable)
- axios.spread(callback)
```js
    axios.all([
        axios.get('/a'),
        axios.get('/b')
    ]).then(axios.spread((aRes, bRes) = > {
        console.log(aRes, bRes);
    })
```

### 拦截器
interceptors，在请求或响应被 then 或 catch 处理前拦截它们。
#### 添加请求拦截器
```js
axios.interceptors.request.use(config => {
    // 在发起请求之前做些什么,如改变 url和method
    config.url = 'changeURL';
    config.method = 'post';
    // 修改配置之后必须要返回，否则不能发出请求
    return config;
}, error => {
    // 对错误请求做些什么，执行在请求未成功发出时
    return Promise.reject(error);
})
```
#### 添加响应拦截器
```js
axios.interceptors.response.use(response => {
    // 对响应数据做点什么，同上，也应该将处理后的数据返回
    return response;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
})
```
#### 移除拦截器
```js
const myRequestInterceptors = axios.interceptors.request.use(config => {});
axios.interceptors.request.eject(myInterceptors)

const myResponceInterceptors = axios.interceptors.responce.use(responce => {});
axios.interceptors.responce.eject(myInterceptors)
```

#### 为axios实例添加拦截器
```js
const instance = axios.create();
instance.interceptors.request.use(config => {})
```
### 取消请求
用于取消正在进行中的 http 请求
```js
const source = aioxs.CancelToken.source();
axios.get('url', {
    // 在要取消的请求中配置cancelToken
    cancelToken: sourse.token
}).then(res => {
    console.log(res);
}).catch(error => {
    // 控制台打印 '取消请求'
    console.log(error.message);
})
// 执行source.cancel()取消请求，取消后会抛出一个错误，用 catch 解决
source.cancel('取消请求');
```
### 错误处理
在请求错误时进行的处理 request / response 是error的上下文，标志着请求发送 / 得到响应 在错误中，如果响应有值，则说明是响应时出现了错误。 如果响应没值，则说明是请求时出现了错误。 在错误中，如果请求无值，则说明是请求未发送出去，如取消请求。
```js
axios.get('url').catch(error => {
    // 请求错误或者响应错误，先判断响应是否错误，再判断请求是否错误
    if(error.response) {
        // 响应错误
        console.log('响应时错误');
    }else if (error, request) {
        // 请求错误
        console.log('请求时错误');
    }else {
        // 请求未发出时（取消请求时）
        console.log('Error', error.message);
    }
    console.log(error.config);
});
```
一般错误处理会放在拦截器里集中处理，有以下两种方式
1. 请求拦截器中的错误，在请求未成功发出在前执行
2. 响应拦截器中的错误，在这个错误信息中，可以拿到error.request和error.response，所以一般在响应拦截器中处理错误
- 注意：如果取消请求，则拦截器中的错误函数不会执行

### axios 预检
当axios的请求为非简单请求时，浏览器会进行预检，即发送OPTIONS请求。请求到服务器，询问是否允许跨域。如果响应中允许预检中请求的跨域行为，则浏览器会进行真正的请求。否则会报405错误。