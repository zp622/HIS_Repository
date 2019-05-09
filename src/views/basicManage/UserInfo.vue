<template>
<div id="userInfo">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="职工号">
            <el-input v-model="queryForm.jobNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="queryForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色">
            <el-select v-model="queryForm.role" style="width: 100%">
              <el-option
                v-for="item in roles"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
                :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div style="background-color: #f4f4f5;border-radius: 6px;margin-bottom: 5px;">
    <div style="display: inline-block;float: left">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <div style="display: inline-block;float: right;">
      <el-button type="success" size="small">查询</el-button>
      <el-button type="success" size="small">新增</el-button>
      <el-button type="success" size="small">修改</el-button>
      <el-button type="success" size="small">删除</el-button>
    </div>
    <div style="clear:both"></div>
  </div>
  <div>
    <el-table :data="userData" height="250" border style="width: 100%">
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="JOB_NUMBER" label="职工号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="NAME" label="姓名" min-width="60" align="center"></el-table-column>
      <el-table-column prop="TITLE_RANK" label="角色" min-width="60" align="center"></el-table-column>
      <el-table-column prop="NATION" label="登录密码" min-width="60" align="center"></el-table-column>
      <el-table-column prop="BIRTHDAY" label="用户状态" min-width="60" align="center"></el-table-column>
      <el-table-column prop="CAREER_EXPERIENCE" label="英文姓名" min-width="60" align="center"></el-table-column>
      <el-table-column prop="ADDREDD" label="登录标志" min-width="60" align="center"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      queryForm: {
        jobNumber: '',
        name: '',
        role: ''
      },
      roles: [
        {
          value: '前台',
          label: '前台'
        },
        {
          value: '医生',
          label: '医生'
        },
        {
          value: '管理员',
          label: '管理员'
        }
      ],
      userData: [],
      currentPage: 1
    }
  },
  created () {
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>

</style>
