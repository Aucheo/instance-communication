<!--
 * @Author: Aucheo
 * @Date: 2021-09-16 12:59:42
 * @LastEditTime: 2021-09-19 18:19:03
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\views\signUp\signUp.vue
-->
<template>
  <navigator :style="navigatorStyle">
    <template v-slot:left>
      <font-awesome-icon
        class="font-icon"
        icon="chevron-left"
        @click="goBack"
      />
    </template>
    <template v-slot:right>
      <font-awesome-icon class="font-icon" icon="times" @click="goBack" />
    </template>
  </navigator>
  <div class="content-container">
    <div class="logo-container">
      <img class="logo" src="@/assets/img/index/title.png" alt="" />
    </div>
    <div class="welcome-sign-up">注册</div>
    <div class="sign-up-container">
      <div class="sign-up-input-container">
        <input
          class="sign-up-input"
          placeholder="请取个名字"
          type="text"
          v-model="userName"
          @input="checkUserNameExistence"
        />
        <div class="input-control" v-if="isShowUserNameTip">
          <font-awesome-icon
            v-if="isNewUserName"
            class="allow-icon"
            icon="check-circle"
          />
          <span v-else class="existencen-info">名字已存在</span>
        </div>
      </div>
      <div class="sign-up-input-container">
        <input
          class="sign-up-input"
          placeholder="请输入邮箱"
          type="text"
          v-model="userMail"
          @input="checkUserMailExistence"
        />
        <div class="input-control" v-if="isShowUserMailTip">
          <font-awesome-icon
            v-if="isNewUserMail"
            class="allow-icon"
            icon="check-circle"
          />
          <span v-else class="existencen-info">邮箱已注册</span>
        </div>
      </div>
      <div class="sign-up-input-container">
        <input
          class="sign-up-input"
          placeholder="这里输入密码"
          :type="passwordType"
          v-model="userPassword"
          @input="checkUserPasswordValidity"
        />
        <div class="input-control">
          <span v-if="isShowUserPasswordTip">
            <font-awesome-icon
              v-if="isValidPassword"
              class="allow-icon"
              icon="check-circle"
            />
            <span v-else class="existencen-info">密码格式错误</span>
          </span>
          <span @click="changePasswordType">
            <font-awesome-icon v-if="isShowPassword" icon="eye" />
            <font-awesome-icon v-else icon="eye-slash" />
          </span>
          <span class="password-format-tip">
            <ul>
              <li>长度为6-12个字符</li>
              <li>必须包含数字以及字母</li>
            </ul>
            <font-awesome-icon icon="info-circle" />
          </span>
        </div>
      </div>
      <button
        :class="[
          'sign-up-button',
          isButtonDisabled ? '' : 'sign-up-button-active'
        ]"
        @click="signUpClick"
      >
        <span>注册</span>
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faTimes,
  faEyeSlash,
  faEye,
  faCheckCircle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import Navigator from '@/components/Navigator.vue';
import { checkUserName, checkUserMail, registerUser } from '@/network/signUp';

const sha256 = require('sha256');

