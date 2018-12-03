<!--  -->
<template>
  <div class="none-data-container" :style="{'height':isIphoneX()?'700px':'520px'}">

    <img class="none-img" src="/static/images/none_pic.png" />
    <span class="no-record-tip">暂无记录</span>
    <!-- <span class="apply-tip" v-on:click="apply">立刻申请</span> -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  components: {},

  computed: {},

  methods: {
    apply () {
      this.$emit('apply')
    }
  }
}
</script>
<style lang='postcss' scoped>
.none-data-container {
  padding-top: 48px;
  background: #F6F7F8;
  // height: 550px;
  & .none-img {
    height: 304px;
  }

  & .no-record-tip {
    width: 100%;
    position: absolute;
    font-size: 18px;
    color: #cfd2d9;
    top: 318px;
    text-align: center;
  }

  & .apply-tip {
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
    display: block;
    width: 270px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #4477dd;
    margin: 57px auto;
  }
}
</style>
