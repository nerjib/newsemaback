const express = require('express');

const CokokieParser = require('cookie-parser');
const Helper = require('./helper');

const router = express.Router();
router.use(CokokieParser());
const db = require('../../db/index');

router.post('/', async (req, res) => {
  if (!req.body.phone || !req.body.password) {
    return res.status(400).send({ message: 'Some values are missing' });
  }

  const text = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await db.query(text, [req.body.email]);
    if (!rows[0]) {
      // console.log('user not');
      return res.status(402).send({ message: 'user not found, check the username' });
    }
    // console.log(rows[0].pword);
    if (!Helper.comparePassword(rows[0].pword, req.body.password)) {
      return res.status(403).send({ message: 'The credentials you provided is incorrect' });
    }
    const token = Helper.generateToken(rows[0].id, rows[0].role);
    const response = {
      status: 'success',
      data: {
        token,
        userId: rows[0].id,
      },
    };

    res.cookie('token', token, { maxAge: 90000000, httpOnly: true }).status(200);
    // res.set('token1', token);
    // console.log(token);
    // res.send({ message: 'token send' });

    return res.status(200).send(response);
  } catch (error) {
    return res.status(405).send(error);
  }
});

module.exports = router;
