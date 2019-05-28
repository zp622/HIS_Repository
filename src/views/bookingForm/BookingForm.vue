<template>
<div id="bookingForm">
  <div>
    <div style="font-weight: 600;font-family: 宋体;font-size: 40px;margin: 4% auto">医院信息管理系统 欢迎您</div>
    <div style="margin: 8% auto">
      <el-row>
        <el-col :span="12">
          <el-card
            class="box-card">
            <div class="enterDiv" @click="selfBookEnter">自助入口</div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div class="enterDiv">人工入口</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
import {voicePlay} from '../../utils'

export default {
  name: 'BookingForm',
  data () {
    return {
      voiceMessage: '请选择您所需要的服务'
    }
  },
  methods: {
    selfBookEnter () {
      this.$router.push({path: '/selfBookEnter'})
      voicePlay(this.voiceMessage)
    }
  }
}
</script>

<style lang="scss" scoped>
  #bookingForm{
    height: 89%;
    width: 100%;
    background: url("../../../static/img/book-bgi.jpg")  no-repeat center center;
    background-size: 100% 100%;
    border-bottom: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    transition: .3s;
    box-shadow: 0 8px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    overflow: hidden;
    .box-card{
      width: 250px;
      height: 100px;
      margin: auto;
      cursor: pointer;
      background-color: #d7ff57b8;//#d7ff57b8
      .enterDiv{
        font-family: 宋体;
        line-height:60px;
        width: 205px;
        height: 60px;
        font-size: 26px;
        font-weight: 600;
      }
    }
  }
</style>
