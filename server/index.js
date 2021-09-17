/*
 * @Author: Aucheo
 * @Date: 2021-09-15 19:06:09
 * @LastEditTime: 2021-09-16 12:43:21
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\server\index.js
 */
const express = require('express');
const cors = require('cors');
const router = require('./router/router');

const app = express();
app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(3000, () => {
  console.log('Serve is listening!');
});