const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../db/index');

router.post('/', async (req, res) => {
    const createUser = `INSERT INTO
    monitorsreports(pid, mid, remark, imgurl, date, datesubmitted)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  //console.log(req.body)
  const values = [
  req.body.pid,
  req.body.mid,
  req.body.remark,
  req.body.imgurl,
  req.body.date,
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
  router.get('/', async (req, res) => {
    const getAllQ = 'SELECT * FROM monitorsreports';
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

  router.get('/watereval', async (req, res) => {
    const getAllQ = 'SELECT * FROM watereval';
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

  router.get('/watereval/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM watereval where pid=$1 order by id desc';
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

  router.get('/watereval/reports/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM watereval where id=$1 order by id desc';
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

  router.get('/sanitationeval', async (req, res) => {
    const getAllQ = 'SELECT * FROM sanitationeval';
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


  router.get('/sanitationeval/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM sanitationeval where pid=$1 order by id desc';
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

  router.get('/sanitationeval/reports/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM sanitationeval where id=$1 order by id desc';
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

  router.post('/watereval', async (req, res) => {
    const createUser = `INSERT INTO
    watereval(pid,mid,mon,geo,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
      yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
      platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
      cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
      reticulated,    island,    fenced,  visible,    imgurl1,    imgurl2,    imgurl3, time,gentime)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11, $12, $13, $14, $15, $16, $17, $18,$19,$20,
      $21, $22, $23, $24, $25, $26, $27, $28,$29,$30, $31, $32, $33, $34, $35, $36, $37, $38,$39,$40,$41,$42,$43) RETURNING *`;
  //console.log(req.body)
  const values = [
    req.body.pid, req.body.mid, req.body.mon, req.body.geo,   req.body.setback,
    req.body.cdate,    req.body.casing,    req.body.casedepth,    req.body.casingd,
    req.body.casingr,    req.body.swl,
    req.body.yielda,    req.body.grout,    req.body.pumpd,    req.body.pumpt,
    req.body.watera,   req.body.color,    req.body.taste,    req.body.odour,
    req.body.platformd,   req.body.shuttr, req.body.stability,    req.body.soakpit,
    req.body.signpost,    req.body.cordinate,   req.body.pumps,    req.body.power,
    req.body.cable,    req.body.earth,    req.body.tankpvc,    req.body.tankc,
    req.body.tankcap,    req.body.stanchion,    req.body.antirust,
    req.body.reticulated,    req.body.island,    req.body.fenced,  req.body.visible,
    req.body.imgurl1,    req.body.imgurl2,    req.body.imgurl3,
  moment(new Date()),
  req.body.gentime
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

  router.post('/sanitationeval', async (req, res) => {
    const createUser = `INSERT INTO
    sanitationeval(pid,mid, mon,
      setback, structure,cdate,usage,restoration,distance,
      area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
      tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
      subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
      tank,tankembeded,tankcap,tankc,soakpit,urinalpit,imgurl1,
      imgurl2,imgurl3,imgurl4,time,gentime,cordinate)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11, $12, $13, $14, $15, $16, $17, $18,$19,$20,
      $21, $22, $23, $24, $25, $26, $27, $28,$29,$30, $31, $32, $33, $34, $35, $36, $37, $38,$39,$40,$41,$42,$43,$44,$45,$46,$47) RETURNING *`;
  //console.log(req.body)
  const values = [
    req.body.pid, req.body.mid, req.body.mon,
    req.body.setback, req.body.structure, req.body.cdate, req.body.usage,
    req.body.restoration, req.body.distance,
    req.body.area, req.body.pitarea, req.body.compartment, req.body.urinals,
    req.body.nourinals, req.body.tiled, req.body.laterinet,
    req.body.tilequality,  req.body.tilec, req.body.nobasins, req.body.washbasins,
    req.body.physicallyaid, req.body.door, req.body.gauge, req.body.antirust,
    req.body.subs, req.body.slabs, req.body.pit, req.body.crack, req.body.crackt,
    req.body.defect, req.body.sdefect, req.body.rendered, req.body.sandblast,
    req.body.artwork,
    req.body.tank, req.body.tankembeded, req.body.tankcap, req.body.tankc,
    req.body.soakpit, req.body.urinalpit, req.body.imgurl1,
    req.body.imgurl2, req.body.imgurl3, req.body.imgurl4,
        moment(new Date()),
        req.body.gentime, req.body.cordinate
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });


  router.post('/toshos', async (req, res) => {
    const createUser = `INSERT INTO
    siteover(pid, sid,gps,existence,activity,info, imgurl, gentime, time)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *`;
  //console.log(req.body)
  const values = [
  req.body.pid,
  req.body.sid,
  req.body.gps,
  req.body.existence,
  req.body.activity,
  req.body.info,
  req.body.imgurl,
  req.body.gentime,
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


  router.get('/toshos/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM siteover where pid=$1 order by id desc';
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



module.exports = router;
