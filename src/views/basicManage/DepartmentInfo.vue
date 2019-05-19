<template>
<div id="departmentInfo">
  <div>
    <el-form ref="queryForm" :model="queryForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="科室名称">
            <el-select @change="switchPage" size="small" v-model="queryForm.deptName" style="width: 100%">
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
            <el-select @change="switchPage" size="small" v-model="queryForm.floor" style="width: 100%">
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
      <el-button type="success" size="small" @click="openDialog('add')">新增</el-button>
      <el-button type="success" size="small" :disabled="multiplySelection.length===1?false:true" @click="openDialog('edit')">修改</el-button>
      <el-button type="success" size="small" v-popover:popover :disabled="multiplySelection.length>0?false:true">删除</el-button>

      <el-popover ref="popover" placement="top" width="160" v-model="popoverVisible">
        <p style="display: inline-block;margin: 5px 0px;">确定删除选中的数据吗？</p>
        <div style="text-align: right;">
          <el-button type="primary" size="mini" @click="deleteConfirm">确定</el-button>
          <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
        </div>
      </el-popover>
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

  <el-dialog :close="closeForm" :close-on-click-modal=false width="80%" :visible.sync="dialogVisible" :title="dialogTitle">
    <el-form :model="deptForm" label-width="130px">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="deptName" label="科室名称">
            <el-input v-model="deptForm.deptName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="address" label="科室位置">
            <el-input v-model="deptForm.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="manager" label="科室负责人">
            <el-input v-model="deptForm.manager"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="phone" label="科室电话">
            <el-input v-model="deptForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="introduction" label="科室介绍">
            <el-input v-model="deptForm.introduction"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="members" label="人员组成">
            <el-input v-model="deptForm.members"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="closeForm">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {queryDeptInfo, addDeptInfo, editDeptInfo, delDeptInfo} from '../../api/department'

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
      total: 10,
      switchFlag: false,
      popoverVisible: false,
      dialogVisible: false,
      dialogTitle: '',
      deptForm: {
        address: '',
        deptName: '',
        manager: '',
        phone: '',
        introduction: '',
        members: ''
      },
      operationType: 'add'
    }
  },
  created () {
    this.queryTableData()
  },
  methods: {
    queryTableData () {
      if (this.switchFlag) {
        this.currentPage = 1
      } else {

      }
      queryDeptInfo(this.queryForm, this.currentPage, this.pageSize).then((response) => {
        if (response.code === 200) {
          this.deptData = response.data
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
        this.dialogTitle = '科室信息新增'
      } else {
        this.operationType = 'edit'
        this.dialogTitle = '科室信息修改'
        this.valueToForm(this.multiplySelection[0])
      }
      this.dialogVisible = true
    },
    valueToForm (row) {
      this.deptForm.address = row.address
      this.deptForm.deptName = row.deptName
      this.deptForm.manager = row.manager
      this.deptForm.phone = row.phone
      this.deptForm.introduction = row.introduction
      this.deptForm.members = row.members
      this.updater = this.$store.getters.jobNumber
      this.deptForm.deptNo = row.deptNo
    },
    closeForm () {
      this.emptyForm(this.deptForm)
      // this.$refs['deptForm'].resetFields()
      this.dialogVisible = false
    },
    /* 初始化清空表单数据 */
    emptyForm (obj) {
      for (let key in obj) {
        obj[key] = ''
      }
    },
    submitForm (type) {
      if (this.operationType === 'add') {
        this.deptForm.deptNo = 'd' + Date.now().toString()
        this.deptForm.creator = this.$store.getters.jobNumber
        addDeptInfo(this.deptForm).then((response) => {
          if (response.code === 200) {
            this.$message.success('新增成功')
            this.queryTableData()
            this.dialogVisible = false
          } else {
            this.$message.error('新增失败')
          }
        })
      } else {
        editDeptInfo(this.deptForm).then((response) => {
          if (response.code === 200) {
            this.$message.success('修改成功')
            this.queryTableData()
            this.dialogVisible = false
          } else {
            this.$message.error('修改失败')
          }
        })
      }
    },
    deleteConfirm () {
      delDeptInfo(this.multiplySelection).then((response) => {
        if (response.code === 200) {
          this.$message.success('删除成功')
          this.queryTableData()
          this.popoverVisible = false
        } else {
          this.$message.error(response.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
