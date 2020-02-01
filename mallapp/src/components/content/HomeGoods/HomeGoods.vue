<template>
  <div class="HomeGoods">
    <home-goods-item v-for="(item,index) in goods" :key="index" :item="item"/>
  </div>
</template>

<script>
  import HomeGoodsItem from './HomeGoodsItem'
  export default {
    name: "HomeGoods",
    components:{
      HomeGoodsItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.HomeGoods{
  width: 100%;
  font-size: 0.5rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>