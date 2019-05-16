<template>
<div id="medicalRecords">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="挂号单编号">
            <el-input size="small" v-model="queryForm.registerNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="患者编号">
            <el-input size="small" v-model="queryForm.patientNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="患者姓名">
            <el-input size="small" v-model="queryForm.patientName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="queryForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
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
      <el-button type="success" size="small" @click="editRecord" :disabled="multiplySelection.length===1?false:true">修改</el-button>
    </div>
    <div style="clear:both"></div>
  </div>
  <div>
    <el-table @selection-change="handleSelectionChange" :data="medicalRecordsData" height="250" border style="width: 100%">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="registerNo" label="挂号单编号" min-width="100" align="center"></el-table-column>
      <el-table-column prop="patientNo" label="患者编号" min-width="100" align="center"></el-table-column>
      <el-table-column prop="patientName" label="患者姓名" min-width="100" align="center"></el-table-column>
      <el-table-column prop="department" label="就诊科室" min-width="60" align="center"></el-table-column>
      <el-table-column prop="chiefAction" label="主诉" min-width="100" align="center"></el-table-column>
      <el-table-column prop="presentIllness" label="现病史" min-width="60" align="center"></el-table-column>
      <el-table-column prop="historyIllness" label="既往史" min-width="60" align="center"></el-table-column>
      <el-table-column prop="phyExam" label="体检" min-width="60" align="center"></el-table-column>
      <el-table-column prop="tentDiag" label="初步诊断" min-width="60" align="center"></el-table-column>
      <el-table-column prop="trpl" label="治疗意见" min-width="60" align="center"></el-table-column>
      <el-table-column prop="visitTime" label="就诊时间" min-width="60" align="center"></el-table-column>
      <el-table-column prop="doctor" label="接诊医生" min-width="60" align="center"></el-table-column>
      <el-table-column prop="auxiExam" label="辅助检查结果" min-width="60" align="center"></el-table-column>
      <el-table-column prop="hospital" label="就诊医院" min-width="100" align="center"></el-table-column>
    </el-table>
  </div>
  <div>
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
</div>
</template>

<script>
import {manageQueryRecordsInfo, editRecordsInfo} from '../../api/medicalRecords'

export default {
  name: 'MedicalRecords',
  data () {
    return {
      queryForm: {
        patientName: '',
        bookNo: '',
        patientNo: ''
      },
      currentPage: 1,
      medicalRecordsData: [],
      pageSize: 10,
      total: 10,
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
      ],
      multiplySelection: []
    }
  },
  created () {
    this.queryTableData(this.queryForm, this.currentPage, this.pageSize)
  },
  methods: {
    queryTableData () {
      manageQueryRecordsInfo(this.queryForm, this.currentPage, this.pageSize).then((response) => {
        if (response.code === 200) {
          this.medicalRecordsData = response.data
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
    editRecord () {
      this.recordDialogVisible = true
      this.emptyRecordForm()
      this.valueToRecordForm(this.multiplySelection[0])
    },
    submintRecord () {
      editRecordsInfo(this.recordForm).then((response) => {
        if (response.code === 200) {
          this.recordDialogVisible = false
          this.$message.success('成功')
          this.queryTableData(this.queryForm, this.currentPage, this.pageSize)
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
    }
  }
}
</script>

<style scoped>

</style>
