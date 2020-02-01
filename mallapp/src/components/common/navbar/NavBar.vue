<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
.nav-bar{
  display: flex;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  /*box-shadow: -1px 1px 0px gainsboro;*/
  /*background: #44DAB9;*/
  background: #FB7EA4;
  color: white;
  font-size: 0.7rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.left,.right{
  width: 60px;
}
.center{
  flex: 1;
  text-align: center;
}
</style>