<template>
    <div class="bg">
        <div v-for="(item, index) in array" :key="item.id">
            <div class="cell-bg" @click="cellBgOnClick(index)">
                <img class="img" :src="item.icon">
                <div class="content">
                    <p class="name">{{item.name}}</p>
                    <p class="time">{{item.time}}</p>
                </div>
                <img class="img-arrow" src="static/images/icon_enter_default.png">
            </div>
            <div class="bottom-line" v-if="index !== array.length - 1"></div>
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      array: [
        {
          id: 0,
          icon: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1535082762&di=b1d9e5d04fa61789b111278b01c56267&src=http://tva3.sinaimg.cn/crop.18.0.1205.1205.1024/006BpoJmjw8f9jhs9bd00j30yi0xhwgb.jpg',
          name: '哈哈哈哈',
          time: '2018-07-14  12:00:00'
        },
        {
          id: 1,
          icon: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1535082762&di=b1d9e5d04fa61789b111278b01c56267&src=http://tva3.sinaimg.cn/crop.18.0.1205.1205.1024/006BpoJmjw8f9jhs9bd00j30yi0xhwgb.jpg',
          name: '哈哈哈哈2',
          time: '2018-07-14  12:00:00'
        }
      ]
    }
  },
  methods: {
    cellBgOnClick (index) {
      console.log('index' + index)
    }
  },
  computed: {
  },

  components: {

  },
  created () {

  }
}
</script>

<style lang="postcss" scoped>

.bg {
    padding-top: 48px;
    min-height: 667px;
    background-color: #F6F7F8;
}
.cell-bg {

    display: flex;
    align-items: center;
    background-color: white;
    height: 65px;
    width: 100%;
    position: relative;
}
.img {
    margin-left: 28px;
    width: 42px;
    height: 42px;
}

.content {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
}
.name {
    margin-left: 14px;
    font-size: 14px;
    color:#1C2042;

}
.time {
    margin-left: 14px;
    font-size: 12px;
    color:#A4A4A4 ;
}
.bottom-line {
    margin-left: 20px;
    margin-right: 20px;
    height: 0.5px;
    background-color: #DCDCDC;
}
.img-arrow {
    left: 150px;
    width: 7px;
    height: 14px;
    position: relative;
}

</style>
