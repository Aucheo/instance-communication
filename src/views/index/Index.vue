<!--
 * @Author: Aucheo
 * @Date: 2021-09-06 16:48:42
 * @LastEditTime: 2021-09-16 14:51:25
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\views\index\Index.vue
-->
<template>
  <navigator>
    <template v-slot:left>
      <img class="head-img" src="@/assets/img/index/title.png" alt="用户头像">
    </template>
    <template v-slot:center>
      <img class="logo" src="@/assets/img/index/title.png" alt="logo">
    </template>
    <template v-slot:right>
      <img class="search" src="@/assets/img/index/search.png" alt="搜索键">
      <img class="add" src="@/assets/img/add.png" alt="添加键">
    </template>
  </navigator>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
  <chat-card></chat-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import navigator from '@/components/Navigator.vue';
import chatCard from './components/ChatCard.vue';

export default {
  name: 'index',
  components: {
    navigator,
    chatCard
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    if (store.state.userId === '') {
      router.replace({
        path: '/signIn'
      });
    }
  }
};
</script>

<style scoped lang="less">
.head-img {
  width: @rpx * 68vw;
  height: @rpx * 68vw;
  border-radius: @rpx * 16vw;
}

.logo {
  width: @rpx * 88vw;
}

.search {
  width: @rpx * 52vw;
  margin-right: @rpx * 20vw;
}

.add {
  width: @rpx * 48vw;
}
</style>
