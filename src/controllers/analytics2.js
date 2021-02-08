const express = require('express');
const moment = require('moment')

const router = express.Router();
const db = require('../db/index');


const getHPBH = async () => {
    const getHPBH = `select count (*) from  projects where title=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getHPBH,['Community Borehole']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}
const getSMBH = async () => {
    const getSolar = `select count (*) from  projects where title=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getSolar,['Motorized Solar Borehole']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}
const getFLBH = async () => {
    const getFLBH = `select count (*) from  projects where title=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getFLBH,['Force Lift']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getVIP = async () => {
    const getVIP = `select count (*) from  projects where title=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['Sanitation']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getCompleted = async () => {
    const getVIP = `select count (*) from  projects where status=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getOngoing = async () => {
    const getVIP = `select count (*) from  projects where status=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getabandoned = async () => {
    const getVIP = `select count (*) from  projects where status=$1`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}


const getCompHPBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed','Community Borehole']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getOngoingHPBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing','Community Borehole']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getAbandonedHPBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned','Community Borehole']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getCompSMBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed','Motorized Solar Borehole']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getOngoingSMBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing','Motorized Solar Borehole']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getAbandonedSMBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned','Motorized Solar Borehole']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getCompFLBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed','Force Lift']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getOngoingFLBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing','Force Lift']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getAbandonedFLBHStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned','Force Lift']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getCompVIPStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed','Sanitation']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getOngoingVIPStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing','Sanitation']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getAbandonedVIPStatus = async () => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned','Sanitation']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

router.get('/', async (req, res) => {
  const HPBH = await getHPBH()
  const SMBH = await getSMBH()
  const FLBH = await getFLBH()
  const VIP = await getVIP()
  const Completed = await getCompleted()
  const Ongoing = await getOngoing()
  const Abandoned = await getabandoned()
  const completedHPBH = await getCompHPBHStatus()
  const OngoingHPBH = await getOngoingHPBHStatus()
  const AbandonedHPBH = await getAbandonedHPBHStatus()
  const completedSMBH = await getCompSMBHStatus()
  const OngoingSMBH = await getOngoingSMBHStatus()
  const AbandonedSMBH = await getAbandonedSMBHStatus()
  const completedFLBH = await getCompFLBHStatus()
  const OngoingFLBH = await getOngoingFLBHStatus()
  const AbandonedFLBH = await getAbandonedFLBHStatus()
  const completedVIP = await getCompVIPStatus()
  const OngoingVIP = await getOngoingVIPStatus()
  const AbandonedVIP = await getAbandonedVIPStatus()


     res.status(201).json({
         allhpbh: HPBH[0].count,
         allsmbh: SMBH[0].count,
         allflbh: FLBH[0].count,
         allvip: VIP[0].count,
         completed: Completed[0].count,
         ongoing: Ongoing[0].count,
         abandoned: Abandoned[0].count,
         completedhpbh: completedHPBH[0].count,
         ongoinghpbh: OngoingHPBH[0].count,
         abandonedhpbh: AbandonedHPBH[0].count,
         completedflbh: completedFLBH[0].count,
         ongoingflbh: OngoingFLBH[0].count,
         abandonedflbh: AbandonedFLBH[0].count,
         completedsmbh: completedSMBH[0].count,
         ongoingsmbh: OngoingSMBH[0].count,
         abandonedsmbh: AbandonedSMBH[0].count,
         completedvip: completedVIP[0].count,
         ongoingvip: OngoingVIP[0].count,
         abandonedvip: AbandonedVIP[0].count,


     })

});


const getAbandonedVIPbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned','Sanitation', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}
const getAbandonedHPBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned','Community Borehole', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getAbandonedSMBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned','Motorized Solar Borehole', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}
const getAbandonedFLBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['abandoned','Force Lift', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getCompletedVIPbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed','Sanitation', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getCompletedHPBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed','Community Borehole', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getCompletedSMBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed','Motorized Solar Borehole', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}
const getCompletedFLBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['completed','Force Lift', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}



const getOngoingVIPbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing','Sanitation', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getOngoingHPBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing','Community Borehole', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}

const getOngoingSMBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing','Motorized Solar Borehole', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}
const getOngoingFLBHbyphase = async (phase) => {
    const getVIP = `select count (*) from  projects where status=$1 and title=$2 and phase=$3`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getVIP,['ongoing','Force Lift', phase]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
}


router.get('/byphase/:phase', async (req, res) => {
    const FLBHComphase = await getCompletedFLBHbyphase(req.params.phase)
    const HPBHComphase = await getCompletedHPBHbyphase(req.params.phase)
    const SMBHComPhase = await getCompletedSMBHbyphase(req.params.phase)
    const VIPComPhase = await getCompletedVIPbyphase(req.params.phase)
    const HPBHOngoingPhase = await getOngoingHPBHbyphase(req.params.phase)
    const FLBHOngoingPhase = await getOngoingFLBHbyphase(req.params.phase)
    const VIPOngoingPhase = await getOngoingVIPbyphase(req.params.phase)
    const SMBHOngoingPhase = await getOngoingSMBHbyphase(req.params.phase)

    const HPBHAbandonedPhase = await getAbandonedHPBHbyphase(req.params.phase)
      const SMBHAbandonedPhase = await getAbandonedSMBHbyphase(req.params.phase)
    const FLBHAbandonedPhase = await getAbandonedFLBHbyphase(req.params.phase)
  const VIPAbandonedPhase = await getAbandonedVIPbyphase(req.params.phase)
  
  
       res.status(201).json({
           comhpbhphase: HPBHComphase[0].count,
           comsmbhphase: SMBHComPhase[0].count,
           comflbhphase: FLBHComphase[0].count,
           comvipphase: VIPComPhase[0].count,
           ongoinghpbhphase: HPBHOngoingPhase[0].count,
           ongoingflbhphase: FLBHOngoingPhase[0].count,
           ongoingvipphase: VIPOngoingPhase[0].count,
           ongoingsmbhphase: SMBHOngoingPhase[0].count,
           abandonedhpbhphase: HPBHAbandonedPhase[0].count,
           abandonedflbhphase: FLBHAbandonedPhase[0].count,
           abandonedsmbhphase: SMBHAbandonedPhase[0].count,
           abandonedvipphase: VIPAbandonedPhase[0].count,
             
       })
  
  });
  
  

module.exports = router;

