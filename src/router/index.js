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
    path: '/basicManage',
    name: 'Layout',
    redirect: '/basicManage/userInfo',
    component: () => import('@/views/CommonComponents/Layout'),
    hidden: true,
    children: [
      {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import('@/views/basicManage/UserInfo'),
        meta: {
          title: '用户信息'
        }
      },
      {
        path: '/employeeInfo',
        name: 'EmployeeInfo',
        component: () => import('@/views/basicManage/EmployeeInfo'),
        meta: {
          title: '员工信息'
        }
      },
      {
        path: '/departmentInfo',
        name: 'DepartmentInfo',
        component: () => import('@/views/basicManage/DepartmentInfo'),
        meta: {
          title: '科室信息'
        }
      }
    ]
  },
  {
    path: '/doctorWork',
    name: 'Layout',
    redirect: '/doctorWork/receptionWork',
    component: () => import('@/views/CommonComponents/Layout'),
    hidden: true,
    children: [
      {
        path: '/receptionWork',
        name: 'ReceptionWork',
        component: () => import('@/views/doctorWork/ReceptionWork'),
        meta: {
          title: '接诊工作台'
        }
      },
      {
        path: '/patientInfo',
        name: 'PatientInfo',
        component: () => import('@/views/doctorWork/PatientInfo'),
        meta: {
          title: '患者信息'
        }
      }
    ]
  },
  {
    path: '/bookingForm',
    name: 'Layout',
    component: () => import('@/views/CommonComponents/Layout'),
    hidden: true,
    children: [{
      path: '/bookingForm',
      component: () => import('@/views/bookingForm/BookingForm'),
      name: 'BookingForm'
    }]
  },
  {
    path: '/selfBookEnter',
    name: 'SelfBookEnter',
    hidden: true,
    component: () => import('@/views/bookingForm/SelfBookEnter'),
    meta: {
      title: '自助挂号'
    }
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
