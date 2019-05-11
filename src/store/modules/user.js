import { loginByUsername, logout } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    username: '',
    jobNumber: '',
    token: getToken(),
    roles: []
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
            if (result.role) { // 验证返回的role是否非空
              commit('SET_ROLES', result.role)
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
