<template>
  <div class="tree-node-item">
    <check-box :item="item" @onChange="onChange">{{item.name}}</check-box>
    <template v-for="node in item.children">
      <tree-node-item @onChange="onChange" :key="node.id" :item="node"></tree-node-item>
    </template>    
  </div>
</template>

<script>
import CheckBox from './CheckBox';
export default {
  name: 'treeNodeItem',
  components: { CheckBox },
  props: {
    item: {
      type: Object, required: true
    }
  },
  methods: {
    onChange(item) {
      this.$emit('onChange', item)
    }
  }
}
</script>