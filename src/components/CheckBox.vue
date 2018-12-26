<template>
  <span class="checkbox__input is-indeterminate" @click="onChange">
    <span class="checkbox-state">{{item.state}}</span>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'checkbox',
  props: ['item'],
  methods: {
    onChange () {
      this.$emit('onChange', this.item)
    }
  }
}
</script>

<style scoped>
  .checkbox__original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }
</style>
