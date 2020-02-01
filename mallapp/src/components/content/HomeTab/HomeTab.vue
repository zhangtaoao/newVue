<template>
  <div class="scoll">
    <tab-control>
      <tab-item v-for="(item,index) in control" :key="index">
        <div :class="{active:index===itemindex}" @click="itemClick(index)">{{item}}</div>
      </tab-item>
    </tab-control>
  </div>
</template>

<script>
  import TabControl from 'components/common/TabControl/TabControl'
  import TabItem from 'components/common/TabControl/TabItem'
  export default {
    name: "HomeTab",
    data(){
      return{
        itemindex:0
      }
    },
    props:{
      control:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      TabControl,
      TabItem
    },
    methods:{
      itemClick(index){
        this.itemindex=index
        this.$emit('ItemClick',index)
      }
    }
  }
</script>

<style scoped>
  .scoll{
    position: sticky;
    top:var(--space);
    z-index: 9;
    background: white;
  }
  .tabControl{
    display: flex;
    line-height: 1.2rem;
    font-size: 0.68rem;
  }
  .tabitem{
    flex: 1;
  }
  .tabitem div{
    width: 50%;
    margin: 0 auto;
  }
  .active{
    color: #FB7EA4;
    border-bottom: 3px solid #FB7EA4;
  }
</style>