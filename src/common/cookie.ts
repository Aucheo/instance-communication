/*
 * @Author: Aucheo
 * @Date: 2021-09-18 23:16:54
 * @LastEditTime: 2021-09-19 10:58:11
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\common\cookie.ts
 */
export default {
  addCookie(name: string, value: string): void {
    document.cookie = `${name}=${value}`;
  },
  deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
  showCookie(): { [key: string]: string } {
    const cookieObj: { [key: string]: string } = {};
    const cookieArray = document.cookie.split('; ');
    cookieArray.forEach((item: string) => {
      const itemArray = item.split('=');
      cookieObj[`${itemArray[0]}`] = itemArray[1];
    });
    return cookieObj;
  }
};