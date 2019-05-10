import { loginByUsername, logout } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    username: '',
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
            if (result.role) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', result.role)
            } else {
              console.log('resopnse.data.role is null')
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
