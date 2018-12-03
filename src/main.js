import Vue from 'vue'
import router from './router'
import 'weui/dist/style/weui.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';

import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);
import http from '@/utils/http'

import App from './App'
Vue.config.productionTip = false
Vue.prototype.validaePhoneNumber = function (value) {
  if (!value || value == '') {
    return '请输入手机号码';
  }
  var phonrReg = /^1\d{10}$/;
  if (!phonrReg.test(value)) {
    return '请输入正确的手机号码';
  } else {
    return '';
  }
};

Vue.use(VueAwesomeSwiper)

// 连接客户端的通用方法
Vue.prototype.isAndroid = function () {
  var u = navigator.userAgent;

  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Windows') > -1; //android终端
  return isAndroid;
}
Vue.prototype.isiOS = function () {
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.match(/Mac OS X/); //ios终端
  return isiOS;
};
Vue.prototype.isPC = function () {
  var u = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var isPC = true;
  for (var v = 0; v < Agents.length; v++) {
    if (u.indexOf(Agents[v]) > 0) {
      isPC = false;
      break;
    }
  }
  return isPC;
};
Vue.prototype.setupWebViewJavascriptBridge = function (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

Vue.prototype.GeneralGetData = function (json) {

  if (this.isAndroid()) {
    console.log('Android')
    var reqData = JSON.stringify(json.reqData);
    console.log(reqData)
    window.InviteJs.loadData(json.url, reqData, json.callback);
  } else if (this.isiOS()) {
    console.log('ios')
    this.setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('LOAD_DATA', json);
    })
  }
};

Vue.prototype.GetUserPhone = function () {

  if (this.isAndroid()) {
    console.log('Android')
    return window.InviteJs.getUserPhone();
  } else if (this.isiOS()) {
    console.log('ios')
    this.setupWebViewJavascriptBridge(function (bridge) {
      return bridge.callHandler('GET_USER_PHONE');
    })
  }
};

Vue.prototype.GetUserID = function () {

  if (this.isAndroid()) {
    console.log('Android')
    return window.InviteJs.getUserUid();
  } else if (this.isiOS()) {
    console.log('ios')
    this.setupWebViewJavascriptBridge(function (bridge) {
      return bridge.callHandler('GET_USER_UID');
    })
  }
};

//app内页跳转

Vue.prototype.ToAppPage = function (url, data, toAppPage) {
  console.log(url)
  if (url == '') {
    console.log('空连接');
    return;
  }

  if (!toAppPage) {
    //跳转app的h5页面;
    var newUrl = url
    var d = data ? JSON.stringify(data) : '';
    if (d.length > 0) {
      d = encodeURIComponent(d);
      newUrl = url + '?query=' + d;
    }
    newUrl = encodeURIComponent(newUrl);
    let appBaseUrl = '/common/webView/&url=';
    url = appBaseUrl + newUrl;

  } else if (toAppPage == true) {
    //跳转到app内页的原生页面, data作为json字符串 由query参数传递
    let d = data ? JSON.stringify(data) : '';
    var newUrl = url
    if (d.length > 0) {
      newUrl = url + '?query=' + d;
    }
    url = newUrl;
  }

  var json = {
    url: url
  };
  if (this.isiOS()) {
    console.log('ios')
    // json.url = 'routecommon:/' + url;   //外部启动app
    json.url = 'routeglobal:/' + url; //APP内跳转
    console.log(json);
    window.webkit.messageHandlers.pushUrl.postMessage(json);
  }
  if (this.isAndroid()) {
    console.log('Android')
    json = JSON.stringify(json);
    console.log(json);
    window.InviteJs.pushUrl(json);
  }
};

// app内页跳转到广告详情页

Vue.prototype.ToAppADWebPage = function (url, data) {
  let routerUrl = '/news/newsDetail';
  var targetUrl = routerUrl;
  data = data || {};
  url = url || "";
  data.title = data.title || "";
  data.intro = data.intro || data.title||"";
  data.img = data.img ||"";
  targetUrl = routerUrl + "/&url=" + encodeURIComponent(url);
  targetUrl = targetUrl + "/&title=" + data.title;
  targetUrl = targetUrl + "/&intro=" + data.intro;
  targetUrl = targetUrl + "/&img=" + data.img;

  this.ToAppPage(targetUrl, "", true);
};

// app内跳转到浏览器
Vue.prototype.ToBrowserFromAppPage = function (url, data) {
  let appBaseUrl = '/common/browser/&url=';
  url = appBaseUrl + encodeURIComponent(url);
  this.ToAppPage(url, data, true);
}



Vue.prototype.getQuery = function (params) {
  let str = location.search;
  let query = str.split(params + "=").slice(-1).join('');
  query = decodeURIComponent(query);

  query = JSON.parse(query);
  console.log(query);
  // console.log(query)
  return query;
}


//循环每n次归类
Vue.prototype.recalObject = function (json, n) {
  let l = json; //标准json对象
  let big = [];
  // console.log(l)
  let num = Math.ceil(l.length / n);
  if (l.length >= 1) {
    for (var x = 1; x < (num + 1); x++) {
      let small = [];
      for (var i = n * (x - 1); i < (n * x); i++) {
        small.push(l[i]);
      }
      //清除空对象
      for (var i = 0; i < small.length; i++) {
        if (typeof small[i] == "undefined") {
          small.splice(i, 1);
          i--;

        }
      }
      big.push({
        "list": small
      });
    }

  }
  // console.log(big)
  return big
}

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// })

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

Vue.filter('moneyFormal', function (value) {
  if (!value || value == 0) return '0'
  value = parseInt(value) / 100; //分到元
  value += ''; //转成字符串
  var reg = value.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g; //千分符的正则
  value = value.replace(reg, '$1,'); //千分位格式化
  return value;
})

Vue.prototype.moneyFormal = function (value) {
  if (!value || value == 0) return '0'
  value = parseInt(value) / 100; //分到元
  value += ''; //转成字符串
  var reg = value.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g; //千分符的正则
  value = value.replace(reg, '$1,'); //千分位格式化
  return value;
}

//判断iPhoneX
Vue.prototype.isIphoneX = function isIphoneX(){
    return /iphonex/gi.test(navigator.userAgent);
}

Vue.prototype.clickNum = function (id) {
  http.postWithoutCode('/web/banner/click', {id:id}).then((res) => {
    console.log(res)
  })
}
Vue.filter('moneyFormal2', function (number) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = number / 100;
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+2) ? 0 : Math.abs(2),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
})



new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
