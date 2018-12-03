<template>
    <div class="sliderNav-bg-View">
        <div class="swiper-bg-view">
          <div  :class="index == currentTab ? 'swiper-tab-item-selected' : 'swiper-tab-item'" v-for="(item, index) in titleArray" :key="index"   class="swiper-tab-item" :data-current="index" @click="swichNav">{{item}}</div>
        </div>
        <div class="swiper-tab-bg">
        <div class="swiper-tab-line" :style="style"></div>
        <div class="swiper-tab-bottomLine"></div>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  props: {
    titleArray: {
      type: Array
    },
    menuWidth: {
      type: Number,
      default: 130
    },
    currentTab: {
      type: String,
      default: '0'
    },
    font: {
      type: Number,
      default: 28
    }
  },

  methods: {

    swichNav (e) {
      const { current } = e.target.dataset
      if (this.currentTab === current) return
      this.$emit('update:currentTab', current + '')
    },

    obj2Style2 (style) {
      let str = []
      Object.keys(style).forEach(key => {
        str.push(`${key}:${style[key]};`)
      })
      return str.join(';')
    }
  },

  computed: {
    style () {
      let marginLeft = 100 * 0.125
      let menuWidth = 100 * 0.5
      let marginCenter = 0
      var width = 100 * 0.25
      let left = (marginLeft + (menuWidth + marginCenter) * this.currentTab) + 'vw'
      width = width + 'vw'
      let style = {
        left,
        width
      }
      return this.obj2Style2(style)
    }
  },
  created () {

  }

}
</script>

<style scoped lang='postcss'>
.sliderNav-bg-View {
    width: 100%;
    height: 46px;
    background: white;
    position: fixed;
    z-index: 100;
}

  .swiper-bg-view {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
.swiper-tab-item {
  display: block;
  width: 50%;
  text-align: center;
  transition: all 0.2s;
  color: #1C1B3F;
  position: relative;
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;

}
.swiper-tab-item-selected {
  display: block;
  width: 50%;
  text-align: center;
  transition: all 0.2s;
  color: #649AFE;
  position: relative;
  font-size: 16px;
  // font-weight: bold;
  -webkit-tap-highlight-color: transparent;
}
.swiper-tab-bg {
  background-color: white;
}
.swiper-tab-line {
  margin-left: 0px;
  display: block;
  height: 2px;
  background: #649AFE;
  bottom: 0px;
  transition: left 0.2s;
  z-index: 99;
  position: relative;
  border-radius: 1.5px;
}

.swiper-tab-bottomLine {
    width: 100%;
    height: 1px;
    background: #e6e6e6;
  }
</style>
