<template>
  <canvas ref="canvas" width="100px" height="100px"></canvas>
</template>

<script>
import Bus from '../common/Bus'

export default {
  name: 'letter',
  data () {
    return {
      ctx: null
    }
  },
  props: ['letter'],
  mounted () {
    this.ctx = this.$refs.canvas.getContext('2d');
    this.createLetter();
  },
  watch: {
    letter () {
      this.createLetter();
    }
  },
  methods: {
    createLetter () {
      let ctx = this.ctx;
      ctx.textAlign = 'center'
      ctx.font = '100px Georgia'
      ctx.fillStyle = 'blue'
      ctx.fillText(this.letter, 50, 80)
      let pix = ctx.getImageData(0, 0, 100, 100).data
      let dotNodes = []
      for (let i = pix.length - 1; i >= 0; i -= 4) {
        if (pix[i] !== 0) {
          let x = Math.floor(i / 4) % 100
          let y = Math.floor(Math.floor(i / 100) / 4)
          if ((x && x % 2 === 0) && (y && y % 2 === 0)) {
            dotNodes.push({x: x, y: y})
          }
          // dotNodes.push({x: x, y: y})
        }
      }
      setTimeout(() => {
        Bus.$emit('dots', dotNodes)
        ctx.clearRect(0, 0, 100, 100);
      }, 500)
    }
  }
}
</script>

<style scoped>
  canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    z-index: 3;
  }
</style>
