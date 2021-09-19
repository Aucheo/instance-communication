/*
 * @Author: Aucheo
 * @Date: 2021-09-15 19:06:09
 * @LastEditTime: 2021-09-19 18:13:30
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\server\index.js
 */
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const router = require('./router/router');

const app = express();
// cors解决跨域
app.use(cors({
  origin: ['http://127.0.0.1:8080'],
  methods: ['GET', 'POST'],
  credentials: true
}));
// 解析post的参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 设置session
app.use(session({
  resave: true, //添加 resave 选项,即每次请求都更新一次时间
  saveUninitialized: true, //添加 saveUninitialized 选项，即每个请求都设置一个cookie
  secret: '9abe8ca921c546af7eee8c66bf1fd0ae7ade513a22bb9747c2cff1e96f40f0fca7a14b3f267d60df1958cd47d0eae35a0dcc46660cad114651eb92bad229e0aa', // secret中的内容将会被加入哈希的计算，保证该session是由本地发出，避免被伪造
  cookie: {
    maxAge: 60 * 60 * 1000 // 60分钟的定时
  }
}));
// 使用路由
app.use(router);
// 监听端口
app.listen(3000, () => {
  console.log('Serve is listening!');
});