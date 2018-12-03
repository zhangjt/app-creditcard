<template>
	<div class="item">
	  <div class="item-title" v-html="title"></div>
    <div class="item-content" v-html="details"></div>
  </div>
</template>
<script>
export default {
  name: 'LoansDetailItem',
  props: {
    title: {
      type: String
    },
    details: {  
      type: String
    }
  }
}

</script>
<style lang="postcss" scoped="">
.item{
  margin-bottom: 15px;
  font-size: 14px;
  & .item-title{
    color: #334354;
    line-height: 20px;
    margin: 5px 0 5px;
  }
  & .item-content{
    line-height: 21px;
    font-size: 12px;
    color: #ABACB0;
  }
}
</style>
