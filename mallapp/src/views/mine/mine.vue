<template>
 <div id="me">
  <nav-bar>
   <div slot="center">{{title}}</div>
  </nav-bar>
  </div>
</template>

<script>
 import NavBar from 'components/common/navbar/NavBar'
 export default {
 name:'me',
  data(){
   return{
    title:'我的'
   }
  },
  components:{
   NavBar
  }
}
</script>

<style scope>
</style>