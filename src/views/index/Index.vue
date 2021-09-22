<!--
 * @Author: Aucheo
 * @Date: 2021-09-06 16:48:42
 * @LastEditTime: 2021-09-22 21:30:48
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\views\index\Index.vue
-->
<template>
  <navigator>
    <template v-slot:left>
      <img class="head-img" :src="userHeadImg" alt="用户头像">
    </template>
    <template v-slot:center>
      <img class="logo" src="@/assets/img/index/title.png" alt="logo">
    </template>
    <template v-slot:right>
      <img class="search" src="@/assets/img/index/search.png" alt="搜索键">
      <img class="add" src="@/assets/img/add.png" alt="添加键">
    </template>
  </navigator>
  <input type="file" @input="upLoadHeadImg">
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
import { ref } from 'vue';
import navigator from '@/components/Navigator.vue';
import chatCard from './components/ChatCard.vue';

import { getIndex } from '@/network/getIndex';
import { postFile } from '@/network/postFile';
import baseConfig from '@/common/baseConfig';

export default {
  name: 'index',
  components: {
    navigator,
    chatCard
  },
  setup() {
    const userHeadImg = ref('');
    getIndex({}).then((value: any) => {
      userHeadImg.value = `${baseConfig.host}${value.userHeadImg}`;
    }, (reason: any) => {
      console.log(reason);
    });
    function upLoadHeadImg(e: any) {
      const fileList = e.target.files;
      if (fileList.length) {
        const file = new FormData();
        file.append('file', fileList[0]);
        file.append('type', 'userHeadImg');
        postFile(file).then((value: any) => {
          userHeadImg.value = `${baseConfig.host}${value.userHeadImg}`;
        });
      }
    }
    return {
      userHeadImg,
      upLoadHeadImg
    };
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
