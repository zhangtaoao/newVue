import Vue from 'vue'
import VueRouter from 'vue-router'

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
      keepAlive: true
    }
  },
  {
    path:'/details/:id',
    name:'detail',
    component:details
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
