<template>
 <div id="mess">
  <nav-bar>
   <div slot="center">{{title}}</div>
  </nav-bar>
  </div>
</template>

<script>
 import NavBar from 'components/common/navbar/NavBar'

 export default {
 name:'mess',
  data(){
   return{
    title:'分类'
   }
  },
  components:{
   NavBar
  }
} 
</script>

<style scope>
</style>