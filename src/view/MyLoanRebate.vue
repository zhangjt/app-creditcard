<!--  -->
<template>
  <div class="my-loan-rebate-container">
    <div v-show="myLoanrebateLit.length>0">
      <div class="my-loan-rebate-title">
        <span class="date-tip">截止{{dueDate}}</span>
        <span class="reward-tip-up">{{totalRebateMoney|moneyFormal2}}</span>
        <span class="reward-tip-dowm">总奖励(元)</span>
      </div>

      <div class="loan-rebate-tip">
        <img src="/static/images/point_out.png" />
        <span>
          返利记录将在每周到账后更新数据<br/>返利金额发放至您的钱包余额，请在钱包余额里面申请提现
        </span>
      </div>

      <div class="loan-rebate-title">
        <span>
          贷款返利
        </span>
        <img src="/static/images/group.png" />
      </div>

      <div class="loan-rebate-rebate-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <my-loan-rebate-list-item v-for="(dataItem,index) in myLoanrebateLit" :key="index" :myLoanRebateItem="dataItem"></my-loan-rebate-list-item>
      </div>
      <div v-show="isLoadMore" class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
      <!-- <div  class="weui-loadmore weui-loadmore_line">
      <span class="weui-loadmore__tips">暂无数据</span>
    </div> -->
    </div>

    <none-view v-show="afterLoad && myLoanrebateLit.length<=0" v-on:apply="apply"></none-view>

    <toast :showToast.sync="toastShow" :toastContent="toastContent" @dismiss="dismiss"></toast>

  </div>
</template>

<script>
import MyLoanRebateListItem from "@/components/MyLoanRebateListItem.vue";
import NoneView from "@/components/NoneView.vue";
import Toast from "@/components/Toast";

export default {
  data() {
    return {
      totalRebateMoney: "--/--",
      dueDate:"--/--",
      myLoanrebateLit: [],
      busy: false,
      page: 0,
      isLoadMore: false,
      afterLoad: false,
      toastShow: false,
      toastContent: "",
      isRefresh: false
    };
  },
  created() {
    window.loadDataCallBack = this.loadDataCallBack;
  },
  components: {
    MyLoanRebateListItem,
    NoneView,
    Toast
  },

  computed: {},

  methods: {
    dismiss: function() {
      this.toastShow = false;
    },
    showToast: function(content) {
      this.toastContent = content;
      this.toastShow = true;
    },
    apply() {
      if (this.isiOS() || this.isAndroid()) {
        this.ToAppPage("/loanIndex", "", true);
      }
    },
    loadMore: function() {
      this.page++;
      this.busy = true;
      this.isLoadMore = true;

      this.GeneralGetData({
        url: "/app/loan/rebate/record/user",
        reqData: { page: this.page, limit: 10 ,tag:"myloan"},
        callback: "loadDataCallBack"
      });
    },
    loadDataCallBack(res) {
      this.afterLoad = true;
      if (res.isSuccess == 0) {
        if (this.isRefresh) {
          this.myLoanrebateLit = [];
          this.isRefresh = !this.isRefresh;
        }

        if (res.responseData.page.totalNum == 0) {
          this.busy = true;
          this.isLoadMore = false;
          return;
        }
        this.totalRebateMoney = res.responseData.sumRebate;
        this.dueDate = res.responseData.system_time.substring(0, 10);

        this.myLoanrebateLit = this.myLoanrebateLit.concat(
          res.responseData.page.list
        );
        if (this.myLoanrebateLit.length < res.responseData.page.totalNum) {
          this.busy = false;
        }
        this.isLoadMore = false;
      } else {
        this.busy = true;
        this.isLoadMore = false;
        this.showToast(res.responseData);
      }
    },
    refresh() {
      this.page = 0;
      this.afterLoad = false;
      this.isRefresh = !this.isRefresh;
      this.loadMore();
    }
  }
};
</script>
<style lang='postcss' scoped>
.my-loan-rebate-container {
  background: #fbfbfb;
  border-top: 10px solid #f6f7f8;
  & .my-loan-rebate-title {
    
    height: 135px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    & .reward-tip-up {
      font-size: 36px;
      color: #1c2042;
      text-align: center;
      margin-top: 40px;
    }

    & .reward-tip-dowm {
      font-size: 12px;
      color: #878da0;
      text-align: center;
    }

    & .date-tip {
      position: absolute;
      top: 18px;
      right: 15px;
      font-size: 10px;
      color: #878da0;
    }
  }

  & .loan-rebate-tip {
    position: relative;
    height: 46px;
    & img {
      position: absolute;
      width: 20px;
      height: 20px;
      left: 28px;
      top: 14px;
    }

    & span {
      font-size: 10px;
      color: #878da0;
      position: absolute;
      left: 56px;
      top: 8px;
    }
  }

  & .loan-rebate-title {
    height: 50px;
    background: #ffffff;
    & span {
      display: block;
      height: 40px;
      background: #649afe;
      color: #ffffff;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
    }

    & img {
      top: 230px;
      position: absolute;
      height: 10px;
      width: 14px;
      margin-left: 50%;
      margin-right: 50%;
    }
  }

  & .loan-rebate-rebate-list {
  }
}
</style>