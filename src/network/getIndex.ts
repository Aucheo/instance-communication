/*
 * @Author: Aucheo
 * @Date: 2021-09-22 21:07:41
 * @LastEditTime: 2021-09-22 21:14:35
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\network\getIndex.ts
 */
import { AxiosRequestConfig } from 'axios';
import { get } from './request';

export function getIndex(config: AxiosRequestConfig | undefined): any {
  return get('/', config);
}