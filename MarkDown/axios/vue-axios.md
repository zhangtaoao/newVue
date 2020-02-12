# vue-axios

基于vuejs 的轻度封装

## 安装:

### CommonJS:

```
npm install --save axios vue-axios
```

将下面代码加入入口文件:

```js
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```



### Script:

按照这个顺序分别引入这三个文件： `vue`, `axios` and `vue-axios`

## Usage:

This wrapper bind `axios` to `Vue` or `this` if you’re using single file component.

你可以按照以下方式使用:

```js
Vue.axios.get(api).then((response) => {
  console.log(response.data)
})

this.axios.get(api).then((response) => {
  console.log(response.data)
})

this.$http.get(api).then((response) => {
  console.log(response.data)
})
```