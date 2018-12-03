<template>
  <div class="platform-item border-bottom">
  	<div class="platform-msg">
  		<span class="platform-icon"><img :src="platform.logo" alt=""></span>
  		<span class="platform-name">{{ platform.name }}</span>
  	</div>
  	<div class="platform-content">
  		<div class="platform-limits border-right">
  			<span class="num">{{platform.tag1}}</span><div class="dec">{{platform.tag2}}</div>
  		</div>
  		<div class="platform-decribe">
  			{{platform.tag3}}
        <div class="dec">{{platform.tag4}}</div>
		</div>

  	</div>
  </div>
</template>
<script>
export default {
  name: "LoansPlatform",
  props: {
    platform: {
      type: Object
    }
  }
};
</script>
<style lang="postcss" scoped="">
.platform-item {
  padding: 0 20px;
}
.platform-msg {
  font-size: 18px;
  color: #1c2042;
  padding: 10px 0;
  border-bottom: 0.5px dashed #e6e6e6;
  & .platform-icon img {
    max-width: 38px;
    vertical-align: middle;
  }
  & .platform-name {
    margin-left: 8px;
  }
}
.platform-content {
  display: flex;
  padding: 20px 0;
  line-height: 1.3;
  align-items: center;
  & .platform-limits {
    width: 105px;
    padding-right: 10px;
    font-size: 26px;
    color: #ff6c04;
    padding-bottom: 5px;
    margin-right: 20px;
  }
  & .platform-limits .num {
    // font-family: "dinm";
    line-height: 31px;
  }
  & .dec {
    font-size: 12px;
    color: #a4a4a4;
    line-height: 18px;
  }
  & .platform-decribe {
    // line-height: 1.4;
    color: #1c2042;
    font-size: 18px;
    line-height: 25px;
  }
}
</style>
