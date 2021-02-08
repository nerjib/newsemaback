const express = require('express');
const moment = require('moment');

const Helper = require('./helper');

const router = express.Router();
const db = require('../../db/index');


router.post('/', async (req, res) => {
  if (!req.body.phone || !req.body.password) {
    return res.status(402).send({ message: 'Some values are missing' });
  }
  const hashPassword = Helper.hashPassword(req.body.password);
  const createQuery = `INSERT INTO
    users(phone,  pword, date)
    VALUES($1, $2, $3)
    RETURNING *`;
  const values = [
    req.body.phone,
    hashPassword,
    moment(new Date()),
  ];

  try {
    const { rows } = await db.query(createQuery, values);
    const token = Helper.generateToken(rows[0].id);
    // console.log(`this is the token ${token}`);
    const response = {
      status: 'success',
      data: {
        message: 'User account successfully created',
        token,
        userId: rows[0].id,
      },
    };
    return res.status(201).send(response);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(404).send({ message: 'User with that Phone number already exist' });
    }
    return res.status(400).send(error);
  }
});

module.exports = router;
