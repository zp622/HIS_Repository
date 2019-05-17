<template>
<div id="departmentInfo">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="科室名称">
            <el-select size="small" v-model="queryForm.deptName" style="width: 100%">
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
            <el-select size="small" v-model="queryForm.floor" style="width: 100%">
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
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div style="display: inline-block;float: right;">
      <el-button type="success" size="small" @click="queryTableData">查询</el-button>
      <el-button type="success" size="small">新增</el-button>
      <el-button type="success" size="small">修改</el-button>
      <el-button type="success" size="small">删除</el-button>
    </div>
    <div style="clear:both"></div>
  </div>
  <div>
    <el-table @selection-change="handleSelectionChange" :data="deptData" height="250" border style="width: 100%">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="deptNo" label="科室编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="deptName" label="科室名称" min-width="60" align="center"></el-table-column>
      <el-table-column prop="address" label="科室位置" min-width="60" align="center"></el-table-column>
      <el-table-column prop="manager" label="科室负责人" min-width="30" align="center"></el-table-column>
      <el-table-column prop="phone" label="负责人电话" min-width="30" align="center"></el-table-column>
      <el-table-column prop="members" label="科室人员组成" min-width="60" align="center"></el-table-column>
      <el-table-column prop="introduction" label="科室介绍" min-width="60" align="center"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import {queryDeptInfo} from '../../api/department'

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
      currentPage: 1,
      multiplySelection: [],
      pageSize: 10,
      total: 10
    }
  },
  created () {
    this.queryTableData()
  },
  methods: {
    queryTableData () {
      queryDeptInfo(this.queryForm, this.currentPage, this.pageSize).then((response) => {
        if (response.code === 200) {
          this.deptData = response.data
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
    }
  }
}
</script>

<style scoped>

</style>
