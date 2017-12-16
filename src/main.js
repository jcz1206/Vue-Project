// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import axios from 'axios'

// import VueAxios from 'vue-axios'
import qs from 'qs'
import Promise from 'es6-promise'

import '@/assets/css/base/reset.css'
// import '@/assets/css/normalize.css'
import 'bootstrap/css/bootstrap.min.css'
// import 'bootstrap/js/bootstrap.min'
// import 'bootstrap/css/bootstrap.min.css'
// import 'bootstrap/css/bootstrap-grid.min.css'
// import './static/lib/bootstrap/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
//将css 放在app前面，css的加载顺序就不会有问题了
import '@/assets/iconfonts/iconfont.css'
// import BootstrapVue from 'bootstrap-vue'
import 'lib-flexible/flexible.js'
import App from './App'
import router from './router'
// import './assets/bootstrap/js/bootstrap.min.js'

// require('./assets/css/main.scss')
// import '@/assets/css/main.scss'
Vue.config.productionTip = false



//axios配置
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


//post传参序列化
axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // config.headers['Accept'] = 'application/json';
    // if (config.method == 'post') {
    //     config.data = qs.stringify(config.data)
    // }
    // alert(config);
    return config;
}, (error) => {
    alert("request错误参数");
    // _.toast("错误参数", 'fail');
    return Promise.reject(error);
});


//返回状态判断
axios.interceptors.response.use((res) => {
    // if (!res.data.success) {
    //     alert("200：response错了");
    //     // _.toast(res.data.msg);
    //     return Promise.reject(res);
    // }
    return res;
}, (error) => {
    // alert("response错误参数");
    // _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

Vue.prototype.axi = {
    post: function(url, params) {
        let paramss = qs.stringify(params);
        return new Promise((resolve, reject) => {
            axios.post(url, paramss)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    get: function(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

// //work with jQuery 2.x  
// jQuery.prototype.serializeObject = function() {
//     var hasOwnProperty = Object.prototype.hasOwnProperty;
//     return this.serializeArray().reduce(function(data, pair) {
//         if (!hasOwnProperty.call(data, pair.name)) {
//             data[pair.name] = pair.value;
//         }
//         return data;
//     }, {});
// };

//扩展jquery方法
jQuery.prototype.serializeObject = function() {
    var a, o, h, i, e;
    a = this.serializeArray();
    o = {};
    h = o.hasOwnProperty;
    for (i = 0; i < a.length; i++) {
        e = a[i];
        if (!h.call(o, e.name)) {
            o[e.name] = e.value;
        }
    }
    return o;
};



/* eslint-disable no-new */
new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: { App }
    })
    // Vue.use(BootstrapVue);