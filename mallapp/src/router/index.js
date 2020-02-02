import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Login from '../views/Login'
import Register from '../views/Register'

Vue.use(VueRouter)

const home = () => import('../views/Home/Home')
const cart = () => import('../views/cart/cart')
const mess = () => import('../views/mess/mess')
const mine = () => import('../views/mine/mine')
const details = () => import('../views/Home/components/details')

let routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: home,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/cart',
    component: cart,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/mess',
    component: mess,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/mine',
    component: mine,
    meta: {
      keepAlive: true,
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path:'/details/:id',
    name:'detail',
    component:details
  }, {
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/register',
    name: 'register',
    component: Register
}
]

const router = new VueRouter({
  routes,
  mode:'history'
})
// 设置路由拦截
// 在vue-router的全局钩子中设置拦截 
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')
//   if (to.meta.requireAuth) {
//       if (token) {
//           next()
//       } else {
//           next({
//               path: '/login',
//               query: {
//                   redirect: to.fullPath
//               }
//           })
//       }
//   } else {
//       next()
//   }
// })
export default router
