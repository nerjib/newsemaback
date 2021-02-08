const express = require('express');
const moment = require ('moment')
const router = express.Router();
//const Helper = require('../../controllers/auth/helper');
//const jwt = require('jsonwebtoken');
const db = require('../db/index');




const updatesanmonitoring = async()=>{
  const getAllQ = `update projects set valuation='done' where id in (select pid from sanitationeval)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}
const updatewatermonitoring = async()=>{
  const getAllQ = `update projects set valuation='done' where id in (select pid from watereval)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const updatereportdate = async()=>{
  const getAllQ = `update projects t1 set lastdate= date2 from ( select pid,date as date2 from reports order by id desc) t2 
    where t1.id=t2.pid`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getHpbhPid = async()=>{
  const getAllQ = `insert into hpbhcov(pid) select id from projects where (title=$1 OR title=$2) and id not in (select pid from hpbhcov)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Community Borehole','Force Lift']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getHpbhTos = async()=>{
  const getAllQ = `update hpbhcov set tos=10 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['TOS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getHpbhGs = async()=>{
  const getAllQ = `update hpbhcov set tos=10,gs=15 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['GS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getHpbhDrilling = async()=>{
  const getAllQ = `update hpbhcov set gs=15,tos=10,drilling=25 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Drilling']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

  const getHpbhPt= async()=>{
    const getAllQ = `update hpbhcov set tos=10,gs=15,drilling=25,pt=5 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['PT']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }

    
  }

  const getHpbhPi = async()=>{
    const getAllQ = `update hpbhcov set tos=10,gs=15,drilling=25,pt=5,pi=20 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['PI']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }
  

  const getHpbhPlatforming = async()=>{
    const getAllQ = `update hpbhcov set tos=10,gs=15,drilling=25,platforming=15,pt=5 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Platforming']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }

  const getHpbhPlatforming2 = async()=>{
    const getAllQ = `update hpbhcov set gs=15,tos=10,drilling=25,platforming=15,pi=20,pt=5 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Platforming2']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }

  const getHpbhCr = async()=>{
    const getAllQ = `update hpbhcov set cr=5 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['CR']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }

  
  const sumHpbh = async()=>{
    const getAllQ = `update hpbhcov set total=(gs+tos+drilling+pt+pi+platforming+cr+fr), total2=(gs+tos+drilling+pt+pi+platforming+cr+fr)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }



  const getHpbhFr = async()=>{
    const getAllQ = `update hpbhcov set fr=5,total2=100 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['FR']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }  
  }

  const getHpbhCrUpdate = async()=>{
    const getAllQ = `update hpbhcov set cr=5,total2=95 from projects where hpbhcov.pid=projects.id and hpbhcov.pid in (select id from projects where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['CR']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }  
  }


const sumHpbhstages=async()=>{
  const getAllQ = `update hpbhcov set total=(gs+tos+drilling+pt+pi+platforming+cr+fr) where pid is not null`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}


const getUpdatedFR = async()=>{
  const getAllQ = `update hpbhcov set fr=5 where pid=(select id from projects where projects.pstatus=$1 and projects.id=hpbhcov.pid)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['FR']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }  
}

const getFR = async()=>{
  const getAllQ = `update hpbhcov set total2=100 where fr=$1`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[5]);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }  
}


const UpdateHPBHProjects = async()=>{
  const getAllQ = `update projects set totalcov=hpbhcov.total2 from hpbhcov where hpbhcov.pid=projects.id`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }  
}



router.get('/hpbh', async (req, res) => {
    await updatewatermonitoring()
    await updatesanmonitoring()
  await updatereportdate()
  let kk= await getHpbhPid() 
    let kk1= await getHpbhTos() 
    let kk2= await getHpbhGs() 
    let kk3= await getHpbhDrilling() 
    let kk4= await getHpbhPt() 
    let kk5= await getHpbhPi() 
    let kk6= await getHpbhPlatforming()
    let kk10= await getHpbhPlatforming2()
    let kk7= await getHpbhCr()
    let kk9 = await sumHpbh()
    let kk8= await getHpbhFr()
    let k16= await getHpbhCrUpdate()
    let kk12= await getUpdatedFR()
    let kk11=await getFR()
    let k15= await UpdateHPBHProjects()
   res.status(201).json(kk12)
})




const getVipPid = async()=>{
  const getAllQ = `insert into vipcov(pid) select id from projects where title=$1 and id not in (select pid from vipcov)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Sanitation']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getVipTos = async()=>{
  const getAllQ = `update vipcov set tos=10 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['TOS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getVipEscavation = async()=>{
  const getAllQ = `update vipcov set tos=10,escavation=15 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Excavation']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}
const getVipSubS = async()=>{
  const getAllQ = `update vipcov set tos=10,escavation=15,subs=20 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['SubS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getVipSuperS = async()=>{
  const getAllQ = `update vipcov set tos=10,supers=20 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['SuperS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getVipFinishing = async()=>{
  const getAllQ = `update vipcov set tos=10,supers=20,finishing=15 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Finishing']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}


const getVipArt = async()=>{
  const getAllQ = `update vipcov set tos=10,supers=20,finishing=15,artwork=10 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Painting']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getVipSignBoard = async()=>{
  const getAllQ = `update vipcov set tos=10,cr=5 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['CR']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

/*
const getVipFR = async()=>{
  const getAllQ = `update vipcov set tos=10, fr=5 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['FR']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}
*/

const sumVIP = async()=>{
  const getAllQ = `update vipcov set total=(tos+escavation+subs+supers+finishing+artwork+cr+fr), total2=(tos+escavation+subs+supers+finishing+artwork+cr+fr)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}



const getVIPFr = async()=>{
  const getAllQ = `update vipcov set fr=5 from reports where vipcov.pid=reports.pid and vipcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['FR']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }  
}


const sumVipstages=async()=>{
const getAllQ = `update vipcov set total=(tos+escavation+subs+supers+finishing+artwork+cr+fr) where pid is not null`
try {
  // const { rows } = qr.query(getAllQ);
  const { rows } = await db.query(getAllQ);
 
  return rows;
} catch (error) {
  if (error.routine === '_bt_check_unique') {
    return ({ message: 'User with that EMAIL already exist' });
  }
  return (`${error} jsh`);

}

}


const getUpdatedVipFR = async()=>{
const getAllQ = `update vipcov set fr=5 where pid=(select id from projects where projects.pstatus=$1 and projects.id=vipcov.pid)`
try {
  // const { rows } = qr.query(getAllQ);
  const { rows } = await db.query(getAllQ,['FR']);
 
  return rows;
} catch (error) {
  if (error.routine === '_bt_check_unique') {
    return ({ message: 'User with that EMAIL already exist' });
  }
  return (`${error} jsh`);

}  
}

const getFRVip = async()=>{
const getAllQ = `update vipcov set total2=100 where fr=$1`
try {
  // const { rows } = qr.query(getAllQ);
  const { rows } = await db.query(getAllQ,[5]);
 
  return rows;
} catch (error) {
  if (error.routine === '_bt_check_unique') {
    return ({ message: 'User with that EMAIL already exist' });
  }
  return (`${error} jsh`);

}  
}

const UpdateVIPProjects = async()=>{
  const getAllQ = `update projects set totalcov=vipcov.total2 from vipcov where vipcov.pid=projects.id`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }  
}



router.get('/vip', async (req, res) => {
  
  let kk= await getVipPid() 
    let kk1= await getVipTos()
    let kk2= await getVipEscavation() 
    let kk3= await getVipSubS() 
    let kk5= await getVipSuperS() 
    let kk6= await getVipFinishing()
    let kk10= await getVipArt()
    let kk7= await getVipSignBoard()
    let kk8= await getVIPFr()
    let kk4= await sumVIP()
    let kk11= await getUpdatedVipFR()
    let kk9 = await getFRVip()
  let kk15 = await UpdateVIPProjects()
    //let kk13= await getVipFR()

   res.status(201).json(kk4)
})





const getSolarPid = async()=>{
  const getAllQ = `insert into solarcov(pid) select id from projects where title=$1 and id not in (select pid from solarcov)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Motorized Solar Borehole']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }
}


const getSolarTos = async()=>{
  const getAllQ = `update solarcov set tos=10 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['TOS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarGS = async()=>{
  const getAllQ = `update solarcov set tos=10,gs=15 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['GS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarDrilling = async()=>{
  const getAllQ = `update solarcov set tos=10,gs=15,drilling=20 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Drilling']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarPT = async()=>{
  const getAllQ = `update solarcov set tos=10,gs=15,drilling=20,pt=5 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['PT']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarFS = async()=>{
  const getAllQ = `update solarcov set tos=10,gs=15,fs=10 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['FS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarES = async()=>{
  const getAllQ = `update solarcov set tos=10,fs=10,es=15 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['ES']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarISP = async()=>{
  const getAllQ = `update solarcov set tos=10,gs=15,fs=10,es=15,isp=5 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['ISP']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarReticulation = async()=>{
  const getAllQ = `update solarcov set tos=10,gs=15,drilling=20,pt=5,fs=10,reticulation=10 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Reticulation']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarCr = async()=>{
  const getAllQ = `update solarcov set tos=10,gs=15,drilling=20,pt=5,fs=10,cr=5 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['CR']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getSolarFR = async()=>{
  const getAllQ = `update solarcov set fr=5,total2=100 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['FR']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}


const sumSolar = async()=>{
  const getAllQ = `update solarcov set total=(tos+gs+drilling+pt+fs+es+isp+reticulation+cr+fr), total2=(tos+gs+drilling+pt+fs+es+isp+reticulation+cr+fr)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}



const getSolarFr = async()=>{
  const getAllQ = `update solarcov set fr=5 from reports where solarcov.pid=reports.pid and solarcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['FR']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }  
}



const getUpdatedSolarFR = async()=>{
const getAllQ = `update solarcov set fr=5 where pid=(select id from projects where projects.pstatus=$1 and projects.id=solarcov.pid)`
try {
  // const { rows } = qr.query(getAllQ);
  const { rows } = await db.query(getAllQ,['FR']);
 
  return rows;
} catch (error) {
  if (error.routine === '_bt_check_unique') {
    return ({ message: 'User with that EMAIL already exist' });
  }
  return (`${error} jsh`);

}  
}

const getFRSolar = async()=>{
const getAllQ = `update solarcov set total2=100 where fr=$1`
try {
  // const { rows } = qr.query(getAllQ);
  const { rows } = await db.query(getAllQ,[5]);
 
  return rows;
} catch (error) {
  if (error.routine === '_bt_check_unique') {
    return ({ message: 'User with that EMAIL already exist' });
  }
  return (`${error} jsh`);
}  
}

const UpdateSolarProjects = async()=>{
  const getAllQ = `update projects set totalcov=solarcov.total2 from solarcov where solarcov.pid=projects.id`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }  
}



router.get('/solar', async (req, res) => {
  
  let kk= await getSolarPid() 
    let kk1= await getSolarTos()
    let kk2= await getSolarGS() 
    let kk3= await getSolarDrilling() 
    let kk5= await getSolarPT() 
    let kk6= await getSolarFS()
    let kk10= await getSolarES()
    let kk7= await getSolarISP()
    let kk8= await getSolarReticulation()
    let kk12= await getSolarCr()
    let kk13= await getSolarFR()
    let kk4= await sumSolar()
    let kk15= await getSolarFr()
    let kk11= await getUpdatedSolarFR()
    let kk9 = await getFRSolar()
    let kk16 = await UpdateSolarProjects()
    //let kk13= await getVipFR()
   res.status(201).json(kk4)
})


router.get('/allsolar', async (req, res) => {
  const getAllQ = 'SELECT * from solarcov';
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

router.get('/allhpbh', async (req, res) => {
  const getAllQ = 'SELECT * from hpbhcov';
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

router.get('/allvip', async (req, res) => {
  const getAllQ = 'SELECT * from vipcov';
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


router.get('/allsolar/:id', async (req, res) => {
  const getAllQ = 'SELECT * from solarcov where pid=$1';
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

router.get('/allvip/:id', async (req, res) => {
  const getAllQ = 'SELECT * from vipcov where pid=$1';
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

router.get('/allhpbh/:id', async (req, res) => {
  const getAllQ = 'SELECT * from hpbhcov where pid=$1';
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


router.get('/updateallprojects', async (req, res) => {
  const getAllQ = 'UPDATE projects set status=$1 where pstatus=$2';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['completed','FR']);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.post('/updateReportStage/:id', async (req, res) => {
  const getAllQ = 'UPDATE reports set pstatus=$1 where id=$2';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.body.pstatus, req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.post('/updatehpbhcov/:id', async (req, res) => {
  const getAllQ = 'UPDATE hpbhcov set $1=$2 where pid = $3';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.body.title,req.body.pstatus, req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});


module.exports = router;
