<template>
 <div id="home">
  <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
  <home-tab :control="control" @ItemClick="tabClick" ref="hometab1" v-show="tabShow"/>
  <scroll class="homecontent" ref="scroll"
          @scroll="goodsScroll"
          @pullingUp="getMore"
          :probe-type="3"
          :pull-up-load="true" :positionY="positionY">
   <home-banner :banner='banner' @imgLoad="bannerimgLoad"/>
   <home-commend :recommend='recommend'/>
   <home-fashon/>
   <home-tab :control="control" @ItemClick="tabClick" ref="hometab2"/>
   <home-goods :goods="goods[goodstype].list"/>
  </scroll>
  <go-top @click.native="goTop" v-show="isShow"/>
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeTab from 'components/content/HomeTab/HomeTab'
import HomeGoods from 'components/content/HomeGoods/HomeGoods'
import scroll from 'components/common/warpper/warpper'
import GoTop from 'components/content/GoTop/GoTop'
import {HomeBanner,HomeCommend,HomeFashon} from './components/index'
import {multidata,getGoods} from 'network/getdata'
export default {
 name:'home',
 components:{
  NavBar,
  HomeBanner,
  HomeCommend,
  HomeFashon,
  HomeTab,
  HomeGoods,
  scroll,
  GoTop
 },
 data(){
  return{
   banner:[],
   recommend:[],
   control:['流行','新款','精选'],
   goods:{
    pop:{page:0,list:[],lastpage:50},
    new:{page:0,list:[],lastpage:50},
    sell:{page:0,list:[],lastpage:20}
   },
   goodstype:'pop',
   isShow:false,
   contenth:0,
   tabShow:false,
   oneShow:false,
   positionY:0,
   scrolly:0
  }
 },
 created() {
  this.multiData(),
  this.getGoods('pop'),
  this.getGoods('new'),
  this.getGoods('sell')
 },
 mounted(){
  const refresh = this.debounce(this.$refs.scroll.refresh,200)
  this.$bus.$on('imgLoad',()=>{
   refresh()
   // this.$refs.scroll.refresh()
  })
 },
 activated(){
  this.$refs.scroll.scrollTo(0,this.scrolly)
  this.$refs.scroll.refresh()
 },
 deactivated(){
  this.scrolly=this.$refs.scroll.getScrollY()
 },
 methods:{
  multiData(){
   multidata().then(res=>{
    this.banner=res.data.data.banner.list
    this.recommend=res.data.data.recommend.list
   })
  },
  getGoods(type){
   const page=this.goods[type].page+1
   getGoods(type,page).then(res=>{
    this.goods[type].list.push(...res.data.data.list)
    this.goods[type].page+=1
    if(this.goods[type].page>this.goods[type].lastpage){
     this.$refs.scroll.scroll.closePullUp()
    }
    setTimeout(()=>{
     this.$refs.scroll.finishPullUp()
    },2000)
   })
  },
  tabClick(index){
   index==0?this.goodstype='pop':index==1?this.goodstype='new':this.goodstype='sell'
   this.$refs.hometab1.itemindex=index
   this.$refs.hometab2.itemindex=index
  },
  goTop(){
   this.$refs.scroll.scrollTo(0,0)
  },
  goodsScroll(position){
   this.isShow=(-position.y)>1800
   this.tabShow=(-position.y)>this.contenth
  },
  getMore(){
   this.getGoods(this.goodstype)
  },
  //防抖函数    节流函数js
  debounce(func,delay){
   let timer = null;
   return function (...args) {
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
     func.apply(this,args)
    },delay)
   }
  },
  bannerimgLoad(){
   if(!this.oneShow){
    this.contenth=this.$refs.hometab2.$el.offsetTop
    this.oneShow=true
   }
  }
 }
}
</script>

<style scope>
 #home{
  text-align: center;
  height: 100vh;
  position: relative;
 }
 .homecontent{
  position: absolute;
  top: 2rem;
  bottom: 49px;
 }
 /*.homecontent{*/
  /*height: calc(100% - 95px);*/
  /*overflow: hidden;*/
  /*margin-top: 2rem;*/
 /*}*/
</style>