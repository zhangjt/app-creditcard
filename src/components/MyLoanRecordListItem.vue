<!--  -->
<template>
  <div class="my-credit-card-record-list-item-container">
    <div class="my-credit-card-record-list-item">
      <span class="data-style">{{recordItem.addtime}}</span>
      <span class="bank-name-style">{{recordItem.p2p_name}}</span>
      <span class="check-in-account-style">{{recordItem.regAccount}}</span>
      <span class="fourth-style" v-if="isNeedAdd">已登录</span>
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
    },
    isNeedAdd:{
      type:Boolean
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
    & .bank-name-style{
      width:52px;
      overflow:hidden;
    }
  }
}
</style>