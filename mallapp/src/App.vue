<template>
  <div id="app">
    <!--<transition name="router-fade" mode="out-in">-->
      <!--<keep-alive>-->
        <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
      <!--</keep-alive>-->
    <!--</transition>-->
    <!--<transition name="router-fade" mode="out-in">-->
      <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--</transition>-->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from '@/components/content/MainTabBar/MainTabBar'
  export default {
    name:'app',
    components:{
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
