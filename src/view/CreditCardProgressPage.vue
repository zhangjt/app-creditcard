<template>
    <div class="bg">
        <!-- <slider-nav class="slider-nav-bg" :titleArray="titleArray" :currentTab.sync="currentTab"></slider-nav> -->
        <!-- <credit-card-progress v-if="currentTab === '0'"></credit-card-progress> -->
        <!-- <none-view-for-progress></none-view-for-progress> -->
        <credit-card-progress-query></credit-card-progress-query>

    </div>
</template>

<script>

import SliderNav from '@/components/common/SliderNav'
import CreditCardProgress from '@/components/CreditCardProgress'
import CreditCardProgressQuery from '@/components/CreditCardProgressQuery'
import NoneViewForProgress from '@/components/NoneViewForProgress.vue'

export default {
  data () {
    return {
      currentTab: '0',
      titleArray: ['我的进度', '进度查询']
    }
  },
  watch: {
    currentTab (newValue, oldValue) {
      scroll(0, 0)
    }
  },
  components: {
    SliderNav,
    CreditCardProgressQuery,
    CreditCardProgress,
    NoneViewForProgress

  }
}
</script>

<style lang="postcss" scoped>
.bg {
    width: 100%;
    height: 100%;
}

</style>
