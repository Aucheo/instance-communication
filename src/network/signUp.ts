/*
 * @Author: Aucheo
 * @Date: 2021-09-16 18:54:23
 * @LastEditTime: 2021-09-16 22:32:49
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\network\signUp.ts
 */
import { get, post } from './request';

function checkUserName(query: any) {
  return get('/signUp/checkUserName', { params: query });
}

function checkUserMail(query: any) {
  return get('/signUp/checkUserMail', { params: query });
}

function registerUser(params: any) {
  return post('/signUp', { params });
}

export { checkUserName, checkUserMail, registerUser };