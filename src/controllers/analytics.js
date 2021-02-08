const express = require('express');
const moment = require('moment')

const router = express.Router();
const db = require('../db/index');


const getFire = async () => {
    const getfire = `select count (*) from  draftreports where event=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getfire,['Fire']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}
const getFLood = async () => {
    const getflood = `select count (*) from  draftreports where event=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getflood,['Flood']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getAccident = async () => {
  const getflood = `select count (*) from  draftreports where event=$1`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getflood,['Accident']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}

router.get('/', async (req, res) => {
  const fire = await getFire()
  const flood = await getFLood()
  const accident = await getAccident()

     res.status(201).json({
         fire: fire[0].count,
         flood: flood[0].count,
         accident: accident[0].count
     })

});


const getFireZoneA = async () => {
  const getflood = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getflood,['Fire','Kaduna South','Kaduna North','Igabi', 'Chikun','Giwa','Birnin Gwari','Kajuru']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}

const getFireZoneB = async () => {
  const getflood = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8 or lga=$9)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getflood,['Fire','Zaria','Sabon Gari','Makarfi', 'Kudan','Ikara','Kubau','Soba','Lere']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}
const getFireZoneC = async () => {
  const getflood = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8 or lga=$9)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getflood,['Fire','Jemaa','Kauru','Kagarko', 'Kaura','Jaba','Sanga','Kachia','Zagon Kataf']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}

router.get('/zonalfire', async (req, res) => {
  const zoneAfire = await getFireZoneA()
  const zoneBFire = await getFireZoneB()
  const zoneCFire = await getFireZoneC()

  
     res.status(201).json({
         zoneAFire: zoneAfire[0].count,
          zoneBFire: zoneBFire[0].count,
          zoneCFire: zoneCFire[0].count
       
     })

});


const getFloodZoneA = async () => {
  const getflood = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getflood,['Flood','Kaduna South','Kaduna North','Igabi', 'Chikun','Giwa','Birnin Gwari','Kajuru']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}

const getFloodZoneB = async () => {
  const getflood = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8 or lga=$9)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getflood,['Flood','Zaria','Sabon Gari','Makarfi', 'Kudan','Ikara','Kubau','Soba','Lere']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}
const getFloodZoneC = async () => {
  const getflood = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8 or lga=$9)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getflood,['Flood','Jemaa','Kauru','Kagarko', 'Kaura','Jaba','Sanga','Kachia','Zagon Kataf']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}

router.get('/zonalFlood', async (req, res) => {
  const zoneAFlood = await getFloodZoneA()
  const zoneBFlood = await getFloodZoneB()
  const zoneCFlood = await getFloodZoneC()

  
     res.status(201).json({
         zoneAFlood: zoneAFlood[0].count,
          zoneBFlood: zoneBFlood[0].count,
          zoneCFlood: zoneCFlood[0].count
       
     })

});


const getAccidentZoneA = async () => {
  const getAccident = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAccident,['Accident','Kaduna South','Kaduna North','Igabi', 'Chikun','Giwa','Birnin Gwari','Kajuru']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}

const getAccidentZoneB = async () => {
  const getAccident = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8 or lga=$9)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAccident,['Accident','Zaria','Sabon Gari','Makarfi', 'Kudan','Ikara','Kubau','Soba','Lere']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}
const getAccidentZoneC = async () => {
  const getAccident = `select count (*) from  draftreports where event=$1 and (lga=$2 or lga=$3 or lga=$4 or lga=$5
    or lga=$6 or lga=$7 or lga=$8 or lga=$9)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAccident,['Accident','Jemaa','Kauru','Kagarko', 'Kaura','Jaba','Sanga','Kachia','Zagon Kataf']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}

router.get('/zonalAccident', async (req, res) => {
  const zoneAAccident = await getAccidentZoneA()
  const zoneBAccident = await getAccidentZoneB()
  const zoneCAccident = await getAccidentZoneC()

  
     res.status(201).json({
         zoneAAccident: zoneAAccident[0].count,
          zoneBAccident: zoneBAccident[0].count,
          zoneCAccident: zoneCAccident[0].count
       
     })

});




module.exports = router;

