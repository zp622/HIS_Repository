<template>
  <el-container id="layout">
    <el-header id="header">
      <div class="logoDiv">
        <img src="../../../static/img/logo.png" style="width: 130px;height: 60px;"/>
      </div>
      <div style="float: left;line-height: 60px">
        <h2 style="color:white;">医院信息管理系统</h2>
      </div>
      <el-menu :default-active="activeIndex"
               unique-opened
               menu-trigger
               class="horizontalMenu"
               mode="horizontal"
               background-color="transparent"
               @select="handleSelect">
        <div style="border:none;display: inline-block;line-height: 60px;color: white;font-size: 14px;float: left;margin: auto 15px;">
        <span>{{this.$store.getters.username}}，欢迎您</span>
        </div>
        <el-menu-item index="editPwd" style="color: white;">修改密码</el-menu-item>
        <el-menu-item index="logout" style="color: white;">退出登录</el-menu-item>
      </el-menu>
    </el-header>
    <div style="clear: both"></div>
    <el-container id="container">
      <el-aside width="200px">
        <el-menu
          :default-active="activeIndexAside"
          class="verticalMenu"
          router
          @select="menuSelect">
          <template v-for="item in menuData">
            <el-submenu :index="item.index" v-if="item.children && item.role.indexOf(userRole)!==-1" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="item2 in item.children" v-if="item2.role.indexOf(userRole)!==-1" :index="item2.index" :key="item2.index">
                <i :class="item2.icon"></i>
                <span slot="title">{{item2.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.index" v-else-if="item.role.indexOf(userRole)!==-1" :key="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <div v-else :key="item.index"></div>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{firstBreadcrumb}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="secondBreadcrumb!==''">{{secondBreadcrumb}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="containerTag">
          <el-tag
            @click="tagSelect(tag)"
            :type="tag.index===currentTagIndex?'success':'info'"
            size="small"
            :key="tag.index"
            v-for="tag in dynamicTags"
            :closable="tag.index==='homePage'?false:true"
            :disable-transitions="true"
            @close="handleCloseTag(tag)">
            {{tag.name}}
          </el-tag>
          <div style="float: right;line-height: 24px">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="fa fa-times-circle" aria-hidden="true"  style="color: #80808080;cursor: pointer"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>关闭其他</el-dropdown-item>
                <el-dropdown-item>关闭全部</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown @command="hiddenMenuCommand">
            <span class="el-dropdown-link">
                <i class="fa fa-forward"
                   style="color: #80808080; cursor: pointer;"
                   aria-hidden="true"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in dynamicTags"
                                :command="[item.parentIndex,item.index]"
                                :key="item.index"
                                @click="menuSelect(item.index, [item.parentIndex,item.index])">
                <router-link :to="item.index" style="text-decoration: none">{{item.name}}</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="clear: both;"></div>
        </div>
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
        <el-dialog title="修改密码" :visible.sync="pwdDialogVisible">
          <el-form status-icon ref="updatePwdForm" :model="updatePwdForm" label-width="80px" :rules="pwdRule">
            <el-form-item label="账号" prop="jonNumber" class="formSpan">
              <span>{{updatePwdForm.jobNumber}}</span>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPwd">
              <el-input v-model="updatePwdForm.oldPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input v-model="updatePwdForm.newPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-input v-model="updatePwdForm.confirmPwd" type="password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updatePwd(updatePwdForm)">确 定</el-button>
            <el-button @click="cancelPwd">取 消</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {checkOldPassword, updatePassword} from '../../api/layout'
import {logout} from '../../api/login'

export default {
  name: 'Layout',
  data () {
    const validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        checkOldPassword(this.$store.getters.jobNumber).then((response) => {
          if (response.code === '200') {
            callback()
          } else {
            callback(new Error(response.message))
          }
        })
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.updatePwdForm.confirmPwd !== '') {
          this.$refs.updatePwdForm.validateField('confirmPwd')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updatePwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pwdDialogVisible: false,
      updatePwdForm: {
        jobNumber: '',
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
        updatePwdForm: ''
      },
      pwdRule: {
        jobNumber: [
          {}
        ],
        oldPwd: [
          {validator: validateOldPwd, trigger: 'blur'}
        ],
        newPwd: [
          {validator: validatePass, trigger: 'blur'}
        ],
        confirmPwd: [
          {validator: validatePassCheck, trigger: 'blur'}
        ]
      },
      userRole: '',
      activeIndexHidden: '',
      hiddenTags: [
        {
          name: '首页',
          index: 'homePage',
          tagType: 'success',
          parentIndex: ''
        }
      ],
      currentTagIndex: 'homePage',
      activeIndex: '1',
      activeIndexAside: 'homePage',
      firstBreadcrumb: '',
      secondBreadcrumb: '',
      dynamicTags: [
        {
          name: '首页',
          index: 'homePage',
          parentIndex: ''
        }
      ],
      menuData: [
        {
          icon: 'fa fa-id-badge',
          name: '主页',
          index: 'homePage',
          role: ['admin', 'doctor', 'receptionist']
        },
        {
          icon: 'fa fa-id-badge',
          name: '基础信息管理',
          index: 'basicManage',
          role: ['admin'],
          children: [
            {
              icon: 'fas fa-user-circle fa-fw',
              name: '用户管理',
              index: 'userInfo',
              parentIndex: 'basicManage',
              role: ['admin']
            },
            {
              icon: 'fas fa-user-circle fa-fw',
              name: '员工信息',
              index: 'employeeInfo',
              parentIndex: 'basicManage',
              role: ['admin']
            },
            {
              icon: 'fas fa-user-circle fa-fw',
              name: '科室信息',
              index: 'departmentInfo',
              parentIndex: 'basicManage',
              role: ['admin']
            }
          ]
        },
        {
          icon: 'fa fa-id-badge',
          name: '挂号管理',
          index: 'bookingForm',
          role: ['admin', 'receptionist']
        },
        {
          icon: 'fa fa-id-badge',
          name: '医生工作台',
          index: 'doctorWork',
          role: ['admin', 'doctor'],
          children: [
            {
              icon: 'fa fa-id-badge',
              name: '接诊工作台',
              index: 'receptionWork',
              role: ['admin', 'doctor']
            },
            {
              icon: 'fa fa-id-badge',
              name: '患者信息',
              index: 'patientInfo',
              role: ['admin', 'doctor']
            },
            {
              icon: 'fa fa-id-badge',
              name: '病历查询',
              index: 'medicalRecords',
              role: ['admin', 'doctor']
            }
          ]
        }
      ]
    }
  },
  created () {
    this.userRole = this.$store.getters.roles
  },
  methods: {
    /* 修改用户密码 完成后重新登录 */
    updatePwd (formInfo) {
      this.$refs['updatePwdForm'].validate((valid) => {
        if (valid) {
          var result = updatePassword(formInfo)
          if (result.code === '200') {
            this.$message.success('修改成功，请重新登录')
            this.cancelPwd()
            logout(this.$store.getters.jobNumber).then((response) => {
              if (response.code === '200') {
                this.$router.push({path: '/login'})
              } else {
                this.$message.error(response.message)
              }
            })
          } else {
            this.$message.error(result.message)
          }
        } else {
          return false
        }
      })
    },
    cancelPwd () {
      this.$refs['updatePwdForm'].resetFields()
      this.pwdDialogVisible = false
    },
    hiddenMenuCommand (command) {
      var param = null
      if (command.length === 1) {
        param = command[0]
      } else {
        param = command[1]
      }
      this.menuSelect(param, command)
    },
    getArrIndex (arr, obj) {
      var index = null
      // var key = Object.keys(obj)[0]
      var key = 'index'
      arr.every(function (value, i) {
        if (value[key] === obj[key]) {
          index = i
          return false
        }
        return true
      })
      return index
    },
    handleCloseTag (tag) {
      var index = this.getArrIndex(this.dynamicTags, tag)
      this.dynamicTags.splice(index, 1)
      if (tag.index !== this.currentTagIndex) {
        return
      }
      var nextActiveIndex = this.dynamicTags[index - 1].index
      this.currentTagIndex = nextActiveIndex
      this.activeIndexAside = nextActiveIndex
      var paramArray = tag.parentIndex === '' ? [nextActiveIndex] : [tag.parentIndex, nextActiveIndex]
      this.menuSelect(nextActiveIndex, paramArray)
      this.$router.push({path: '/' + nextActiveIndex})
    },
    tagSelect (tag) {
      this.$router.push({path: '/' + tag.index})
      this.menuSelect(tag.index, [tag.parentIndex, tag.index])
    },
    handleSelect (key, keyPath) {
      switch (key) {
        case 'editPwd':
          this.updatePwdForm.jobNumber = this.$store.getters.jobNumber
          this.updatePwdForm.confirmPwd = ''
          this.updatePwdForm.newPwd = ''
          this.updatePwdForm.oldPwd = ''
          this.pwdDialogVisible = true
          break
        case 'logout':
          logout(this.$store.getters.jobNumber).then((response) => {
            if (response.code === '200') {
              this.$router.push({path: '/login'})
            } else {
              this.$message.error(response.message)
            }
          })
          break
      }
    },
    menuSelect (index, indexPath) {
      console.log(index, indexPath)
      this.activeIndexAside = index
      this.currentTagIndex = index
      if (index === 'homePage') {
        // 面包屑塞值
        this.firstBreadcrumb = ''
        this.secondBreadcrumb = ''

        // tag塞值
        this.dynamicTags.push()
        return
      }
      for (var i = 0; i < this.menuData.length; i++) {
        var obj = this.menuData[i]
        // 一级菜单
        if (obj.index === index && !obj.children) {
          // 面包屑塞值
          this.firstBreadcrumb = obj.name
          this.secondBreadcrumb = ''
          if (this.arrExistObj(this.dynamicTags, obj) !== -1) { // 存在
            return
          }
          // tag塞值
          this.dynamicTags.push(obj)
        } else {
          // 二级菜单
          var pathFirstLevel = indexPath[0]
          var pathSecondLevel = indexPath[1] // 等于index
          if (obj.index === pathFirstLevel && obj.children) {
            // 面包屑塞值
            this.firstBreadcrumb = obj.name
            for (var j = 0; j < obj.children.length; j++) {
              if (obj.children[j].index === pathSecondLevel) {
                this.secondBreadcrumb = obj.children[j].name
                if (this.arrExistObj(this.dynamicTags, obj.children[j]) !== -1) { // 存在
                  return
                }
                // tag塞值
                this.dynamicTags.push(obj.children[j])
              }
            }
          }
        }
      }
    },
    arrExistObj (arr, obj) {
      return JSON.stringify(arr).indexOf(JSON.stringify(obj))// -1表示不存在
    },
    rightClick (event) {
      debugger
      console.log(event)
    }
  }
}
</script>

<style lang="scss" scoped>
  #layout{
    height: 100%;
    width: 100%;
    #header{
      height:60px;
      background-color: #23c2aa;
      //#1aa78680;
      .logoDiv{
        height:60px;
        width:180px;
        float: left;
        background-image: url("../../../static/img/logo.png");
      }
      .horizontalMenu{
        float:right;

      }
    }
    #container{
      height: 100%;
      width: 100%;
      .verticalMenu{

      }
      .el-submenu, .el-menu-item{
        text-align: left;
      }
    }
    .el-menu--horizontal>.el-menu-item.is-active {
      border-bottom: 0px;
      color: #052731;
    }
    .containerTag{
      border-top: 1px solid #dcdfe6;
      text-align: left;
      margin: 4px auto;
      padding: 3px 0px;
      border-bottom: 1px solid #dcdfe6;
      .el-tag--small {
        border-radius: 24px;
      }
      .el-button {
        background: transparent;
        border: 0px solid #DCDFE6;
        padding: 0px;
        outline: none;
      }
      cursor: default;
    }
  }
  #layout .el-menu--horizontal > .el-menu-item:hover{
    background-color: #c8e4d857!important;
  }
  #layout .el-menu--horizontal > .el-menu-item.is-active{
    background-color: #c8e4d857!important;
  }
</style>
