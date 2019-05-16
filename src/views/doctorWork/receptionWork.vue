<template>
<div id="doctorWork">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" label-width="60px">
            <el-col :span="11">
              <el-date-picker size="small" type="date" v-model="queryForm.date" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-select size="small" v-model="queryForm.time">
                <el-option label="上午" value="上午"></el-option>
                <el-option label="下午" value="下午"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <!--<el-form-item label="日期">
            <el-date-picker style="width: 100%"
              v-model="queryForm.date"
              align="right"
              type="date"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>-->
        </el-col>
        <el-col :span="8">
          <el-form-item label="挂号单编号">
            <el-input size="small" v-model="queryForm.bookNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="病人编号">
            <el-input size="small" v-model="queryForm.patientNo"></el-input>
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
      <el-button type="success" size="small" @click="queryTableData(queryForm,currentPage,pageSize)">查询</el-button>
      <el-button type="success" size="small" :disabled="multiplySelection.length===1?false:true" @click="callNext">呼叫</el-button>
      <el-input v-model="deptNo" title="诊室序号" size="small" style="display: inline-block;width: 50px;"></el-input>
    </div>
    <div style="clear:both"></div>
  </div>
  <div>
    <el-table @selection-change="handleSelectionChange" :data="bookFormData" height="250" border style="width: 100%">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="registerNo" label="挂号单编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="patientNo" label="患者编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="waitingNo" label="当日排号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="patientName" label="姓名" min-width="60" align="center"></el-table-column>
      <el-table-column prop="registerType" label="挂号种类" min-width="60" align="center"></el-table-column>
      <el-table-column prop="registerDept" label="挂号科室" min-width="60" align="center"></el-table-column>
      <el-table-column label="病历" min-width="30" align="center">
        <template slot-scope="scope">
          <a href="#" @click="writeRecord(scope.row)">填写</a>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="就诊状态" min-width="60" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" size="small" @change="editBookInfo(scope.row)">
            <el-option value="待处理" label="待处理"></el-option>
            <el-option value="接诊中" label="接诊中"></el-option>
            <el-option value="已完成" label="已完成"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div id="dialogForm">
    <el-dialog :close-on-click-modal=false top="0vh" width="80%" :visible.sync="recordDialogVisible" title="病历信息">
      <el-form :model="recordForm" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="registerNo" label="挂号单编号">
              {{recordForm.registerNo}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="patientNo" label="患者编号">
              {{recordForm.patientNo}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="patientName" label="患者姓名">
              {{recordForm.patientName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
          <el-form-item prop="visitTime" label="就诊时间">
            <el-date-picker style="width: 100%" size="small" v-model="recordForm.visitTime" type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="department" label="就诊科室">
            <el-select style="width: 100%" size="small" v-model="recordForm.department">
              <el-option v-for="item in depts"
                :value="item.value"
                :label="item.label"
                :key="item.value"
              :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="doctor" label="接诊医生">
            <el-input size="small" v-model="recordForm.doctor"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="chiefAction" label="主诉">
              <el-input style="width: 100%" size="small" type="textarea" v-model="recordForm.chiefAction"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="presentIllness" label="症状">
              <el-input style="width: 100%" size="small" type="textarea" v-model="recordForm.presentIllness"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="historyIllness" label="既往史">
              <el-input style="width: 100%" size="small" type="textarea" v-model="recordForm.historyIllness"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="24">
          <el-form-item prop="phyExam" label="体检">
            <el-input style="width: 100%" size="small" type="textarea" v-model="recordForm.phyExam"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="24">
          <el-form-item prop="tentDiag" label="初步诊断">
            <el-input style="width: 100%" size="small" type="textarea" v-model="recordForm.tentDiag"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="24">
          <el-form-item prop="trpl" label="治疗意见">
            <el-input style="width: 100%" size="small" type="textarea" v-model="recordForm.trpl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="auxiExam" label="辅助检查结果">
              <el-input style="width: 100%" size="small" type="textarea" v-model="recordForm.auxiExam"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button @click="submintRecord" type="primary">提交</el-button>
            <el-button @click="recordDialogVisible=false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {queryBookFormData, editBookingForm} from '../../api/bookingForm'
import {voicePlay} from '../../utils'
import {editRecordsInfo, queryRecordsInfo} from '../../api/medicalRecords'

export default {
  name: 'DoctorWork',
  data () {
    return {
      pickerOptions1: {
        /* disabledDate (time) {
          return time.getTime() > Date.now()
        }, */
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      queryForm: {
        date: '',
        time: '',
        bookNo: '',
        patientNo: '',
        dept: '',
        bookType: '',
        doctor: ''
      },
      currentPage: 1,
      pageSize: 10,
      total: 100,
      bookFormData: [
        {
          registerNo: '201808210021'
        }
      ],
      multiplySelection: [],
      deptNo: 3,
      recordDialogVisible: false,
      recordForm: {
        registerNo: '',
        patientNo: '',
        patientName: '',
        visitTime: '',
        department: '',
        doctor: '',
        chiefAction: '',
        presentIllness: '',
        historyIllness: '',
        phyExam: '',
        tentDiag: '',
        trpl: '',
        auxiExam: ''
      },
      depts: [
        {
          value: '内科',
          label: '内科'
        }
      ]
    }
  },
  created () {
    var myDate = new Date()
    var strArray = myDate.toLocaleDateString().split('/')
    this.queryForm.date = this.createdDate(strArray)
    var time = myDate.toLocaleTimeString().substring(0, 2)
    this.queryForm.time = time
    /* 判断登录系统的用户身份 */
    var role = this.$store.getters.roles
    if (role === 'admin') {

    } else if (role === 'doctor') {
      this.queryForm.dept = this.$store.getters.belongDept
      if (this.$store.getters.titleRank === '医生') {
        this.queryForm.bookType = '普通号'
      } else {
        this.queryForm.bookType = this.$store.getters.titleRank + '医师号'
        this.queryForm.doctor = this.$store.getters.jobNumber
      }
    } else {

    }
    this.queryTableData(this.queryForm, this.currentPage, this.pageSize)
  },
  methods: {
    createdDate (strArray) {
      var seperator = '-'
      var year = strArray[0]
      var month = strArray[1]
      var strDate = strArray[2]
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var formatDateForBook = year + seperator + month + seperator + strDate
      return formatDateForBook
    },
    queryTableData (formInfo, currentPage, pageSize) {
      queryBookFormData(formInfo, currentPage, pageSize).then((response) => {
        if (response.code === 200) {
          this.bookFormData = response.data
          this.total = response.total
        } else {
          this.$message.error(response.message)
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.queryTableData(this.queryForm, this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.queryTableData(this.queryForm, this.currentPage, this.pageSize)
    },
    writeRecord (row) {
      queryRecordsInfo(row).then((response) => {
        if (response.code === 200) {
          this.recordDialogVisible = true
          this.emptyRecordForm()
          this.valueToRecordForm(row)
        } else {
          this.$message.error(response.message)
        }
      })
    },
    submintRecord () {
      editRecordsInfo(this.recordForm).then((response) => {
        if (response.code === 200) {
          this.recordDialogVisible = false
          this.$message.success('成功')
        } else {
          this.$message.error(response.message)
        }
      })
    },
    valueToRecordForm (row) {
      this.recordForm.registerNo = row.registerNo
      this.recordForm.patientNo = row.patientNo
      this.recordForm.patientName = row.patientName
      this.recordForm.department = row.registerDept
      this.recordForm.doctor = this.$store.getters.username
      this.recordForm.updater = this.$store.getters.jobNumber
    },
    emptyRecordForm () {
      this.recordForm.registerNo = ''
      this.recordForm.patientNo = ''
      this.recordForm.patientName = ''
      this.recordForm.visitTime = ''
      this.recordForm.department = ''
      this.recordForm.doctor = ''
      this.recordForm.chiefAction = ''
      this.recordForm.presentIllness = ''
      this.recordForm.historyIllness = ''
      this.recordForm.phyExam = ''
      this.recordForm.tentDiag = ''
      this.recordForm.trpl = ''
      this.recordForm.auxiExam = ''
    },
    handleSelectionChange (rows) {
      this.multiplySelection = rows
    },
    callNext () {
      var No = this.multiplySelection[0].waitingNo
      var dept = this.multiplySelection[0].registerDept
      var message = '请' + No + '号,前往' + dept + ',第,' + this.deptNo + ',诊室就诊'
      voicePlay(message)
    },
    editBookingForm (row) {
      row.updater = this.$store.getters.jobNumber
      editBookingForm(row).then((response) => {
        if (response.code === 200) {

        } else {
          this.$message.error(response.message)
        }
      })
    }
  }
}
</script>

<style scoped>
#dialogForm .el-form-item{
  margin-bottom:8px;
}
</style>
