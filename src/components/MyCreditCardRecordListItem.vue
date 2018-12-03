<!--  -->
<template>
  <div class="my-credit-card-record-list-item-container">
    <div class="my-credit-card-record-list-item">
      <span class="data-style">{{recordItem.addtime}}</span>
      <span class="bank-name-style">{{recordItem.p2p_name}}</span>
      <!-- <span class="bank-name-style">即使点击发货速度回复范德萨发生的发生水淀粉糊</span> -->
      <span class="check-in-account-style">{{recordItem.regAccount}}</span>
    </div>

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

  methods: {},

  props: {
    recordItem: {
      type: Object
    }
  }
};
</script>
<style lang='postcss' scoped>
.my-credit-card-record-list-item-container {
  & .my-credit-card-record-list-item {
    border-bottom: 1px solid #e6e6e6;
    padding-left: 25px;
    padding-right: 25px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #1c1b3f;
    line-height: 36px;

    & .data-style {
      width: 33%;
      text-align: left;
    }

    & .bank-name-style {
      width: 33%;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
    }

    & .check-in-account-style {
      width: 33%;
      text-align: right;
    }
  }
}
</style>