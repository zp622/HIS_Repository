<template>
<div id="bookingForm">
  <div>
    <h1>XX医院 欢迎您</h1>
    <el-row>
      <el-col :span="12">
        <el-card
          class="box-card"
          style="width: 250px;height: 100px;margin: auto;cursor: pointer">
          <span @click="selfBookEnter">自助入口</span>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="width: 250px;height: 100px;margin: auto">
          人工入口
        </el-card>
      </el-col>
    </el-row>

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

    border-bottom: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    transition: .3s;
    box-shadow: 0 8px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    overflow: hidden;
  }
</style>
