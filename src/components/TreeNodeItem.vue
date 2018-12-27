<template>
  <div class="tree-node-item" v-if="item.visible">
    <check-box :item="item" @onChange="onChange">
      <span @click.stop="collapse"
            v-if="item.children.length > 0"
            :class="{'spread': spread}"
            class="arrow"></span>
      {{item.name}}
    </check-box>
    <div v-if="spread">
      <template v-for="node in item.children">
        <tree-node-item @onChange="onChange" :key="node.id" :item="node"></tree-node-item>
      </template>
    </div>
  </div>
</template>

<script>
import CheckBox from './CheckBox';
export default {
  name: 'treeNodeItem',
  components: { CheckBox },
  data () {
    return {
      spread: true
    }
  },
  props: {
    item: {
      type: Object, required: true
    }
  },
  methods: {
    onChange (item) {
      this.$emit('onChange', item)
    },
    collapse () {
      this.spread = !this.spread
    }
  }
}
</script>

<style scoped>
  .tree-node-item {
    margin-left: 20px;
    text-align: left;
  }
  .tree-node-item .arrow {
    width:0;
    height:0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid black;
    position: absolute;
    left: -15px;
    top: 4px;
    transition: all .2s;
  }
  .tree-node-item .arrow.spread {
    transform: rotate(90deg);
  }
</style>
