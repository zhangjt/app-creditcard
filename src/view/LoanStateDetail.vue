<template>
  <div class="loan-state-detail" v-title="title">
    <!-- 贷款流程 -->
    <loans-detail-item :title="flowTitle" :details="loanDetail.flow"></loans-detail-item>
    <!-- 费用说明 -->
    <loans-detail-item :title="costTitle" :details="loanDetail.cost"></loans-detail-item>
    <!-- 还款说明 -->
    <loans-detail-item :title="Title"></loans-detail-item>
    <!-- 还款方式 -->
    <loans-detail-item :title="repaymentTitle" :details="loanDetail.repayment"></loans-detail-item>
    <!-- 提前还款 -->
    <loans-detail-item :title="prepaymentTitle" :details="loanDetail.prepayment"></loans-detail-item>
    <!-- 逾期政策 -->
    <loans-detail-item :title="overdueTitle" :details="loanDetail.overdue"></loans-detail-item>
  </div>
</template>

<script>
import http from "@/utils/http";
import LoansDetailItem from "@/components/LoansDetailItem";
export default {
  data() {
    return {
      loanDetail: {},
      flowTitle: "<b>贷款流程</b>",
      flow:
        "<ul><li>1、提交申请</li><li>2、绑银行卡</li><li>3、机构审批</li><li>4、确定贷款</li></ul>",
      costTitle: "<b>费用说明</b>",
      Title: "<b>还款说明</b>",
      repaymentTitle: "还款方式：",
      prepaymentTitle: "提前还款：",
      overdueTitle: "逾期政策："
    };
  },
  components: {
    LoansDetailItem
  },
  created() {
    if (!this.isPC()) {
      this.loanDetail = this.getQuery("query");
    } else {
      this.loanDetail = this.$route.query;
    }

    this.title = "产品详情";
    this.getLoanDetail();
    // console.log(this.loanDetail);
    // this.flowTitle =
  },
  computed: {},

  mounted() {},

  methods: {
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
      });
    }
  }
};
</script>
<style lang='postcss' scoped>
.loan-state-detail {
  padding: 10px 16px;
}
</style>
