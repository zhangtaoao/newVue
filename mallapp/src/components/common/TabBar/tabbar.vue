<template>
 <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>

export default {
 name:'tabbar'
}
</script>

<style scope>
  #tabbar{
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  height: 49px;
  box-shadow: 0 -1px 1px gainsboro;
  font-size: 12px;
  background: white;
}
</style>