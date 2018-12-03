<template>
  <div class="home-wrap">
    <div class="loan-top" v-if="imgShow">
      <div class="home-banner" v-if="imgShow">
        <div v-if="banner.length==1" class="single-image">
          <div @click="addClick(banner[0])"><img :src="banner[0].image"></div>
        </div>
        <div v-else>
          <swiper :options="swiperOption" ref="homebanner" class="loan-swiper">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in banner" :key="index">
              
                <div><img :src="item.image"></div>
              
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <div class="platform-wrap"  v-infinite-scroll="loadMore" infinite-scroll-disabled="disabledLoadMore" infinite-scroll-distance="10">
      <loans-platform :platform="item" v-for="(item,index) in platformList" :key="index" @click.native="bankDetail(item)"></loans-platform>
      <img class="empty" v-if="showEmptyView" src="/static/images/empty_wap.png" alt="">
    </div>

    <div v-if="canLoadMore" class="weui-loadmore">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <loans-tip v-else :tip="tip"></loans-tip>

  </div>
</template>
<script>
import http from "@/utils/http";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import LoansPlatform from "@/components/LoansPlatform";
import LoansTip from "@/components/LoansTip";
let vm = null;
export default {
  name: "home",
  components: {
    swiper,
    swiperSlide,
    LoansPlatform,
    LoansTip
  },
  data() {
    return {
      showEmptyView: false,
      activityShow: false,
      imgShow: false,
      tip: "平台即将上线，敬请期待",
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        autoplay: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: -70, // slide左右距离
          depth: 400, // slide前后距离
          modifier: 0.5, //
          slideShadows: false // 滑块遮罩层
        },
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
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
      banner: [],
      platformList: [],
      page: 1,
      limit: 20,
      canLoadMore: true,
      disabledLoadMore: true
    };
  },
  watch: {
    canLoadMore: function(res) {
      // console.log("disabledLoadMore change:" + !res);
      this.disabledLoadMore = !res;
    }
  },
  created() {
    vm = this;
    // window.platformListCallback = this.platformListCallback;
    // this.title = "贷款超市";
    document.title = "贷款";
    this.getBanner();
    this.getPlatformList(false);
  },
  methods: {
    handleClickSlide(index) {
      let item = this.banner[index];
      this.addClick(item);
    },
    addClick(banner) {
      if (banner.url == "") {
        console.log("跳转Url为空");
        return;
      }
      // alert("banner.id" + "_" + "banner.url");
      console.log(banner);
      http
        .postWithoutCode("/web/banner/click", { id: banner.id })
        .then(res => {});

      // 内链
      if (banner.type == 0) {
        this.ToAppADWebPage(banner.url, {
          title: banner.title
        });
        // this.ToAppPage(banner.url, "");
      } else {
        // 外链
        this.ToBrowserFromAppPage(banner.url);
      }
    },
    // 跳转去详情
    bankDetail(one) {
      if (!this.isPC()) {
        var protocol = window.location.protocol;
        var host = window.location.host;
        // var hash  = window.location.hash;
        var root = protocol + "//" + host + "/";

        let url = root + "wap/cardmarket/LoansMarket";
        // console.log(url);
        this.ToAppPage(url, one);
      } else {
        this.$router.push({ name: "LoansMarket", query: one });
      }
    },
    // getData-start
    getBanner() {
      let json = {
        position: 12
      };
      http.postWithoutCode("/web/banner/list", json).then(res => {
        // console.log(JSON.stringify(res));
        this.banner = res.list;
        if (this.banner.length > 0) {
          this.imgShow = true;
        } else {
          this.imgShow = false;
        }
      });
    },

    getPlatformList(isLoadMore) {
      http
        .postWithoutCode("/loan/plat/list", {
          page: this.page,
          limit: this.limit
        })
        .then(res => {
          // console.log(
          //   "getPlatformList: page =" + this.page + "\n" + JSON.stringify(res)
          // );
          if (isLoadMore && res.page.list.length > 0) {
            this.platformList = this.platformList.concat(res.page.list);
          } else {
            this.platformList = res.page.list;
          }

          if (this.platformList.length >= res.page.totalNum) {
            this.canLoadMore = false;
          } else {
            this.canLoadMore = true;
          }

          if (this.platformList.length == 0) {
            this.showEmptyView = true;
          } else {
            this.showEmptyView = false;
          }
        });
    },
    // 加载更多
    loadMore() {
      console.log("loadMore");
      this.page++;
      this.getPlatformList(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.loan-top {
  background-color: #fff;
  padding: 5px 0;
}
.home-wrap {
  background-color: #f6f7f8;
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
  }
}
.home-swipe {
  height: 112px;
}
.swiper-container {
  z-index: 0;
  margin: 0;
  padding: 6px 0;
}
.swiper-slide {
  width: 315px;
  height: 112px;
}
.swiper-slide img {
  display: block;
  margin: 0 auto;
  width: 98%;
  height: 98%;
  margin-top: 0;
  vertical-align: middle;
  transition: all 1s ease 0s;
  box-shadow: 0px 2px 3px #999;
  border-radius: 0.3rem;
}
.activity-list {
  display: flex;
  padding: 15px 15px 5px 15px;
  font-size: 12px;
  justify-content: space-around;
  flex-wrap: nowrap;
  & .activity-item {
    width: 50px;
    & img {
      width: 100%;
    }
  }
}
.platform-wrap {
  margin-top: 15px;
  background: #fff;
}
.empty {
  width: 100%;
  display: block;
}
</style>
