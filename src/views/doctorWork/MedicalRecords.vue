<template>
<div id="medicalRecords">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="病历编号">
            <el-input v-model="queryForm.medicalRecord"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="挂号单编号">
            <el-input v-model="queryForm.bookNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="病人编号">
            <el-input v-model="queryForm.patientNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>
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
      </el-row>-->
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
    <el-table :data="medicalRecordsData" height="250" border style="width: 100%">
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="RECORD_NO" label="病历编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="REGISTER_NO" label="挂号单编号" min-width="100" align="center"></el-table-column>
      <el-table-column prop="PATIENT_NAME" label="病历患者姓名" min-width="100" align="center"></el-table-column>
      <el-table-column prop="PATIENT_NO" label="病历患编号" min-width="100" align="center"></el-table-column>
      <el-table-column prop="HOSPITAL" label="就诊医院" min-width="100" align="center"></el-table-column>
      <el-table-column prop="DEPARTMENT" label="就诊科室" min-width="60" align="center"></el-table-column>
      <el-table-column prop="VISIT_TIME" label="就诊时间" min-width="60" align="center"></el-table-column>
      <el-table-column prop="DOCTOR" label="接诊医生" min-width="60" align="center"></el-table-column>
      <el-table-column prop="CHIEF_ACTION" label="主诉" min-width="100" align="center"></el-table-column>
      <el-table-column prop="PRESENT_ILLNESS" label="现病史" min-width="60" align="center"></el-table-column>
      <el-table-column prop="HISTORY_ILLNESS" label="既往史" min-width="60" align="center"></el-table-column>
      <el-table-column prop="PHYSICAL_EXAMINATION" label="体检" min-width="60" align="center"></el-table-column>
      <el-table-column prop="TENTATIVE_DIAGNOSIS" label="初步诊断" min-width="60" align="center"></el-table-column>
      <el-table-column prop="TrPI" label="治疗意见" min-width="60" align="center"></el-table-column>
      <el-table-column prop="AUXILIARY_EXAMINATION" label="辅助检查结果" min-width="60" align="center"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'MedicalRecords',
  data () {
    return {
      queryForm: {
        medicalRecord: '',
        bookNo: '',
        patientNo: ''
      },
      currentPage: 1,
      medicalRecordsData: []
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
