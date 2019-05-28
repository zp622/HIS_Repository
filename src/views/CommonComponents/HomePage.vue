<template>
    <div id="homePage">
      <div style="font-weight: 600;font-family: 宋体;font-size: 40px;margin: 4% auto">医院信息管理系统 欢迎您</div>
    </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
#homePage{
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
}
</style>
