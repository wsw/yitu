<template>
  <div class="container">
    <letter :letter="letter"></letter>
    <div class="dots">
      <i
        v-for="(dot, i) in dots"
        :style="{left: dot.x + 'px', top: dot.y + 'px', opacity: dot.opacity}"
        :key="i"></i>
    </div>
  </div>
</template>

<script>
import Letter from '../components/Letter'
import Bus from '../common/Bus'

export default {
  components: {Letter},
  data () {
    return {
      dots: [],
      letter: 'A',
      speed: 0, // 增加的距离
      count: 100, // 一次的重绘次数
      repeat: 0,
      words: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'X', 'Y', 'Z'],
      wordIndex: 0,
      next: false
    }
  },
  created () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    Bus.$on('dots', (dots) => {
      this.dots = dots.map((dot, i) => {
        // 爆炸后的随机的目标位置
        dot.targetX = (width + 500) * (Math.random() - 0.5)
        dot.targetY = (height + 500) * (Math.random() - 0.5)
        dot.disX = (dot.targetX - dot.x) / this.count
        dot.disY = (dot.targetY - dot.y) / this.count
        dot.opacity = 1
        return dot;
      })
      this.speed = 0
      this.repeat = 0
      this.reCal()
    })
  },
  methods: {
    reCal () {
      this.repeat++
      // 模拟加减速度
      this.speed += this.repeat <= 25 ? 0.1 : -0.035
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].x += this.dots[i].disX * this.speed
        this.dots[i].y += this.dots[i].disY * this.speed
        this.dots[i].opacity = (100 - this.repeat) / this.count
      }
      if (this.repeat < this.count) {
        requestAnimationFrame(this.reCal)
        if (this.repeat + 5 > this.count && !this.next) {
          this.next = true
          this.wordIndex = ++this.wordIndex % this.words.length
          this.letter = this.words[this.wordIndex]
        }
      } else {
        this.next = false
      }
    }
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
    overflow: hidden;
  }
  .container .dots {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    z-index: 4;
    background: transparent;
  }
  .container i {
    position: absolute;
    z-index: 4;
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background: blue;
  }
</style>
