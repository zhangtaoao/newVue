<template>
  <div class="gotop">
    <div class="el-icon-top"></div>
  </div>
</template>

<script>
  export default {
    name: "GoTop"
  }
</script>

<style scoped>
.gotop>div{
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid pink;
  position: fixed;
  bottom: 70px;
  right: 15px;
  z-index: 9;
  font-size: 20px;
  line-height: 30px;
  background: white;
  color: #ff5777;
}
</style>