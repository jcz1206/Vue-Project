import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/old/Hello'
import Login from '@/components/old/Login'
import Index from '@/components/old/Index'
import Brand from '@/components/old/Brand'
import Foods from '@/components/old/Foods'
import Origin from '@/components/old/Origin'
import News from '@/components/old/News'
import Recruit from '@/components/old/Recruit'
import FoodDetail from '@/components/old/FoodDetail'


import newIndex from '@/components/index'
import regist from '@/components/regist'
import newLogin from '@/components/login'
import productlist from '@/components/product/productlist'
import my from '@/components/my/my'
import setting from '@/components/my/setting'
// import category from '@/components/product/category'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'newLogin',
            component: newLogin
        }, {
            path: '/newIndex',
            name: 'newIndex',
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: newIndex
        },
        {
            path: '/regist',
            name: 'regist',
            component: regist
        },
        {
            path: '/newLogin',
            name: 'newLogin',
            component: newLogin
        },
        {
            path: '/productlist',
            name: 'productlist',
            component: productlist
        },
        {
            path: '/my',
            name: 'my',
            component: my
        },
        {
            path: '/setting',
            name: 'setting',
            component: setting
        },
        // {
        //     path: '/category',
        //     name: 'category',
        //     component: category
        // },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/brand',
            name: 'Brand',
            component: Brand
        },
        {
            path: '/foods',
            name: 'Foods',
            component: Foods
        },
        {
            path: '/origin',
            name: 'Origin',
            component: Origin
        },
        {
            path: '/news',
            name: 'News',
            component: News
        },
        {
            path: '/recruit',
            name: 'Recruit',
            component: Recruit
        },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/foodDetail',
            name: 'foodDetail',
            component: FoodDetail
        }
    ]
})