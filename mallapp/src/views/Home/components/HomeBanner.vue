<template>
  <el-carousel indicator-position="outside" height="8rem">
    <el-carousel-item v-for="(item,index) in banner" :key="index">
      <a :href="item.link"><img :src="item.image" alt="banners" @load="imgLoad"></a>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "HomeBanner",
    props:{
      banner:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{

      }
    },
    methods:{
      imgLoad(){
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item img{
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>