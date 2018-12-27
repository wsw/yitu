<template>
  <div class="home">
    <router-link to="/selector">1. 摄像头选择器</router-link>
    <router-link to="/explode">2. 字母爆炸</router-link>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
  .home a {
    text-align: center;
    display: block;
  }
</style>
