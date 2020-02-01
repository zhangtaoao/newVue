<template>
 <div class="tab-item" @click="itemClick">
  <div class="tab-icon" v-show="!isActive">
   <slot name="icon"></slot>
  </div>
  <div class="tab-icon-active" v-show="isActive">
   <slot name='active'></slot>
  </div>
  <div :class="{active:isActive}">
   <slot name='text'></slot>
  </div>
 </div>
</template>
<script>
export default {
 name:'tabbaritem',
 props:{
  path:String
 },
 data(){
  return{
   
  }
 },
 computed:{
  isActive(){
   return this.$route.path.indexOf(this.path)!== -1
  }
 },
 methods:{
  itemClick(){
    if(this.$route.path!==this.path){
     this.$router.replace(this.path)
    }
  }
 }
}
</script>

<style>

.tab-item{
  flex: 1;
  text-align: center;
}
img{
 width: 24px;
 height: 24px;
 margin: 3px 0;
 vertical-align: middle;
}
.active{
 color: green;
}
</style>