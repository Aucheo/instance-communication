/*
 * @Author: Aucheo
 * @Date: 2021-09-16 11:01:39
 * @LastEditTime: 2021-09-16 12:17:03
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\network\request.ts
 */
import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 1000
});
instance.interceptors.response.use((value) => value.data, (reason) => reason);

function get(url: string, config: AxiosRequestConfig | undefined) {
  return instance.get(url, config);
}
function post(url: string, config: { params: unknown; }) {
  return instance.post(url, config);
}
export { get, post };