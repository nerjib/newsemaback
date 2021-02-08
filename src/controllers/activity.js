/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv');

const router = express.Router();


const db = require('../db/index');


async function UpdateBeneficiary(req, res, imgUrl) {
  console.log(req.body)
  const updateReport = `UPDATE beneficiaries set img_url=$1 WHERE coupon=$2`;

const values = [
imgUrl,
req.body.coupon
];
try {
const { rows } = await db.query(updateReport, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
}


async function getUser(req, res, imgUrl) {
  console.log(req.body)
  const updateReport = `select * from users where id=$1`;

const values = [
req.params.id];
try {
const { rows } = await db.query(updateReport, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
}


dotenv.config();

module.exports = {
  UpdateBeneficiary,
  getUser
};
