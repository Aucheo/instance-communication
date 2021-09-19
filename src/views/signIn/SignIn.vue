<!--
 * @Author: Aucheo
 * @Date: 2021-09-15 17:38:28
 * @LastEditTime: 2021-09-19 18:15:54
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\views\signIn\SignIn.vue
-->
<template>
  <navigator :style="navigatorStyle">
    <template v-slot:right>
      <div class="sign-up-button" @click="signUpClick">注册</div>
    </template>
  </navigator>
  <div class="content-container">
    <div class="logo-container">
      <img class="logo" src="@/assets/img/index/title.png" alt="" />
    </div>
    <div class="welcome-sign-in">登录</div>
    <div class="welcom-message">您好，欢迎来到yike!</div>
    <div class="sign-in-container">
      <div :style="{opacity: +isShowSignInTip}" class="sign-in-tip">您输入的账号或密码有误！</div>
      <input
        class="sign-in-input"
        placeholder="用户名"
        type="text"
        v-model="userName"
      />
      <input
        class="sign-in-input"
        placeholder="密码"
        type="password"
        v-model="userPassword"
      />
      <div class="sign-in-button" @click="signInClick">
        <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Navigator from '@/components/Navigator.vue';
import { getSignIn } from '../../network/signIn';
import store from '@/store';
import cookieAction from '@/common/cookie';

const sha256 = require('sha256');

export default {
  name: 'SignIn',
  components: {
    Navigator
  },
  setup(): unknown {
    // 导航样式
    const navigatorStyle = reactive({
      borderBottom: 'none'
    });
    // 用户信息
    const userName = ref('');
    const userPassword = ref('');
    // 路由
    const router = useRouter();
    // 前往注册页
    function signUpClick() {
      router.push({
        path: '/signUp'
      });
    }
    // 是否展示登录tip
    const isShowSignInTip = ref(false);
    // 点击登录按钮
    function signInClick() {
      getSignIn({
        userName: sha256(userName.value),
        userPassword: sha256(userPassword.value)
      }).then(
        (value: any) => {
          if (value.res) {
            store.commit('changeUserId', value.userId);
            router.replace('/');
          } else {
            isShowSignInTip.value = true;
          }
        }
      );
    }
    return {
      navigatorStyle,
      userName,
      userPassword,
      signUpClick,
      isShowSignInTip,
      signInClick
    };
  }
};
</script>

<style lang='less'>
.sign-up-button {
  font-family: PingFangSC-Medium;
  font-size: @rpx * 36vw;
  color: rgba(51, 51, 51, 1);
}
.content-container {
  padding: 0 @rpx * 62vw;
  .logo-container {
    margin-top: @rpx * 80vw;
    margin-bottom: @rpx * 54.4vw;
    text-align: center;
    .logo {
      width: @rpx * 192vw;
      height: @rpx * 91.6vw;
    }
  }
  .welcome-sign-in {
    font-size: @rpx * 56vw;
    margin-bottom: @rpx * 14vw;
  }
  .welcom-message {
    font-size: @rpx * 40vw;
    color: rgba(39, 40, 50, 0.5);
    margin-bottom: @rpx * 72vw;
  }
  .sign-in-container {
    font-size: @rpx * 32vw;
    .sign-in-tip {
      opacity: 0;
      color: rgba(252, 67, 67, 1);
    }
    .sign-in-input {
      width: 100%;
      border: none;
      outline: medium;
      border-bottom: @rpx * 1vw rgba(39, 40, 50, 0.1) solid;
      margin-top: @rpx * 70vw;
      line-height: 1.5;
    }
    .sign-in-button {
      margin: @rpx * 120vw auto 0;
      width: @rpx * 520vw;
      line-height: @rpx * 96vw;
      font-size: @rpx * 32vw;
      border-radius: @rpx * 48vw;
      text-align: center;
      background-color: rgba(255, 228, 49, 1);
    }
  }
}
</style>
