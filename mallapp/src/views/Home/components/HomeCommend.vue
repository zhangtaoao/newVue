<template>
  <el-row :gutter="20" width="'100%" id="recommend">
    <el-col :span="6" v-for="(item,index) in recommend" :key="index">
      <div class="grid-content bg-purple">
        <div class="recommend">
          <a :href="item.link"><img :src="item.image" alt="recommend"></a>
          <p>{{item.title}}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "HomereCommend",
    props:{
      recommend:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #recommend{
    padding-bottom: 1.6rem;
    border-bottom: 8px solid gainsboro;
  }
  .recommend{
    width: 2.8rem;
    height: 2.8rem;
    margin: 0 auto;
  }
  .recommend img{
    width: 100%;
    height: 100%;
  }
  .recommend p{
    text-align: center;
    font-size: 0.3rem;
    margin-top: 0.2rem;
  }
</style>