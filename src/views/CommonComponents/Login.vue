<template>
  <div id="login">
    <div id="loginForm">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px">
        <div style="margin-bottom:20px">
          <h2>Sign in</h2>
        </div>
        <el-row>
          <el-col>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username">
                <span slot="prefix"  style="font-size: large;">
                  <i class="fas fa-user-circle fa-fw"></i>
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password">
                <span slot="prefix"  style="font-size: large;">
                  <i class=" fas fa-lock fa-fw"></i>
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item>
              <el-button :loading="loading" @click.native.prevent="submitLogin('loginForm')" type="success" autofocus style="width: 95%;">登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    const usernameValidator = (valid, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const passwordValidator = (valid, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: usernameValidator }
        ],
        password: [
          { required: true, trigger: 'blur', validator: passwordValidator }
        ]
      }
    }
  },
  methods: {
    submitLogin (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('userLogin', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(error => {
            this.loading = false
            this.$message.error(error)
          })
        } else {

        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#login{
  position: fixed;
  height: 100%;
  width: 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('../../../static/img/bgi0.jpg');
  #loginForm{
    border-radius: 10px;
    box-shadow: 0px 2px 6px 2px #154e916e;
    background-color: rgba(255,255,255,0.7);
    margin: 13% auto auto 55%;
    width: 25%;
    padding: 30px 45px 10px 30px;
    .el-input{
      background-color: transparent;
    }
  }
}

</style>