export default {
  name: 'SignUp',
  components: {
    Navigator,
    FontAwesomeIcon
  },
  setup(): unknown {
    // 导航样式
    const navigatorStyle = reactive({
      borderBottom: 'none'
    });
    // 添加icon
    library.add(
      faChevronLeft,
      faTimes,
      faEyeSlash,
      faEye,
      faCheckCircle,
      faInfoCircle
    );
    // Vuex
    const store = useStore();
    // 路由
    const router = useRouter();
    function goBack() {
      router.back();
    }
    // 用户名
    const userName = ref('');
    const isShowUserNameTip = ref(false);
    const isNewUserName = ref(false);
    function checkUserNameExistence() {
      if (userName.value === '') {
        isNewUserName.value = false;
        isShowUserNameTip.value = false;
      } else {
        checkUserName({
          userName: sha256(userName.value)
        }).then((value: any) => {
          isShowUserNameTip.value = true;
          isNewUserName.value = value.isNewUserName;
        });
      }
    }
    // 邮箱
    const userMail = ref('');
    const isShowUserMailTip = ref(false);
    const isNewUserMail = ref(true);
    function checkUserMailExistence() {
      if (userMail.value === '') {
        isNewUserMail.value = false;
        isShowUserMailTip.value = false;
      } else {
        checkUserMail({
          userMail: sha256(userMail.value)
        }).then((value: any) => {
          isShowUserMailTip.value = true;
          isNewUserMail.value = value.isNewUserMail;
        });
      }
    }
    // 密码
    const userPassword = ref('');
    const isShowUserPasswordTip = ref(false);
    const isValidPassword = ref(false);
    const passwordReg = new RegExp(/^(?![0-9]+$)(?![A-z]+$)[0-9A-z]{6,10}$/);
    function checkUserPasswordValidity() {
      if (userPassword.value === '') {
        isShowUserPasswordTip.value = false;
        isValidPassword.value = false;
      } else {
        isValidPassword.value = passwordReg.test(userPassword.value);
        isShowUserPasswordTip.value = true;
      }
    }
    const isShowPassword = ref(false);
    const passwordType = ref('password');
    function changePasswordType() {
      isShowPassword.value = !isShowPassword.value;
      if (isShowPassword.value) {
        passwordType.value = 'text';
      } else {
        passwordType.value = 'password';
      }
    }
    // 点击注册
    const isButtonDisabled = computed(
      () => !(isNewUserName.value && isNewUserMail.value && isValidPassword.value)
    );
    function signUpClick() {
      if (isButtonDisabled.value) {
        console.log('hhh');
      } else {
        registerUser({
          userName: sha256(userName.value),
          userMail: sha256(userMail.value),
          userPassword: sha256(userPassword.value)
        }).then((value: any) => {
          if (value.res) {
            store.commit('changeUserId', value.userId);
            router.replace('/');
          }
        });
      }
    }
    return {
      navigatorStyle,
      goBack,
      userName,
      userMail,
      userPassword,
      isShowUserNameTip,
      isNewUserName,
      checkUserNameExistence,
      isShowUserMailTip,
      isNewUserMail,
      checkUserMailExistence,
      checkUserPasswordValidity,
      isShowUserPasswordTip,
      isValidPassword,
      isShowPassword,
      passwordType,
      changePasswordType,
      isButtonDisabled,
      signUpClick
    };
  }
};
</script>

<style lang='less'>
.font-icon {
  font-size: @rpx * 48vw;
}
.content-container {
  padding: 0 @rpx * 62vw;
  .logo-container {
    margin-top: @rpx * 80.2vw;
    margin-bottom: @rpx * 58.8vw;
    text-align: center;
    .logo {
      width: @rpx * 199.8vw;
      height: @rpx * 87vw;
    }
  }
  .welcome-sign-up {
    font-size: @rpx * 56vw;
    margin-bottom: @rpx * 14vw;
  }
  .sign-up-container {
    font-size: @rpx * 32vw;
    .sign-up-input-container {
      margin-top: @rpx * 70vw;
      .sign-up-input {
        width: 100%;
        border: none;
        outline: none;
        border-bottom: @rpx * 1vw rgba(39, 40, 50, 0.1) solid;
        line-height: 1.5;
        background-color: transparent;
      }
      .input-control {
        position: relative;
        float: right;
        margin-left: -100%;
        z-index: 1;
        .existencen-info {
          color: rgba(220, 20, 60, 1);
        }
        .allow-icon {
          color: rgba(25, 71, 255, 1);
        }
        .password-format-tip {
          padding-left: @rpx * 5vw;
          ul {
            visibility: hidden;
            position: absolute;
            top: 0;
            transform: translate(-73%, -100%);
            width: max-content;
            padding: @rpx * 10vw @rpx * 20vw @rpx * 40vw;
            line-height: 1.5;
            color: rgba(255, 255, 255, 1);
            background: url('../../assets/img/signUp/password-format-tip.png')
              center center/100% 100% no-repeat;
          }
          &:active {
            ul {
              visibility: inherit;
            }
          }
        }
      }
    }
    .sign-up-button {
      margin: @rpx * 120vw auto 0;
      border: none;
      width: @rpx * 520vw;
      line-height: @rpx * 96vw;
      font-size: @rpx * 32vw;
      border-radius: @rpx * 48vw;
      text-align: center;
      &-active {
        background-color: rgba(255, 228, 49, 1);
      }
    }
  }
}
</style>