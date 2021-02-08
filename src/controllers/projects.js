const express = require('express');
const moment = require('moment')
const router = express.Router();
const db = require('../db/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM projects order by id desc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).json(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/:id', async(req, res) =>{
    const project = 'SELECT * FROM projects WHERE id=$1 order by id desc';
    console.log(req.params.id);
    try {
      const { rows } = await db.query(project, [req.params.id]);
     console.log(rows[0])
      if (!rows[0]) {
        return res.status(404).send({ message: 'project Not found' });
      }
          rows
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  });

  router.get('/thirdparty/:id', async(req, res) =>{
    const project = 'SELECT count(distinct date(reports.date)) FROM projects left join reports on reports.pid=projects.id  WHERE reports.thirdparty=$1 and projects.id=$2';
    console.log(req.params.id);
    try {
      const { rows } = await db.query(project, ['yes',req.params.id]);
     console.log(rows[0])
      if (!rows[0]) {
        return res.status(404).send({ message: 'project Not found' });
      }
          rows
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  });

  router.get('/localsupervisors/:id', async(req, res) =>{
    const project = 'SELECT * FROM projects WHERE local_id=$1';
   // console.log(req.params.id);
    try {
   //   console.log('dd')
      const { rows } = await db.query(project, [req.params.id]);
     //alert(rows[0])        
  //   console.log('tt'+rows)     
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
  {
  //for app not to show done phases in task
  router.get('/localsupervisors/donephases/:id', async(req, res) =>{
    const project = 'SELECT projects.id,projects.state_id,projects.local_id,projects.lga,projects.status,projects.started,projects.title,projects.gps,projects.contractor_id,projects.lot,projects.ward,projects.community,projects.phase,contractors.company FROM projects left join contractors on projects.contractor_id=contractors.id WHERE projects.local_id=$1 and projects.done=$2 order by phase desc';
   // console.log(req.params.id);
    try {
   //   console.log('dd')
      const { rows } = await db.query(project, [req.params.id,'0']);
     //alert(rows[0])        
  //   console.log('tt'+rows)     
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
}
router.get('/localsupervisors/donephases1/:id', async(req, res) =>{
  const project = 'SELECT * FROM projects  WHERE local_id=$1  order by phase desc';
 // console.log(req.params.id);
  try {
 //   console.log('dd')
    const { rows } = await db.query(project, [req.params.id]);
   //alert(rows[0])        
//   console.log('tt'+rows)     
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).send(error);
  }
});
  router.get('/statesupervisors/:id', async(req, res) =>{
    const project = 'SELECT * FROM projects WHERE state_id=$1';
   // console.log(req.params.id);
    try {
   //   console.log('dd')
      const { rows } = await db.query(project, [req.params.id]);
     //alert(rows[0])        
  //   console.log('tt'+rows)     
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
{
  // fro app not to show  state supdone phases in task
  router.get('/statesupervisors/donephases/:id', async(req, res) =>{
    const project = 'SELECT projects.id,projects.state_id,projects.local_id,projects.lga,projects.status,projects.started,projects.title,projects.gps,projects.contractor_id,projects.lot,projects.ward,projects.community,projects.phase,contractors.company FROM projects left join contractors on projects.contractor_id=contractors.id WHERE projects.state_id=$1 and projects.done=$2 order by phase desc';
   // console.log(req.params.id);
    try {
   //   console.log('dd')
      const { rows } = await db.query(project, [req.params.id,'0']);
     //alert(rows[0])        
  //   console.log('tt'+rows)     
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
}
router.get('/retention/:id', async(req, res) =>{
  const project = `SELECT projects.id,projects.state_id,projects.local_id,projects.lga,projects.status,projects.started,projects.title,projects.gps,projects.contractor_id,projects.lot,projects.ward,projects.community,projects.phase,contractors.company FROM projects left join contractors on projects.contractor_id=contractors.id WHERE (projects.local_id=$1 or projects.state_id=$1)  order by phase asc`;
 // console.log(req.params.id);
  try {
 //   console.log('dd')
    const { rows } = await db.query(project, [req.params.id]);
   //alert(rows[0])        
//   console.log('tt'+rows)     
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get('/statesupervisors/donephases1/:id', async(req, res) =>{
  const project = 'SELECT * FROM projects WHERE state_id=$1  order by phase desc';
 // console.log(req.params.id);
  try {
 //   console.log('dd')
    const { rows } = await db.query(project, [req.params.id]);
   //alert(rows[0])        
//   console.log('tt'+rows)     
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).send(error);
  }
});
router.post('/', async (req, res) => {
  const createUser = `INSERT INTO
  projects (title,state_id, local_id,location,lga,status,wardheadphone,gps,started,lot,type,phase,contractor_id,ward,community,facility,done)
  VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`;

const values = [
  req.body.title,
  req.body.state_id,
  req.body.local_id,
  req.body.location,
  req.body.lga,
  req.body.status,
  req.body.wardphone,
  req.body.gps, 
moment(new Date()),
req.body.lot,
req.body.type,
req.body.phase,
req.body.contractor_id,
req.body.ward,
req.body.community,
req.body.facility,
0
];
try {
const { rows } = await db.query(createUser, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}

});

  router.put('/:id', async (req, res) => {
    console.log('reqqqq '+req.body.community)

    const updateProject = `UPDATE projects
     SET status=$1, location=$2, local_id=$3, wardheadphone=$4, gps=$5, state_id=$6,
 lga=$7, contractor_id=$8, started=$9, finish=$10, ward=$11, facility=$12, community=$13, compartment=$14, pstatus=$15, lot=$16 WHERE id=$17 RETURNING *`;
  
  // title,state_id, local_id,location,lga,status,wardheadphone,gps,started
  const values = [
  req.body.status,
  req.body.location,
  req.body.local_id,
  req.body.wardheadphone,
  req.body.gps,
  req.body.state_id,
  req.body.lga,
  req.body.contractor_id,
  req.body.started,
  req.body.finish,
  req.body.ward,
  req.body.facility,
  req.body.community,
  req.body.compartment,
  req.body.pstatus,
  req.body.lot,
  req.params.id
    ];
  try {
  const { rows } = await db.query(updateProject, values);
  //console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Project updated successfully​',
    },
  };
  return res.status(201).json(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
  router.put('/pstatus/:id', async (req, res) => {
    //console.log('reqqqq '+req.body.community)

    const updateProject = `UPDATE projects
     SET pstatus=$1, status=$2, gps=$3 WHERE id=$4 RETURNING *`;
  
  // title,state_id, local_id,location,lga,status,wardheadphone,gps,started
  const values = [
  req.body.pstatus,
  req.body.sitestatus,
  req.body.sitegps,
  req.params.id
    ];
  try {
  const { rows } = await db.query(updateProject, values);
  //console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Project updated successfully​',
    },
  };
  return res.status(201).json(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

  router.put('/weekly/pstatus/:id', async (req, res) => {
    //console.log('reqqqq '+req.body.community)

    const updateProject = `UPDATE projects
     SET pstatus=$1, status=$2 WHERE id=$3 RETURNING *`;
  
  // title,state_id, local_id,location,lga,status,wardheadphone,gps,started
  const values = [
  req.body.pstatus,
  req.body.sitestatus,
  req.params.id
    ];
  try {
  const { rows } = await db.query(updateProject, values);
  //console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Project updated successfully​',
    },
  };
  return res.status(201).json(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
  
  
  router.get('/completeprojects/all', async (req, res) => {
    const getAllQ = 'SELECT  projects.functionality,projects.lastdate,projects.done,projects.started,projects.totalcov,users.actno,users.bank,projects.valuation,projects.phase,projects.gps,projects.local_id,projects.state_id,projects.community,projects.facility,projects.lot,projects.pstatus,projects.id,projects.title,projects.lga,projects.ward,projects.status,contractors.company,users.first_name,users.last_name,users.other_name,(select first_name as fn from users where users.id=projects.local_id),(select last_name as ln from users where users.id=projects.local_id),(select other_name as on from users where users.id=projects.local_id),(select actno as ac from users where users.id=projects.local_id),(select bank as bnk from users where users.id=projects.local_id) from Projects left join contractors on projects.contractor_id=contractors.id left join users on users.id=projects.state_id order by projects.lot asc, projects.id desc';
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

  //get projects by lga
  router.get('/lgaprojects/:lga', async (req, res) => {
    const getAllQ = 'SELECT  projects.functionality,projects.lastdate,projects.done,projects.started,projects.totalcov,users.actno,users.bank,projects.valuation,projects.phase,projects.gps,projects.local_id,projects.state_id,projects.community,projects.facility,projects.lot,projects.pstatus,projects.id,projects.title,projects.lga,projects.ward,projects.status,contractors.company,users.first_name,users.last_name,users.other_name,(select first_name as fn from users where users.id=projects.local_id),(select last_name as ln from users where users.id=projects.local_id),(select other_name as on from users where users.id=projects.local_id),(select actno as ac from users where users.id=projects.local_id),(select bank as bnk from users where users.id=projects.local_id) from Projects left join contractors on projects.contractor_id=contractors.id left join users on users.id=projects.state_id where projects.lga=$1 order by projects.lot asc, projects.id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,[req.params.lga]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });



  router.get('/completeprojects/sanitations', async (req, res) => {
    const getAllQ = 'SELECT projects.phase,projects.gps, projects.local_id,projects.state_id,projects.community,projects.facility,projects.lot,projects.ward,projects.pstatus,projects.id,projects.title,projects.lga,projects.location,projects.status,contractors.company,users.first_name,users.last_name from Projects left join contractors on projects.contractor_id=contractors.id left join users on users.id=projects.state_id where projects.title=$1 order by projects.lot asc, projects.id asc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Sanitation']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/completeprojects/forcelift', async (req, res) => {
    const getAllQ = 'SELECT   projects.phase,projects.gps, projects.local_id,projects.state_id,projects.community,projects.facility,projects.lot,projects.ward,projects.pstatus,projects.id,projects.title,projects.lga,projects.location,projects.status,contractors.company,users.first_name,users.last_name from Projects left join contractors on projects.contractor_id=contractors.id left join users on users.id=projects.state_id where projects.title=$1 order by projects.lot asc, projects.id asc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Force Lift']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/completeprojects/solar', async (req, res) => {
    const getAllQ = 'SELECT   projects.phase,projects.gps,projects.local_id,projects.state_id,projects.community,projects.facility,projects.lot,projects.ward,projects.pstatus,projects.id,projects.title,projects.lga,projects.location,projects.status,contractors.company,users.first_name,users.last_name from Projects left join contractors on projects.contractor_id=contractors.id left join users on users.id=projects.state_id where projects.title=$1 order by projects.lot asc, projects.id asc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Motorized Solar Borehole']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/completeprojects/community', async (req, res) => {
    const getAllQ = 'SELECT projects.phase,projects.gps,projects.local_id,projects.state_id,projects.community,projects.facility,projects.ward,projects.lot,projects.pstatus,projects.id,projects.title,projects.lga,projects.location,projects.status,contractors.company,users.first_name,users.last_name from Projects left join contractors on projects.contractor_id=contractors.id left join users on users.id=projects.state_id where projects.title=$1 order by projects.lot asc, projects.id asc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Community Borehole']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/details/:id', async (req, res) => {
    const getAllQ = 'SELECT projects.phase,projects.gps,projects.local_id,projects.state_id,projects.title,projects.lga,projects.status,projects.pstatus,projects.ward,projects.facility,contractors.company,projects.lot,projects.gps, projects.location, users.first_name,users.last_name from Projects left join contractors on projects.contractor_id=contractors.id left join users on users.id=projects.state_id WHERE projects.id=$1';
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




module.exports = router;

