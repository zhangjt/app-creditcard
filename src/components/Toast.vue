<template>
   <div id="toast" v-show="showToast">
          <div class="weui-mask_transparent"></div>
          <div class="weui-toast">
              <p class="weui-toast__content">{{toastContent}}</p>
          </div>
        </div>
</template>

<script>
export default {
  components: {},
  props: {
    showToast: Boolean,
    toastContent: String
  },
  data() {
    return {};
  },
  watch: {
    showToast: function() {
      if (this.showToast) {
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.$emit("dismiss");
        }, 1800);
      }
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="postcss" scoped>
.weui-toast {
  min-height: 10px;
  padding: 10px;
  margin-left: -25%;
  width: 50%;
}
.weui-toast__content {
  margin: 0px;
}
</style>
