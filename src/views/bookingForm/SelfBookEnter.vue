<template>
<div id="selfBookEnter">
  <div id="pageone" v-show="showPage===1">
    <el-container>
      <el-header><div class="title">医院门诊 自助服务通道</div></el-header>
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
              @click="selfRegister"
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
              <div @click="deptSelect('')">内科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div @click="deptSelect('surgery')">外科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div @click="deptSelect('child')">儿科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div @click="deptSelect('gynaecology')">妇产科</div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div @click="deptSelect('stomatology')">口腔科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div @click="deptSelect('ent')">耳鼻喉科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card
              class="box-card">
              <div @click="deptSelect('eye')">眼科</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div @click="deptSelect('more')">
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
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
            <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
              <el-form-item label="证件类型" class="label">
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
                <el-input class="formInput" v-model="form.bookDept"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="证件号码" class="label">
                  <el-input class="formInput" v-model="form.cardNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="挂号时间" class="label">
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
                  <el-input class="formInput" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="挂号类别" class="label">
                  <el-select class="formInput" v-model="form.bookType">
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
                <el-form-item label="手机号码" class="label">
                  <el-input class="formInput" v-model="form.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="选择医生" class="label">
                  <el-select class="formInput" v-model="form.doctor">
                    <el-option
                      v-for="item in doctors"
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
                <el-form-item label="性别" class="label">
                  <el-input class="formInput" v-model="form.sex"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="">
                  <el-checkbox-group v-model="form.protocol">
                    <el-checkbox><a href="#" style="color: #05ff05;font-family: 宋体">同意网上预约挂号协议</a></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="formBtn">
              <el-button type="primary" @click="confirmBookForm">挂号</el-button>
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

    <el-dialog title="挂号单信息" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm"  label-width="180px">
        <el-form-item label="挂号单编号">
          <span>{{dialogForm.bookNo}}</span>
        </el-form-item>
        <el-form-item label="当日排号位">
          <span>{{dialogForm.serialNo}}</span>
        </el-form-item>
        <el-form-item label="病人编号">
          <span>{{dialogForm.patientNo}}</span>
        </el-form-item>
        <el-form-item label="日期">
          <span>{{dialogForm.date}}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{dialogForm.name}}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{dialogForm.sex}}</span>
        </el-form-item>
        <el-form-item label="挂号类别">
          <span>{{dialogForm.type}}</span>
        </el-form-item>
        <el-form-item label="医生">
          <span>{{dialogForm.doctor}}</span>
        </el-form-item>
        <el-form-item label="排号时间">
          <span>{{dialogForm.bookTime}}</span>
        </el-form-item>
        <el-form-item label="就诊地点">
          <span>{{dialogForm.address}}</span>
        </el-form-item>
        <el-form-item label="金额">
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
          <el-form ref="registerForm" :model="registerForm" label-width="80px">
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="证件类型" class="label">
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
                <el-form-item label="出生日期" class="label">
                  <el-date-picker class="formInput" v-model="registerForm.birthday" type="date" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="证件号码" class="label">
                  <el-input class="formInput" v-model="registerForm.cardNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="名族" class="label">
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
                <el-form-item label="姓名" class="label">
                  <el-input class="formInput" v-model="registerForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="过敏药物" class="label">
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
                <el-form-item label="手机号码" class="label">
                  <el-input class="formInput" v-model="registerForm.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="通讯地址" class="label">
                  <el-input class="formInput" v-model="registerForm.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="padding-left: 10%;padding-right: 2%">
                <el-form-item label="性别" class="label">
                  <el-radio-group v-model="registerForm.sex" style="padding-right: 70%">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
               </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-right: 10%;padding-left: 2%">
                <el-form-item label="">

                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="formBtn">
              <el-button type="primary" @click="confirmRegister">注册</el-button>
              <el-button @click="showPage=1">取消</el-button>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="24">
              <a @click="showPage=1" href="#" style="color: gainsboro;">返回上一页</a>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</div>
</template>

<script>
import {voicePlay} from '../../utils'

export default {
  name: 'SelfBookForm',
  data () {
    return {
      showPage: 1,
      deptVoiceMessage: '请选择就诊科室',
      infoVoiceMessage: '请正确填写身份信息',
      form: {
        serialNo: '',
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
        protocol: ''
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
        {
          value: '白求恩',
          label: '白求恩'
        },
        {
          value: '张建宁',
          label: '张建宁'
        }
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
      dialogForm: {
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
        phone: ''
      },
      medicines: [
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
        }
      ],
      nations: [
        {
          value: '汉族',
          label: '汉族'
        }
      ]
    }
  },
  methods: {
    selfBook () {
      this.showPage = 2
      voicePlay(this.deptVoiceMessage)
    },
    selfRegister () {
      this.showPage = 4
      voicePlay(this.registerVoiceMessage)
    },
    selfQuery () {

    },
    accountManage () {

    },
    selfCharge () {

    },
    deptSelect (deptType) {
      this.showPage = 3
      voicePlay(this.infoVoiceMessage)
    },
    confirmBookForm () {
      this.dialogFormVisible = true
    },
    dialogFormConfirm () {
      this.dialogFormVisible = false
      this.showPage = 1
    },
    confirmRegister () {
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

    }
    /*自助注册页面*/
    #pagefour{
      .el-select{
        width:100%;
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
</style>
