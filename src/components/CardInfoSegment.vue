<template>
     <div class="base-info" v-if="htmlContent">
            <div> <img :src="imgSrc"> <span class="desc">{{desc}}</span></div>
            <div v-html="htmlContent"></div>
        </div>
</template>

<script>
export default {
  components: {},
  props: {
    htmlContent: String,
    imgSrc: String,
    desc: String
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="postcss" scoped>
    .base-info {
    border-top: 8px solid #f6f7f8;

    & > div{
      padding: 15px 23px;
    }
    & > :nth-child(2){
        border-top:1px solid #f6f7f8
    }

    & > :nth-child(1) {
      display: flex;
      align-items:center;
      justify-content: flex-start;
      & > img {
        width: 20px;
        height: 20px;
      }
      & .desc {
        font-size: 14px;
        color: #1c2042;
        line-height: 20px;
        margin-left: 5px;
        font-weight: bold;
      }
    }
  }
</style>
