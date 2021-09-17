/*
 * @Author: Aucheo
 * @Date: 2021-09-15 19:16:54
 * @LastEditTime: 2021-09-17 15:52:55
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\server\router\router.js
 */
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/instance-communication');
const { Schema } = mongoose;
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  userMail: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  }
});
const User = mongoose.model('User', UserSchema);

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ok');
});
// 校验用户名是否重复
router.get('/signUp/checkUserName', (req, res, next) => {
  User.findOne({ userName: req.query.userName }, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(JSON.stringify({ isNewUserName: data === null }));
    }
  });
});
// 校验邮箱是否重复
router.get('/signUp/checkUserMail', (req, res, next) => {
  console.log(req.query.userMail);
  User.findOne({ userMail: req.query.userMail }, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(JSON.stringify({ isNewUserMail: data === null }));
    }
  });
});
router.post('/signUp', (req, res) => {
  const newUser = new User({
    userName: req.body.params.userName,
    userMail: req.body.params.userMail,
    userPassword: req.body.params.userPassword
  });
  console.log(req.body.params);
  newUser.save((err, data, next) => {
    if (err) {
      next(err);
    } else {
      res.send(JSON.stringify({
        res: true,
        userId: data['_id']
      }));
    }
  });
});
router.use((err, req, res) => {
  res.status(500).send('服务器出错');
});

module.exports = router;