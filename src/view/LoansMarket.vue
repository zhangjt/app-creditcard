<template>
<div class="lm-container" v-title="loanDetail.name">
  <div class="hor_two_cell">
    <div>
      <div class="title">金额(元)</div>
      <div :class="editMode? 'valueIcon':'hideInputView'">
        <input type="text" ref="input_textField" class="input_textField" @keyup.enter="endEditAmount" v-focus="editMode"  @blur="endEditAmount" v-model="amountValue">
        <div class="value">元</div>
      </div>
      <div :class="editMode? 'hideInputView':'valueIcon'" @click="beginEditAmount">
        <div class="input_text">{{amountValue}}</div>
        <img class="input_icon" src="/static/images/loan_edit.png"></img>
      </div>
    </div>
    <div>
      <div class="title">期限</div>
      <div class="valueIcon" @click="selectTimeLimit">
        <div class="value">{{selectedTimeText}}</div>
        <img class="icon" src="/static/images/loan_more.png"></img>
      </div>
    </div>
  </div>

  <div class="hor_third_cell">
    <div>
      <div class="title">还款金额 (元)</div>
      <div class="value">{{(repayment * 1.0).toFixed(2)}}</div>
    </div>
    <div class="ver_line"></div>
    <div>
      <div class="title">利息与费用 (元)</div>
      <div class="value">{{(interest * 1.0).toFixed(2)}}</div>
    </div>
    <div class="ver_line"></div>
    <div>
      <div class="title">到账金额 (元)</div>
      <div class="value">{{(realMoney * 1.0).toFixed(2)}}</div>
    </div>
  </div>

  <div class="tip_content">
    <img class="icon" src="/static/images/loan_tip_icon.png"></img>
    <div class="tips">仅供参考，实际的利息和费用以审批结果为准</div>
  </div>

  <div class="feature_content">
    <div class="feature_view">
      <img class="feature_icon" src="/static/images/loan_feature_icon.png"></img>
      <div class="feature_text">{{loanDetail.feature}}</div>
    </div>
    <div class="feature_view">
      <img class="feature_icon" src="/static/images/loan_feature_icon.png"></img>
      <div class="feature_text">月费率{{loanDetail.rate/10}}‰</div>
    </div>
  </div>

  <button type="button" class="check_produce_detail"  @click="checkProduceDetail">查看产品详情 》</button>

  <div class="rules_contentView">
    <div class="rule_title_1">申请条件</div>
    <div class="rule_content_1" v-html="loanDetail.premise"></div>
    <div class="rule_title_2">返利说明</div>
    <div class="rule_content_2" v-html="loanDetail.rebateRemark"></div>
  </div>

  <div class="bottom_content">
    <button type="button" class="apply_button" @click="applyAction">立刻申请</button>
  </div>

  <div>
    <vue-pickers
      :show="show"
      :columns="columns"
      :defaultData="defaultData"
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn"></vue-pickers>
  </div>

  <card-info-dialog dialogTitle="贷款登记" :dialogVisible.sync="dialogPhoneVisible" @defaultClick="defaultClick" @primaryClick="dialogPhoneConfirm">
    <div class="d-content-phone">
      <span>请登记您的手机号并使用该号码进行贷款</span>
      <input ref='inputTel' class="weui-input" type="tel" placeholder="请输入手机号" v-model="inputPhone">
      <div class="protocol-content" >
        <p @click="tapCheckBox" class="check-box-bg">
          <img class="check-box" :src="checkBoxImg"></img>
        </p>
        <span class="protocol-agreement" @click="showAgreementProtocol">同意免责声明</span>
      </div>
    </div>
  </card-info-dialog>

  <card-info-dialog dialogTitle="贷款登记" :dialogVisible.sync="dialogSmsVisible" @defaultClick="defaultClick" @primaryClick="dialogSmsConfirm">
    <div class="d-content-sms">
      <span>请登记您的手机号并使用该号码进行贷款</span>
      <input class="weui-input input-sms" type="tel" placeholder="请输入手机号"  v-model="inputPhone">
      <div>
        <input class="weui-input" type="tel" placeholder="请输入图形验证码"  v-model="verifyCode">
        <span class="get-verify-btn" v-show="!verifyImg" @click="getVerifyImg">获取图形验证码</span>
        <div @click="getVerifyImg">
          <img class="verify-img" :src="verifyImg" v-show="verifyImg" alt="单击图片刷新">
        </div>
      </div>
      <div>
        <input class="weui-input" type="tel" placeholder="请输入短信验证码" v-model="smsCode">
        <span  class="get-verify-btn" @click="getSmsCode" >{{countDownStr}}</span>
      </div>
      <table class="protocol-content">
        <p @click="tapCheckBox" class="check-box-bg">
          <img class="check-box" :src="checkBoxImg"></img>
        </p>
        <span class="protocol-agreement" @click="showAgreementProtocol">同意免责声明</span>
      </table>

    </div>
  </card-info-dialog>

  <toast :showToast.sync="toastShow" :toastContent="toastContent" @dismiss="dismissToast"></toast>
