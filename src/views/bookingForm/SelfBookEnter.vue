<template>
<div>
  <div v-show="showPage===1">
    <el-container>
      <el-header>X X 医 院 门 诊</el-header>
      <el-main>
        <div>
          <i class="fa fa-volume-up" aria-hidden="true"></i>
          请选择您所需要的服务
        </div>
        <el-row>
          <el-col :span="12">
            <el-button
              style="margin: auto;"
              type="primary"
              @click="selfBook"
              round>自助挂号</el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              style="margin: auto;"
              type="info"
              @click="selfOrder"
              round>自助预约</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-button
              style="margin: auto;"
              type="info"
              @click="selfQuery"
              round>自助查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button
              style="margin: auto;"
              type="info"
              @click="accountManage"
              round>账号管理</el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              style="margin: auto;"
              type="info"
              @click="selfCharge"
              round>自助充值</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
  <div v-show="showPage===2">
    <el-container>
      <el-header>X X 医 院 门 诊</el-header>
    <el-main>
      <div>
        <i class="fa fa-volume-up" aria-hidden="true"></i>
        {{this.voiceMessage}}
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div>内科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div>外科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div>儿科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div>妇产科</div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div>口腔科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div>耳鼻喉科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div>眼科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div>
                更多科室
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
    </el-container>
  </div>
</div>
</template>

<script>
import {voicePlay} from '../../utils'

export default {
  name: 'SelfBookForm',
  data () {
    return {
      showPage: 1,
      voiceMessage: '请选择就诊科室'
    }
  },
  methods: {
    selfBook () {
      this.showPage = 2
      voicePlay(this.voiceMessage)
    },
    selfOrder () {

    },
    selfQuery () {

    },
    accountManage () {

    },
    selfCharge () {

    }
  }
}
</script>

<style lang="scss" scoped>
.el-row{
  margin: 50px 20px;
}
  .el-button{
    width: 250px;
    height: 100px;
    border-radius: 100px;
  }
  .el-container{
    width: 100%;
    height: 100%;
  }
  .el-card{
    width: 250px;
    height: 100px;
    margin: auto;
    cursor: pointer;
  }
</style>
