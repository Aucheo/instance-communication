/*
 * @Author: Aucheo
 * @Date: 2021-09-16 12:07:02
 * @LastEditTime: 2021-09-16 12:25:06
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\network\signIn.ts
 */
import { post } from './request';

export function getSignIn(params: unknown) {
  return post('/signIn', {
    params
  });
}