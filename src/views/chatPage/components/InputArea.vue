<template>
  <div class="input-container">
    <img class="icon-img" src="@/assets/img/chatPage/voice.png" alt="输入切换">
    <div class="input-area-container">
      <textarea
        ref="textRel"
        class="input"
        type="text"
        v-model="inputContent"
      >
      </textarea>
      <div class="input-place-holder">{{inputContent}}</div>
    </div>
    <img class="icon-img" src="@/assets/img/chatPage/emoji.png" alt="表情">
    <img v-if="isShowAdd" class="icon-img" src="@/assets/img/add.png" alt="发送">
    <button class="send-button" v-else>发送</button>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
  name: 'InputArea',
  setup(): unknown {
    const textRel = ref(null);
    const inputContent = ref('');
    const isShowAdd = ref(true);

    watch(inputContent, (newValue) => {
      if (newValue === '') {
        isShowAdd.value = true;
      } else {
        isShowAdd.value = false;
      }
    });
    return {
      textRel,
      inputContent,
      isShowAdd
    };
  }
};
</script>

<style scoped lang="less">
.input-container {
  display: flex;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  border-top: 1px solid rgba(235,235,235,1);
  padding: @rpx * 20vw @rpx * 14vw;
  background-color: rgba(244,244,244,.1);
  .input-area-container {
    flex: 1 0 0;
    align-self: stretch;
    position: relative;
    overflow: hidden;
    .input {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: @rpx * 5vw;
      overflow-y:hidden;
    }
    .input-place-holder {
      width: 100%;
      opacity: 0;
      word-wrap:break-word;
    }
  }
  .icon-img {
    width: @rpx * 56vw;
    height: @rpx * 56vw;
    padding: 0 @rpx * 12vw;
  }
  .send-button {
    width: @rpx * 100vw;
    height: @rpx * 56vw;
    padding: 0 @rpx * 12vw;
    border-radius: @rpx * 5vw;
    color: rgba(255,255,255,1);
    background: rgba(7,193,96,1);
  }
}
</style>
