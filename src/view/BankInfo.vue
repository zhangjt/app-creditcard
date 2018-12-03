<template>
    <div class="bk-info-container" v-title="bankInfo.name">

         <div ref="topBg" class="bank-top">
           <div class="card-img">
             <img ref="myImg" v-if="bankInfo.icon" :src="bankInfo.icon"  onerror="javascript:this.src='/static/images/bank_default.jpg';">
           </div>
            <div class="top-right">
              <div class="top">
                <span class="bank-name">{{bankInfo.name}}</span>
                <span class="bank-divider">|</span>
                <span v-if ="bankInfo.propaganda" class="rights">{{bankInfo.propaganda}}</span>
              </div>

              <div class="tag-class">
                <span class="tag1" v-if="bankInfo.tag1">{{bankInfo.tag1}}</span>
                <span class="tag2" v-if="bankInfo.tag2">{{bankInfo.tag2}}</span>
                <span class="tag3" v-if="bankInfo.tag3">{{bankInfo.tag3}}</span>
            </div>
            </div>

         </div>
        <div class="mid-class" v-if="showMid">
            <card-info-segment :desc="bankInfo.categoryName1" :imgSrc="baseRightsImgSrc" :htmlContent="bankInfo.categoryContent1" ></card-info-segment>
            <card-info-segment :desc="bankInfo.categoryName2" :imgSrc="baseRebateImgSrc" :htmlContent="bankInfo.categoryContent2" ></card-info-segment>
        </div>

        <div class="flow-class">
            <div> <img src="/static/images/process-icon.png"> <span>返利流程</span></div>
            <div class="flow-step">
                <img src="/static/images/apply.png">
                <img src="/static/images/next.png">
                <img src="/static/images/write.png">
                <img src="/static/images/next.png">
                <img src="/static/images/great.png">
                <img src="/static/images/next.png">
                <img src="/static/images/get.png">
            </div>
            <div class="flow-step-text">
                <span>申请卡片</span>
                <span>官网填写</span>
                <span>成功办卡</span>
                <span>获得返利</span>
            </div>
        </div>

        <div class="apply-class" @click="actionApply">
            立即申请
        </div>

        <card-info-dialog dialogTitle="办卡预登记" :dialogVisible.sync="dialogPhoneVisible" @defaultClick="defaultClick" @primaryClick="phoneClick">
            <div class="d-content-phone">
              <span>请输入您申请信用卡的手机号码</span>
              <input class="weui-input" type="tel" placeholder="请输入手机号" v-model="phoneNo">
              </div>
              <table class="protocol-content">
                <p @click="tapCheckBox" class="check-box-bg">
                <img class="check-box" :src="checkBoxImg"/>
                </p>
                <span class="protocol-agreement">返利说明:此返利仅限首次申请该行信用卡用户</span>
              </table>
        </card-info-dialog>
        <card-info-dialog dialogTitle="办卡预登记" :dialogVisible.sync="dialogSmsVisible" @defaultClick="defaultClick" @primaryClick="smsClick">
            <div class="d-content-sms">
              <span>请输入您申请信用卡的手机号码</span>
              <input class="weui-input input-sms" type="tel" placeholder="请输入手机号" v-model="phoneNo">
              <div>
                <input class="weui-input" type="tel" placeholder="请输入图形验证码" v-model="verifyCode">
                <span class="get-verify-btn" v-show="!verifyImg" @click="getVerifyImg">获取图形验证码</span>
                <div class="verify-img" v-show="verifyImg" @click="getVerifyImg"><img :src="verifyImg" alt="单击图片刷新" ></div>
              </div>
              <div>
                <input class="weui-input" type="tel" placeholder="请输入短信验证码" v-model="smsCode">
                <span  class="get-verify-btn" @click="getSmsCode" >{{countDownStr}}</span>
              </div>
            </div>
        </card-info-dialog>
        <toast :showToast.sync="toastShow" :toastContent="toastContent" @dismiss="dismiss"></toast>
    </div>
