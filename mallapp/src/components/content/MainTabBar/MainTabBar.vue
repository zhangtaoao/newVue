<template>
 <div id="maintabbar" v-show="$route.meta.keepAlive">
  <tab-bar>
     <tab-bar-item path='/home'>
       <img src="~assets/img/tabbar/home.png" alt="" slot="icon">
       <img src="~assets/img/tabbar/homeactive.png" alt="" slot="active">
       <div slot="text">首页</div>
     </tab-bar-item>
     <tab-bar-item path='/mess'>
       <img src="~assets/img/tabbar/mess.png" alt="" slot="icon">
       <img src="~assets/img/tabbar/messactive.png" alt="" slot="active">
       <div slot="text">分类</div>
     </tab-bar-item>
    <tab-bar-item path='/cart'>
      <img src="~assets/img/tabbar/cart.png" alt="" slot="icon">
      <img src="~assets/img/tabbar/cartactive.png" alt="" slot="active">
      <div slot="text">购物车</div>
    </tab-bar-item>
     <tab-bar-item path='/mine'>
       <img src="~assets/img/tabbar/me.png" alt="" slot="icon">
       <img src="~assets/img/tabbar/meactive.png" alt="" slot="active">
       <div slot="text">我的</div>
     </tab-bar-item>
    </tab-bar>
 </div>
</template>
<script>
import TabBar from '@/components/common/TabBar/tabbar'
import TabBarItem from '@/components/common/TabBar/tabbaritem'

export default {
 name:'maintabbar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped></style>