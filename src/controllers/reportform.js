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
    localreports(project_id, local_id, reportdate, onsite, compliance, photourl1, photourl2, photourl3, remark,date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
  
  const values = [
  req.body.project_id,
  req.body.local_id,
  req.body.reportdate,
  req.body.onsite,
  req.body.compliance,
  gifUrl,
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
}


dotenv.config();

module.exports = {
  createReport
};
