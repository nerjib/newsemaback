/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
  // compare password
const comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const generateToken = (id, role) => {
  const token = jwt.sign({
    userId: id,
    role,
  },
  'secret', { expiresIn: '7d' });
  return token;
};

module.exports = {
  hashPassword,
  comparePassword,
  isValidEmail,
  generateToken,
};
