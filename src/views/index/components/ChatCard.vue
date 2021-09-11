<template>
  <div class="chat-card-container" @click="clickCard">
    <div class="user-img-container">
      <div :class="['user-tips', userInfo.tips > 9 ? 'user-tips-over' : '']">
        {{tipString}}
      </div>
      <img class="user-img" :src="userInfo.userHeadImg" alt="用户头像">
    </div>
    <div class="user-info">
      <div class="user-name-time">
        <span class="user-nick-name">
          {{userInfo.userNickName}}
        </span>
        <span class="chat-time">
          {{userInfo.chatTime}}
        </span>
      </div>
      <div class="chat-message">
        {{userInfo.userMessage}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'chatCard',
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          userHeadImg: require('@/assets/img/index/search.png'),
          userNickName: '傻逼钟某',
          userMessage: '傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼',
          chatTime: '9:12',
          tips: 9,
          userId: '112'
        };
      }
    }
  },
  computed: {
    tipString(): string {
      let str = `${this.userInfo && this.userInfo.tips}`;
      if (this.userInfo && this.userInfo.tips > 99) {
        str = '···';
      }
      return str;
    }
  },
  methods: {
    clickCard(): void {
      this.$router.push({
      });
    }
  }
});
</script>

<style scoped lang="less">
.chat-card-container {
  height: @rpx * 96vw;
  padding: 0 @rpx * 32vw;
  margin-top: @rpx * 40vw;

  .user-img-container {
    height: 100%;
    position: relative;
    float: left;
    width: @rpx * 96vw;
    border-radius: @rpx * 24vw;
    background-color: rgba(255,228,49,1);
    .user-tips {
      width: @rpx * 36vw;
      line-height: @rpx * 36vw;
      border-radius: 50%;
      background-color: rgba(255,93,91,1);
      position: absolute;
      right: 0;
      transform: translate(50%, -50%);
      text-align: center;
    }
    .user-tips-over {
      width: @rpx * 48vw;
      border-radius: @rpx * 18vw;
    }
    .user-img {
      width: 100%;
      height: 100%;
    }
  }

  .user-info {
    margin-left: @rpx * 128vw;
    .user-name-time {
      display: flex;
      justify-content: space-between;
      line-height: @rpx * 50vw;
      .user-nick-name {
        font-size: @rpx * 36vw;
        color: rgba(39,40,50,1);
      }
      .chat-time {
        font-size: @rpx * 24vw;
        color: rgba(39,40,50,.4);
      }
    }
    .chat-message {
      line-height: @rpx * 50vw;
      font-size: @rpx * 28vw;
      color: rgba(39,40,50,.6);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