</template>

<script>
import CardInfoSegment from '@/components/CardInfoSegment'
import CardInfoDialog from '@/components/CardInfoDialog'
import Toast from '@/components/Toast'
import RGBaster from '@/utils/rbgaster'
import _ from 'lodash'
export default {
  components: { CardInfoSegment, CardInfoDialog, Toast },
  props: {},
  data () {
    return {
      checkBoxImg: '/static/images/loan_checkbox_unselected.png',
      agreetProtocol: false,
      bankInfo: {
        id: '',
        icon: '',
        categoryName1: '',
        categoryContent1: '',
        categoryName2: '',
        categoryContent2: '',
        propaganda: '',
        name: '',
        rebate: 0,
        status: '',
        tag1: '',
        tag2: '',
        tag3: '',
        url: '',
        color: '',
        inners: 1
      },
      baseRightsImgSrc: '/static/images/king_icon.png',
      baseRebateImgSrc: '/static/images/money_icon.png',

      dialogPhoneVisible: false,
      dialogSmsVisible: false,
      verifyImg: '',
      verifyCode: '',
      smsCode: '',
      phoneNo: '',
      phoneNoTemp: '',
      toastShow: false,
      toastContent: '',
      countDownStr: '获取短信验证码',
      smsBtnDisable: false
    }
  },
  watch: {},
  computed: {
    showMid: function () {
      return this.categoryName1 || this.bankInfo.categoryName2
    }
  },
  methods: {
    // 点击协议框
    tapCheckBox () {
      this.agreetProtocol = !this.agreetProtocol
      if (this.agreetProtocol === true) {
        this.checkBoxImg = '/static/images/loan_checkbox_selected.png'
      } else {
        this.checkBoxImg = '/static/images/loan_checkbox_unselected.png'
      }
    },
    loadImg: function () {
      var index = this.bankInfo.color || 0
      this.$refs.topBg.style.backgroundColor = this.getColor(this.bankInfo.color)
      // RGBaster.colors(that.$refs.myImg, {
      //   success: function(payload) {
      //   that.$refs.topBg.style.background = payload.secondary;
      // }
      // });
    },
    getColor: function (c) {
      // 0 默认值 1,2,3,4,5后台配置
      var colors = ['#2371FF', '#2371FF', '#FF3F46', '#43C6CD ', '#FF821A', ' #6E46DD']
      return colors[c]
    },
    defaultClick: function () {
      this.dialogPhoneVisible = false
      this.dialogSmsVisible = false
    },
    actionApply: _.debounce(function () {
      // 点击立即申请
      this.GetUserID()
      // this.dialogPhoneVisible = true
      // console.log('----')
    }, 500),
    phoneClick: _.debounce(function () {
      if (!this.agreetProtocol) {
        this.showToast('请先勾选返利说明')
        return
      }
      if (this.checkPhone()) {
        this.dialogPhoneVisible = false
        // 登记号码为目前的注册账号 无需验证 直接进入下一步
        if (this.phoneNoTemp === this.phoneNo) {
          this.nextStep(false)
        } else {
          this.GeneralGetData({
            url: '/app/rebate/addreg/needCode',
            reqData: { phone: this.phoneNo, type: 2},
            callback: 'loadIsNeedCodeCallBack'
          })
        }
      }
    }, 500),
    // 是否需要验证码 callback
    loadIsNeedCodeCallBack (res) {
      this.dialogPhoneVisible = false
      if (res.isSuccess == 0) {
        // code = -1 ,号码不允许登记， code = 0 ，不需要验证码  code = 1 ，需要登记
        if (res.responseData.code == 1) {
          this.dialogSmsVisible = true
        } else if (res.responseData.code == 0) {
          this.nextStep(false)
        } else {
          if (res.responseData.msg) {
            this.showToast(res.responseData.msg)
          }
        }
      } else {
        /// 已经验证过码短信验证码
        this.showToast(res.responseData)
      }
    },
    checkPhone: function () {
      // 校验手机号格式
      var phone = this.validaePhoneNumber(this.phoneNo)
      if (phone) {
        this.showToast(phone)
        return false
      } else {
        return true
      }
    },
    getVerifyImg: _.debounce(function () {
      // 请求获取短信验证码
      if (this.checkPhone()) {
        this.GeneralGetData({
          url: '/app/imagecode/index2',
          reqData: { phone: this.phoneNo},
          callback: 'onGetVerifyImg'
        })
      }
    }, 500),
    onGetVerifyImg: function (res) {
      if (res.isSuccess == 0) {
        if (res.responseData.image) {
          this.verifyImg = 'data:image/png;base64,' + res.responseData.image
        }
      } else {
        this.showToast(res.responseData)
      }
    },
    getSmsCode: function () {
      // 获取短信验证码
      if (this.smsBtnDisable) {
        return
      }
      if (this.checkPhone() && this.verifyCode) {
        this.smsCountDown()
        this.GeneralGetData({
          url: '/app/captcha',
          reqData: { phone: this.phoneNo, type: '3', imgcode: this.verifyCode},
          callback: 'onGetSmsCode'
        })
      } else {
        this.showToast('请输入图形验证码')
      }
    },
    onGetSmsCode: function (res) {
      if (res.isSuccess == 0) {
        this.showToast('验证码已发送至手机')
      } else {
        this.showToast(res.responseData)
      }
    },
    smsCountDown: function () {
      if (!this.timer) {
        this.count = 60
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.smsBtnDisable = true
            this.count--
            this.countDownStr = this.count + 's'
          } else {
            this.smsBtnDisable = false
            clearInterval(this.timer)
            this.countDownStr = '重新发送'
            this.timer = null
          }
        }, 1000)
      }
    },
    smsClick: _.debounce(function () {
      if (this.checkPhone()) {
        if (this.smsCode) {
          this.nextStep(true)
        } else {
          this.showToast('请输入短信验证码')
        }
      }
    }, 500),
    finalStep: function () {
      // 跳转到银行的页面
      if (this.bankInfo.url) {
        // WebView 打开
        if (this.bankInfo.inners && this.bankInfo.inners == 1) {
          this.ToAppPage(this.bankInfo.url)
        } else {
          // 浏览器打开
          this.ToBrowserFromAppPage(this.bankInfo.url, '')
        }
      }
    },
    nextStep: function (needSmsCode) {
      let params = {type: 2, p2p_name: this.bankInfo.name, reg_account: this.phoneNo}
      if (needSmsCode) {
        params.code = this.smsCode
      }
      this.GeneralGetData({
        url: '/app/rebate/addregNew',
        reqData: params,
        callback: 'addregNewCallback'
      })
    },
    addregNewCallback: function (res) {
      if (res.isSuccess == 0) {
        this.finalStep()
      } else {
        this.showToast(res.responseData)
      }
    },
    dismiss: function () {
      this.toastShow = false
    },
    showToast: function (content) {
      if (content) {
        this.toastContent = content
        this.toastShow = true
      }
    },
    getUserUidCallBack: function (uid) {
      if (uid) {
        this.GetUserPhone()
      } else {
        // 跳转到登录页面
        this.ToAppPage('/home/loginActivity', '', true)
      }
    },
    getUserPhoneCallBack: function (uphone) {
      this.phoneNo = uphone
      this.phoneNoTemp = uphone
      this.dialogPhoneVisible = true
    }
  },
  created () {
    this.bankInfo = this.getQuery('query')
    top.window.getUserUidCallBack = this.getUserUidCallBack
    top.window.getUserPhoneCallBack = this.getUserPhoneCallBack
    top.window.onGetVerifyImg = this.onGetVerifyImg
    top.window.onGetSmsCode = this.onGetSmsCode
    top.window.loadIsNeedCodeCallBack = this.loadIsNeedCodeCallBack
    top.window.addregNewCallback = this.addregNewCallback
  },
  mounted () {
    this.loadImg()
  }
}
</script>

