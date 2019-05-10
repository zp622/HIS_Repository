<template>
<div id="patientInfo">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select v-model="queryForm.cardType" style="width: 100%">
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
            <el-input v-model="queryForm.bookDept"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="病人编号">
            <el-input v-model="queryForm.patientNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="queryForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话">
            <el-input v-model="queryForm.phone"></el-input>
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
      <el-button type="success" size="small">修改</el-button>
    </div>
    <div style="clear:both"></div>
  </div>
  <div>
    <el-table :data="patientData" height="250" border style="width: 100%">
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="CARD_TYPE" label="证件类型" min-width="60" align="center"></el-table-column>
      <el-table-column prop="CARD_ID" label="证件号码" min-width="60" align="center"></el-table-column>
      <el-table-column prop="PATIENT_NO" label="患者编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="PATIENT_NAME" label="姓名" min-width="30" align="center"></el-table-column>
      <el-table-column prop="SEX" label="性别" min-width="30" align="center"></el-table-column>
      <el-table-column prop="BIRTHDAY" label="出生日期" min-width="60" align="center"></el-table-column>
      <el-table-column prop="PHONE" label="电话" min-width="60" align="center"></el-table-column>
      <el-table-column prop="ADDRESS" label="通讯地址" min-width="60" align="center"></el-table-column>
      <el-table-column prop="ALLERGY_MEDICINE" label="过敏药物" min-width="30" align="center"></el-table-column>
      <el-table-column prop="MEDICAL_RECORD" label="病历编号" min-width="60" align="center"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
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
          value: '就诊卡',
          label: '就诊卡'
        }
      ],
      currentPage: 1,
      patientData: []
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
