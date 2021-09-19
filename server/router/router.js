/*
 * @Author: Aucheo
 * @Date: 2021-09-15 19:16:54
 * @LastEditTime: 2021-09-19 18:03:52
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\server\router\router.js
 */
const express = require('express');
const mongoose = require('mongoose');
const sha256 = require('sha256');

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

// 校验用户名是否重复
router.get('/signUp/checkUserName', (req, res, next) => {
  User.findOne({
    userName: sha256(req.query.userName)
  }, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(JSON.stringify({ isNewUserName: data === null }));
    }
  });
});
// 校验邮箱是否重复
router.get('/signUp/checkUserMail', (req, res, next) => {
  User.findOne({
    userMail: sha256(req.query.userMail)
  }, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(JSON.stringify({ isNewUserMail: data === null }));
    }
  });
});
router.post('/signUp', (req, res) => {
  const newUser = new User({
    userName: sha256(req.body.params.userName),
    userMail: sha256(req.body.params.userMail),
    userPassword: sha256(req.body.params.userPassword)
  });
  newUser.save((err, data, next) => {
    if (err) {
      next(err);
    } else {
      req.session.user = data;
      res.send(JSON.stringify({
        res: true,
        userId: data['_id']
      }));
    }
  });
});
router.post('/signIn', (req, res) => {
  User.findOne({
    userName: sha256(req.body.params.userName),
    userPassword: sha256(req.body.params.userPassword)
  }, (err, data, next) => {
    if (err) {
      next(err);
    } else {
      req.session.user = data;
      res.send(JSON.stringify({
        res: !!data,
        userId: data ? data['_id'] : ''
      }));
    }
  });
});
router.get('/checkSession', (req, res) => {
  if (req.session.user) {
    res.json({ userId: req.session.user['_id'] });
  } else {
    res.send();
  }
});
router.get('/', (req, res) => {
  res.send('ok');
});
router.use((err, req, res, next) => {
  console.log('Server running error!');
  res.status(500).send();
});

module.exports = router;