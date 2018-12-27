<template>
  <div>
    <input @click.stop="show"
           type="button"
           class="button"
           v-model="select">
    <div class="selector" v-if="selectorShow" @click.stop>
      <tree-node
        :nodes="nodes"
        :filter="filter"
        @selecter="selecter"
        @filterChange="filterChange"></tree-node>
    </div>
  </div>
</template>

<script>
import TreeNode from '../components/TreeNode';
import TreeNodeClass from '../common/TreeNode'
import Data from '../common/data'

export default {
  name: 'selector',
  components: { TreeNode },
  data () {
    return {
      select: '选择摄像头',
      selectorShow: false,
      nodes: [],
      filter: ''
    }
  },
  created () {
    document.addEventListener('click', (e) => {
      this.selectorShow = false
    })
    this.nodes = TreeNodeClass.createTree(Data, null);
  },
  methods: {
    show () {
      this.selectorShow = !this.selectorShow;
    },
    filterChange (filter) {
      this.filter = filter
    },
    selecter (resultNodes) {
      if (resultNodes.length > 0) {
        this.select = `已选择${resultNodes.length}个摄像头`
      } else {
        this.select = '选择摄像头'
      }
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
