<!--  -->
<template>
  <div class="my-loan-record-container">

    <div v-show="creditCardRecordList.length>0">
      <div class="my-loan-record-title">
        <span class="data-tip-style">登记日期</span>
        <span class="bank-tip-style">贷款平台</span>
        <span class="check-in-tip-style">登记账号</span>
      </div>

      <div class="content-style" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">

        <my-credit-card-record-list-item v-for="(myCreditCard,index) in creditCardRecordList" :key="index" :recordItem="myCreditCard"></my-credit-card-record-list-item>
        <div v-show="isLoadMore" class="weui-loadmore">
          <i class="weui-loading"></i>
          <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <!-- <div  class="weui-loadmore weui-loadmore_line">
      <span class="weui-loadmore__tips">暂无数据</span>
    </div> -->
      </div>
    </div>

    <none-view v-show="afterLoad && creditCardRecordList.length<=0" v-on:apply="apply"></none-view>
    <toast :showToast.sync="toastShow" :toastContent="toastContent" @dismiss="dismiss"></toast>
  </div>
</template>

<script>
import MyCreditCardRecordListItem from "@/components/MyCreditCardRecordListItem.vue";
import NoneView from "@/components/NoneView.vue";
import Toast from "@/components/Toast";

export default {
  data() {
    return {
      creditCardRecordList: [],
      busy: false,
      page: 0,
      isLoadMore: false,
      noData: false,
      afterLoad: false,
      toastShow: false,
      toastContent: ""
    };
  },
  created() {
    window.loadRecordCallBack = this.loadRecordCallBack;
  },
  components: {
    MyCreditCardRecordListItem,
    NoneView
  },

  computed: {},

  mounted() {},

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
        url: "/app/addreg/record",
        reqData: { type: 4, page: this.page, limit: 10 },
        callback: "loadRecordCallBack"
      });
    },
    loadRecordCallBack(res) {
      this.afterLoad = true;
      if (res.isSuccess == 0) {
        if (res.responseData.count == 0) {
          this.busy = true;
          this.isLoadMore = false;
          return;
        }

        this.creditCardRecordList = this.creditCardRecordList.concat(
          res.responseData.list
        );
        if (this.creditCardRecordList.length < res.responseData.count) {
          this.busy = false;
        }
        this.isLoadMore = false;
      } else {
        this.busy = true;
        this.isLoadMore = false;
        this.showToast(res.responseData);
      }
    }
  }
};
</script>
<style lang='postcss' scoped>
.my-loan-record-container {
  & .my-loan-record-title {
    background-color: #fbfbfb;
    border-top: 10px solid #f6f7f8;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 25px;
    padding-right: 25px;
    height: 42px;
    display: flex;

    font-size: 12px;
    color: #878da0;
    line-height: 32px;

    width: 100%;
    position: fixed;
    z-index: 1;

    & .data-tip-style {
      width: 33%;
      text-align: left;
    }

    & .bank-tip-style {
      width: 33%;
      text-align: center;
    }

    & .check-in-tip-style {
      width: 33%;
      text-align: right;
    }
  }

  & .content-style {
    position: absolute;
    top: 42px;
    right: 0px;
    left: 0px;
  }
}
</style>
