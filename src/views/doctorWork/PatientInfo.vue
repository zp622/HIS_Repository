<template>
<div id="patientInfo">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select size="small" v-model="queryForm.cardType" style="width: 100%">
              <el-option
                v-for="item in cardTypes"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
                :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码">
            <el-input size="small" v-model="queryForm.cardNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="患者编号">
            <el-input size="small" v-model="queryForm.patientNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input size="small" v-model="queryForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话">
            <el-input size="small" v-model="queryForm.phone"></el-input>
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
      <el-button type="success" size="small" @click="editPatient(multiplySelection[0])" :disabled="multiplySelection.length===1?false:true">修改</el-button>
    </div>
    <div style="clear:both"></div>
  </div>
  <div>
    <el-table @selection-change="handleSelectionChange" :data="patientData" height="250" border style="width: 100%">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="cardType" label="证件类型" min-width="60" align="center"></el-table-column>
      <el-table-column prop="cardId" label="证件号码" min-width="60" align="center"></el-table-column>
      <el-table-column prop="patientNo" label="患者编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="30" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" min-width="30" align="center"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" min-width="60" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" min-width="60" align="center"></el-table-column>
      <el-table-column prop="address" label="通讯地址" min-width="60" align="center"></el-table-column>
      <el-table-column prop="allergyMedicine" label="过敏药物" min-width="30" align="center"></el-table-column>
      <el-table-column prop="famous" label="民族" min-width="30" align="center"></el-table-column>
    </el-table>
  </div>
  <div>
    <el-dialog title="提示" :close-on-click-modal=false :visible.sync="dialogVisible" width="60%">
      <el-form :model="patientForm" :rules="rules" ref="patientForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="患者编号:">
              <span>{{patientForm.patientNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型:">
              <span>{{patientForm.cardType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码:">
              <span>{{patientForm.cardId}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="patientForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别:" prop="sex">
              <el-select style="width: 100%;" v-model="patientForm.sex">
                <el-option v-for="item in sexs"
                           :key="item.value"
                           :disabled="item.disabled"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="famous" label="民族:">
              <el-select style="width: 100%;" v-model="patientForm.famous">
                <el-option v-for="item in famouses"
                           :key="item.value"
                           :disabled="item.disabled"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
              <!--<el-date-picker style="width: 100%;" v-model="patientForm.birthday" type="date"></el-date-picker>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="电话:" prop="phone">
              <el-input v-model="patientForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通讯地址:" prop="address">
              <el-input v-model="patientForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="过敏药物:" prop="allergyMedicine">
              <el-select style="width: 100%;" v-model="patientForm.allergyMedicine">
                <el-option v-for="item in allergyMedicines"
                           :key="item.value"
                           :disabled="item.disabled"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEdit">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {queryPatientInfo, editPatientInfo} from '../../api/patientInfo'

export default {
  name: 'PatientInfo',
  data () {
    return {
      queryForm: {
        cardType: '',
        cardNo: '',
        patientNo: '',
        name: '',
        phone: ''
      },
      cardTypes: [
        {
          value: '居民二代身份证',
          label: '居民二代身份证'
        },
        {
          value: '社保卡',
          label: '社保卡'
        },
        {
          value: '门诊卡',
          label: '门诊卡'
        }
      ],
      currentPage: 1,
      patientData: [],
      pageSize: 10,
      total: 10,
      multiplySelection: [],
      dialogVisible: false,
      patientForm: {
        patientNo: '',
        cardType: '',
        cardId: '',
        name: '',
        sex: '',
        famous: '',
        phone: '',
        address: '',
        allergyMedicine: ''
      },
      famouses: [
        {
          value: '汉族',
          label: '汉族'
        }
      ],
      sexs: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      allergyMedicines: [
        {
          value: '无',
          label: '无'
        },
        {
          value: '抗生素类药物',
          label: '抗生素类药物'
        },
        {
          value: '磺胺类药物',
          label: '磺胺类药物'
        },
        {
          value: '镇静安眠药',
          label: '镇静安眠药'
        },
        {
          value: '解热镇痛药',
          label: '解热镇痛药'
        },
        {
          value: '麻醉用药',
          label: '麻醉用药'
        },
        {
          value: '血清制剂',
          label: '血清制剂'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.queryTableData()
  },
  methods: {
    queryTableData () {
      queryPatientInfo(this.queryForm, this.currentPage, this.pageSize).then((response) => {
        if (response.code === 200) {
          this.patientData = response.data
          this.total = response.total
        } else {
          this.$message.error(response.message)
        }
      })
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
    editPatient (row) {
      this.patientForm.patientNo = row.patientNo
      this.patientForm.cardType = row.cardType
      this.patientForm.cardId = row.cardId
      this.patientForm.name = row.name
      this.patientForm.sex = row.sex
      this.patientForm.famous = row.famous
      this.patientForm.phone = row.phone
      this.patientForm.address = row.address
      this.patientForm.allergyMedicine = row.allergyMedicine
      this.patientForm.updater = this.$store.getters.jobNumber
      this.dialogVisible = true
    },
    closeDialog () {
      this.emptyForm(this.patientForm)
      this.$refs['patientForm'].resetFields()
      this.dialogVisible = false
    },
    submitEdit () {
      this.$refs['patientForm'].validate((valid) => {
        if (valid) {
          editPatientInfo(this.patientForm).then((response) => {
            if (response.code === 200) {
              this.$message.success('修改成功')
              this.queryTableData()
              this.dialogVisible = false
            } else {
              this.$message.error(response.message)
            }
          })
        } else {
          return false
        }
      })
    },
    /* 初始化清空表单数据 */
    emptyForm (obj) {
      for (let key in obj) {
        obj[key] = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
