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
      <el-button type="success" size="small" @click="openDialog('add')">新增</el-button>
      <el-button type="success" size="small" :disabled="multiplySelection.length===1?false:true" @click="openDialog('edit')">修改</el-button>
      <el-button type="success" size="small" v-popover:popover :disabled="multiplySelection.length>0?false:true">删除</el-button>

      <el-popover ref="popover" placement="top" width="160" v-model="popoverVisible">
        <p style="display: inline-block;margin: 5px 0px;">确定删除选中的数据吗？</p>
        <div style="text-align: right;">
          <el-button type="primary" size="mini" @click="popoverVisible = false">确定</el-button>
          <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
        </div>
      </el-popover>
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
      <!--<el-table-column prop="nameEn" label="英文姓名" min-width="60" align="center"></el-table-column>-->
      <el-table-column prop="loginFlag" label="登录标志" min-width="60" align="center"></el-table-column>
    </el-table>
  </div>

  <el-dialog :close-on-click-modal=false width="80%" :visible.sync="dialogVisible" :title="dialogTitle">
    <el-form :model="userForm" label-width="130px">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="id" label="身份证号">
            {{userForm.jobNumber}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="name" label="姓名">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sex" label="角色">
            <el-select v-model="userForm.role">
              <el-option value="admin" label="管理员"></el-option>
              <el-option value="reception" label="前台"></el-option>
              <el-option value="doctor" label="医生"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-form>
  </el-dialog>
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
      switchFlag: false,
      popoverVisible: false,
      dialogVisible: false,
      dialogTitle: '',
      userForm: {
        jobNumber: '',
        name: '',
        role: ''
      }
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
    },
    openDialog (type) {
      if (type === 'add') {

      } else {

      }
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
