<template>
  <div class="home-wrap" v-title="'信用卡'">
    <!-- 首页轮播图 -->
    <div class="home-banner" v-if="imgShow">
      <div v-if="banner.length==1" class="single-image">
        <div v-if="banner[0].url==''"><img :src="banner[0].image"></div>
        <div v-else>
          <div v-if="banner[0].type==0" class="nei">
            <div @click="addClick(banner[0])"><img :src="banner[0].image"></div>
          </div>
          <div v-else class="wai">
            <div @click="addClick(banner[0])"><img :src="banner[0].image"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <swiper :options="swiperOption" ref="homebanner">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in banner" :key="index">
            <div v-if="item.url==''"><img :src="item.image"></div>
            <div v-else>
              <div v-if="item.type==0" class="nei">
                <div><img :src="item.image"></div>
              </div>
              <div v-else class="wai">
                <div><img :src="item.image"></div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 办卡查询 -->
    <div class="iconfont icon-Group" @click="toCardProgress" v-if="imgShow">快速查询 办卡进度<b class="iconfont icon-arrow_left"></b></div>
    <!-- 银行tab轮播图 -->
    <div class="bank-banner" v-if="bankListShow">
      <div v-if="bank.length==1" class="bankList">
        <div class="bank" v-for="(one,index) in bank[0].list" :key="index" @click="bankDetail(one)">
          <img :src="one.icon" alt="">
          <div class="title">{{one.name}}</div>
          <div class="rebate">返{{one.rebate|moneyFormal}}元</div>
        </div>
      </div>
      <swiper v-else :options="swiperOption_bank" ref="bank">
        <swiper-slide v-for="(item,index) in bank" :key="index">
          <div class="bankList">
            <div class="bank" v-for="(one,index) in item.list" :key="index" @click="bankDetail(one)">
              <img :src="one.icon" alt="">
              <div class="title">{{one.name}}</div>
              <div class="rebate" v-if="!one.rebate==''">返{{one.rebate|moneyFormal}}元</div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 信用卡列表 -->
    <card-title title="热门信用卡" v-if="cardListShow"></card-title>
    <div class="cardWrap">
      <div v-if="cardListShow">
        <card-list :card="item" v-for="(item,index) in cardList" :key="index"></card-list>
      </div>
      <div v-if="isEmpty" class="empty"><img src="~@/assets/images/empty_wap.png" alt=""></div>
    </div>
    <div>
      <div v-if="isLoad" class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
    </div>
  </div>
