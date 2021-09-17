<!--
 * @Author: Aucheo
 * @Date: 2021-09-10 15:24:49
 * @LastEditTime: 2021-09-12 16:55:51
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\views\chatPage\ChatPage.vue
-->
<template>
  <div class="chat-page-container">
    <navigator :style="navigatorStyle">
      <template v-slot:left>
        <font-awesome-icon class="back" icon="chevron-left" @click="goBack"/>
      </template>
      <template v-slot:center>
        <span class="user-nick-name">{{userNickName}}</span>
      </template>
    </navigator>
    <div class="message-area"></div>
    <input-area ref="inputRef"></input-area>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
    const inputRef = ref(null);
    library.add(faChevronLeft);
    const navigatorStyle = reactive({
      backgroundColor: 'rgba(244,244,244,1)'
    });
    const router = useRouter();
    const route = useRoute();
    function goBack() {
      router.back();
      console.log(route);
    }
    const obj = route.query;
    return {
      inputRef,
      navigatorStyle,
      goBack,
      ...obj
    };
  }
};
</script>

<style scoped lang="less">
.chat-page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: rgba(244,244,244,1);
  .back {
    font-size: @rpx * 40vw;
  }
  .user-nick-name {
    line-height: @rpx * 56vw;
    font-size: @rpx * 40vw;
  }
  .message-area {
    flex-grow: 1;
  }
}
</style>
