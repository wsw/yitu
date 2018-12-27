<template>
  <div>
    <input @click.stop="show"
           type="button"
           class="button"
           v-model="select">
    <div class="selector" v-if="selectorShow" @click.stop>
      <tree-node></tree-node>
    </div>
  </div>
</template>

<script>
import TreeNode from '../components/TreeNode';
import Bus from '../common/Bus'
export default {
  name: 'selector',
  components: { TreeNode },
  data () {
    return {
      select: '选择摄像头',
      selectorShow: false
    }
  },
  created () {
    Bus.$on('selector', (nodes) => {
      if (nodes.length > 0) {
        this.select = `已选择${nodes.length}个摄像头`
      } else {
        this.select = '选择摄像头'
      }
    })
    document.addEventListener('click', (e) => {
      this.selectorShow = false
    })
  },
  methods: {
    show () {
      this.selectorShow = !this.selectorShow;
    }
  }
}
</script>

<style scoped>
  .button {
    width: 300px;
    height: 40px;
    line-height: 100%;
    border: 1px solid #ccc;
    font-size: 16px;
    text-align: left;
    color: #666;
    margin-top: 10px;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
  }
  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: transparent;
    z-index: 0;
  }
  .selector {
    width: 300px;
    margin-top: 10px;
    border: 1px solid #ccc;
    max-height: 400px;
    overflow: auto;
    position: relative;
    z-index: 1;
  }
</style>
