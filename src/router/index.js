import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/CommonComponents/Login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    redirect: '/homePage',
    name: 'Layout',
    component: () => import('@/views/CommonComponents/Layout'),
    hidden: true,
    meta: {
      title: '布局',
      requireAuth: true
    },
    children: [{
      path: '/homePage',
      component: () => import('@/views/CommonComponents/HomePage'),
      name: 'HomePage',
      meta: {
        requireAuth: true
      }
    }]
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/CommonComponents/Layout'),
    hidden: true,
    meta: {
      title: '布局',
      requireAuth: true
    },
    children: [
      {
        path: '/employeeInfo',
        name: 'EmployeeInfo',
        hidden: true,
        component: () => import('@/views/userManage/EmployeeInfo'),
        meta: {
          title: '员工信息'
        }
      }
    ]
  },
  {
    path: '/helloworld',
    name: 'test',
    component: () => import('@/components/HelloWorld')
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
