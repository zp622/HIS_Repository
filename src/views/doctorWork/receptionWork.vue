<template>
<div id="doctorWork">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="日期">
            <el-date-picker style="width: 100%"
              v-model="queryForm.date"
              align="right"
              type="date"
              :picker-options="pickerOptions1">
            </el-date-picker>
            <!--<el-select v-model="queryForm.cardType">
              <el-option
                v-for="item in cardTypes"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
                :key="item.value"></el-option>
            </el-select>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="挂号单编号">
            <el-input v-model="queryForm.bookDept"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="病人编号">
            <el-input v-model="queryForm.patientNo"></el-input>
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
      <el-button type="success" size="small">呼叫下一个</el-button>
    </div>
    <div style="clear:both"></div>
  </div>
  <div>
    <el-table :data="bookFormData" height="250" border style="width: 100%">
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="REGISTER_NO" label="挂号单编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="PATIENT_NO" label="患者编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="PATIENT_NAME" label="姓名" min-width="60" align="center"></el-table-column>
      <el-table-column prop="PATIENT_SEX" label="性别" min-width="30" align="center"></el-table-column>
      <el-table-column prop="PATIENT_AGE" label="年龄" min-width="30" align="center"></el-table-column>
      <el-table-column prop="REGISTER_TYPE" label="挂号种类" min-width="60" align="center"></el-table-column>
      <el-table-column prop="REGISTER_DEPARTMENT" label="挂号科室" min-width="60" align="center"></el-table-column>
      <el-table-column prop="WAITING_NO" label="当日排号位" min-width="60" align="center"></el-table-column>
      <el-table-column label="病历" min-width="30" align="center"></el-table-column>
      <el-table-column label="就诊状态" min-width="60" align="center"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'DoctorWork',
  data () {
    return {
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
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
        bookNo: '',
        patientNo: ''
      },
      currentPage: 1,
      bookFormData: []
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
