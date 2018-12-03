<template>
  <!-- {{this.$route.query}} -->
    <div class="cc-info-container" :style="'min-height:'+ bg_min_height + 'px;padding-bottom: '+ bg_padding_bottom +'px;'"  v-title="cardInfo.name" ref="body">

        <img v-if="cardInfo.imgUrl" :src="cardInfo.imgUrl" class="card-img" onerror="javascript:this.src='/static/images/default_card.png';">
        <span v-if="cardInfo.propaganda" class="rights">{{cardInfo.propaganda}}</span>
        <div class="tag-class">
            <div class="tag1" v-if="cardInfo.tab1">{{cardInfo.tab1}}</div>
            <div class="tag2" v-if="cardInfo.tab2">{{cardInfo.tab2}}</div>
            <div class="tag3" v-if="cardInfo.tab3">{{cardInfo.tab3}}</div>
        </div>
        <div class="mid-class" v-if="showMid">
            <div class="base-info" v-if="baseInfoContent.length > 0">
              <div class="base-info-top-bg"> <img :src="baseInfoImgSrc"> <span>{{baseInfoDesc}}</span></div>
              <div class="base-info-bg">
                <div class="base-info-bg-text" v-for="item in baseInfoContent" :key="item.title">
                  <div class="base-info-bg-text-1" v-html="item.title"></div>
                  <div class="base-info-bg-text-2" v-html="item.titleText"></div>
                </div>
              </div>

            </div>
            <card-info-segment :desc="cardInfo.categoryName1" :imgSrc="baseRightsImgSrc" :htmlContent="cardInfo.categoryContent1" ></card-info-segment>
            <card-info-segment :desc="cardInfo.categoryName2" :imgSrc="baseRebateImgSrc" :htmlContent="cardInfo.categoryContent2" ></card-info-segment>

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
        <div class="apply-class-bg" :style="'padding-bottom:'+ apply_button_padding_bottom + 'px'">
          <div class="apply-class" @click="actionApply">
              立即申请
          </div>
        </div>

        <card-info-dialog dialogTitle="办卡预登记" :dialogVisible.sync="dialogPhoneVisible" @defaultClick="defaultClick" @primaryClick="phoneClick">
            <div class="d-content-phone">
              <span>请输入您申请信用卡的手机号码</span>
              <input class="weui-input" type="tel" placeholder="请输入手机号" v-model="inputPhone">
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
              <input class="weui-input input-sms" type="tel" placeholder="请输入手机号" v-model="inputPhone">
              <div>
                <input class="weui-input" type="tel" placeholder="请输入图形验证码" v-model="verifyCode">
                <span class="get-verify-btn" v-show="!verifyImg" @click="getVerifyImg">获取图形验证码</span>
                <div @click="getVerifyImg">
                   <img class="verify-img" :src="verifyImg" v-show="verifyImg" alt="单击图片刷新" >
                </div>
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
import _ from 'lodash'

