const getters = {
  username: state => state.user.username,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs
}

export default getters
