const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../db/index');


  router.get('/state/:phase', async (req, res) => {
    const getAllQ = `select users.first_name, users.last_name, users.other_name, projects.title, projects.lot, avg(projects.totalcov), users.actno, users.bank from projects left join users on projects.state_id=users.id  where projects.phase=$1  group by projects.title, projects.lot, users.actno, users.bank, users.first_name, users.last_name, users.other_name order by projects.title asc, projects.lot asc`;
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,[req.params.phase]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });  
  
  router.get('/local/:phase', async (req, res) => {
    const getAllQ = `select users.first_name, users.last_name, users.other_name, projects.title, projects.lot, avg(projects.totalcov), users.actno, users.bank from projects left join users on projects.local_id=users.id  where projects.phase=$1  group by projects.title, projects.lot, users.actno, users.bank, users.first_name, users.last_name, users.other_name order by projects.title asc, projects.lot asc`;
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,[req.params.phase]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });  



  
    module.exports = router;
