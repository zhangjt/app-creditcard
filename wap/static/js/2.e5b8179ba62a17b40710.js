webpackJsonp([2],{"59CY":function(t,e){},L6iI:function(t,e,s){"use strict";var a={components:{},props:{htmlContent:String,imgSrc:String,desc:String},data:function(){return{}},watch:{},computed:{},methods:{},created:function(){},mounted:function(){}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.htmlContent?s("div",{staticClass:"base-info"},[s("div",[s("img",{attrs:{src:t.imgSrc}}),t._v(" "),s("span",{staticClass:"desc"},[t._v(t._s(t.desc))])]),t._v(" "),s("div",{domProps:{innerHTML:t._s(t.htmlContent)}})]):t._e()},staticRenderFns:[]};var n=s("VU/8")(a,i,!1,function(t){s("tkA1")},"data-v-67e48b63",null);e.a=n.exports},"R+mo":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("L6iI"),i=s("Aun9"),n=s("hNqL"),o=s("M4fF"),c=s.n(o),r={components:{CardInfoSegment:a.a,CardInfoDialog:i.a,Toast:n.a},props:{},data:function(){return{checkBoxImg:"/static/images/loan_checkbox_unselected.png",agreetProtocol:!1,cardInfo:{annualFee:"",currency:"",grade:"",id:"",imgUrl:"",interestFeePeriod:"",link:"",name:"",organization:"",propaganda:"",rank:"",retateInfo:"",rightsInfo:"",status:"",tab1:"",tab2:"",tab3:"",categoryContent1:"",categoryContent2:"",categoryName1:"",categoryName2:""},apply_button_padding_bottom:0,bg_min_height:0,bg_padding_bottom:0,baseInfoDesc:"基本信息",baseInfoImgSrc:"/static/images/base_icon.png",baseInfoContent:[],baseRightsDesc:"权益",baseRightsImgSrc:"/static/images/king_icon.png",baseRebateDesc:"返利说明",baseRebateImgSrc:"/static/images/money_icon.png",dialogPhoneVisible:!1,dialogSmsVisible:!1,verifyImg:"",inputPhone:"",appUserPhone:"",toastShow:!1,toastContent:"",verifyCode:"",countDownStr:"获取短信验证码",smsBtnDisable:!1,smsCode:""}},watch:{},computed:{showMid:function(){return this.baseInfoContent.length>0||this.cardInfo.categoryName2||this.cardInfo.categoryName1}},methods:{getUserPhoneCallBack:function(t){this.inputPhone=t,this.appUserPhone=t},tapCheckBox:function(){this.agreetProtocol=!this.agreetProtocol,!0===this.agreetProtocol?this.checkBoxImg="/static/images/loan_checkbox_selected.png":this.checkBoxImg="/static/images/loan_checkbox_unselected.png"},getUserUidCallBack:function(t){t?(this.dialogPhoneVisible=!0,this.GetUserPhone()):this.isPC()||this.ToAppPage("/home/loginActivity",null,!0)},loadIsNeedCodeCallBack:function(t){this.dialogPhoneVisible=!1,0===t.isSuccess?1===t.responseData.code?this.dialogSmsVisible=!0:-1===t.responseData.code?this.showToast(t.responseData.msg):this.addregNew(!1):this.showToast(t.responseData)},onGetVerifyImgCallBack:function(t){0===t.isSuccess?t.responseData.image&&(this.verifyImg="data:image/png;base64,"+t.responseData.image):this.showToast(t.responseData)},onGetSmsCodeCallback:function(t){0===t.isSuccess?this.showToast("验证码已发送至手机"):this.showToast(t.responseData)},addregNewCallback:function(t){0===t.isSuccess?(this.isPC()?window.location.href=this.cardInfo.link:0===this.cardInfo.type?this.ToAppPage(this.cardInfo.link,null,!1):this.ToBrowserFromAppPage(this.cardInfo.link),this.dialogSmsVisible=!1):this.showToast(t.responseData)},dismiss:function(){this.toastShow=!1},defaultClick:function(){this.dialogPhoneVisible=!1,this.dialogSmsVisible=!1},actionApply:c.a.debounce(function(){this.GetUserID()},500),phoneClick:c.a.debounce(function(){this.agreetProtocol?this.inputPhone===this.appUserPhone?this.addregNew(!1):this.checkPhone()&&this.GeneralGetData({url:"/app/rebate/addreg/needCode",reqData:{phone:this.inputPhone,type:"3"},callback:"loadIsNeedCodeCallBack"}):this.showToast("请先勾选返利说明")},500),checkPhone:function(){var t=this.validaePhoneNumber(this.inputPhone);return!t||(this.showToast(t),!1)},getVerifyImg:c.a.debounce(function(){this.checkPhone()&&this.GeneralGetData({url:"/app/imagecode/index2",reqData:{phone:this.inputPhone},callback:"onGetVerifyImgCallBack"})},500),getSmsCode:c.a.debounce(function(){this.smsBtnDisable||(this.checkPhone()&&this.verifyCode?(this.smsCountDown(),this.GeneralGetData({url:"/app/captcha",reqData:{phone:this.inputPhone,type:"3",imgcode:this.verifyCode},callback:"onGetSmsCodeCallback"})):this.showToast("请输入图形验证码"))},500),addregNew:function(t){var e={type:3,p2p_name:this.cardInfo.name,reg_account:this.inputPhone};t&&(e.code=this.smsCode),this.GeneralGetData({url:"/app/rebate/addregNew",reqData:e,callback:"addregNewCallback"})},smsCountDown:function(){var t=this;this.timer||(this.count=60,this.smsBtnDisable=!0,this.timer=setInterval(function(){t.count>0&&t.count<=60?(t.count--,t.countDownStr=t.count+"s"):(t.smsBtnDisable=!1,clearInterval(t.timer),t.countDownStr="重新发送",t.timer=null)},1e3))},smsClick:c.a.debounce(function(){this.checkPhone()&&(this.smsCode?this.addregNew(!0):this.showToast("请输入短信验证码"))},500),showToast:function(t){0!==t.length&&(this.toastShow=!0,this.toastContent=t)}},created:function(){window.getUserPhoneCallBack=this.getUserPhoneCallBack,window.getUserUidCallBack=this.getUserUidCallBack,window.loadIsNeedCodeCallBack=this.loadIsNeedCodeCallBack,window.onGetVerifyImgCallBack=this.onGetVerifyImgCallBack,window.onGetSmsCodeCallback=this.onGetSmsCodeCallback,window.addregNewCallback=this.addregNewCallback,this.isPC()?this.cardInfo=this.$route.query:this.cardInfo=this.getQuery("query"),this.apply_button_padding_bottom=this.isIphoneX()?34:0,this.bg_min_height=this.isIphoneX()?812:0,this.cardInfo.annualFee.length>0&&this.baseInfoContent.push({title:"年费",titleText:this.cardInfo.annualFee}),this.cardInfo.interestFeePeriod.length>0&&this.baseInfoContent.push({title:"免息期限",titleText:this.cardInfo.interestFeePeriod}),this.cardInfo.grade.length>0&&this.baseInfoContent.push({title:"等级",titleText:this.cardInfo.grade}),this.cardInfo.organization.length>0&&this.baseInfoContent.push({title:"发卡组织",titleText:this.cardInfo.organization}),this.cardInfo.currency.length>0&&this.baseInfoContent.push({title:"币种",titleText:this.cardInfo.currency})},mounted:function(){this.$refs.body.offsetHeight>812&&(this.bg_padding_bottom=this.isIphoneX()?34:0)}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"title",rawName:"v-title",value:t.cardInfo.name,expression:"cardInfo.name"}],ref:"body",staticClass:"cc-info-container",style:"min-height:"+t.bg_min_height+"px;padding-bottom: "+t.bg_padding_bottom+"px;"},[t.cardInfo.imgUrl?s("img",{staticClass:"card-img",attrs:{src:t.cardInfo.imgUrl,onerror:"javascript:this.src='/static/images/default_card.png';"}}):t._e(),t._v(" "),t.cardInfo.propaganda?s("span",{staticClass:"rights"},[t._v(t._s(t.cardInfo.propaganda))]):t._e(),t._v(" "),s("div",{staticClass:"tag-class"},[t.cardInfo.tab1?s("div",{staticClass:"tag1"},[t._v(t._s(t.cardInfo.tab1))]):t._e(),t._v(" "),t.cardInfo.tab2?s("div",{staticClass:"tag2"},[t._v(t._s(t.cardInfo.tab2))]):t._e(),t._v(" "),t.cardInfo.tab3?s("div",{staticClass:"tag3"},[t._v(t._s(t.cardInfo.tab3))]):t._e()]),t._v(" "),t.showMid?s("div",{staticClass:"mid-class"},[t.baseInfoContent.length>0?s("div",{staticClass:"base-info"},[s("div",{staticClass:"base-info-top-bg"},[s("img",{attrs:{src:t.baseInfoImgSrc}}),t._v(" "),s("span",[t._v(t._s(t.baseInfoDesc))])]),t._v(" "),s("div",{staticClass:"base-info-bg"},t._l(t.baseInfoContent,function(e){return s("div",{key:e.title,staticClass:"base-info-bg-text"},[s("div",{staticClass:"base-info-bg-text-1",domProps:{innerHTML:t._s(e.title)}}),t._v(" "),s("div",{staticClass:"base-info-bg-text-2",domProps:{innerHTML:t._s(e.titleText)}})])}))]):t._e(),t._v(" "),s("card-info-segment",{attrs:{desc:t.cardInfo.categoryName1,imgSrc:t.baseRightsImgSrc,htmlContent:t.cardInfo.categoryContent1}}),t._v(" "),s("card-info-segment",{attrs:{desc:t.cardInfo.categoryName2,imgSrc:t.baseRebateImgSrc,htmlContent:t.cardInfo.categoryContent2}})],1):t._e(),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"apply-class-bg",style:"padding-bottom:"+t.apply_button_padding_bottom+"px"},[s("div",{staticClass:"apply-class",on:{click:t.actionApply}},[t._v("\n          立即申请\n      ")])]),t._v(" "),s("card-info-dialog",{attrs:{dialogTitle:"办卡预登记",dialogVisible:t.dialogPhoneVisible},on:{"update:dialogVisible":function(e){t.dialogPhoneVisible=e},defaultClick:t.defaultClick,primaryClick:t.phoneClick}},[s("div",{staticClass:"d-content-phone"},[s("span",[t._v("请输入您申请信用卡的手机号码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.inputPhone,expression:"inputPhone"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入手机号"},domProps:{value:t.inputPhone},on:{input:function(e){e.target.composing||(t.inputPhone=e.target.value)}}})]),t._v(" "),s("table",{staticClass:"protocol-content"},[s("p",{staticClass:"check-box-bg",on:{click:t.tapCheckBox}},[s("img",{staticClass:"check-box",attrs:{src:t.checkBoxImg}})]),t._v(" "),s("span",{staticClass:"protocol-agreement"},[t._v("返利说明:此返利仅限首次申请该行信用卡用户")])])]),t._v(" "),s("card-info-dialog",{attrs:{dialogTitle:"办卡预登记",dialogVisible:t.dialogSmsVisible},on:{"update:dialogVisible":function(e){t.dialogSmsVisible=e},defaultClick:t.defaultClick,primaryClick:t.smsClick}},[s("div",{staticClass:"d-content-sms"},[s("span",[t._v("请输入您申请信用卡的手机号码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.inputPhone,expression:"inputPhone"}],staticClass:"weui-input input-sms",attrs:{type:"tel",placeholder:"请输入手机号"},domProps:{value:t.inputPhone},on:{input:function(e){e.target.composing||(t.inputPhone=e.target.value)}}}),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.verifyCode,expression:"verifyCode"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入图形验证码"},domProps:{value:t.verifyCode},on:{input:function(e){e.target.composing||(t.verifyCode=e.target.value)}}}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!t.verifyImg,expression:"!verifyImg"}],staticClass:"get-verify-btn",on:{click:t.getVerifyImg}},[t._v("获取图形验证码")]),t._v(" "),s("div",{on:{click:t.getVerifyImg}},[s("img",{directives:[{name:"show",rawName:"v-show",value:t.verifyImg,expression:"verifyImg"}],staticClass:"verify-img",attrs:{src:t.verifyImg,alt:"单击图片刷新"}})])]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.smsCode,expression:"smsCode"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入短信验证码"},domProps:{value:t.smsCode},on:{input:function(e){e.target.composing||(t.smsCode=e.target.value)}}}),t._v(" "),s("span",{staticClass:"get-verify-btn",on:{click:t.getSmsCode}},[t._v(t._s(t.countDownStr))])])])]),t._v(" "),s("toast",{attrs:{showToast:t.toastShow,toastContent:t.toastContent},on:{"update:showToast":function(e){t.toastShow=e},dismiss:t.dismiss}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flow-class"},[s("div",[s("img",{attrs:{src:"/static/images/process-icon.png"}}),t._v(" "),s("span",[t._v("返利流程")])]),t._v(" "),s("div",{staticClass:"flow-step"},[s("img",{attrs:{src:"/static/images/apply.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/write.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/great.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/get.png"}})]),t._v(" "),s("div",{staticClass:"flow-step-text"},[s("span",[t._v("申请卡片")]),t._v(" "),s("span",[t._v("官网填写")]),t._v(" "),s("span",[t._v("成功办卡")]),t._v(" "),s("span",[t._v("获得返利")])])])}]};var d=s("VU/8")(r,l,!1,function(t){s("59CY")},"data-v-ec2398e4",null);e.default=d.exports},tkA1:function(t,e){}});