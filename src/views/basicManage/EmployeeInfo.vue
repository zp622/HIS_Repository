<template>
  <div id="employeeInfo">
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
            <el-form-item label="职位">
              <el-select @change="switchPage" v-model="queryForm.titleRank" style="width: 100%">
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
              <el-select @change="switchPage" v-model="queryForm.dept" style="width: 100%">
                <el-option v-for="item in depts"
                           :label="item.deptName"
                           :value="item.deptName"
                           :disabled="item.disabled"
                           :key="item.deptNo"></el-option>
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
        <el-table-column prop="birthday" label="出生日期" :formatter="formatter1" min-width="60" align="center"></el-table-column>
        <el-table-column prop="titleRank" label="职称等级" min-width="60" align="center"></el-table-column>
        <el-table-column prop="belongDept" label="所属科室" min-width="60" align="center"></el-table-column>
        <el-table-column prop="careerExperience" label="从业经历" min-width="60" align="center"></el-table-column>
        <el-table-column prop="address" label="现住地址" min-width="60" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="60" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" min-width="60" align="center"></el-table-column>
        <el-table-column prop="workDate" label="工作日期" :formatter="formatter2" min-width="60" align="center"></el-table-column>
        <!--<el-table-column prop="workTerm" label="从业年限" min-width="60" align="center"></el-table-column>-->
        <el-table-column prop="degree" label="学历" min-width="60" align="center"></el-table-column>
      </el-table>
    </div>

    <el-dialog @close="closeForm" :close-on-click-modal=false width="80%" :visible.sync="dialogVisible" :title="dialogTitle">
      <el-form :model="memberForm" label-width="130px" ref="memberForm" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="id" label="身份证号">
              <el-input v-model="memberForm.id" oninput = "value=value.replace(/[^\w]/ig,'')"></el-input>
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
              <el-input v-model="memberForm.phone" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
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
              <el-select style="width: 100%" v-model="memberForm.belongDept">
                <el-option v-for="item in depts"
                           :value="item.deptName"
                           :label="item.deptName"
                           :key="item.deptNo"
                           :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="dialogVisible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {queryEmployeeInfo, addEmployeeInfo, editEmployeeInfo} from '../../api/employeeU'
import {formatterToDate, validatePhone, validateMobile, validateIDcard, validateEmail} from '../../utils'
import {queryDeptInfo} from '../../api/department'

export default {
  name: 'EmployeeInfo',
  data () {
    const phoneValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'))
      } else {
        if (validateMobile(value) || validatePhone(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号或座机号'))
        }
      }
    }
    const idValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'))
      } else {
        if (validateIDcard(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的身份证号'))
        }
      }
    }
    const emailValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'))
      } else {
        if (validateEmail(value)) {
          callback()
        } else {
          callback(new Error('请输入正确邮箱'))
        }
      }
    }
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
      rules: {
        belongDept: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        phone: [
          {validator: phoneValidate, trigger: 'blur'}
        ],
        id: [
          {validator: idValidate, trigger: 'blur'}
        ],
        email: [
          {validator: emailValidate, trigger: 'blur'}
        ],
        name: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        titleRank: [
          { required: true, message: '必填', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      dialogTitle: '',
      popoverVisible: false,
      operationType: 'add'
    }
  },
  created () {
    this.queryTableData()
    queryDeptInfo(this.queryForm, 1, 1000000).then((response) => {
      if (response.code === 200) {
        this.depts = response.data
      } else {
        this.$message.error('下拉框数据获取失败')
      }
    })
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
        this.valueToForm(this.multiplySelection[0])
      }
      this.dialogVisible = true
    },
    valueToForm (row) {
      this.memberForm.id = row.id
      this.memberForm.name = row.name
      this.memberForm.sex = row.sex
      this.memberForm.famous = row.famous
      this.memberForm.birthday = formatterToDate(row.birthday)
      this.memberForm.titleRank = row.titleRank
      this.memberForm.careerExperience = row.careerExperience
      this.memberForm.address = row.address
      this.memberForm.email = row.email
      this.memberForm.phone = row.phone
      this.memberForm.workDate = formatterToDate(row.workDate)
      this.memberForm.degree = row.degree
      this.memberForm.belongDept = row.belongDept
      this.memberForm.jobNumber = row.jobNumber
      this.updater = this.$store.getters.jobNumber
    },
    submitForm (type) {
      this.$refs['memberForm'].validate((valid) => {
        if (valid) {
          if (this.operationType === 'add') {
            this.memberForm.jobNumber = 'm' + Date.now().toString()
            this.memberForm.creator = this.$store.getters.jobNumber
            addEmployeeInfo(this.memberForm).then((response) => {
              if (response.code === 200) {
                this.$message.success('新增成功')
                this.queryTableData()
                this.dialogVisible = false
              } else {
                this.$message.error('新增失败')
              }
            })
          } else {
            editEmployeeInfo(this.memberForm).then((response) => {
              if (response.code === 200) {
                this.$message.success('修改成功')
                this.queryTableData()
                this.dialogVisible = false
              } else {
                this.$message.error('修改失败')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    closeForm () {
      this.emptyForm(this.memberForm)
      this.$refs['memberForm'].resetFields()
      this.dialogVisible = false
    },
    /* 初始化清空表单数据 */
    emptyForm (obj) {
      for (let key in obj) {
        obj[key] = ''
      }
    },
    formatter1 (row, column, cellValue) {
      // var str = new Date(formatterToDate(cellValue).replace(/-/g, '/'))
      return formatterToDate(cellValue)
    },
    formatter2 (row, column, cellValue) {
      return formatterToDate(cellValue)
    }
  }
}
</script>

<style scoped>

</style>
