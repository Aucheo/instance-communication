<template>
  <div class="chat-page-container">
    <navigator :style="navigatorStyle">
      <template v-slot:left>
        <font-awesome-icon class="back" icon="chevron-left" @click="goBack"/>
      </template>
      <template v-slot:center>
        <span class="user-nick-name">hhh</span>
      </template>
    </navigator>
    <input-area></input-area>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { reactive } from 'vue';
import Navigator from '../../components/Navigator.vue';
import InputArea from '@/views/chatPage/components/InputArea.vue';

export default {
  name: 'ChatPage',
  components: {
    FontAwesomeIcon,
    Navigator,
    InputArea
  },
  setup() {
    library.add(faChevronLeft);
    const navigatorStyle = reactive({
      backgroundColor: 'rgba(244,244,244,1)'
    });
    function goBack() {
      console.log(123);
    }
    return {
      navigatorStyle,
      goBack
    };
  }
};
</script>

<style scoped lang="less">
.chat-page-container {
  background-color: rgba(244,244,244,1);
  .back {
    font-size: @rpx * 40vw;
  }
  .user-nick-name {
    line-height: @rpx * 56vw;
    font-size: @rpx * 40vw;
  }
}
</style>
