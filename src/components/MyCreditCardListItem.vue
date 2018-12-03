<!--  -->
<template>
  <div class="my-credit-card-rebate-list-container">
    <span class="bank-name-style">{{myCreditCardItem.bankName}}</span>
    <div class="money-txt-container">
      <span class="money-txt-sytle">{{myCreditCardItem.rebate|moneyFormal2}}</span>
      <span class="money-unit-style">元</span>
    </div>
    <span class="phone-txt-style">{{myCreditCardItem.phone}}</span>
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
    
  },

  props: {
    myCreditCardItem: {
      type: Object
    }
  }
};
</script>
<style lang='postcss' scoped>
.my-credit-card-rebate-list-container {
  background: #ffffff;
  height: 110px;
  border-bottom: 1px solid #ececec;
  position: relative;
  & .bank-name-style {
    font-size: 16px;
    color: #1c1b3f;
    position: absolute;
    left: 27px;
    top: 19px;
  }

  & .money-txt-container {
    position: absolute;
    left: 27px;
    top: 45px;
    color: #ff6c04;

    & .money-txt-sytle {
      font-size: 32px;
    }
    & .money-unit-style {
      font-size: 14px;
    }
  }

  & .phone-txt-style {
    position: absolute;
    right: 23px;
    top: 63px;
    font-size: 12px;
    color: #1c1b3f;
  }
}
</style>