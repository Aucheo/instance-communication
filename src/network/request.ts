/*
 * @Author: Aucheo
 * @Date: 2021-09-16 11:01:39
 * @LastEditTime: 2021-09-21 20:45:44
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\network\request.ts
 */
import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 5000,
  withCredentials: true
});
instance.interceptors.response.use((value) => value.data, (reason) => reason);

function get(url: string, config: AxiosRequestConfig | undefined) {
  return instance.get(url, config);
}
function post(url: string, data: any, config: AxiosRequestConfig | undefined = {}) {
  return instance.post(url, data, config);
}
export { get, post };