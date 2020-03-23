import Vue from 'vue'
import App from './App'
import './static/icon/iconfont.css'//导入图标
import 'js_sdk/ican-H5Api/ican-H5Api.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
