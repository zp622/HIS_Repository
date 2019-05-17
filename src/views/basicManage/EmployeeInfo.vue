<template>
  <div id="employeeInfo">
    <div>
      <el-form size="small" ref="queryForm" :model="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="职工号">
             <el-input @change="switchPage" size="small" v-model="queryForm.jobNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input @change="switchPage" size="small" v-model="queryForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位">
              <el-select @change="switchPage" size="small" v-model="queryForm.titleRank" style="width: 100%">
                <el-option
                  v-for="item in titleRanks"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                  :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="科室">
              <el-select size="small" @change="switchPage" v-model="queryForm.dept" style="width: 100%">
                <el-option v-for="item in depts"
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
      <el-table @selection-change="handleSelectionChange" :data="employeeData" height="250" border style="width: 100%">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column type="index" width="35"></el-table-column>
        <el-table-column prop="jobNumber" label="职工号" min-width="60" align="center"></el-table-column>
        <el-table-column prop="id" label="身份证号" min-width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="60" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" min-width="60" align="center"></el-table-column>
        <el-table-column prop="famous" label="名族" min-width="60" align="center"></el-table-column>
        <el-table-column prop="birthday" label="出生日期" min-width="60" align="center"></el-table-column>
        <el-table-column prop="titleRank" label="职称等级" min-width="60" align="center"></el-table-column>
        <el-table-column prop="belongDept" label="所属科室" min-width="60" align="center"></el-table-column>
        <el-table-column prop="careerExperince" label="从业经历" min-width="60" align="center"></el-table-column>
        <el-table-column prop="address" label="现住地址" min-width="60" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="60" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" min-width="60" align="center"></el-table-column>
        <el-table-column prop="workDate" label="工作日期" min-width="60" align="center"></el-table-column>
        <el-table-column prop="workTerm" label="从业年限" min-width="60" align="center"></el-table-column>
        <el-table-column prop="degree" label="学历" min-width="60" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {queryEmployeeInfo} from '../../api/employeeU'

export default {
  name: 'EmployeeInfo',
  data () {
    return {
      queryForm: {
        jobNumber: '',
        name: '',
        titleRank: '',
        dept: ''
      },
      titleRanks: [
        {
          value: '前台',
          label: '前台'
        },
        {
          value: '医生',
          label: '医生'
        },
        {
          value: '主任医师',
          label: '主任医师'
        },
        {
          value: '副主任医师',
          label: '副主任医师'
        }
      ],
      employeeData: [],
      currentPage: 1,
      multiplySelection: [],
      pageSize: 10,
      total: 10,
      depts: [
        {
          value: '内科',
          label: '内科'
        }
      ],
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
      queryEmployeeInfo(this.queryForm, this.currentPage, this.pageSize).then((response) => {
        if (response.code === 200) {
          this.employeeData = response.data
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
