/*
 * @Author: Aucheo
 * @Date: 2021-09-19 16:01:43
 * @LastEditTime: 2021-09-19 16:02:45
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\network\session.ts
 */
import { get } from './request';

export function checkSession() {
  return get('/checkSession', {});
}