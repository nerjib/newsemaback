const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../db/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports where complete=$1 order by id desc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, ['1']);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});



router.get('/incomplete', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports order by id asc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, [1]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports WHERE id= $1';
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
router.get('/incomplete/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports WHERE id= $1';
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

router.get('/activity/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM reportactivities WHERE rid= $1';
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

  router.get('/activit/allactivity', async (req, res) => {
    const getAllQ = 'SELECT * FROM reportactivities';
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

  router.get('/reportstages/:pid', async (req, res) => {
    const getAllQ = 'SELECT pstatus FROM reports where pid=$1 group by pstatus';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,[req.params.pid]);
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
  reports(pid, uid, summary, summaryfrom,summaryto, conclusion, followup, compliance,date,gps,pstatus, sitestatus,sitegps,imgurl,complete,activity,activitydate,activityoutcome,imgurl2,thirdname,thirdparty,thirdremark)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *`;
console.log(req.body)
const values = [
req.body.pid,
req.body.uid,
req.body.summary,
req.body.summaryfrom,
req.body.summaryto,
req.body.conclusion,
req.body.followup,
req.body.compliance,
moment(new Date()),
req.body.gps,
req.body.pstatus,
req.body.sitestatus,
req.body.sitegps,
req.body.imgurl,
'1',
req.body.activity,
req.body.activitydate,
req.body.activityoutcome,
req.body.imgurl2,
req.body.thirdname,
req.body.thirdparty,
req.body.thirdremark
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

router.put('/:id', async (req, res) => {
    const updateReport = `UPDATE
    reports SET conclusion=$1, compliance=$2, followup=$3 WHERE id=$4 and uid=$5
     RETURNING *`;
  console.log(req.body)
  const values = [
  req.body.conclusion,
  req.body.compliance,
  req.body.followup,
  req.body.rid,
  req.body.uid
  ];
  try {
  const { rows } = await db.query(updateReport, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

  router.put('/save/:id', async (req, res) => {
      console.log('kkkk')
    const updateReport = `UPDATE
    reports SET complete=$1 WHERE id=$2 and uid=$3
     RETURNING *`;
  console.log(req.body)
  const values = [
  req.body.complete,
  req.params.id,
  req.body.uid
  ];
  try {
  const { rows } = await db.query(updateReport, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
    
  });

  //get daily report
  router.get('/myreports/:uid', async (req, res) => {
    const getAllQ = 'SELECT * FROM reports where complete=$1 and uid=$2 order by id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['1', req.params.uid]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  //get weekly reports
  router.get('/myreports/weekly/:uid', async (req, res) => {
    const getAllQ = 'SELECT * FROM weeklyreports where complete=$1 and uid=$2 order by id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['1', req.params.uid]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

//reports.id,users.first_name,users.last_name,projects.gps,reports.date,users.role, reports.id, projects.title,projects.lot, projects.lga,projects.ward, projects.community,projects.facility, contractors.company, reports.id
  router.get('/completereports/all', async (req, res) => {
    const getAllQ = 'SELECT  reports.pid,reports.activity,reports.activityoutcome,reports.conclusion,projects.phase,projects.community,projects.facility,projects.status,projects.pstatus,reports.id,users.first_name,users.last_name,projects.gps,reports.date,users.role, reports.id, projects.title,projects.lot, projects.lga,projects.ward, projects.community,projects.facility, contractors.company, reports.id from reports left join projects on projects.id=reports.pid left join contractors on contractors.id=projects.contractor_id left join users on users.id=projects.local_id where reports.complete=$1 order by reports.id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [1]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/completereports/all/:phase', async (req, res) => {
    const getAllQ = `SELECT  reports.thirdparty,reports.thirdremark,reports.pid,reports.activity,reports.activityoutcome,reports.conclusion,projects.phase,projects.community,projects.facility,projects.status,projects.pstatus,reports.id,users.first_name,users.last_name,projects.gps,reports.date,users.role, reports.id, projects.title,projects.lot, projects.lga,projects.ward, projects.community,projects.facility, contractors.company, reports.id from reports left join projects on projects.id=reports.pid left join contractors on contractors.id=projects.contractor_id left join users on users.id=projects.local_id 
    where reports.complete=$1 and projects.phase=$2 order by reports.id desc`;
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [1, req.params.phase]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/completereports/community', async (req, res) => {
    const getAllQ = 'SELECT   projects.phase,projects.community,projects.facility,projects.lot,projects.pstatus,reports.id,users.first_name,users.last_name,projects.gps,reports.date,users.role, reports.id, projects.title,projects.lot, projects.lga,projects.ward, projects.community,projects.facility, contractors.company, reports.id from reports left join projects on projects.id=reports.pid left join contractors on contractors.id=projects.contractor_id left join users on users.id=projects.local_id where reports.complete=$1 and projects.title=$2 order by reports.id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [1,'Community Borehole']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  //Force Lift reports
  router.get('/completereports/forcelift', async (req, res) => {
    const getAllQ = 'SELECT   projects.phase,projects.community,projects.facility,projects.lot,projects.pstatus,reports.id,users.first_name,users.last_name,projects.gps,reports.date,users.role, reports.id, projects.title,projects.lot, projects.lga,projects.ward, projects.community,projects.facility, contractors.company, reports.id from reports left join projects on projects.id=reports.pid left join contractors on contractors.id=projects.contractor_id left join users on users.id=projects.local_id where reports.complete=$1 and projects.title=$2 order by reports.id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [1,'Force Lift']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  //solar reports
   //Solar
   router.get('/completereports/solar', async (req, res) => {
    const getAllQ = 'SELECT   projects.phase,projects.community,projects.facility,projects.lot,projects.pstatus,reports.id,users.first_name,users.last_name,projects.gps,reports.date,users.role, reports.id, projects.title,projects.lot, projects.lga,projects.ward, projects.community,projects.facility, contractors.company, reports.id from reports left join projects on projects.id=reports.pid left join contractors on contractors.id=projects.contractor_id left join users on users.id=projects.local_id where reports.complete=$1 and projects.title=$2 order by reports.id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [1,'Motorized Solar Borehole']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  //Sanitaion
  router.get('/completereports/sanitation', async (req, res) => {
    const getAllQ = 'SELECT   projects.phase,projects.community,projects.facility,projects.lot,projects.pstatus,reports.id,users.first_name,users.last_name,projects.gps,reports.date,users.role, reports.id, projects.title,projects.lot, projects.lga,projects.ward, projects.community,projects.facility, contractors.company, reports.id from reports left join projects on projects.id=reports.pid left join contractors on contractors.id=projects.contractor_id left join users on users.id=projects.local_id where reports.complete=$1 and projects.title=$2 order by reports.id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [1,'Sanitation']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

//individual project report
  router.get('/project/:id', async (req, res) => {
    const getAllQ = 'SELECT  reports.thirdparty,reports.activitydate,reports.date,reports.activity,reports.activityoutcome,projects.community,projects.facility,projects.lot,projects.pstatus,reports.id,reports.summaryfrom,summaryto,users.first_name,users.last_name from reports left join users on reports.uid=users.id left join projects on reports.pid=projects.id where reports.complete=$1 and reports.pid=$2 order by reports.id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['1',req.params.id]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  //weekly report pos
  router.post('/submitted/weekly', async (req, res) => {
    const createUser = `INSERT INTO
    weeklyreports(pid, uid, summary, summaryfrom,summaryto, conclusion, followup, compliance,date,gps,pstatus, sitestatus)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12) RETURNING *`;
  console.log(req.body)
  const values = [
  req.body.pid,
  req.body.uid,
  req.body.summary,
  req.body.summaryfrom,
  req.body.summaryto,
  req.body.conclusion,
  req.body.followup,
  req.body.compliance,
  moment(new Date()),
  req.body.gps,
  req.body.pstatus,
  req.body.sitestatus
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });


const updateprojectfunc = async(e,pid)=>{
  const getAllQ = `update projects set functionality=$1 where id=$2`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[e,pid]);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

router.put('/functionalitystatus/update', async (req, res) => {

  if(req.body.status=='accepted'){
   await updateprojectfunc(req.body.functionality,req.body.pid)
  }
 // console.log('kkkk')
const updateReport = `UPDATE followupreports SET status=$1 WHERE id=$2 RETURNING *`;
console.log(req.body)
const values = [
req.body.status,
req.body.id
];
try {
const { rows } = await db.query(updateReport, values);
// console.log(rows);
return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}

});


  router.post('/followupreports', async (req, res) => {
   // await updateprojectfunc(req.body.functionality,req.body.pid)

    const createUser = `INSERT INTO
    followupreports(pid, sid, functionality,problem,problemduration,remark,cause,imgurl1,imgurl2,cordinate,gentime,time)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12) RETURNING *`;
  console.log(req.body)
  const values = [
  req.body.pid,
  req.body.mid,
  req.body.functionality,
  req.body.problem,
  req.body.problemduration,
  req.body.remark,
  req.body.cause,
  req.body.imgurl1,
  req.body.imgurl2,
  req.body.cordinate,
  req.body.gentime,
  moment(new Date()),
    ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });


  router.get('/followupreports', async (req, res) => {
    const getAllQ = `SELECT * FROM followupreports left join projects on projects.id = followupreports.pid
      order by followupreports.id desc`;
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
  })

  router.get('/submitted/weekly', async (req, res) => {
    const getAllQ = 'SELECT * FROM weeklyreports where complete=$1 order by id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['1']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/submitted/weekly/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM weeklyreports WHERE id= $1';
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
  
  router.put('/submitted/weekly/:id', async (req, res) => {
    const updateReport = `UPDATE
    weeklyreports SET conclusion=$1, compliance=$2, followup=$3 WHERE id=$4 and uid=$5
     RETURNING *`;
  console.log(req.body)
  const values = [
  req.body.conclusion,
  req.body.compliance,
  req.body.followup,
  req.body.rid,
  req.body.uid
  ];
  try {
  const { rows } = await db.query(updateReport, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

  router.get('/submitted/incomplete/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM weeklyreports WHERE id= $1';
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
  
  router.put('/weekly/save/:id', async (req, res) => {
    console.log('kkkk')
  const updateReport = `UPDATE
  weeklyreports SET complete=$1 WHERE id=$2 and uid=$3
   RETURNING *`;
console.log(req.body)
const values = [
req.body.complete,
req.params.id,
req.body.uid
];
try {
const { rows } = await db.query(updateReport, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
  
});


router.get('/activity/weekly/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM weeklyreportactivities WHERE rid= $1';
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

router.get('/activity/weekly/allactivity', async (req, res) => {
  const getAllQ = 'SELECT * FROM weeklyreportactivities';
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

router.get('/weekly/completereports/all', async (req, res) => {
  const getAllQ = 'SELECT  projects.phase,projects.community,projects.facility,projects.status,projects.pstatus,weeklyreports.id,users.first_name,users.last_name,projects.gps,weeklyreports.date,users.role, weeklyreports.id, projects.title,projects.lot, projects.lga,projects.ward, projects.community,projects.facility, contractors.company, weeklyreports.id from weeklyreports left join projects on projects.id=weeklyreports.pid left join contractors on contractors.id=projects.contractor_id left join users on users.id=projects.local_id where weeklyreports.complete=$1 order by weeklyreports.id desc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, [1]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/activity/projectweekly/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM weeklyreports WHERE pid= $1 order by id desc';
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

router.get('/daysinsite/:id', async (req, res) => {
  const getAllQ = 'SELECT (max(date)-min(date)) as sitedays FROM reports  WHERE pid= $1 order by id desc';
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

