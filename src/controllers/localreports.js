const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../db/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM localreports order by id desc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM localreports WHERE id= $1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, [req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});


//insert users
router.post('/', async (req, res) => {
  const createUser = `INSERT INTO
  localreports(project_id, local_id, reportdate, onsite, compliance, photourl1, photourl2, photourl3, remark,date)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

const values = [
req.body.project_id,
req.body.local_id,
req.body.reportdate,
req.body.onsite,
req.body.compliance,
req.body.photourl1,
req.body.photourl2,
req.body.photourl3,
req.body.remark,
moment(new Date())
];
try {
const { rows } = await db.query(createUser, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}

});
//`UPDATE
//projects 
//SET status=$1, location=$2, local_id=$3, wardheadphone=$4, gps=$5, state_id=$6 WHERE id=$7 RETURNING *`;
/*
router.put('/', async (req, res) => {
    const updateReport = `UPDATE
    localreports SET local_id=$1, reportdate=$2, onsite=$3, compliance=$4, photourl1=$5, photourl2=$6, photourl3=$7,
     remark=$7,date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
  
  const values = [
  req.body.project_id,
  req.body.local_id,
  req.body.reportdate,
  req.body.onsite,
  req.body.compliance,
  req.body.photourl1,
  req.body.photourl2,
  req.body.photourl3,
  req.body.remark,
  moment(new Date())
  ];
  try {
  const { rows } = await db.query(updateReport, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
  */
module.exports = router;

