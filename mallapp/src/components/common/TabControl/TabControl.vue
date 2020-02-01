<template>
  <div class="tabControl">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabControl"
  }
</script>

<style scoped>
  .tabControl{
    width: 100%;
    padding: 0.2rem 0;
  }
</style>