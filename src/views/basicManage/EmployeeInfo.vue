<template>
  <div id="employeeInfo">
    <div>
      <el-form ref="queryForm" :model="queryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="职工号">
             <el-input v-model="queryForm.jobNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="queryForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位">
              <el-select v-model="queryForm.titleRank" style="width: 100%">
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
        <el-button type="success" size="small">新增</el-button>
        <el-button type="success" size="small">修改</el-button>
        <el-button type="success" size="small">删除</el-button>
      </div>
      <div style="clear:both"></div>
    </div>
    <div>
      <el-table :data="employeeData" height="250" border style="width: 100%">
        <el-table-column type="index" width="35"></el-table-column>
        <el-table-column prop="JOB_NUMBER" label="职工号" min-width="60" align="center"></el-table-column>
        <el-table-column prop="ID" label="身份证号" min-width="60" align="center"></el-table-column>
        <el-table-column prop="NAME" label="姓名" min-width="60" align="center"></el-table-column>
        <el-table-column prop="SEX" label="性别" min-width="60" align="center"></el-table-column>
        <el-table-column prop="NATION" label="名族" min-width="60" align="center"></el-table-column>
        <el-table-column prop="BIRTHDAY" label="出生日期" min-width="60" align="center"></el-table-column>
        <el-table-column prop="TITLE_RANK" label="职称等级" min-width="60" align="center"></el-table-column>
        <el-table-column prop="CAREER_EXPERIENCE" label="从业经历" min-width="60" align="center"></el-table-column>
        <el-table-column prop="ADDREDD" label="现住地址" min-width="60" align="center"></el-table-column>
        <el-table-column prop="EMAIL" label="邮箱" min-width="60" align="center"></el-table-column>
        <el-table-column prop="PHONE" label="电话" min-width="60" align="center"></el-table-column>
        <el-table-column prop="WORK_DATE" label="工作日期" min-width="60" align="center"></el-table-column>
        <el-table-column prop="WORK_TERM" label="从业年限" min-width="60" align="center"></el-table-column>
        <el-table-column prop="EDUACATIONAL_LEVEL" label="学历" min-width="60" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeInfo',
  data () {
    return {
      queryForm: {
        jobNumber: '',
        name: '',
        titleRank: ''
      },
      titleRanks: [
        {
          value: '前台',
          label: '前台'
        },
        {
          value: '医师',
          label: '医师'
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
      currentPage: 1
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
