<template>
  <div class="home-goods-item" @click="goodsClick(item.iid)">
    <div>
      <img :src="item.show.img" alt="" @load="imgLoad">
    </div>
    <div class="font">
      <p>{{item.title}}</p>
      <span class="money">￥{{item.price}}</span>
      <span class="el-icon-star-off">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
  //原生监听图片加载完 img.onload=function
  //vue监听@load
  export default {
    name: "HomeGoodsItem",
    props:{
      item:{
        type:Object
      }
    },
    methods:{
      imgLoad(){
        this.$bus.$emit('imgLoad')
      },
      goodsClick(iid){
        this.$router.push({name:'detail', params:{id:iid}})
      }
    }
  }
</script>

<style scoped>
.home-goods-item{
  width: 48%;
  height: 12.5rem;
  position: relative;
  margin: 4px 0;
}
.home-goods-item>div{
  width: 100%;
  height: 11rem;
}
.home-goods-item img{
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.home-goods-item .font{
  position: absolute;
  top: 11.5rem;
  left: 0;
  text-align: center;
}
.home-goods-item .font p{
  width: 100%;
  padding: 0 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.home-goods-item>.font>.money{
  color: #ff5777;
  margin-right: 2px;
}
</style>