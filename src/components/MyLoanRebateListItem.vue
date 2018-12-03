<template>
  <div class="my-loan-rebate-container">
    <div class="my-loan-rebate-content">
      <span class="plat-name-style">{{myLoanRebateItem.platName}}</span>
      <div class="money-txt-container">
        <span class="money-txt-style">{{myLoanRebateItem.rebateMoney|moneyFormal2}}</span>
        <span class="unit-style">元</span>
      </div>
      <span class="detail-style">{{getLoanExplain()}}</span>
    </div>

    <span class="result-tip">{{isOver()}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  components: {},

  computed: {},

  methods: {
    isOver() {
      var status = this.myLoanRebateItem.status;
      if (status == 0) {
        return "贷款平台审核不通过";
      } else if (status == 1) {
        return "通过";
      }
    },
    getLoanExplain() {
      var loanType = "";
      var type = this.myLoanRebateItem.type;
      if (type == 0) {
        loanType = "首贷";
      } else if (type == 1) {
        loanType = "复贷";
      }

      var date = this.formatDate(this.myLoanRebateItem.loanDate, "yyyy-MM-dd");

      return (
        date + loanType + this.moneyFormal(this.myLoanRebateItem.loan) + "元"
      );
    },

    formatDate(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }

      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      return fmt;
    },

    padLeftZero(str) {
      return ("00" + str).substr(str.length);
    }
  },
  props: {
    myLoanRebateItem: {
      type: Object
    }
  }
};
</script>
<style lang='postcss' scoped>
.my-loan-rebate-container {
  border-top: 0px;
  border-bottom: 10px solid #f6f7f8;
  & .my-loan-rebate-content {
    height: 130px;
    background: #ffffff;
    padding-left: 27px;
    padding-top: 15px;
    border-bottom: 1px solid #ececec;
    & .plat-name-style {
      font-size: 16px;
      color: #1c1b3f;
    }

    & .money-txt-container {
      margin-top: 9px;
      & .money-txt-style {
        font-size: 32px;
        color: #ff6c04;
      }

      & .unit-style {
        font-size: 14px;
        color: #ff6c04;
      }
    }

    & .detail-style {
      margin-top: 8px;
      font-size: 12px;
      color: #1c1b3f;
    }
  }

  & .result-tip {
    display: block;
    margin-left: 27px;
    font-size: 12px;
    color: #878da0;
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>