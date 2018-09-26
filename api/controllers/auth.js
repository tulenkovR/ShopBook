const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../../config/key');

module.exports.login = async (req, res) => {
  const userDb = await User.findOne({
    email: req.body.email
  });
  if (userDb) {
    const passwordResult = bcrypt.compareSync(req.body.password, userDb.password)
    if (passwordResult) {
      // token
      const token = jwt.sign({
        email: userDb.email,
        userId: userDb._id
      }, keys.jwt, {
        expiresIn: 60 * 60
      })
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Пароль не совпадает!'
      })
    }
  } else {
    res.status(404).json({
      message: 'User не найден!'
    })
  }
};

module.exports.register = async (req, res) => {
  const userDb = await User.findOne({
    email: req.body.email
  });

  if (userDb) {
    res.status(409).json({
      message: 'Email занят!!!'
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      //
    }
  };

};