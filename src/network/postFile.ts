/*
 * @Author: Aucheo
 * @Date: 2021-09-21 19:56:44
 * @LastEditTime: 2021-09-21 20:45:22
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\network\postFile.ts
 */
import { post } from './request';

export function postFile(data: any, config: any = {}) {
  return post('postFile', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  });
}