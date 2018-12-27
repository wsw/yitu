<template>
  <div class="tree-node">
    <div class="top">
      <span>请选择摄像头</span>
      <span class="btn" @click="clear">清空</span>
      <span class="btn" @click="all">全选</span>
    </div>
    <div>
      <input type="text" @input="filterChange" :value="filter" class="tree-filter" placeholder="请选择摄像头">
    </div>
    <template v-for="node in nodes">
      <tree-node-item @onChange="onChange" :key="node.id" :item="node"></tree-node-item>
    </template>
  </div>
</template>

<script>
import TreeNodeItem from './TreeNodeItem.vue'
import TreeNode from '../common/TreeNode'

export default {
  name: 'treeNode',
  components: { TreeNodeItem },
  props: {
    nodes: { type: Array, required: true },
    filter: { type: String }
  },
  watch: {
    filter () {
      this.nodesVisible(this.filter);
    }
  },
  methods: {
    onChange (item) {
      item.changeState(!item.state)
      this.result();
    },
    nodesVisible (filter) {
      this.nodes.map(node => {
        filter ? TreeNode.visibleHandle(node, filter)
          : TreeNode.resetVisible(node);
      })
      this.result();
    },
    clear () {
      this.nodes.map(node => TreeNode.clearSelect(node));
      this.result();
    },
    all () {
      this.nodes.map(node => TreeNode.allSelect(node));
      this.result();
    },
    result () {
      let result = [];
      TreeNode.getLeafs(this.nodes, result);
      this.$emit('selecter', result)
    },
    filterChange (e) {
      this.$emit('filterChange', e.target.value);
    }
  }
}
</script>

<style scoped>
  .tree-node {
    max-width: 400px;
    width: 100%;
    padding: 10px 10px;
  }
  .tree-filter {
    width: 100%;
    height: 30px;
    border: 1px solid #ccc;
    line-height: 30px;
    margin: 10px 0;
    outline: none;
    padding-left: 10px;
    font-size: 16px;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .top {
    text-align: left;
    font-weight: bold;
  }
  .btn {
    float: right;
    margin-left: 10px;
    font-weight: normal;
    cursor: pointer;
  }
</style>
