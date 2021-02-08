const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')
const moment = require ('moment')
const Request = require('../middleware/requestlog')
const db = require('../db/index');


//const responseTime = require('response-time');
 //const xml = require('xml')
const  Estimator = require('./estimatorCal')

const xml = require ('xml2js')

router.get('/',Request.logRequest, async (req, res) => {
  res.send({
    h:'hell',
    y:'yello'
  })
})

router.put('/update1/:id',Request.logRequest, async (req, res) => {
  const inputData = `UPDATE beneficiaries set package_type=$1, gps=$2, date=$3, time=$4 WHERE coupon=$5`;
//console.log(req.body)
const values = [
req.body.packageType,
req.body.gps,
req.body.time,
moment(new Date()),
req.params.id
];
try {
const { rows } = await db.query(inputData, values);
// console.log(rows);
return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
});

router.put('/notgiven/update',Request.logRequest, async (req, res) => {
  const inputData = `UPDATE beneficiaries set package_type=$1,  gps=$2, time3=$3, address=$4, first_name=$5, phone_no=$6 WHERE coupon=$7`;
//console.log(req.body)
const values = [
req.body.packageType,
req.body.gps,
req.body.time,
req.body.address,
req.body.fname,
req.body.phone,
req.body.coupon
];
try {
const { rows } = await db.query(inputData, values);
// console.log(rows);
return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
});


router.post('/beneficiaries',Request.logRequest, async (req, res) => {
    
  const inputData = `INSERT INTO
  beneficiaries(first_name,phone_no,address)
  VALUES ($1, $2, $3) RETURNING *`;
//console.log(req.body)
const values = [
req.body.fname,
req.body.phone,
req.body.address
];
try {
const { rows } = await db.query(inputData, values);
// console.log(rows);
return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
});
router.get('/beneficiaries',Request.logRequest, async (req, res) => {

  const getAllQ = 'SELECT * FROM beneficiaries order by first_name desc';
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
  //  const output1 = (Estimator.covid19ImpactEstimator(req.body))

});

router.get('/beneficiaries/verified',Request.logRequest, async (req, res) => {

  const getAllQ = 'SELECT * FROM beneficiaries where package_type !=$1 order by id desc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, ['']);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
  //  const output1 = (Estimator.covid19ImpactEstimator(req.body))

});

router.get('/beneficiaries/verified/:id',Request.logRequest, async (req, res) => {

  const getAllQ = 'SELECT * FROM beneficiaries where coupon=$1 order by id desc';
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
  //  const output1 = (Estimator.covid19ImpactEstimator(req.body))

});

module.exports =  router;
