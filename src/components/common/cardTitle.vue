<template>
  <div class="title">{{title}}</div>
</template>
<script>
export default {
  name: 'cardTitle',
  props: {
    title: {  
      type: String
    }
  }
}

</script>
<style lang="postcss" scoped="">

.title{
  position:relative;
  background:#fff;
	font-size: 14px;
	color: #1C2042;
	padding:10px 20px;
  font-weight:bold;

	&:after{
    position:absolute;
    left:0px;
    bottom:0;
    display: block;
    width: 130%;
    height: 1px;
    content:'';
    background-image: linear-gradient(
        180deg,
        #ddd,
        #ddd 50%,
        transparent 50%
    );
    background-repeat: no-repeat;
      background-size: 120% 1px;
      background-position: 0 100%;
  }
}

</style>
