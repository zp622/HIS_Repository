<template>
<div id="selfBookEnter">
  <div id="pageone" v-show="showPage===1">
    <el-container>
      <el-header><div class="title" style="display: inline-block">医院门诊 自助服务通道</div>
      <div style="display: inline-block;float: left;">
        <router-link to="/bookingForm" style="color: white">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>退出
        </router-link>
      </div>
      </el-header>
      <el-main>
        <div class="voiceTip">
          <i class="fa fa-volume-up" aria-hidden="true"></i>
          请选择您所需要的服务
        </div>
        <el-row>
          <el-col :span="12">
            <el-button
              style="margin: auto;"
              type="primary"
              @click="selfRegister(registerForm)"
              round>自助注册</el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              style="margin: auto;"
              type="primary"
              @click="selfBook"
              round>自助挂号</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-button
              style="margin: auto;"
              type="info"
              @click="selfQuery"
              round>自助查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button
              style="margin: auto;"
              type="info"
              @click="accountManage"
              round>账号管理</el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              style="margin: auto;"
              type="info"
              @click="selfCharge"
              round>自助充值</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
  <div id="pagetwo" v-show="showPage===2">
    <el-container>
      <el-header><div class="title">医院门诊 自助挂号通道</div></el-header>
    <el-main>
      <div class="voiceTip">
        <i class="fa fa-volume-up" aria-hidden="true"></i>
        {{this.deptVoiceMessage}}
      </div>
      <div class="formDiv">
        <el-row>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div @click="deptSelect(form, '内科')">内科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div @click="deptSelect(form, '外科')">外科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div @click="deptSelect(form, '儿科')">儿科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div @click="deptSelect(form, '妇产科')">妇产科</div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div @click="deptSelect(form, '口腔科')">口腔科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div @click="deptSelect(form, '耳鼻喉科')">耳鼻喉科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div @click="deptSelect(form, '眼科')">眼科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div @click="deptSelect(form, 'more')">
                更多科室
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <a @click="showPage=1" href="#" style="color: gainsboro">返回上一页</a>
          </el-col>
        </el-row>
      </div>
    </el-main>
    </el-container>
  </div>
  <div id="pagethree" v-show="showPage===3">
    <el-container>
      <el-header><div class="title">医院门诊 自助挂号通道</div></el-header>
      <el-main>
        <div class="voiceTip">
          <i class="fa fa-volume-up" aria-hidden="true"></i>
          {{this.infoVoiceMessage}}
        </div>
        <div class="formDiv">
          <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
            <el-row>
            <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
              <el-form-item label="证件类型" class="label" prop="cardType">
                <el-select class="formInput" v-model="form.cardType">
                  <el-option
                    v-for="item in cardTypes"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                    :key="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
              <el-form-item label="挂号科室" class="label">
                <el-input class="formInput" v-model="form.bookDept" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item status-icon label="证件号码" class="label" prop="cardNo">
                  <el-input class="formInput" v-model="form.cardNo"
                            :disabled="form.cardType!==''?false:true"
                            oninput = "value=value.replace(/[^\w]/ig,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="挂号时间" class="label" required>
                  <el-col :span="11">
                    <el-date-picker class="formInput" type="date" v-model="form.bookDate" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-select class="formInput" v-model="form.bookTime">
                      <el-option
                        v-for="item in bookTimes"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                        :key="item.value"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="姓名" class="label">
                  <el-input class="formInput" v-model="form.name" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="挂号类别" class="label" prop="bookType">
                  <el-select :disabled="(form.bookDate!=='' && form.bookTime!=='')?false:true" class="formInput" v-model="form.bookType" @change="bookTypeChange">
                    <el-option
                      v-for="item in bookTypes"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                      :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="手机号码" class="label" prop="phone">
                  <el-input class="formInput" v-model="form.phone" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="选择医生" class="label" prop="doctor">
                  <el-select @change="doctorChange" :disabled="form.bookType==='普通号'?true:false" class="formInput" v-model="form.doctor">
                    <el-option
                      v-for="item in doctors"
                      :label="item.name"
                      :value="item.jobNumber"
                      :disabled="item.disabled"
                      :key="item.jobNumber"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="性别" class="label">
                  <el-input class="formInput" v-model="form.sex" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="">
                  <el-checkbox-group v-model="form.protocol">
                    <el-checkbox><a href="#" :style="{color:form.protocol?'#05ff05':'grey'}" style="font-family: 宋体;">同意网上预约挂号协议</a></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="formBtn">
              <el-button type="primary" @click="confirmBookForm" :disabled="form.protocol?false:true">挂号</el-button>
              <el-button @click="showPage=1">取消</el-button>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="24">
              <a @click="showPage=2" href="#" style="color: gainsboro">返回上一页</a>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>

    <div id="dia">
      <el-dialog :show-close=false :close-on-press-escape=false :close-on-click-modal=false top="0vh" title="挂号单信息" :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm"  label-width="180px">
          <el-form-item label="挂号单编号：">
            <span>{{dialogForm.bookNo}}</span>
          </el-form-item>
          <el-form-item label="当日排号：">
            <span style="color: red;">{{dialogForm.serialNo}}</span>
          </el-form-item>
          <el-form-item label="病人编号：">
            <span>{{dialogForm.patientNo}}</span>
          </el-form-item>
          <el-form-item label="日期：">
            <span>{{dialogForm.date}}</span>
          </el-form-item>
          <el-form-item label="姓名：">
            <span>{{dialogForm.name}}</span>
          </el-form-item>
          <el-form-item label="性别：">
            <span>{{dialogForm.sex}}</span>
          </el-form-item>
          <el-form-item label="挂号类别：">
            <span>{{dialogForm.type}}</span>
          </el-form-item>
          <el-form-item label="医生：">
            <span>{{dialogForm.doctor}}</span>
          </el-form-item>
          <el-form-item label="排号时间：">
            <span>{{dialogForm.bookTime}}</span>
          </el-form-item>
          <el-form-item label="就诊地点：">
            <span>{{dialogForm.address}}</span>
          </el-form-item>
          <el-form-item label="金额：">
            <span>{{dialogForm.money}}</span>
          </el-form-item>
          <el-form-item>
            <span>注：此凭条当日有效，过号作废。</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  <div id="pagefour" v-show="showPage===4">
    <el-container>
      <el-header style="color: white;">
        <div class="title">医院门诊 自助注册通道</div>
      </el-header>
      <el-main>
        <div class="voiceTip">
          <i class="fa fa-volume-up" aria-hidden="true"></i>
          {{this.registerVoiceMessage}}
        </div>
        <div class="formDiv">
          <el-form ref="registerForm" :model="registerForm" label-width="80px" :rules="registerFormRules">
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="证件类型" class="label" prop="cardType">
                  <el-select v-model="registerForm.cardType" class="formInput">
                    <el-option
                      v-for="item in cardTypes"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                      :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="出生日期" class="label" prop="birthday">
                  <el-date-picker class="formInput" v-model="registerForm.birthday" type="date" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="证件号码" class="label" prop="cardNo">
                  <el-input :disabled="registerForm.cardType!==''?false:true" class="formInput" v-model="registerForm.cardNo" oninput = "value=value.replace(/[^\w]/ig,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="民族" class="label" prop="nation">
                    <el-select class="formInput" v-model="registerForm.nation">
                      <el-option
                        v-for="item in nations"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                        :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="姓名" class="label" prop="name">
                  <el-input class="formInput" v-model="registerForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="过敏药物" class="label" prop="allergy">
                  <el-select class="formInput" v-model="registerForm.allergy">
                    <el-option
                      v-for="item in medicines"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                      :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="手机号码" class="label" prop="phone">
                  <el-input class="formInput" v-model="registerForm.phone" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="通讯地址" class="label" prop="address">
                  <el-input class="formInput" v-model="registerForm.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="性别" class="label" prop="sex">
                  <el-radio-group v-model="registerForm.sex" style="padding-right: 70%">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
               </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="" prop="">

                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="formBtn">
              <el-button type="primary" @click="confirmRegister(registerForm)">注册</el-button>
              <el-button @click="cancelRegisterForm">取消</el-button>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="24">
              <a @click="cancelRegisterForm" href="#" style="color: gainsboro;">返回上一页</a>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</div>
