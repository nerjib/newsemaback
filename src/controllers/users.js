const express = require('express');
const moment = require('moment')
const db = require('../db/index');

//const db = require('../dbs/index');

const router = express.Router();

router.get('/', async (req, res) => {
    const getAllQ = 'SELECT * FROM users order by active asc, first_name asc, id desc';
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
  
  
  router.get('/usersbyphase/:phase', async (req, res) => {
    const getAllQ = 'SELECT users.last_name,users.actno,users.bank,users.first_name,users.other_name,projects.title,users.id FROM users left join projects on (users.id=projects.local_id or users.id=projects.state_id) where exists (SELECT title from projects where projects.phase=$1 and(projects.state_id=users.id or projects.local_id=users.id)) group by users.last_name,users.first_name,users.other_name,projects.title,users.id,users.actno,users.bank';
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
  router.get('/reportssend/:id', async (req, res) => {
    const getAllQ = 'SELECT projects.title,projects.phase,reports.pstatus,count(reports.pstatus) FROM reports left join projects on projects.id=reports.pid where uid=$1 and reports.complete=$2 group by reports.pstatus,projects.title,projects.phase order by projects.phase desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [req.params.id, 1]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/weeklyreportssend/:id', async (req, res) => {
    const getAllQ = 'SELECT projects.title,projects.phase,weeklyreports.pstatus,count(weeklyreports.pstatus) FROM weeklyreports left join projects on projects.id=weeklyreports.pid where uid=$1 and weeklyreports.complete=$2 group by weeklyreports.pstatus,projects.title,projects.phase order by projects.phase desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [req.params.id, 1]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  
  router.get('/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM users WHERE id= $1';
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
  
  router.get('/email/:email', async (req, res) => {
    const getAllQ = `SELECT * FROM users where email::varchar LIKE $1`;
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,[req.params.email+'%']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/searchuser/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM   users  where phone like $1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['%'+req.params.id+'%']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  
  
  router.get('/monitors/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM monitors WHERE id= $1';
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
  
  router.get('/signin/:email', async (req, res) => {
    const getAllQ = 'SELECT * FROM users WHERE email= $1';
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
  router.get('/admin/:email', async (req, res) => {
    const getAllQ = 'SELECT * FROM admin WHERE email= $1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [req.params.email]);
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
    users (last_name,first_name,other_name,phone,email,role,lga,active,type)
    VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
  
  const values = [
  req.body.fname,
  req.body.lname,
  req.body.oname ||'',
  req.body.phone,
  req.body.email,
  req.body.role,
  req.body.lga,
  'active',
  'users'
  //moment(new Date()),
  ];
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
  
  });
  
  router.post('/admin', async (req, res) => {
    const createUser = `INSERT INTO
    admin (email,phone,role)
    VALUES ($1, $2) RETURNING *`;
  
  const values = [
  req.body.email,
  req.body.phone
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
   };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
  
  router.put('/deactivate/:id', async (req, res) => {
    const createUser = `UPDATE users set active=$1  where id=$2 RETURNING *`;
  
  const values = [
  'inactive',
  req.params.id];
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
  
  });
  router.put('/reactivate/:id', async (req, res) => {
    const createUser = `UPDATE users set active=$1  where id=$2 RETURNING *`;
  
  const values = [
  'active',
  req.params.id];
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
  
  });
  
  router.put('/updateuser/:id', async (req, res) => {
    const createUser = `UPDATE users set first_name=$1, last_name=$2, phone=$3, email=$4, lga=$5, role=$6  where id=$7 RETURNING *`;
  
  const values = [
  req.body.fname,
  req.body.lname,
  req.body.phone,
  req.body.email,
  req.body.lga,
  req.body.role,
  req.params.id];
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
  
  });
  
  
  router.put('/updatebank/:id', async (req, res) => {
    const createUser = `UPDATE users set first_name=$1, last_name=$2, other_name=$3, bank=$4, actno=$5, edit=$6
      where id=$7 and edit !=$8 RETURNING *`;
  
  const values = [
  req.body.fname,
  req.body.lname,
  req.body.oname,
  req.body.bank,
  req.body.act,
  '1',
  req.params.id,
  '1'];
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
  return res.status(503).text('can not be updated at the moment');
  }
  
  });
  
  
  router.put('/pushtoken/:id', async (req, res) => {
    const createUser = `UPDATE users set pushtoken=$1  where id=$2 RETURNING *`;
  
  const values = [
  req.body.token,
  req.params.id];
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
  
  });
  
  router.post('/authsign', async (req, res) => {
    if (!req.body.email || !req.body.pword) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
   
    const text = 'SELECT * FROM admin WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        // console.log('user not');
        return res.status(402).send({ message: 'user not found, check the email' });
      }
      // console.log(rows[0].pword);
      if (rows[0].phone !== req.body.pword) {
        return res.status(403).send({ message: 'The credentials you provided is incorrect' });
      }
      const response = {
        status: 'success',
        data: {
          userId: rows[0].id,
          email: rows[0].email,
          type: rows[0].acttype
        },
      };
  
     // res.cookie('token', token, { maxAge: 90000000, httpOnly: true }).status(200);
      // res.set('token1', token);
      // console.log(token);
      // res.send({ message: 'token send' });
  
      return res.status(200).send(response);
    } catch (error) {
      return res.status(405).send(error);
    }
  });
module.exports = router;

