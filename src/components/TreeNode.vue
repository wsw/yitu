<template>
  <div>
    <template v-for="node in nodes">
      <tree-node-item @onChange="onChange" :key="node.id" :item="node"></tree-node-item>
    </template>
  </div>
</template>

<script>
import TreeNodeItem from './TreeNodeItem.vue'
import Data from '../common/data'
import TreeNode from '../common/TreeNode'
export default {
  name: 'treeNode',
  components: { TreeNodeItem },
  data () {
    return {
      nodes: []
    }
  },
  created () {
    this.nodes = Data.map(val => {
      val.children = val.children.map(v => {
        return new TreeNode(v.id, v.name);
      })
      return new TreeNode(val.id, val.name, val.children);
    })
    console.log(this.nodes)
  },
  methods: {
    onChange(item) {
      if (item.leaf) {
        item.state = !item.state
      }
    }
  }
}
</script>
