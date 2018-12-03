<template>
	<div class="tip-wraper">
	  <div class="tip-inner">
	  	<span class="block border-bottom left"></span>
	  	<span class="dot left"></span>
	  	<p>{{ tip }}</p>
	  	<span class="dot right"></span>
	  	<span class="block border-bottom right"></span>
	  </div>
    </div>
</template>
<script>
export default {
  name: 'LoansPlatform',
  props: {
    tip: {  
      type: String
    }
  }
}

</script>
<style lang="postcss" scoped="">
.tip-wraper{
	text-align: center;
}
.tip-inner{
	position: relative;
	display: inline-block;
	margin: 40px auto;
	& p{
      margin-top: 4px;
      font-size: 12px;
      color: #AEAEAE;
    }
    & .dot{
      position: absolute;
      display: inline-block;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: #AEAEAE;
      top: 50%;
      &.left{
        left: -20px;
      }
      &.right{
        right: -20px;
      }
    }
    & .block{
      display: inline-block;
      height: 2px;
      width: 45px;
      position: absolute;
      background-image: linear-gradient(180deg,#AEAEAE,#AEAEAE 50%,transparent 0);
      top: 50%;
      margin-top: 0px;
      &.left{
        left: -63px;
      }
      &.right{
        right: -63px;
      }
    }
}

</style>
