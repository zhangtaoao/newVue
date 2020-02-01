<template>
  <div class="detail">
    <details-item :id="this.$route.params.id"/>
  </div>
</template>

<script>
  import detailsItem from 'components/content/Details/DetailsItem'
  import {getDetails} from 'network/getdata'
  export default {
    name: "detail",
    components:{
      detailsItem
    },
    data(){
      return{
        id:null
      }
    },
    created() {
      this.id=this.$route.params.id
      this.getDetail(this.id)
      console.log(this.id)
    },
    mounted(){

    },
    methods:{
      getDetail(id){
        getDetails(id).then( res => {
          // console.log(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>