</div>
</template>

<script>
import http from "@/utils/http";
import vuePickers from "vue-pickers";
import CardInfoDialog from "@/components/CardInfoDialog";
import Toast from "@/components/Toast";
import _ from "lodash";

export default {
  components: { vuePickers, CardInfoDialog, Toast },
  props: {},
  data() {
    return {
      editMode: false,
      loanDetail: {},
      // 还款金额
      repayment: "",
      // 利息
      interest: "",
      // 到账金额
      realMoney: "",

      amountValue: 5000,
      selectedTimeText: "1个月",
      timeLimit: 1,

      /** 登记号码弹窗 */
      dialogPhoneVisible: false,
      dialogSmsVisible: false,
      checkBoxImg: "/static/images/loan_checkbox_unselected.png",
      agreetProtocol: false,

      verifyImg: "",
      inputPhone: "",
      appUserPhone: "",

      toastShow: false,
      toastContent: "",

      countDownStr: "获取短信验证码",
      smsBtnDisable: false,
      smsCode: "",
      verifyCode: "",

      /** Picker View */
      // -1未选中，0为金额，1为期限
      pick_type: "none",
      show: false,
      columns: 1,
      defaultData: [{}],
      pickData: {}
    };
  },
  watch: {
    amountValue: function(res) {
      var num = res.replace(/[^0-9-]+/, "");
      if (num != res) {
        this.showToast("仅支持输入整数");
        this.amountValue = num;
      }

      if (num.length > 6) {
        console.log(num);
        this.showToast("超过贷款额度范围");
        this.amountValue = num.substring(0, num.length - 1);
      }
    }
  },
  computed: {},
  methods: {
    // 开始编辑
    beginEditAmount() {
      this.editMode = true;
      this.$refs.input_textField.focus();
    },
    // 结束编辑
    endEditAmount() {
      console.log("endEditAmount");
      // this.$refs.input_textField.();
      if (this.amountValue.length == 0) {
        this.editMode = true;
      } else {
        this.editMode = false;
        this.calculateDatas();
      }
    },
    // 计算还款利息、金额、到账类型
    calculateDatas() {
      // 还款类型
      console.log("calculateDatas, type=", this.loanDetail.repayType);
      switch (this.loanDetail.repayType) {
        // 等额本金
        case 0: {
          //     // 还款金额
          // repayment: "",
          // // 利息
          // interest: "",
          // // 到账金额
          // realMoney: "",
          var rate = this.loanDetail.rate * 1.0 / 10000.0;
          var amount = this.amountValue * 1.0;
          var months = this.timeLimit * 1.0;
          console.log("months=", months, "amount=", amount, "rate=", rate);
          var interest = 0;
          if (rate && rate > 0) {
            interest =
              (amount / months + amount * rate + amount / months * (1 + rate)) *
                months *
                0.5 -
              amount;
          }

          this.repayment = amount + interest;
          this.interest = interest;
          this.realMoney = amount;
          break;
        }
        // 等额本息
        case 1: {
          var rate = this.loanDetail.rate * 1.0 / 10000.0;
          var amount = this.amountValue * 1.0;
          var months = this.timeLimit * 1.0;

          var interest = 0;
          if (rate && rate > 0) {
            interest =
              amount *
                rate *
                Math.pow(1 + rate, months) /
                (Math.pow(1 + rate, months) - 1) *
                months -
              amount;
          }

          this.repayment = amount + interest;
          this.interest = interest;
          this.realMoney = amount;
          break;
        }
        // 到期本息
        case 2: {
          var rate = this.loanDetail.rate * 1.0 / 10000.0;
          var amount = this.amountValue * 1.0;
          var months = this.timeLimit * 1.0;
          var interest = amount * rate * months;
          this.repayment = amount + interest;
          this.interest = interest;
          this.realMoney = amount;
          break;
        }
        default: {
          break;
        }
      }
    },
    /** 贷款超市详情 */
    getLoanDetail() {
      var id = this.loanDetail.id;
      if (id.length == 0) {
        return;
      }

      var params = { id: id };
      http.postWithoutCode("/loan/plat/detail", params).then(res => {
        console.log(res);
        this.loanDetail = res.loanPlat;

        this.setupDefaultValue();
      });
    },
    /** 默认设置金额、时间最大值 */
    setupDefaultValue() {
      this.calculateDatas();
    },
    selectTimeLimit() {
      this.pick_type = "time";
      this.show = true;

      var datas = [
        {
          text: "12个月",
          value: "12"
        },
        {
          text: "9个月",
          value: "9"
        },
        {
          text: "6个月",
          value: "6"
        },
        {
          text: "3个月",
          value: "3"
        },
        {
          text: "1个月",
          value: "1"
        }
      ];

      this.defaultData = datas;
      this.pickData = {
        // 第一列的数据结构
        data1: datas
      };
      console.log("selectTimeLimit");
    },
    pickViewSelectedValue(val) {
      // TODO
      var selectedText = val.select1.text;
      var selectedValue = val.select1.value;
      console.log(selectedText + ":" + selectedValue);
      if (this.pick_type == "amount") {
        this.amountValue = selectedValue;
      } else if (this.pick_type == "time") {
        this.selectedTimeText = selectedText;
        this.timeLimit = selectedValue;
      }

      this.calculateDatas();
    },

    // 跳转到产品详情页
    checkProduceDetail: function() {
      if (!this.isPC()) {
        var protocol = window.location.protocol;
        var host = window.location.host;
        // var hash  = window.location.hash;
        var root = protocol + "//" + host + "/";
        let url = root + "wap/cardmarket/LoanStateDetail";
        // console.log(url);
        this.ToAppPage(url, { id: this.loanDetail.id });
      } else {
        this.$router.push({
          name: "LoanStateDetail",
          query: { id: this.loanDetail.id }
        });
      }

      console.log("checkProduceDetail");
    },
    // 点击协议框
    tapCheckBox() {
      this.agreetProtocol = !this.agreetProtocol;
      console.log(this.agreetProtocol);
      if (this.agreetProtocol == true) {
        this.checkBoxImg = "/static/images/loan_checkbox_selected.png";
      } else {
        this.checkBoxImg = "/static/images/loan_checkbox_unselected.png";
      }
    },
    // 跳转到协议页面
    showAgreementProtocol() {
      var protocol = window.location.protocol;
      var host = window.location.host;
      var root = protocol + "//" + host + "/";
      let url = root + "wap/cardmarket/userAgreement";
      console.log(url);
      this.ToAppPage(url);
    },

    // 点击立即申请按钮
    applyAction: _.debounce(function() {
      // this.dialogPhoneVisible = true;
      // 之后会走getUserUidCallBack
      this.$refs.inputTel.focus();
      this.GetUserID();
    }, 500),

    /** 登记号码弹窗 */
    defaultClick: function() {
      this.dialogPhoneVisible = false;
      this.dialogSmsVisible = false;
    },
    // 点击输入手机号弹出确定按钮
    dialogPhoneConfirm: _.debounce(function() {
      if (this.agreetProtocol == false) {
        this.showToast("请勾选免责声明");
        return;
      }
      // this.dialogSmsVisible = false;
      // this.dialogPhoneVisible = false;

      if (this.checkPhone()) {
        this.GeneralGetData({
          url: "/app/rebate/addreg/needCode",
          reqData: { type: 4, phone: this.inputPhone },
          callback: "loadIsNeedCodeCallBack"
        });
      }
    }, 500),
    // 点击输入手机号 验证码 短信验证码弹出确定按钮
    dialogSmsConfirm: _.debounce(function() {
      if (this.agreetProtocol == false) {
        this.showToast("请勾选免责声明");
        return;
      }
      // this.dialogSmsVisible = false;
      // this.dialogPhoneVisible = false;
      if (this.checkPhone()) {
        if (this.smsCode) {
          // 进行登记处理
          this.addregNew(true);
        } else {
          this.showToast("请输入短信验证码");
        }
      }
    }, 500),
    /// 登记信用卡
    addregNew(needSmsCode) {
      let params = {
        type: 4,
        p2p_name: this.loanDetail.name,
        reg_account: this.inputPhone
      };
      if (needSmsCode) {
        params.code = this.smsCode;
      }
      // this.showToast(params)
      this.GeneralGetData({
        url: "/app/rebate/addregNew",
        reqData: params,
        callback: "addregNewCallback"
      });
    },
    // 登记回调
    addregNewCallback(res) {
      if (res.isSuccess === 0) {
        // this.showToast('登记成功')
        this.ToAppPage(this.loanDetail.url, null, false);
      } else {
        this.showToast(res.responseData);
      }
    },

    // 获取 phone callback
    getUserPhoneCallBack(res) {
      // this.inputPhone = res;
      this.appUserPhone = res;
    },
    // 获取 uid callback
    getUserUidCallBack(res) {
      // console.log("getUserUidCallBack:", res);
      if (!res) {
        // 未登录
        this.ToAppPage("/home/loginActivity", null, true);
      } else {
        this.dialogPhoneVisible = true;
        this.$refs.inputTel.focus();
        document.body.scrollTop();
        // 之后会走getUserPhoneCallBack
        this.GetUserPhone();
      }
    },
    // 是否需要验证码 callback
    loadIsNeedCodeCallBack(res) {
      // this.showToast(res)
      this.dialogPhoneVisible = false;
      if (res.isSuccess === 0) {
        if (res.responseData.code === 1) {
          this.dialogSmsVisible = true;
        } else if (res.responseData.code === -1) {
          this.showToast(res.responseData.msg);
        } else {
          /// 已经验证过码短信验证码
          this.addregNew(false);
        }
      } else {
        this.showToast(res.responseData);
      }
    },
    // 请求获取图片验证码
    getVerifyImg: _.debounce(function() {
      if (this.checkPhone()) {
        this.GeneralGetData({
          url: "/app/imagecode/index2",
          reqData: { phone: this.inputPhone },
          callback: "onGetVerifyImgCallBack"
        });
      }
    }, 500),
    // 图片验证码回调
    onGetVerifyImgCallBack: function(res) {
      if (res.isSuccess === 0) {
        // this.showToast(res)
        if (res.responseData.image) {
          this.verifyImg = "data:image/png;base64," + res.responseData.image;
        }
      } else {
        this.showToast(res.responseData);
      }
    },
    // 获取短信验证码
    getSmsCode: _.debounce(function() {
      if (this.smsBtnDisable) {
        return;
      }
      if (this.checkPhone() && this.verifyCode) {
        this.GeneralGetData({
          url: "/app/captcha",
          reqData: {
            phone: this.inputPhone,
            type: "3",
            imgcode: this.verifyCode
          },
          callback: "onGetSmsCodeCallback"
        });
      } else {
        this.showToast("请输入图形验证码");
      }
    }, 500),
    // 短信验证码回调
    onGetSmsCodeCallback: function(res) {
      if (res.isSuccess === 0) {
        this.smsCountDown();
        this.showToast("验证码已发送至手机");
      } else {
        this.showToast(res.responseData);
      }
    },
    smsCountDown() {
      if (!this.timer) {
        this.count = 60;
        this.smsBtnDisable = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--;
            this.countDownStr = this.count + "s";
          } else {
            this.smsBtnDisable = false;
            clearInterval(this.timer);
            this.countDownStr = "重新发送";
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 校验手机号格式
    checkPhone() {
      var phone = this.validaePhoneNumber(this.inputPhone);
      if (phone) {
        this.showToast(phone);
        return false;
      } else {
        return true;
      }
    },

    /** Picker View */
    close() {
      console.log("close");
      this.show = false;
    },
    confirmFn(val) {
      this.show = false;
      this.pickViewSelectedValue(val);
    },
    toShow() {
      console.log("toShow");
      this.show = true;
    },

    /** Toast */
    showToast(content) {
      if (content.length === 0) return;
      this.toastShow = true;
      this.toastContent = content;
    },
    dismissToast() {
      this.toastShow = false;
    }
  },
  created() {
    window.getUserPhoneCallBack = this.getUserPhoneCallBack;
    window.getUserUidCallBack = this.getUserUidCallBack;
    window.loadIsNeedCodeCallBack = this.loadIsNeedCodeCallBack;
    window.onGetVerifyImgCallBack = this.onGetVerifyImgCallBack;
    window.onGetSmsCodeCallback = this.onGetSmsCodeCallback;
    window.addregNewCallback = this.addregNewCallback;

    if (!this.isPC()) {
      this.loanDetail = this.getQuery("query");
    } else {
      this.loanDetail = this.$route.query;
    }
    this.getLoanDetail();
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        // console.log(el, { value });
        if (value) {
          el.focus();
        }
      }
    }
  },
  mounted() {
    this.$refs.inputTel.focus();
  }
};
</script>