<style lang="postcss" scoped>
.bk-info-container {
  display: flex;
  flex-direction: column;
  color: #1c2042;
  & .bank-top {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 15px;
    & .top-right {
      height: 44px;
      margin-left: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & .top {
        display: flex;
        align-items: flex-end;
        height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 22px;
      }
    }

    & span {
      color: #ffffff;
    }

    & .bank-name {
      font-size: 16px;
      height: 16px;
      line-height: 16px;
    }

    & .card-img {
      width: 44px;
      height: 44px;
      border-radius: 22px;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      & > img{
        width: 42px;
        height: 42px;
        border-radius: 21px;
      }
    }
    & .rights {
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & .bank-divider {
      font-size: 12px;
      margin-left: 6px;
      height: 16px;
      line-height: 16px;
      margin-right: 6px;
    }
    & .tag-class {
      display: flex;
      & > span {
        height: 16px;
        line-height: 16px;
        font-size: 10px;
        border-radius: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid #ffffff;
      }
      & :not(:nth-child(1)) {
        margin-left: 5px;
      }
    }
  }

  & .mid-class {
    margin-top: 18px;
  }

  & .flow-class {
    border-top: 8px solid #f6f7f8;
    margin-bottom: 18px;
    & > div {
      padding: 10px 23px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      & > img {
        width: 20px;
        height: 20px;
      }
      & > span {
        font-size: 14px;
        color: #1c2042;
        line-height: 20px;
        margin-left: 5px;
        font-weight: bold;
      }
    }

    & .flow-step {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #f6f7f8;
      & :nth-child(odd) {
        width: 48px;
        height: 48px;
      }
      & :nth-child(even) {
        width: 12px;
        height: 12px;
      }
    }
    & .flow-step-text {
      display: flex;
      justify-content: space-between;
      padding: 0px;
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 48px;
      & > span {
        font-size: 12px;
        color: #1c2042;
        font-weight: normal;
      }
    }
  }

  & .apply-class {
    background-color: #4477dd;
    width: 100%;
    height: 48px;
    font-size: 18px;
    line-height: 48px;
    color: #ffffff;
    text-align: center;
    position: fixed;
    bottom: 0px;
  }

  & .d-content-phone {
    margin-top: 10px;
    text-align: left;
    margin-bottom: 10px;
    & > span {
      font-size: 12px;
      color: #d0021b;
    }

    & .weui-input {
      margin-top: 12px;
      border: 1px solid #d6d6d6 !important;
      border-radius: 4px;
      height: 42px;
      line-height: auto;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
  & .d-content-sms {
    margin-top: 10px;
    text-align: left;
    margin-bottom: 10px;
    & .verify-img {
      width: 80px;
      border: none;
      height: 40px;

      & > img{
         border: none;
         width: 80px;
        height: 40px;
      }
    }

    & .get-verify-btn {
      color: #1c2042;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      border: 1px solid #1c2042;
      border-radius: 4px;
      padding-left: 2px;
      padding-right: 2px;
      margin-right: 10px;
      width: 160px;
    }

    & .input-sms {
      margin-top: 12px;
      border: 1px solid #d6d6d6 !important;
      border-radius: 4px;
      height: 42px;
      line-height: auto;
      padding-left: 8px;
      padding-right: 8px;
    }
    & > span {
      font-size: 12px;
      color: #d0021b;
    }
    & > div {
      border: 1px solid #d6d6d6 !important;
      height: 42px;
      border-radius: 4px;
      margin-top: 12px;
      display: flex;
      align-items: center;
    }
    & .weui-input {
      border: 0px;
      height: 40px;
      line-height: auto;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}

& .protocol-content {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    line-height: 21px;
  }
.check-box-bg {
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 12px;
    }
.check-box {
      vertical-align: top;
      width: 12px;
      height: 12px;
    }
.protocol-agreement {
      font-size: 11px;
      color: #d0021b;
      margin-left: 2px;
      line-height: 21px;
    }
</style>