</template>

<script>
import {voicePlay, validateMobile, validatePhone, validateIDcard} from '../../utils'
import {patientRegister} from '../../api/patientRegister'
import {cardNoCheck, selectDoctorList, bookingForm, queryResidualNumber} from '../../api/bookingForm'
import {addRecordsInfo} from '../../api/medicalRecords'

export default {
  name: 'SelfBookForm',
  data () {
    const phoneValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'))
      } else {
        if (validateMobile(value) || validatePhone(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号或座机号'))
        }
      }
    }
    const cardNoValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'))
      } else if (this.registerForm.cardType === '居民二代身份证') {
        if (validateIDcard(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的身份证号'))
        }
      } else {
        callback()
      }
    }
    const bookCardNoValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'))
      } else {
        cardNoCheck(this.form).then((response) => {
          if (response.code === 200 && response.data.length > 0) {
            var result = response.data[0]
            this.form.name = result.name
            this.form.phone = result.phone
            this.form.sex = result.sex
            this.form.patientNo = result.patientNo
            callback()
          } else {
            this.$message.error({
              message: '当前用户不存在，请先注册',
              duration: 5000
            })
            voicePlay('当前用户不存在，请先注册')
            callback(new Error())
          }
        })
      }
    }
    /* const bookTypeValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'))
      } else if (value === '普通号') {
        if (this.bookingCount >= 20) {
          callback(new Error('普通号已满，请更换'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    } */
    const doctorValidate = (rule, value, callback) => {
      if (this.form.bookType === '普通号') {
        callback()
      } else {
        if (value === '') {
          callback(new Error('必填'))
        } else {
          callback()
        }
      }
    }
    return {
      showPage: 1,
      deptVoiceMessage: '请选择就诊科室',
      infoVoiceMessage: '请填写挂号信息',
      form: {// 挂号界面
        bookDept: '',
        cardType: '',
        cardNo: '',
        name: '',
        phone: '',
        sex: '',
        bookType: '',
        doctor: '',
        bookDate: '',
        bookTime: '',
        creator: '',
        protocol: '',
        patientNo: ''
      },
      formRules: {
        doctor: [
          {validator: doctorValidate, trigger: 'change'}
        ],
        cardType: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        cardNo: [
          {validator: bookCardNoValidate, trigger: 'blur'}
        ],
        phone: [
          {validator: phoneValidate, trigger: 'blur'}
        ],
        bookType: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        bookDate: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        bookTime: [
          { required: true, message: '必填', trigger: 'change' }
        ]
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
      bookTypes: [
        {
          value: '普通号',
          label: '普通号'
        },
        {
          value: '主任医师号',
          label: '主任医师号'
        },
        {
          value: '副主任医师号',
          label: '副主任医师号'
        }
      ],
      doctors: [
        /* {
          jobNumber: '白求恩',
          name: '白求恩'
        },
        {
          jobNumber: '张建宁',
          name: '张建宁'
        } */
      ],
      bookTimes: [
        {
          value: '上午',
          label: '上午'
        },
        {
          value: '下午',
          label: '下午'
        }
      ],
      dialogFormVisible: false,
      dialogForm: {// 挂号单
        serialNo: '',
        bookNo: '',
        patientNo: '',
        name: '',
        date: '',
        sex: '',
        bookTime: '',
        money: '',
        doctor: '',
        address: '',
        type: ''
      },
      registerVoiceMessage: '请正确填写个人信息',
      registerForm: {
        cardType: '',
        cardNo: '',
        name: '',
        birthday: '',
        sex: '',
        allergy: '',
        nation: '',
        address: '',
        phone: '',
        creator: this.$store.getters.jobNumber
      },
      medicines: [
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
      nations: [
        {
          value: '汉族',
          label: '汉族'
        }
      ],
      registerFormRules: {
        cardType: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        cardNo: [
          { validator: cardNoValidate, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        allergy: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        address: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        phone: [
          {validator: phoneValidate, trigger: 'blur'}
        ]
      },
      bookingCount: '',
      doctorCount: ''
    }
  },
  methods: {
    /* 根据挂号类型的不同，判断是否需要查询医生名单 */
    bookTypeChange (val) {
      this.bookingCount = null
      this.doctorCount = null
      this.form.doctor = ''
      this.doctors = []
      if (val === '普通号') {
        queryResidualNumber(this.form).then((response) => {
          if (response.code === 200) {
            this.bookingCount = response.data// 说明挂号有剩余 data为已挂号数量
            /* this.$message.success({
              message: response.message,
              duration: 20000
            }) */
          } else {
            /* this.$message.error({
              message: response.message,
              duration: 20000
            }) */
          }
        })
      } else {
        selectDoctorList(this.form).then((response) => {
          if (response.code === 200) {
            this.doctors = response.data
          //  数据类型  如何存取 给doctor赋值 给option赋值
          } else {
            this.$message.error(response.message)
          }
        })
      }
    },
    /* 医生挂号剩余的查询 */
    doctorChange () {
      this.doctorCount = null
      queryResidualNumber(this.form).then((response) => {
        if (response.code === 200) {
          this.doctorCount = response.data// 说明挂号有剩余 data为已挂号数量
          /* this.$message.success({
            message: response.message,
            duration: 20000
          }) */
        } else {
          this.doctorCount = response.data
          /* this.$message.error({
            message: response.message,
            duration: 20000
          }) */
        }
      })
    },
    /* 初始化清空表单数据 */
    emptyForm (obj) {
      for (let key in obj) {
        obj[key] = ''
      }
    },
    /* 自助挂号入口 */
    selfBook () {
      this.showPage = 2
      voicePlay(this.deptVoiceMessage)
    },
    /* 自助注册入口 初始化表单数据 */
    selfRegister (registerForm) {
      this.showPage = 4
      this.emptyForm(registerForm)
      voicePlay(this.registerVoiceMessage)
    },
    selfQuery () {},
    accountManage () {},
    selfCharge () {},
    /* 进入挂号信息填写界面 初始化表单 */
    deptSelect (form, deptType) {
      this.showPage = 3
      this.emptyForm(form)
      this.$refs['form'].resetFields()
      this.form.bookDept = deptType
      voicePlay(this.infoVoiceMessage)
    },
    /* 确认挂号 */
    confirmBookForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.bookingCount >= 20) {
            this.$message.error('该条件下普通号已满')
            return false
          } else if (this.doctorCount >= 20) {
            this.$message.error('该条件下的当前医师的挂号已满')
            return false
          } else {
            this.form.creator = this.$store.getters.jobNumber
            bookingForm(this.form).then((response) => {
              if (response.code === 200) {
                this.$message.success('挂号成功')
                var result = response.data[0]
                this.valueToDialogForm(result)
                this.dialogFormVisible = true
              } else {
                this.$message.error(response.message)
              }
            })
            this.dialogFormVisible = true
          }
        } else {
          return false
        }
      })
    },
    /* 生成的挂号单的赋值 */
    valueToDialogForm (result) {
      this.dialogForm.serialNo = result.waitingNo
      this.dialogForm.bookNo = result.registerNo
      this.dialogForm.patientNo = result.patientNo
      this.dialogForm.name = result.patientName
      this.dialogForm.date = result.createTime
      this.dialogForm.sex = this.form.sex
      this.dialogForm.bookTime = result.registerTime
      this.dialogForm.money = result.registerFee
      this.dialogForm.doctor = result.doctor
      this.dialogForm.address = result.address
      this.dialogForm.type = result.registerType
      this.dialogForm.creator = this.$store.getters.jobNumber
    },
    dialogFormConfirm () {
      addRecordsInfo(this.dialogForm).then((response) => {
        if (response.code === 200) {
          console.log('病历信息新增成功')
          this.dialogFormVisible = false
          this.showPage = 1
        } else {
          console.log('病历信息新增失败')
        }
      })
    },
    /* 确认注册 */
    confirmRegister (registerForm) {
      this.registerForm.creator = this.$store.getters.jobNumber
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          patientRegister(this.registerForm).then((response) => {
            if (response.code === 200) {
              this.$message.success('注册成功')
              this.showPage = 1
            } else {
              this.$message.error(response.message)
            }
          })
        } else {
          return false
        }
      })
    },
    cancelRegisterForm () {
      this.$refs['registerForm'].resetFields()
      this.showPage = 1
    }
  }
}
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  #selfBookEnter{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../../../static/img/bookImg1.jpg');
    /*服务选择页面*/
    #pageone{
      .el-row{
        margin: 50px 20px;
      }
      .el-button{
        width: 250px;
        height: 100px;
        border-radius: 100px;
        font-size: 20px;
        font-family: 宋体;
      }
    }
    /*科室选择页面*/
    #pagetwo{
      .el-row{
        margin: 50px 20px;
      }
      .el-card{
        color: white;
        background-color: #0000004f;
        font-size: 24px;
        font-family: 宋体;
        width: 250px;
        height: 100px;
        margin: auto;
        cursor: pointer;
      }
    }
    /*挂号信息填写页面*/
    #pagethree{
      .el-row{
        margin: auto;
      }
      .el-select{
        width:100%;
      }
      .el-input.is-disabled .el-input__inner {
        background-color: #f5f7fa5e;
        border-color: #E4E7ED;
        color: #ffffff;
        cursor: not-allowed;
      }
    }
    /*自助注册页面*/
    #pagefour{
      .el-select{
        width:100%;
      }
      .el-input.is-disabled .el-input__inner {
        background-color: #f5f7fa5e;
        border-color: #E4E7ED;
        color: #ffffff;
        cursor: not-allowed;
      }
    }
  }
  /*.el-input__inner{
    background-color: #17384942!important;
    color:white;
  }*/
  /*容器*/
  .el-container{
    width: 100%;
    height: 100%;
  }
  /*医院门诊 title样式*/
  .title{
    font-size: 40px;
    color: white;
    margin: 20px auto;
    font-family: 宋体;
    font-weight: 600;
  }
  /*语音提示 文字样式*/
  .voiceTip{
    color: #05ff05;
    font-family: 宋体;
    font-size: 26px;
    margin: 1% auto;
  }
  /*重写form表单中的label的样式*/
  .label .el-form-item__label{
    color: white;
    font-weight: 600;
  }
  /*重写form表单中的input框的样式*/
  .formInput .el-input__inner{
    background-color: #17384942;
    color:white;
  }
  /*form表单区域 自适应margin*/
  .formDiv{
    margin: 3.5% auto;
  }
  /*重写性别选项的样式*/
  .el-radio{
    color: white;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color:#05ff05;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #05ff05;
    background: #05ff05;
  }
  /*解决form表单中按钮位置偏移的问题*/
  .formBtn .el-form-item__content{
    margin-left: 0px!important;
  }

  /*解决挂号单内容里的表单的item外边距过大，内容剧中的问题*/
  #dia .el-form-item{
    margin-bottom: 4px;
  }
  #dia .el-form-item__content{
    text-align: left;
  }
</style>
