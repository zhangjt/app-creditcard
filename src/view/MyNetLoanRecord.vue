<!--  -->
<template>
  <div class="my-credit-card-record-container">
    <div class="my-credit-card-record-title">
      <span class="data-tip-style">登记日期</span>
      <span class="bank-tip-style">平台</span>
      <span class="check-in-tip-style">登记账号</span>
      <span class="check-in-tip-style">奖励状态</span>
    </div>
    <div class="empty" v-if="empty"><img src="/static/images/empty_wap.png" alt=""></div>
    <div class="content-style" v-if="!empty" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">

      <my-loan-record-list-item  v-for="(myLoanRecord,index) in loanRecordList" :key="index" :recordItem="myLoanRecord" :isNeedAdd="true"></my-loan-record-list-item>
      <div v-show="isLoadMore" class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
      
    </div>
    </div>

  </div>
</template>

<script>
import MyLoanRecordListItem from "@/components/MyLoanRecordListItem.vue";

export default {
  data() {
    return {
      empty:false,
      loanRecordList: [],
      busy: false,
      page: 0,
      isLoadMore: false
    };
  },
  created() {
    window.loadRecordCallBack = this.loadRecordCallBack;
  },
  components: {
    MyLoanRecordListItem
  },

  computed: {},

  mounted() {},

  methods: {
    loadMore: function() {
      this.page++;
      this.busy = true;
      this.isLoadMore = true;
      this.GeneralGetData({
        url: "/app/addreg/record",
        reqData: { type: 1, page: this.page, limit: 11 },
        callback: "loadRecordCallBack"
      });
    },
    loadRecordCallBack(res) {

      if (res.isSuccess == 0) {
        if (res.responseData.count == 0) {
          this.busy = true;
          this.isLoadMore = false;
          this.empty=true;  //没有数据,显示缺省图
          return;
        }

        // alert(this.page);
        this.loanRecordList = this.loanRecordList.concat(
          res.responseData.list
        );
        if (this.loanRecordList.length < res.responseData.count) {
          this.busy = false;
        }
        this.isLoadMore = false;
        // alert("finish" + this.loanRecordList.length);
      } else {
        this.busy = true;
        this.isLoadMore = false;
        alert(res.responseData);
      }
    }
  }
};
</script>
<style lang='postcss' scoped>
.my-credit-card-record-container {
  & .my-credit-card-record-title {
    background-color: #fbfbfb;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 25px;
    padding-right: 25px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #878da0;
    line-height: 32px;

    width: 100%;
    position: fixed;
    z-index: 1;

    & .data-tip-style {
    }

    & .bank-tip-style {
    }

    & .check-in-tip-style {
    }
  }

  & .content-style {
    position: absolute;
    top: 32px;
    right: 0px;
    left: 0px;
  }
}
.empty{
  width: 100%;
  & img{
    display: block;
    width: 100%;
  }
}
</style>