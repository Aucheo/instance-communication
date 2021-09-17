/*
 * @Author: Aucheo
 * @Date: 2021-09-06 16:33:36
 * @LastEditTime: 2021-09-17 16:01:23
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\store\index.ts
 */
import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: ''
  },
  mutations: {
    changeUserId(state, newValue) {
      state.userId = newValue;
    }
  },
  actions: {
  },
  modules: {
  }
});
