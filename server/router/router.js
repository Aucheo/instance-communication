/*
 * @Author: Aucheo
 * @Date: 2021-09-15 19:16:54
 * @LastEditTime: 2021-09-22 23:20:04
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\server\router\router.js
 */
const express = require('express');
const mongoose = require('mongoose');
const sha256 = require('sha256');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

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
  },
  userHeadImg: {
    type: String,
    default: 'public/userHeadImg/defaultUserHeadImg.jpg'
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
// 注册
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
// 登录
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
// 校验session
router.get('/checkSession', (req, res) => {
  if (req.session.user) {
    res.json({ userId: req.session.user['_id'] });
  } else {
    res.send();
  }
});
// 默认页
router.get('/', (req, res) => {
  res.json({
    userHeadImg: req.session.user.userHeadImg
  });
});
// 上传文件
router.post('/postFile', (req, res, next) => {
  const form = new formidable.IncomingForm();
  // 设置文件的放置位置
  form.uploadDir = 'public/';
  // 保持文件的拓展名，不设置的话文件将没有拓展名
  form.keepExtensions = true;
  let oldPath = '';
  let newPath = '';
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }
    // 文件格式的内容将在files对象中以各个属性存在
    const file = files.file;
    // 非文件格式的内容将成为fields对象的属性，切记。。。
    const type = fields.type;
    oldPath = file.path;
    const date = new Date();
    // 新路径为 type + Date + Sault + ext
    newPath = `public/${type}/${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${Math.random() * 1000}${path.extname(file.name)}`;
    // 将文件搬移到对应的位置，要注意的是目的地的文件夹要已经存在，否则将会报错
    fs.rename(oldPath, newPath, (reason) => {
      if (reason) {
        throw reason;
      }
      // 寻早对应的对象,并将内容更新,此处第三个options参数要写成 { new: true },否则data中获取到的内容将不是更新前的内容
      User.findByIdAndUpdate(req.session.user['_id'], {
        userHeadImg: newPath
      }, { new: true }, (err, data) => {
        if (err) {
          next(err);
        }
        // 及时更新req.session.user的引用,此时已经不是之前的data了
        req.session.user = data;
        switch (type) {
          case 'userHeadImg':
            res.json({
              userHeadImg: req.session.user.userHeadImg
            });
            break;
          default:
            break;
        }
      });
    });
  });
});
// 错误处理
router.use((err, req, res, next) => {
  console.log('Server running error!');
  res.status(500).send();
});

module.exports = router;