export default {
  components: { CardInfoSegment, CardInfoDialog, Toast },
  props: {},
  data () {
    return {
      checkBoxImg: '/static/images/loan_checkbox_unselected.png',
      agreetProtocol: false,
      cardInfo: {
        annualFee: '',
        currency: '',
        grade: '',
        id: '',
        imgUrl: '',
        interestFeePeriod: '',
        link: '',
        name: '',
        organization: '',
        propaganda: '',
        rank: '',
        retateInfo: '',
        rightsInfo: '',
        status: '',
        tab1: '',
        tab2: '',
        tab3: '',
        categoryContent1: '',
        categoryContent2: '',
        categoryName1: '',
        categoryName2: ''

      },
      apply_button_padding_bottom: 0,
      bg_min_height: 0,
      bg_padding_bottom: 0,
      baseInfoDesc: '基本信息',
      baseInfoImgSrc: '/static/images/base_icon.png',

      baseInfoContent: [],

      baseRightsDesc: '权益',
      baseRightsImgSrc: '/static/images/king_icon.png',

      baseRebateDesc: '返利说明',
      baseRebateImgSrc: '/static/images/money_icon.png',

      dialogPhoneVisible: false,
      dialogSmsVisible: false,
      verifyImg: '',
      inputPhone: '',
      appUserPhone: '',

      toastShow: false,
      toastContent: '',

      verifyCode: '',
      countDownStr: '获取短信验证码',
      smsBtnDisable: false,
      smsCode: ''
    }
  },
  watch: {},
  computed: {
    showMid () {
      return this.baseInfoContent.length > 0 || this.cardInfo.categoryName2 || this.cardInfo.categoryName1
    }
  },
  methods: {
    // 获取 phone callback
    getUserPhoneCallBack (res) {
      this.inputPhone = res
      this.appUserPhone = res
    },
    // 点击协议框
    tapCheckBox () {
      this.agreetProtocol = !this.agreetProtocol
      if (this.agreetProtocol === true) {
        this.checkBoxImg = '/static/images/loan_checkbox_selected.png'
      } else {
        this.checkBoxImg = '/static/images/loan_checkbox_unselected.png'
      }
    },
    // 获取 uid callback
    getUserUidCallBack (res) {
      // 未登录
      if (!res) {
        if (!this.isPC()) {
          this.ToAppPage('/home/loginActivity', null, true)
        } else {
          // window.location.href = url
        }
      } else {
        this.dialogPhoneVisible = true

        // alert(22)
        this.GetUserPhone()
      }
    },
    // 是否需要验证码 callback
    loadIsNeedCodeCallBack (res) {
      // this.showToast(res)
      this.dialogPhoneVisible = false

      if (res.isSuccess === 0) {
        if (res.responseData.code === 1) {
          this.dialogSmsVisible = true
        } else if (res.responseData.code === -1) {
          this.showToast(res.responseData.msg)
        } else {
        /// 已经验证过码短信验证码
          this.addregNew(false)
        }
      } else {
        this.showToast(res.responseData)
      }
    },
    // 验证码回调
    onGetVerifyImgCallBack: function (res) {
      if (res.isSuccess === 0) {
        // this.showToast(res)
        if (res.responseData.image) {
          this.verifyImg = 'data:image/png;base64,' + res.responseData.image
        }
      } else {
        this.showToast(res.responseData)
      }
    },
    // 短信验证码回调
    onGetSmsCodeCallback: function (res) {
      if (res.isSuccess === 0) {
        this.showToast('验证码已发送至手机')
      } else {
        this.showToast(res.responseData)
      }
    },
    // 登记回调
    addregNewCallback (res) {
      if (res.isSuccess === 0) {
        // this.showToast('登记成功')
        if (!this.isPC()) {
          // 内链
          if (this.cardInfo.type === 0) {
            this.ToAppPage(this.cardInfo.link, null, false)
          } else {
            // 外链
            this.ToBrowserFromAppPage(this.cardInfo.link)
          }
        } else {
          window.location.href = this.cardInfo.link
        }
        this.dialogSmsVisible = false
      } else {
        this.showToast(res.responseData)
      }
    },
    dismiss () {
      this.toastShow = false
    },
    /// 取消点击
    defaultClick () {
      this.dialogPhoneVisible = false

      this.dialogSmsVisible = false
    },
    // 立即申请
    actionApply: _.debounce(function () {
      // 点击立即申请
      this.GetUserID()
      // console.log('----')
      // this.dialogPhoneVisible = true
    }, 500),
    // 点击输入手机号弹出确定按钮
    phoneClick: _.debounce(function () {
      if (!this.agreetProtocol) {
        this.showToast('请先勾选返利说明')
        return
      }

      if (this.inputPhone === this.appUserPhone) {
        // 进行登记处理
        this.addregNew(false)
      } else {
        if (this.checkPhone()) {
          this.GeneralGetData({
            url: '/app/rebate/addreg/needCode',
            reqData: { phone: this.inputPhone, type: '3' },
            callback: 'loadIsNeedCodeCallBack'
          })
        }
      }
    }, 500),
    // 校验手机号格式
    checkPhone: function () {
      var phone = this.validaePhoneNumber(this.inputPhone)
      if (phone) {
        this.showToast(phone)
        return false
      } else {
        return true
      }
    },
    // 点击获取图片验证码
    getVerifyImg: _.debounce(function () {
      // 请求获取图片验证码
      if (this.checkPhone()) {
        this.GeneralGetData({
          url: '/app/imagecode/index2',
          reqData: { phone: this.inputPhone},
          callback: 'onGetVerifyImgCallBack'
        })
      }
    }, 500),
    // 点击获取短信验证码
    getSmsCode: _.debounce(function () {
      // 获取短信验证码
      if (this.smsBtnDisable) {
        return
      }
      if (this.checkPhone() && this.verifyCode) {
        this.smsCountDown()
        this.GeneralGetData({
          url: '/app/captcha',
          reqData: { phone: this.inputPhone, type: '3', imgcode: this.verifyCode},
          callback: 'onGetSmsCodeCallback'
        })
      } else {
        this.showToast('请输入图形验证码')
      }
    }, 500),
    /// 登记信用卡
    addregNew (needSmsCode) {
      let params = {type: 3, p2p_name: this.cardInfo.name, reg_account: this.inputPhone}
      if (needSmsCode) {
        params.code = this.smsCode
      }
      // this.showToast(params)
      this.GeneralGetData({
        url: '/app/rebate/addregNew',
        reqData: params,
        callback: 'addregNewCallback'
      })
    },
    // 开启定时器
    smsCountDown: function () {
      if (!this.timer) {
        this.count = 60
        this.smsBtnDisable = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
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
    // 点击输入手机号 验证码 短信验证码弹出确定按钮
    smsClick: _.debounce(function () {
      if (this.checkPhone()) {
        if (this.smsCode) {
          // 进行登记处理
          this.addregNew(true)
        } else {
          this.showToast('请输入短信验证码')
        }
      }
    }, 500),
    showToast (content) {
      if (content.length === 0) return
      this.toastShow = true
      this.toastContent = content
    }
  },
  created () {
    window.getUserPhoneCallBack = this.getUserPhoneCallBack
    window.getUserUidCallBack = this.getUserUidCallBack
    window.loadIsNeedCodeCallBack = this.loadIsNeedCodeCallBack
    window.onGetVerifyImgCallBack = this.onGetVerifyImgCallBack
    window.onGetSmsCodeCallback = this.onGetSmsCodeCallback
    window.addregNewCallback = this.addregNewCallback

    if (!this.isPC()) {
      this.cardInfo = this.getQuery('query')
    } else {
      this.cardInfo = this.$route.query
    }
    this.apply_button_padding_bottom = this.isIphoneX() ? 34 : 0
    this.bg_min_height = this.isIphoneX() ? 812 : 0

    // console.log(this.cardInfo.link)
    // setTimeout(() => {
    //   this.ToAppPage(this.cardInfo.link, null, false)
    // }, 2000)
    // https://xyk.cebbank.com/cebmms/apply/ps/card-list.htm?pro_code=FHTG067633SA0658HEZZ
    // window.location.href = this.cardInfo.link
    if (this.cardInfo.annualFee.length > 0) {
      this.baseInfoContent.push({title: '年费', titleText: this.cardInfo.annualFee})
    }
    if (this.cardInfo.interestFeePeriod.length > 0) {
      this.baseInfoContent.push({title: '免息期限', titleText: this.cardInfo.interestFeePeriod})
    }
    if (this.cardInfo.grade.length > 0) {
      this.baseInfoContent.push({title: '等级', titleText: this.cardInfo.grade})
    }
    if (this.cardInfo.organization.length > 0) {
      this.baseInfoContent.push({title: '发卡组织', titleText: this.cardInfo.organization})
    }
    if (this.cardInfo.currency.length > 0) {
      this.baseInfoContent.push({title: '币种', titleText: this.cardInfo.currency})
    }
  },
  mounted () {
    let height = this.$refs.body.offsetHeight
    if (height > 812) {
      this.bg_padding_bottom = this.isIphoneX() ? 34 : 0
    }
  }
}
</script>
<style lang="postcss" scoped>

.cc-info-container {
  display: flex;
  flex-direction: column;
  background-color: white;

  & .card-img {
    width: 304px;
    height: 190px;
    margin: 0 auto;
    margin-top: 18px;
  }
  & .rights {
    width: 345px;
    text-align: center;
    line-height: 25px;
    font-size: 18px;
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    color: #1C2042;
  }
  & .tag-class {
    display: flex;
    margin-left: 50px;
    margin-right: 50px;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 18px;
    & > div {
      height: 16px;
      line-height: 16px;
      font-size: 10px;
      border-radius: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      padding-left: 4px;
      padding-right: 4px;
      margin-left: 5px;
    }

    & .tag1 {
      background: rgba(255, 199, 106, 0.21);
      border: 1px solid #ff9000;
      color: #ff9000;
    }
    & .tag2 {
      background: rgba(89, 127, 254, 0.1);
      border: 1px solid #597ffe;
      color: #597ffe;
    }
    & .tag3 {
      background: rgba(52, 224, 185, 0.1);
      border: 1px solid #00d6a6;
      color: #00d6a6;
    }
  }
  & .mid-class {

      & .base-info {
        border-top: 12px solid #f6f7f8;
        & .base-info-top-bg {
          border-bottom: 1px solid #f6f7f8;
          padding: 10px 23px;
          display: flex;
          align-items:center;
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
        & .base-info-bg {
          margin-top: 15px;
          margin-bottom: 15px;

          & .base-info-bg-text {
          margin: 10px 20px 10px 23px;
           align-items: flex-start;
           position: relative;
           display: flex;
           width: 100%;

           & .base-info-bg-text-1 {
             width: 80px;
             color: #A4A4A4;
             line-height: 20px;
             font-size: 14px;
           }

           & .base-info-bg-text-2 {
             width: 233px;
             color: #1C2042;
             line-height: 20px;
             font-size: 14px;
           }
        }
        }
      }
  }

  & .flow-class {
    border-top: 12px solid #f6f7f8;
    margin-bottom: 68px;
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

        margin: 5px 0px;
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
      & > span {
        font-size: 12px;
        color: #1c2042;
        font-weight: normal;
      }
    }
  }

  & .apply-class-bg {
    bottom:0;
    position: fixed;
    background: #ffffff;
    width: 100%;
    padding-bottom: 34px;
      & .apply-class {
        background: #4477dd;
        width: 100%;
        height: 48px;
        font-size: 18px;
        line-height: 48px;
        color: #ffffff;
        text-align: center;
      }
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
      line-height:auto;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
  & .d-content-sms {
    margin-top: 10px;
    text-align: left;
    margin-bottom: 10px;
        margin-bottom: 10px;
    & .verify-img {
      margin-top: 4px;
      width: 80px;
      border: none;
      height: 40px;
    }

    & .get-verify-btn{
      color: #1C2042;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      border: 1px solid #1C2042;
      border-radius: 4px;
      padding-left:2px;
      padding-right:2px;
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
