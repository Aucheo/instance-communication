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
import navigator from '@/components/Navigator.vue';
import chatCard from './components/ChatCard.vue';

export default {
  name: 'index',
  components: {
    navigator,
    chatCard
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
