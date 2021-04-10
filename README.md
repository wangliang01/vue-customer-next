# vue-customer-next

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 描述
这是一个使用vue3重构的项目，其主要目的，是熟悉vue3的开发模式，这里选用的UI框架是vant,感觉vant的使用方式比较简单。
这个系统，比较简单，只有5个功能，登录，首页，新增客户，新增子客户，查看客户详情。
虽说，页面简单，但是，也能够用到vue3的大部分新特性，所以觉得还是可以的。

## 构建过程
1. 重新修改.eslintrc.js
使用自己熟悉的，才是最好的，于是就用了这个规则
2. 引入husky及lint-staged
```json
"scripts": {
    "lint:fix": "eslint --ext .js,.vue src --fix",
    "precommit": "lint-staged"
  },
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,json,css,vue}": [
      "eslint --ext .js,.vue src --fix",
      "git add"
    ]
  },
```
3. 引入vant
```
yarn add vant@next
```
因为是体验vue3,这里就不考虑代码体积，就一次性全部引入vant组件，不做过多配置

在main.js中
```js
import {createApp} from 'vue'
import App from './App'
import Vant from 'vant';
import 'vant/lib/index.css';
const app = createApp(App)

app.use(Vant);
```
