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
        <!--<el-table-column prop="workTerm" label="从业年限" min-width="60" align="center"></el-table-column>-->
        <el-table-column prop="degree" label="学历" min-width="60" align="center"></el-table-column>
      </el-table>
    </div>

    <el-dialog :close-on-click-modal=false width="80%" :visible.sync="dialogVisible" :title="dialogTitle">
      <el-form :model="memberForm" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="id" label="身份证号">
              <el-input v-model="memberForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="name" label="姓名">
              <el-input v-model="memberForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="sex" label="性别">
              <el-select v-model="memberForm.sex">
                <el-option value="男" label="男"></el-option>
                <el-option value="女" label="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="famous" label="民族">
              <el-select v-model="memberForm.famous">
                <el-option value="汉族" label="汉族"></el-option>
                <el-option value="回族" label="回族"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="birthday" label="出生日期">
              <el-date-picker v-model="memberForm.birthday"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="titleRank" label="职称等级">
              <el-select v-model="memberForm.titleRank">
                <el-option value="前台" label="前台"></el-option>
                <el-option value="医生" label="医生"></el-option>
                <el-option value="副主任" label="副主任"></el-option>
                <el-option value="主任" label="主任"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="careerExperience" label="从业经历">
              <el-input v-model="memberForm.careerExperience"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="address" label="现住地址">
              <el-input v-model="memberForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="memberForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="phone" label="手机号">
              <el-input v-model="memberForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="workDate" label="入职日期">
              <el-date-picker v-model="memberForm.workDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="degree" label="学历">
              <el-input v-model="memberForm.degree"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="belongDept" label="所属科室">
              <el-select style="width: 100%" size="small" v-model="memberForm.belongDept">
                <el-option v-for="item in depts"
                           :value="item.value"
                           :label="item.label"
                           :key="item.value"
                           :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {queryEmployeeInfo, addEmployeeInfo} from '../../api/employeeU'

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
          value: '主任',
          label: '主任'
        },
        {
          value: '副主任',
          label: '副主任'
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
      switchFlag: false,
      memberForm: {
        id: '',
        name: '',
        sex: '',
        famous: '',
        birthday: '',
        titleRank: '',
        careerExperience: '',
        address: '',
        email: '',
        phone: '',
        workDate: '',
        degree: '',
        belongDept: ''
      },
      dialogVisible: false,
      dialogTitle: '',
      popoverVisible: false,
      operationType: 'add'
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
    },
    openDialog (type) {
      if (type === 'add') {
        this.operationType = 'add'
        this.dialogTitle = '员工信息新增'
      } else {
        this.operationType = 'edit'
        this.dialogTitle = '员工信息修改'
      }
      this.dialogVisible = true
    },
    submitForm (type) {
      if (this.operationType === 'add') {
        this.memberForm.jobNumber = 'm' + Date.now().toString()
        this.memberForm.creator = this.$store.getters.jobNumber
        addEmployeeInfo(this.memberForm).then((response) => {
          if (response.code === 200) {
            this.$message.success('新增成功')
            this.currentPage = 1
            this.queryTableData()
          } else {
            this.$message.error('新增失败')
          }
        })
      } else {

      }
    },
    closeForm () {

    }
  }
}
</script>

<style scoped>

</style>