<style lang="postcss" >
.lm-container {
  display: flex;
  flex-direction: column;
  min-height: 667px;
  background: #f6f7f8;

  & .hor_two_cell {
    display: flex;
    flex-direction: row;
    height: 100px;
    background: #407efa;

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
      overflow: hidden;

      & .title {
        color: #ffffff;
        font-size: 12px;
        text-align: center;
      }

      & .hideInputView {
        height: 0px;
        overflow: hidden;
        & .input_textField {
          color: #ffffff;
          font-size: 24px;
          line-height: 24px;
          background: rgba(0, 0, 0, 0);
          border: 0px solid;
          color: white;
          width: 95px;
          outline: none;
          border-bottom-width: 1px;
          border-bottom-color: white;
          border-radius: 0px;
          caret-color: white;
        }

        & .input_icon {
          width: 15px;
          height: 15px;
          margin: 0 0 0 10px;
        }
      }

      & .input_text {
        color: #ffffff;
        font-size: 24px;
        line-height: 24px;
        margin-left: 25px;
        border: 0px solid;
        border-bottom-width: 1px;
        border-bottom-color: white;
      }

      & .input_icon {
        width: 15px;
        height: 15px;
        margin: 0 0 0 10px;
      }

      & .valueIcon {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 33px;
        -webkit-tap-highlight-color: transparent;

        & .input_textField {
          color: #ffffff;
          font-size: 24px;
          line-height: 24px;
          background: rgba(0, 0, 0, 0);
          border: 0px solid;
          color: white;
          width: 95px;
          outline: none;
          border-bottom-width: 1px;
          border-bottom-color: white;
          border-radius: 0px;
          caret-color: white;
        }

        & .value {
          color: #ffffff;
          font-size: 24px;
          line-height: 24px;
          padding-left: 24px;
        }

        & .icon {
          // background-color: red;
          width: 18px;
          height: 12px;
          margin: 0 0 0 6px;
        }
      }
    }
  }

  & .hor_third_cell {
    display: flex;
    flex-direction: row;
    height: 64px;
    background: #407efa;

    & > div {
      justify-content: center;
      width: 33.3%;
      overflow: hidden;

      & .title {
        position: relative;
        color: rgba(255, 255, 255, 0.6);
        font-size: 10px;
        text-align: center;
        // padding: 2px auto;
        line-height: 14px;
      }

      & .value {
        position: relative;
        color: #ffffff;
        font-size: 18px;
        text-align: center;
        line-height: 25px;
        margin: 6px auto;
      }
    }

    & .ver_line {
      position: relative;
      width: 1px;
      height: 34px;
      margin-top: 6px;
      background: rgba(255, 255, 255, 0.35);
      flex-grow: 0;
    }
  }

  & .tip_content {
    display: flex;
    flex-direction: row;
    background: rgba(103, 154, 250, 1);
    min-height: 36px;
    align-items: center;

    & .icon {
      // background-color: red;
      position: relative;
      width: 20px;
      height: 20px;
      margin-left: 16px;
    }

    & .tips {
      position: relative;
      margin-left: 10px;
      margin-right: 34px;
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 10px;
      color: white;
      // background: yellow;
    }
  }

  & .feature_content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // padding-left: 17px;
    // padding-right: 17px;
    background: white;

    & .feature_view {
      display: flex;
      background: white;
      align-items: center;
      height: 46px;
      margin-left: 17px;
      margin-right: 17px;

      & .feature_icon {
        vertical-align: center;
        position: relative;
        width: 18px;
        height: 18px;
      }

      & .feature_text {
        vertical-align: center;
        position: relative;
        margin-left: 5px;
        font-size: 12px;
        color: #334354;
      }
    }
  }

  & .check_produce_detail {
    line-height: 38px;
    text-align: center;
    font-size: 12px;
    color: #abacb0;
    background: white;
    border-color: #f6f7f8;
    border-top-width: 1px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-style: solid;
    -webkit-tap-highlight-color: transparent;
  }

  & .rules_contentView {
    display: flex;
    flex-direction: column;
    background: white;
    padding-bottom: 21px;
    padding: 14px 16px 21px 16px;
    margin-top: 20px;
    & .rule_title_1 {
      position: relative;
      font-size: 14px;
      color: #334354;
      line-height: 21px;
    }

    & .rule_content_1 {
      position: relative;
      margin: 5px 0px 0px 0px;
      // font-size: 12px;
      color: #abacb0;
      // line-height: 21px;
    }

    & .rule_title_2 {
      position: relative;
      font-size: 14px;
      color: #334354;
      line-height: 21px;
      margin-top: 16px;
    }

    & .rule_content_2 {
      position: relative;
      margin: 5px 0px 0px 0px;
      // font-size: 12px;
      color: #abacb0;
      // line-height: 21px;
    }
  }

  & .bottom_content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 15px;
    padding-bottom: 30px;
    background: #f6f7f8;

    & .apply_button {
      position: relative;
      color: white;
      background: #4477dd;
      font-size: 16px;
      width: 270px;
      line-height: 44px;
      height: 44px;
      border-radius: 4px;
      border-style: none;
    }
  }

  /** 验证码弹窗 */
  & .d-content-phone {
    margin-top: 10px;
    text-align: left;
    // margin-bottom: 10px;
    & > span {
      font-size: 12px;
      color: #d0021b;
    }

    & .weui-input {
      margin-top: 12px;
      border: 1px solid #d6d6d6 !important;
      border-radius: 4px;
      height: 42px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  & .protocol-content {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    line-height: 21px;

    & .check-box-bg {
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 12px;
    }

    & .check-box {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }

    & .protocol-agreement {
      font-size: 12px;
      color: #a4a4a4;
      font-weight: 300;
      margin-left: 2px;
      line-height: 21px;
    }
  }

  & .weui-dialog__ft {
    padding-top: 0px !important;
  }

  & .d-content-sms {
    margin-top: 10px;
    text-align: left;
    // margin-bottom: 10px;
    & .verify-img {
      width: 100px;
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
      line-height: 42px;
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
      line-height: 40px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  /** picker View */
  & .area_btn_box {
    height: auto;
    background: #f6f7f8;
    & .larea_cancel {
      font-size: 20px;
      line-height: 28px;
      color: #abacb0;
      padding: 8px 21px;
      -webkit-tap-highlight-color: transparent;
    }
    & .larea_finish {
      font-size: 20px;
      line-height: 28px;
      color: #4477dd;
      padding: 8px 21px;
      -webkit-tap-highlight-color: transparent;
    }
  }
  & .area_roll_mask {
    background: white;
  }
}
</style>
