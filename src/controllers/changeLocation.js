const express = require('express');
const moment = require ('moment')
const request = require('request');
const router = express.Router();
const db = require('../db/index');



const pushtoken = async(msg,type)=>{
  
  const getAllQ = 'SELECT * from users where type=$1 ';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[type]);
    await request({
      uri: "https://exp.host/--/api/v2/push/send",
      method: "POST",
      json: {
      //  "to": "ExponentPushToken[g4ESOZBNo1O65nhet3Bbu]",
      "to": rows[0].pushtoken,
        "sound": "default",
        "title": 'Change',
        "body": msg,
      }
    })
    
  //  return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
}

const checkPush = async()=>{
  
  const getAllQ = 'SELECT * from users where id=$1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[9]);
    await request({
      uri: "https://exp.host/--/api/v2/push/send",
      method: "POST",
      json: {
      //  "to": "ExponentPushToken[g4ESOZBNo1O65nhet3Bbu]",
      "to": rows[0].pushtoken,
        "sound": "default",
        "title": 'Change',
        "body": test,
      }
    })
    return res.status(200).send('ok')
    
  //  return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
}


router.get('/ck', async (req, res) => {
 await checkPush()
});  

router.post('/', async (req, res) => {
    const createUser = `INSERT INTO
    changeoflocation(pid, sid, newcommunity, newward, reason,changestatus, gentime)
    VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`;

  //console.log(req.body)
  const values = [
  req.body.pid,
  req.body.mid,
  req.body.newcommunity,
  req.body.ward,
  req.body.reason,
  'Pending',
  moment(new Date())
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
 // await pushtoken(req.body.lga+' '+req.body.ward+' '+req.body.newcommunity, 'sanitation')

  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
  router.get('/', async (req, res) => {
    const getAllQ = 'SELECT * FROM changeoflocation left join projects on projects.id = changeoflocation.pid';
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

  router.get('/myrequest/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM changeoflocation where sid=$1 order by id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,[req.params.id]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });  

  router.get('/requestbydept', async (req, res) => {
    const getAllQ = 'SELECT * FROM changeoflocation left join projects on changeoflocation.pid=projects.id where changeoflocation.changestatus=$1 order by changeoflocation.id asc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Pending']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });  


  router.put('/requestrespond/', async (req, res) => {
    const createUser = `UPDATE changeoflocation set changestatus=$1, approvedtime=$2 where pid=$3 RETURNING *`;
  
  const values = [
  req.body.status,
  moment(new Date()),
  req.body.pid];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'User added successfully​',
      Name: rows[0].first_name,
      Email: rows[0].email,
      phone: rows[0].phone,
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
})

router.put('/approvedrequest', async (req, res) => {
    const createUser = `UPDATE projects set community=$1, ward=$2  where id=$3 RETURNING *`;
  
  const values = [
  req.body.community,
  req.body.ward,
    req.body.pid];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'project updated​',
      
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
})
module.exports = router;