</template>
<script>
let vm = null;
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import cardTitle from '@/components/common/cardTitle'
import cardList from '@/components/common/cardList'
import http from '@/utils/http'
import { accessUrl, baseUrl } from '@/utils/env'
export default {
  name: 'home',
  components: {
    swiper,
    swiperSlide,
    cardTitle,
    cardList
  },
  data() {
    return {
      uid: '',
      imgShow: false,
      isEmpty: false,
      cardListShow: false,
      isLoad: true,
      bankListShow: false,
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        autoplay: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: -55, // slide左右距离
          depth: 400, // slide前后距离
          modifier: 0.5, //
          slideShadows: false // 滑块遮罩层
        },
        loop: true, //loop模式下slides前后会复制若干个slide，从而形成一个环路，但是却不会复制绑定在dom上的click事件
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper

        // 点击事件，避免在dom上绑定事件时，loop复制的dom无点击事件
        on: {
          click: function() {
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            // console.log(this); // -> Swiper
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          }
        }
      },
      swiperOption_bank: {
        pagination: { el: '.swiper-pagination' },
        effect: 'coverflow',
        grabCursor: true,
        autoplay: false, //不自动
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: -55, // slide左右距离
          depth: 100, // slide前后距离
          modifier: 0.5, //
          slideShadows: false // 滑块遮罩层
        },
        loop: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        // on: {
        //   click: function () {
        //     const realIndex = this.realIndex;
        //     vm.handleClickSlideBank(realIndex);
        //   }
        // }
      },
      bannerList: [],
      bankList: [],
      cardList: []
    }
  },
  computed: {
    banner() {
      return this.bannerList
    },
    bank() {
      return this.bankList
    }
  },
  created() {
    vm = this;
    this.getBanner()
    this.getBankList()
    this.getCardList();
    // uid
    top.window.getUserUidCallBack = this.getUserUidCallBack

  },
  methods: {
    // 判断是否登录
    getUserUidCallBack: function(uid) {
      console.log(uid)
      if (uid) {
        console.log("已登录,用户id:" + uid);
        this.uid = uid;

        var protocol = window.location.protocol
        var host = window.location.host
        var root = protocol + '//' + host + '/'
        let url = root + 'wap/cardmarket/creditCardProgressPage'
        //内链
        this.ToAppPage(url)

      } else {
        console.log("未登录")
        // 跳转到登录页面
        let url = '/home/loginActivity'; //快捷登录界面
        this.ToAppPage(url, '', true)
      }
    },
    //办卡进度跳转
    toCardProgress() {
      if (!this.isPC()) {
        this.GetUserID();

      } else {

        this.$router.push({ name: 'creditCardProgressPage' })
      }
    },
    handleClickSlide(index) {
      let item = this.bannerList[index];
      this.addClick(item)
    },
    addClick(item) {
      if (!this.isPC()) {
        if (item.type === 0) {
          //内链
          this.clickNum(item.id);
          this.ToAppADWebPage(item.url, item);
        } else {
          this.clickNum(item.id);
          this.ToBrowserFromAppPage(item.url)
        }
      } else {
        this.clickNum(item.id);
        window.open(item.url, '_self');
      }
    },
    // 跳转去银行详情
    bankDetail(one) {
      if (!this.isPC()) {
        var protocol = window.location.protocol
        var host = window.location.host
        // var hash  = window.location.hash;
        var root = protocol + '//' + host + '/'
        let url = root + 'wap/cardmarket/bankInfo'
        this.ToAppPage(url, one)

      } else {
        this.$router.push({ name: 'BankInfo', query: one })
      }
    },
    // getData-start
    getBanner() {
      let json = {
        position: 11
      }
      http.postWithoutCode('/web/banner/list', json).then((res) => {
        this.bannerList = res.list
        this.imgShow = true
      })
    },

    getCardList() {
      let json = {
        page: 1,
        limit: 100
      }
      http.postWithoutCode('/creditCard/getList', json).then((res) => {
        this.isLoad = false;
        if (res.page.list.length > 0) {
          this.cardList = res.page.list
          this.cardListShow = true;

        } else {
          this.cardListShow = false;
          this.isEmpty = true;

        }
      })
    },

    getBankList() {
      let json = {
        page: 1,
        limit: 100
      }
      http.postWithoutCode('/bank/getBankList', json).then((res) => {
        // http.getLocal('/static/json/bankList.json').then((res)=>{
        let l = res.bankList.list

        let newObject = this.recalObject(l, 8) // 每8个分类
        // console.log(JSON.stringify(newObject));

        this.bankList = newObject
        if (newObject.length != 0) {
          this.bankListShow = true
        }

      })
    },
    // getData-end

    HandleDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    HandleResult() {
      this.isShowResult = !this.isShowResult
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.home-wrap {
  background-color: #F6F7F8;
  & .home-banner {
    background: #fff;
    margin-top: 10px;
  }

  & .icon-Group {
    position: relative;
    color: #878DA0;
    font-size: 12px;
    padding-left: 20px;
    background: #F6F7F8;
    height: 37px;
    display: flex;
    align-items: center;

    & .icon-arrow_left{
      font-size: 16px;
      position: absolute;
      color: #C6C6C6;
      right: 20px;
    }
  }
  & .icon-Group:before {
    padding-right: 6px;
    color: #6B3AE3;
    font-size:20px;
  }
}

.home-header {
  width: 100%;
  position: fixed;
  top: 0;
}

.single-image {
  border-radius: 8px;
  overflow: hidden;
  margin: 0px 10px 0;

  & img {
    width: 100%;
    display: block;
  }
}

.home-swipe {
  height: 115px;
}

.swiper-container {
  z-index: 0;
  margin: 0;
  padding: 4px 0;
}

.swiper-slide {
  width: 315px;
  height: 112px;
}

[slide-block] {
  width: 315px;
  height: 112px;
}

.swiper-slide img {
  display: block;
  margin: 0 auto;
  margin-top: 2%;
  width: 92%;
  height: 92%;
  vertical-align: middle;
  transition: all 1s ease 0s;
  box-shadow: 0px 0px 4px #888888;
  border-radius: .3rem;
}

.swiper-slide-active img {
  margin-top: 0;
  width: 100%;
  height: 100%;
}

.home-top {
  background-color: #fff;
  /* margin-bottom: 15px; */
}

.home-nav {
  display: flex;
  padding: 15px 0;
  font-size: 12px;
}




/*bank*/

.bank-banner {
  background: #fff;
  margin-bottom: 12px;
  & .bankList {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 4%;
    /* justify-content:center; */
    & .bank {
      width: 23%;
      margin: 10px 0px 4px;
      position: relative;
      & img {
        display: block;
        margin: 0 auto;
        margin-top: 0;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        vertical-align: middle;
        transition: all 1s ease 0s;
        box-shadow: none;
      }
      & .title {
        font-size: 12px;
        color: #1C2042;
        width: 100%;
        height: 22px;
        /*overflow:hidden;*/
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        margin-top: 6px;
      }
      & .rebate {
        position: absolute;
        top: 0;
        right: -6px;
        font-size: 10px;
        background: #FF534F;
        color: #fff;
        padding: 0 4px;
        border-radius: 10px;
      }
    }
  }
  & .swiper-container {
    z-index: 0;
    margin: 0;
    padding: 4px 0;
    & .swiper-pagination {
      & .swiper-pagination-bullet {
        //width:10px;
        //background-color:red;
      }
    }
  }
  & .swiper-slide {
    width: 100%;
    height: 205px;
  }
  & [slide-block] {
    width: 345px;
    height: auto;
  }
}

.cardWrap {
  background: #fff;
}

.empty {
  width: auto;
  margin: 0px 20px;
  & img {
    width: 100%;
  }
}

</style>
