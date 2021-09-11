<template>
  <div class="navigator-container" :style="style">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'navigator',
  props: {
    style: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped lang="less">
.navigator-container {
  height: @rpx * 88vw;
  padding: 0 @rpx * 32vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(235,235,235,1);
}
</style>
