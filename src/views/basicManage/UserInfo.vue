<template>
<div id="userInfo">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="职工号">
            <el-input @change="switchPage" v-model="queryForm.jobNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input @change="switchPage" v-model="queryForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色">
            <el-select @change="switchPage" v-model="queryForm.role" style="width: 100%">
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
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div style="display: inline-block;float: right;">
      <el-button type="success" size="small" @click="queryTableData">查询</el-button>
      <el-button type="success" size="small">新增</el-button>
      <el-button type="success" size="small">修改</el-button>
      <el-button type="success" size="small">删除</el-button>
    </div>
    <div style="clear:both"></div>
  </div>
  <div>
    <el-table @selection-change="handleSelectionChange" :data="userData" height="250" border style="width: 100%">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="jobNumber" label="职工号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="60" align="center"></el-table-column>
      <el-table-column prop="role" label="角色" min-width="60" align="center"></el-table-column>
      <el-table-column prop="password" label="登录密码" min-width="60" align="center"></el-table-column>
      <el-table-column prop="userStatus" label="用户状态" min-width="60" align="center"></el-table-column>
      <el-table-column prop="nameEn" label="英文姓名" min-width="60" align="center"></el-table-column>
      <el-table-column prop="loginFlag" label="登录标志" min-width="60" align="center"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import {queryUserInfo} from '../../api/userInfo'

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
          label: '前台',
          value: 'reception'
        },
        {
          label: '医生',
          value: 'doctor'
        },
        {
          label: '管理员',
          value: 'admin'
        }
      ],
      userData: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      multiplySelection: [],
      switchFlag: false
    }
  },
  created () {
    this.queryTableData()
  },
  methods: {
    queryTableData () {
      if (this.switchFlag) {
        this.currentPage = 1
      } else {

      }
      queryUserInfo(this.queryForm, this.currentPage, this.pageSize).then((response) => {
        if (response.code === 200) {
          this.userData = response.data
          this.total = response.total
        } else {
          this.$message.error(response.message)
        }
      })
      this.switchFlag = false
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.queryTableData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.queryTableData()
    },
    handleSelectionChange (rows) {
      this.multiplySelection = rows
    },
    switchPage () {
      this.switchFlag = true
    }
  }
}
</script>

<style scoped>

</style>
