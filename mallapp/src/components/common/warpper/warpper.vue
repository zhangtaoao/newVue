<template>
  <div class="warpper" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "warpper",
    props:{
      probeType:{
        type:Number,
        default(){
          return 0
        }
      },
      pullUpLoad:{
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted() {
     this.scroll = new BScroll(this.$refs.scroll,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      }),
       //监听滚动位置
       this.scroll.on('scroll',(position)=>{
           this.$emit('scroll',position)
       }),
       //下拉更多
       this.scroll.on('pullingUp',()=>{
         this.$emit('pullingUp')
       })
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        // console.log('----') 使用防抖函数调用一次
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>