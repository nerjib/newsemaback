const express = require('express');

const router = express.Router();
const db = require('../db/index');


router.get('/signin/:email', async (req, res) => {
    const getAllQ = 'SELECT * FROM monitors WHERE email= $1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [(req.params.email).toLowerCase()]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  
  module.exports = router;
