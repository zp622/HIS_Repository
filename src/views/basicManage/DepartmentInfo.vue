<template>
<div id="departmentInfo">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="科室名称">
            <el-select v-model="queryForm.deptName" style="width: 100%">
              <el-option
                v-for="item in deptNames"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
                :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼层">
            <el-select v-model="queryForm.floor" style="width: 100%">
              <el-option
                v-for="item in floors"
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
    <el-table :data="deptData" height="250" border style="width: 100%">
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="DEPARTEMENT_NO" label="科室编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="DEPARTEMENT_NAME" label="科室名称" min-width="60" align="center"></el-table-column>
      <el-table-column prop="ADDRESS" label="科室位置" min-width="60" align="center"></el-table-column>
      <el-table-column prop="MANAGER" label="科室负责人" min-width="30" align="center"></el-table-column>
      <el-table-column prop="PHONE" label="负责人电话" min-width="30" align="center"></el-table-column>
      <el-table-column prop="MEMBERS" label="科室人员组成" min-width="60" align="center"></el-table-column>
      <el-table-column prop="INTRODUCTION" label="科室介绍" min-width="60" align="center"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'DepartmentInfo',
  data () {
    return {
      queryForm: {
        deptName: '',
        floor: ''
      },
      deptNames: [
        {
          value: '内科',
          label: '内科'
        },
        {
          value: '外科',
          label: '外科'
        },
        {
          value: '儿科',
          label: '儿科'
        },
        {
          value: '妇科',
          label: '妇科'
        },
        {
          value: '口腔科',
          label: '口腔科'
        },
        {
          value: '耳鼻喉科',
          label: '耳鼻喉科'
        },
        {
          value: '眼科',
          label: '眼科'
        }
      ],
      floors: [
        {
          value: '一楼',
          label: '一楼'
        },
        {
          value: '二楼',
          label: '二楼'
        },
        {
          value: '三楼',
          label: '三楼'
        }
      ],
      deptData: [],
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
