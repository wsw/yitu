<template>
  <span class="checkbox-input"
        :class="{'is-checked': item.state, 'is-indeterminate': item.indeterminate}"
        @click="onChange">
    <span class="checkbox-state"></span>
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
  .checkbox-input {
    line-height: 24px;
    position: relative;
    cursor: pointer;
  }
  .checkbox-state {
    margin-top: -3px;
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),
          background-color .25s cubic-bezier(.71,-.46,.29,1.46);
  }
  .checkbox-input.is-checked .checkbox-state:after {
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    width: 3px;
    transform: rotate(45deg) scaleY(1);
    transform-origin: center;
  }
  .checkbox-input.is-indeterminate .checkbox-state,
  .checkbox-input.is-checked .checkbox-state {
    background-color: #409eff;
    border-color: #409eff;
  }
  .checkbox-input.is-indeterminate .checkbox-state::before {
    content: "";
    position: absolute;
    display: block;
    background-color: #fff;
    height: 2px;
    transform: scale(.5);
    left: 0;
    right: 0;
    top: 5px;
  }
</style>
