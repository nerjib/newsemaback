const express = require('express');
const moment = require('moment')
const request = require('request');

const router = express.Router();
const db = require('../db/index');


const pushtoken = async(id,msg)=>{
  
  const getAllQ = 'SELECT * from users where id=$1 ';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[id]);
    await request({
      uri: "https://exp.host/--/api/v2/push/send",
      method: "POST",
      json: {
      //  "to": "ExponentPushToken[g4ESOZBNo1O65nhet3Bbu]",
      "to": rows[0].pushtoken,
        "sound": "default",
        "title": msg+ 1,
        "body": msg+' '+2,
      }
    })
    
  //  return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }

}


router.get('/', async (req, res) => {
  const getAllQ = 'SELECT reports.id,reports.lga,reports.incidence,reports.address,reports.contact,reports.gps,reports.time,reports.rtime,reports.comment, users.first_name,users.last_name,users.phone_no FROM reports left join users on reports.uid=users.id';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});
router.get('/reportid/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports left join users on reports.uid=users.id where reports.id=$1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/reportsbylga/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports left join users on reports.uid=users.id where reports.lga=$1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

//get open reports
router.get('/openreport/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports  where aid=$1 and done=$2';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id,0]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

//get closed reports
router.get('/closedreport/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports  where aid=$1 and done=$2';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id,1]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

//get all feedback of open activities
router.get('/feedback/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM feedbackreports  where senderid=$1 or receiverid=$2 order by id desc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id, req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});



//get all feedback of open activities
router.get('/reportfeedback/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM feedbackreports  where rid=$1  order by id asc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

//get all draft reports
router.get('/getdraft', async (req, res) => {
  const getAllQ = 'SELECT draftreports.id,draftreports.closeddate,draftreports.category,draftreports.event,draftreports.lga,draftreports.ward,draftreports.date,draftreports.source,draftreports.gps,draftreports.state,draftreports.gps,draftreports.sid,draftreports.vid,draftreports.oid,draftreports.place,users.first_name,users.last_name,users.type FROM draftreports left join users on draftreports.sid=users.id';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

//get all draft reports
router.get('/getdraft/:id', async (req, res) => {
  const getAllQ = `SELECT draftreports.id,draftreports.category,draftreports.event,draftreports.lga,draftreports.ward,draftreports.date,draftreports.source,draftreports.gps,draftreports.state,draftreports.gps,draftreports.sid,draftreports.vid,draftreports.oid,draftreports.place,users.first_name,
  draftreports.cause,draftreports.descrcause,draftreports.imgurl,users.last_name,users.type,users.phone_no FROM draftreports left join users on draftreports.sid=users.id where draftreports.id=$1`;
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});


router.get('/getuserdraft/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM draftreports  where vid=$1 or oid=$2  order by id asc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id, req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/followup', async (req, res) => {
  const getAllQ = 'SELECT * FROM followup left join draftreports on draftreports.id=followup.rid';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/followup/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM followup where rid=$1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/getfollowup/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM followup where id=$1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
  
    return res.status(400).send(`${error} jsh`);
  }
});


//insert reports
router.post('/', async (req, res) => {
  const createReport = `INSERT INTO
  reports (incidence,time,uid,img,contact,gps,address,rtime,comment,done)
  VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;

const values = [
req.body.incidence,
moment(new Date()),
req.body.uid,
req.body.img,
req.body.contact,
req.body.gps,
req.body.address,
req.body.rtime,
req.body.comment,
0
];
try {
const { rows } = await db.query(createReport, values);
// console.log(rows);
const data = {
  status: 'success',
  data: {
    message: 'Reports Sent successfully​',
    Name: rows[0].incidence,
    Email: rows[0].comment,
  },
};
return res.status(201).send(data);
} catch (error) {
return res.status(400).send(error);
}
});

router.post('/feedback', async (req, res) => {
  const createReportFeedback = `INSERT INTO
  feedbackreports (receiverid,senderid,rid,message,gps,imgurl1,imgurl2,time)
  VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *`;

const values = [
  req.body.receiverid,
req.body.senderid,
req.body.rid,
req.body.msg,
req.body.gps,
req.body.imgurl1,
req.body.imgurl2,
moment(new Date())
];
try {
const { rows } = await db.query(createReportFeedback, values);
// console.log(rows);
const data = {
  status: 'success',
  data: {
    message: 'Reports Sent successfully​',
    Name: rows[0].incidence,
    Email: rows[0].comment,
  },
};
return res.status(201).send(data);
} catch (error) {
return res.status(400).send(error);
}
});

//post draft reports
router.post('/draftreports', async (req, res) => {
  const createDraftReport = `INSERT INTO
  draftreports (date,source,state,lga,ward,block,event,place,cause,descrcause,imgurl,sid,vid,oid,gps,category)
  VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`;

const values = [
  moment(new Date()),
  req.body.source,
  req.body.state,
  req.body.lga,
  req.body.ward,
  req.body.block,
  req.body.event,
  req.body.place,
  req.body.cause,
  req.body.descrcause,
  req.body.imgurl,
  req.body.sid,
  0,
  0,
  req.body.gps,
  'draft'
];
try {
const { rows } = await db.query(createDraftReport, values);
// console.log(rows);
const data = {
  status: 'success',
  data: {
    message: 'Reports Sent successfully​'
    },
};
return res.status(201).send(data);
} catch (error) {
return res.status(400).send(error);
}
});


router.put('/aid', async (req, res) => {
  const updateaid = `UPDATE reports set aid=$1, aidtime=$2 where id=$3 RETURNING *`;

const values = [
  req.body.aid,
  moment(new Date()),
req.body.rid
];
try {
const { rows } = await db.query(updateaid, values);
await pushtoken(req.body.aid, 'just added')
// console.log(rows);
const data = {
  status: 'success',
  data: {
    message: 'Reports Sent successfully​',
    Name: rows[0].incidence,
    Email: rows[0].comment,
  },
};
return res.status(201).send(data);
} catch (error) {
return res.status(400).send(error);
}
});

router.put('/vid', async (req, res) => {
  const updateaid = `UPDATE draftreports set vid=$1, vidtime=$2 where id=$3 RETURNING *`;

const values = [
  req.body.vid,
  moment(new Date()),
req.body.rid
];
try {
const { rows } = await db.query(updateaid, values);
await pushtoken(req.body.vid,'new activity')
// console.log(rows);
const data = {
  status: 'success',
  data: {
    message: 'Reports Sent successfully​',
    Name: rows[0].incidence,
    Email: rows[0].comment,
  },
};
return res.status(201).send(data);
} catch (error) {
return res.status(400).send(error);
}
});
router.put('/oid', async (req, res) => {
  const updateaid = `UPDATE draftreports set oid=$1, oidtime=$2 where id=$3 RETURNING *`;

const values = [
  req.body.oid,
  moment(new Date()),
req.body.rid
];
try {
const { rows } = await db.query(updateaid, values);
// console.log(rows);
const data = {
  status: 'success',
  data: {
    message: 'Reports Sent successfully​',
    Name: rows[0].incidence,
    Email: rows[0].comment,
  },
};
return res.status(201).send(data);
} catch (error) {
return res.status(400).send(error);
}
});

router.put('/updatecategory', async (req, res) => {
 //   date = moment(new Date())
  
  
  const updateaid = `UPDATE draftreports set category=$1,closeddate=$2  where id=$3 RETURNING *`;

const values = [
  req.body.category,
  moment(new Date()),
  req.body.rid,
];
try {
const { rows } = await db.query(updateaid, values);
// console.log(rows);
const data = {
  status: 'success',
  data: {
    message: 'Reports Sent successfully​',
    Name: rows[0].incidence,
    Email: rows[0].comment,
  },
};
return res.status(201).send(data);
} catch (error) {
return res.status(400).send(error);
}
});

router.post('/followup', async (req, res) => {
 
const updateDraft = `INSERT INTO
  followup (time, rid,    uid,     killed,    killedmen,  
    killedwomen,    killedchildren,    killedelder,    missing,    missingmen,
    missingwomen,  missingchildren,    missingelder,    injured,    injuredmen,  
    injuredwomen,      injuredchildren,    injuredelder,    magnitude,    latitude,
    longitude,    glidenumber,    affected,    affectedfamilies,    affectedmen, 
    affectedwomen,     affectedchildren,    affectedelder,    victim,    victimfamilies, 
    victimsmen,    victimswomen,    victimschildren,    victimselder,    transferred, 
    transferredfamilies,    transferredmen,    transferredwomen,    transferredchildren,    transferredelder,
    evacuated,    evacuatedfamilies,    evacuatedmen,    evacuatedwomen,    evacuatedchildren, 
    evacuatedelder,    housesdestroyed,    housesdestroyedbrick,    housesdestroyedwood,    housesdamaged, 
       housesdamagedbrick,    housesdamagedwood,    schoolsdestroyed,    schoolsdestroyedclass,    schoolsdestroyedstudents,
 schoolsdamaged,    schoolsdamagedclass,    schoolsdamagedstudents,    hospitaldestroyed,    hospitaldamaged,
 healthcentersdestroyed,    healthcentersdamaged,    healthpostsdestroyed,    healthpostsdamaged,    religiousbuildingsdestroyed,
 religiousbuildingsdamaged,    publicbuildingdestroyed,    publicbuildingdamage,    costdamageslocal,    costdamagesdolar,
hectarescropsdamaged,    hectarescropsdestroyed,    heardsofcattle,    damagedroads,    destroyed, 
affectedroads,    bridgesdestroyed,    bridgesdamaged,    watersourcesaffected,    wellsdestroyed,
wellsdamaged,    otherdamages,    transport,    communication,    relief,
tourism,    agriculture,    watersuply,    sewerage,    minery,
energy,    industrial,    education,    commerce,    othersector,  
health,    fisheries,    comment 
       )
  VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
    $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,
    $41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,
    $61,$62,$63,$64,$65,$66,$67,$68,$69,$70,$71,$72,$73,$74,$75,$76,$77,$78,$79,$80,
    $81,$82,$83,$84,$85,$86,$87,$88,$89,$90,$91,$92,$93,$94,$95,$96,$97,$98)RETURNING *`;
  const values = [
    moment(new Date()), req.body.rid, req.body.uid, req.body.killed,   req.body.killedmen,
    req.body.killedwomen,    req.body.killedchildren,    req.body.killedelder,    req.body.missing, req.body.missingmen,
    req.body.missingwomen,   req.body.missingchildren,    req.body.missingelder,    req.body.injured,    req.body.injuredmen,
   req.body.injuredwomen,    req.body.injuredchildren,    req.body.injuredelder,    req.body.magnitude,req.body.latitude,
   req.body.longitude,   req.body.glidenumber,    req.body.affected, req.body.affectedfamilies,    req.body.affectedmen,  
   req.body.affectedwomen,   req.body.affectedchildren, req.body.affectedelder,    req.body.victim,    req.body.victimfamilies, 
    req.body.victimsmen,   req.body.victimswomen, req.body.victimschildren,    req.body.victimselder,    req.body.transferred, 
    req.body.transferredfamilies,   req.body.transferredmen,    req.body.transferredwomen,    req.body.transferredchildren,    req.body.transferredelder,
    req.body.evacuated,    req.body.evacuatedfamilies,    req.body.evacuatedmen,    req.body.evacuatedwomen, req.body.evacuatedchildren, 
    req.body.evacuatedelder,    req.body.housesdestroyed,    req.body.housesdestroyedbrick, req.body.housesdestroyedwood,        req.body.housesdamaged,   
    req.body.housesdamagedbrick,    req.body.housesdamagedwood, req.body.schoolsdestroyed,    req.body.schoolsdestroyedclass,    req.body.schoolsdestroyedstudents,
  req.body.schoolsdamaged,    req.body.schoolsdamagedclass,    req.body.schoolsdamagedstudents, req.body.hospitaldestroyed,    req.body.hospitaldamaged,
  req.body.healthcentersdestroyed,   req.body.healthcentersdamaged, req.body.healthpostsdestroyed,    req.body.healthpostsdamaged,    req.body.religiousbuildingsdestroyed,  
  req.body.religiousbuildingsdamaged,req.body.publicbuildingdestroyed,    req.body.publicbuildingdamage,    req.body.costdamageslocal,    req.body.costdamagesdolar,
req.body.hectarescropsdamaged,    req.body.hectarescropsdestroyed,    req.body.heardsofcattle,    req.body.damagedroads, req.body.destroyed,  
req.body.affectedroads,    req.body.bridgesdestroyed,    req.body.bridgesdamaged,req.body.watersourcesaffected,    req.body.wellsdestroyed, 
req.body.wellsdamaged,    req.body.otherdamages,req.body.transport,    req.body.communication,    req.body.relief,
req.body.tourism, req.body.agriculture,    req.body.watersuply,    req.body.sewerage,    req.body.minery,
req.body.energy,    req.body.industrial,    req.body.education,    req.body.commerce,req.body.othersector,  
req.body.health,    req.body.fisheries,    req.body.comment 
 ];

try {
const { rows } = await db.query(updateDraft, values);
// console.log(rows);
const data = {
  status: 'success',
};
return res.status(201).send(data);
} catch (error) {
return res.status(400).send(error);
}
});


module.exports = router;

