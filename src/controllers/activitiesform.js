/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv');

const router = express.Router();


const db = require('../db/index');

async function createReport(req, res, gifUrl) {
    const createUser = `INSERT INTO
    cloudimage(rid, pid, imgurl)
    VALUES ($1, $2, $3) RETURNING *`;
 // console.log('rid '+req.body.rid)
  const values = [
  req.body.rid,
  req.body.pid,
  gifUrl
    ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
}

async function createActivity(req, res) {
    console.log(req.body)
    const createUser = `INSERT INTO
    reportactivities(pid, date, activity, outcome,rid, imgurl)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  
  const values = [
  req.body.pid,
  req.body.date,
  req.body.activity,
  req.body.outcome,
  req.body.rid,
  req.body.imgurl
];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
}

async function createWeeklyReport(req, res, gifUrl) {
  const createUser = `INSERT INTO
  weeklycloudimage(rid, pid, imgurl)
  VALUES ($1, $2, $3) RETURNING *`;
// console.log('rid '+req.body.rid)
const values = [
req.body.rid,
req.body.pid,
gifUrl
  ];
try {
const { rows } = await db.query(createUser, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
}


async function createWeeklyActivity(req, res) {
  console.log(req.body)
  const createUser = `INSERT INTO
  weeklyreportactivities(pid, date, activity, outcome,rid, imgurl)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

const values = [
req.body.pid,
req.body.date,
req.body.activity,
req.body.outcome,
req.body.rid,
req.body.imgurl
];
try {
const { rows } = await db.query(createUser, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
}


async function UpdateDailyReport(req, res, imgUrl) {
  console.log(req.body)
  const updateReport = `UPDATE reports set imgurl=$1 WHERE id=$2`;

const values = [
imgUrl,
req.body.rid
];
try {
const { rows } = await db.query(updateReport, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
}

async function UpdateWeeklyReport(req, res, imgUrl) {
  console.log(req.body)
  
  
  const createUser = `INSERT INTO
  weeklyreportactivities(rid, imgurl)
  VALUES ($1, $2) RETURNING *`;

const values = [
req.body.rid,
imgUrl
];
try {
const { rows } = await db.query(createUser, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
}



dotenv.config();

module.exports = {
  createReport,
  createActivity,
  createWeeklyReport,
  createWeeklyActivity,
  UpdateDailyReport,
  UpdateWeeklyReport
};
