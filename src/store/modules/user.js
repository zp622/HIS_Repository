import { loginByUsername, logout } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    username: '',
    jobNumber: '',
    token: getToken(),
    roles: '',
    titleRank: '',
    belongDept: ''
  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_JOBNUMBER: (state, jobNumber) => {
      state.jobNumber = jobNumber
    },
    SET_TITLERANK: (state, titleRank) => {
      state.titleRank = titleRank
    },
    SET_BELONGDEPT: (state, belongDept) => {
      state.belongDept = belongDept
    }
  },
  actions: {
    // 登录
    userLogin ({commit}, userInfo) {
      var username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
          // commit('SET_TOKEN', response.result)
          // setToken(response.result)
            var result = response.data[0]
            commit('SET_USERNAME', result.name)
            commit('SET_JOBNUMBER', result.jobNumber)
            // sessionStorage.setItem('username', result.name)
            // sessionStorage.setItem('jobNumber', result.jobNumber)
            // sessionStorage.setItem('password', userInfo.password)
            if (result.role) { // 验证返回的role是否非空
              commit('SET_ROLES', result.role)
              if (result.role === 'admin') {
                console.log('管理员')
              } else if (result.role === 'receptionist') {
                console.log('前台')
              } else {
                commit('SET_TITLERANK', result.titleRank)
                commit('SET_BELONGDEPT', result.belongDept)
              }
            } else {
              console.log('返回中的用户角色为空')
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },
    logOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
