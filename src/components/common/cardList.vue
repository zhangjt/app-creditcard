<template>
  <article class="card border-bottom" @click="turnUrl">
  	<div class="logo">
  		<img :src="card.imgUrl" alt="">
  		<div v-show="false" class="test">
  		<img  src="~@/assets/images/empty_wap.png" alt="">
  		</div>
  		<div class="annualFee" v-if="!card.rebate==''">返利{{card.rebate|moneyFormal}}元</div>
  	</div>

  	<div class="content">
  		<div class="title">{{card.name}}</div>
  		<div class="subtitle">{{card.propaganda}}</div>
  		<div class="decWrap">
  			<div class="dec dec1" v-if="card.tab1!=''">{{card.tab1}}</div>
  			<div class="dec dec2" v-if="card.tab2!=''">{{card.tab2}}</div>
  			
  		</div>

  	</div>
  </article>
</template>
<script>
import {accessUrl, baseUrl} from '@/utils/env'
export default {
  name: 'cardList',
  props: {
    card: {
      type: Object
    }
  },
  methods: {
  	turnUrl () {
  		if (!this.isPC()) {
        var protocol = window.location.protocol
        var host = window.location.host
        // var hash  = window.location.hash;
        var root = protocol + '//' + host + '/'
        let url = root + 'wap/cardmarket/creditCardInfo'
        
        	//内链
    	this.ToAppPage(url, this.card)


  		} else {
  			
  			this.$router.push({name: 'creditCardInfo', query: this.card})
  		}
  	}
  }
}

</script>
<style lang="postcss" scoped="">
.test{
	background:url("~@/assets/images/empty_wap.png")
}
.card{

	font-size: 14px;
	color: #1C2042;
	margin:0px 20px;

	display:flex;

	& .logo{
		position:relative;
		width:128px;
		height:80px;
		margin:30px 22px 20px 0;
		flex:none;
		
		& img{
			position:absolute;
			width:100%;
			height:100%;
			display:block;
			border-radius:4px;
			background:none;
			z-index:1;

		}
		& .annualFee{
			position:absolute;
			top:-17px;
			right:0;
			background:#ff534f;
			font-size:10px;
			color:#fff;
			padding:0 4px 8px;
			border-radius:4px;
			z-index:0;

		}
	}
	& .content{
		margin:30px 0 20px;
		display:flex;
		flex-direction:column;
		& .title{
			font-size: 18px;
			color: #1C2042;
		}
		& .subtitle{
			font-size: 12px;
			color: #A4A4A4;
		}
		& .decWrap{
			/*display:flex;*/
			& .dec{
				font-size: 10px;
				border-radius:10px;
				border:1px solid #999;
				margin:10px 5px 0 0;
				padding:0 5px;
				float:left;

			}
			& .dec1{
				color: #FF9000;
				border:1px solid #FF9000;
			}
			& .dec2{
				color: #597FFE;
				border:1px solid #597FFE;
			}
			& .dec3{
				color: #00D6A6;
				border:1px solid #00D6A6;
			}
		}

	}
}

</style>
