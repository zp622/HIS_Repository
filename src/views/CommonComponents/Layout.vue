<template>

  <el-container id="layout">
    <el-header id="header">
      <div class="logoDiv">

      </div>
      <div style="float: left;line-height: 60px">
        <h2 style="color:white;">XX医院信息管理系统</h2>
      </div>
      <el-menu :default-active="activeIndex"
               unique-opened
               menu-trigger
               class="horizontalMenu"
               mode="horizontal"
               background-color="transparent"
               @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">个人中心</template>
          <el-menu-item index="2-1">信息修改</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="logout">注销</el-menu-item>
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
            <el-submenu :index="item.index" v-if="item.children" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-if="item.role===userRole || item.role==='admin'" v-for="item2 in item.children" :index="item2.index" :key="item2.index">
                <i :class="item2.icon"></i>
                <span slot="title">{{item2.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.index" v-else :key="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
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
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import {showMessage} from '../../utils'

export default {
  name: 'Layout',
  data () {
    return {
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
          index: 'homePage'
        },
        {
          icon: 'fa fa-id-badge',
          name: '用户管理',
          index: 'usermanage',
          children: [
            {
              icon: 'fas fa-user-circle fa-fw',
              name: '员工信息管理',
              index: 'employeeInfo',
              parentIndex: 'usermanage'
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
      var key = Object.keys(obj)[0]
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
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag.index), 1)
      var nextActiveIndex = this.dynamicTags[index - 1].index
      this.currentTagIndex = nextActiveIndex
      this.activeIndexAside = nextActiveIndex
      var paramArray = tag.parentIndex === '' ? [nextActiveIndex] : [tag.parentIndex, nextActiveIndex]
      this.menuSelect(nextActiveIndex, paramArray)
    },
    tagSelect (tag) {
      this.$router.push({path: '/' + tag.index})
      this.menuSelect(tag.index, [tag.parentIndex, tag.index])
    },
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':;break
        case '2':;break
        case 'logout':
          this.$message('退出逻辑')
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
    #header{
      height:60px;
      background-color: #23c2aa;
      //#1aa78680;
      .logoDiv{
        height:60px;
        width:250px;
        float: left;
      }
      .horizontalMenu{
        float:right;

      }
    }
    #container{
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
</style>
