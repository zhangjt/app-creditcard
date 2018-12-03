<template>
    <div class="dialog-container" v-show="dialogVisible" >
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{dialogTitle}}</strong></div>
                <div class="weui-dialog__bd">
                    <slot></slot>
                </div>
                <div class="weui-dialog__ft">
                    <div @click="defaultClick" class="weui-dialog__btn weui-dialog__btn_default">{{defaultStr || "取消"}}</div>
                    <div @click="primaryClick" class="weui-dialog__btn weui-dialog__btn_primary">{{primaryStr || "确定"}}</div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  components: {},
  props: {
    dialogVisible: Boolean,
    dialogTitle: String,
    defaultStr: String,
    primaryStr: String
  },
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    defaultClick: function () {
      // 点击取消
      this.$emit('defaultClick')
    },
    primaryClick: function () {
      // 点击确定
      this.$emit('primaryClick')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="postcss" scoped>
.dialog-container {
  width: 100%;
  & .weui-dialog {
    border-radius: 10px;
    & .weui-dialog__hd {
      padding: 20px;
      & .weui-dialog__title {
        font-size: 20px;
        color: #353543;
        font-weight: 600;
      }
    }

    & .weui-dialog__ft {
      padding: 20px;

      & .weui-dialog__btn_default {
        background: #c8c9ce;
        font-size: 18px;
        color: #ffffff;
        line-height: 40px;
        height: 40px;
        border-radius: 4px;
      }

      & .weui-dialog__btn_primary {
        background: #4477dd;
        font-size: 18px;
        color: #ffffff;
        line-height: 40px;
        height: 40px;
        border-radius: 4px;
        margin-left: 27px;
      }
    }
    & .weui-dialog__ft:after {
      border: none;
    }

    & .weui-dialog__btn:after {
      border: none;
    }
  }
}
</style>
