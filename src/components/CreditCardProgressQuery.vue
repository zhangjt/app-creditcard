<template>
    <div class="bg" v-title="'进度查询'">
      <p class="top-tip">请选择申卡银行查询办卡进度</p>
      <div class="content-bg" v-if="list.length > 0" >
        <div v-for="item in list" :key="item.id">
          <div class="cell" @click="cellOnClick(item.link, item.type)">
            <img class="cell-img" :src="item.icon"/>
            <p class="cell-text">{{ item.bankName }}</p>
          </div>
        </div>
      </div>
        <toast :showToast.sync="toastShow" :toastContent="toastContent" @dismiss="dismiss"></toast>
    </div>
</template>
<script>
import Toast from '@/components/Toast'
export default {
  data () {
    return {
      toastShow: false,
      toastContent: '',
      list: [],
      list2: []
    }
  },
  methods: {
    cellOnClick (link, type) {
      // 内链
      if (type === 0) {
        this.ToAppPage(link, null, false)
      } else {
        // 外链
        this.ToBrowserFromAppPage(link)
      }
    },
    loadDataCallBack (res) {
      if (res.isSuccess === 0) {
        // this.showToast(res.responseData.page.list)
        this.list = res.responseData.page.list
      } else {
        this.showToast(res.responseData)
      }
    },
    showToast (content) {
      if (content.length === 0) return
      this.toastShow = true
      this.toastContent = content
    }
  },
  comments: {

  },
  computed: {

  },
  components: {
    Toast
  },
  dismiss () {
    this.toastShow = false
  },
  created () {
    window.loadDataCallBack = this.loadDataCallBack

    this.GeneralGetData({
      url: '/creditCardProgress/getList',
      reqData: { limit: 100000 },
      callback: 'loadDataCallBack'
    })
  }

}
</script>

<style lang="postcss" scoped>
.bg {
    min-height: 667px;
    background-color: #F6F7F8;
}
.top-tip {
  padding-left: 7px;
  display: block;
  color: #878DA0;
  font-size: 12px;
  height: 46px;
  width: 100%;
  line-height: 46px;
}
.content-bg {
  padding-left: 15px;
  background-color: white;
  width: 100%;
  height: auto;
  padding-top: 5px;
  padding-bottom: 20px;
  position: relative;
  display: flex;
  flex-wrap: wrap;

}
.cell {
  -webkit-tap-highlight-color: transparent;
  margin-top: 15px;
  margin-left: 0px;
  width: 86px;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cell-img {
  width: 42px;
  height: 42px;
  border-radius: 21px;
}
.cell-text {
  margin-top: 10px;
  color: #1C2042;
  font-size: 12px;
  line-height: 17px;
}
</style>
