<template>
 <div id="cart">
  <nav-bar>
   <div slot="center">{{title}}</div>
  </nav-bar>
  </div>
</template>

<script>
 import NavBar from 'components/common/navbar/NavBar'
export default {
 name:'cart',
 data(){
  return{
   title:'购物车'
  }
 },
 components:{
  NavBar
 }
}
</script>

<style scope>
</style>