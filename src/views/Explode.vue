<template>
  <div class="container">
    <letter></letter>
    <div>
      <i 
        v-for="(dot, i) in dots"
        :style="{left: dot.x + 'px', top: dot.y + 'px'}" 
        :key="i"></i>
    </div>
  </div>
</template>

<script>
import Letter from '../components/Letter'
import Bus from '../common/Bus'

export default {
  components: { Letter },
  data () {
    return {
      dots: []
    }
  },
  created () {
    Bus.$on('dots', (dots) => {
      console.log(dots)
      this.dots = dots;
    })
  }
}
</script>

<style scoped>
.container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #ccc;
}
.container i {
  position: absolute;
  z-index: 4;
  width: 1px;
  height: 1px;
  border-radius: 1px;
  background: blue; 
}
</style>

    