import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/MainDashBoard.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/MyLogin.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/MyRegistration.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/DetailRecord.vue')
  },
  {
    path: '/infographics',
    name: 'infographics',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/OrdersInfographics.vue')
  },
  {
    path: '/order',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/MyRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/OrdersHistory.vue')
  },
  {
    path: '/not-shipped',
    name: 'not-shipped',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/NotShippedOrders.vue')
  },
  {
    path: '/all-orders',
    name: 'all-orders',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/AllOrders.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/MyProfile.vue')
  },
  {
    path: '/statistic',
    name: 'statistic',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/StatisticView.vue')
  },
  {
    path: '/general-statistic',
    name: 'general-statistic',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/GeneralStatistic.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requireAuth = to.matched.some(record => record.meta.auth) 

  if(requireAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
