const express = require('express')
const router = express.Router();
const db = require('../db/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT count(*) FROM projects';
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

router.get('/completed', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where status=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['completed']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/ongoing', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where status=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['ongoing']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/abandoned', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where status=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['abandoned']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

router.get('/reports', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM reports where complete=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['1']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/sanitations', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where title=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['Sanitation']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/solarpump', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where title=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['Motorized Solar Borehole']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/communitypump', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where title=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['Community Borehole']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/forcelift', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where title=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['Force Lift']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/reports/forcelift', async (req, res) => {
    const getAllQ = 'SELECT  count(*) FROM reports INNER JOIN projects  ON  reports.complete=$1 and reports.pid=projects.id and projects.title=$2';
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

  router.get('/reports/solarborehole', async (req, res) => {
    const getAllQ = 'SELECT  count(*) FROM reports INNER JOIN projects  ON  reports.complete=$1 and reports.pid=projects.id and projects.title=$2';
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

  router.get('/reports/communityboreholes', async (req, res) => {
    const getAllQ = 'SELECT  count(*) FROM reports INNER JOIN projects  ON  reports.complete=$1 and reports.pid=projects.id and projects.title=$2';
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
  router.get('/reports/sanitations', async (req, res) => {
    const getAllQ = 'SELECT  count(*) FROM reports INNER JOIN projects  ON  reports.complete=$1 and reports.pid=projects.id and projects.title=$2';
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

  //to get daily, montly and weekly number of submited report
  router.get('/reports/date/all', async (req, res) => {
    const getAllQ = 'SELECT * FROM reports where complete=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['1']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/reports/date/sanitation', async (req, res) => {
    const getAllQ = 'SELECT * FROM reports left join projects on reports.pid=projects.id where reports.complete=$1 and projects.title=$2';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['1','Sanitation']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/reports/date/community', async (req, res) => {
    const getAllQ = 'SELECT * FROM reports left join projects on reports.pid=projects.id where reports.complete=$1 and projects.title=$2';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['1','Community Borehole']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/reports/date/force', async (req, res) => {
    const getAllQ = 'SELECT * FROM reports left join projects on reports.pid=projects.id where reports.complete=$1 and projects.title=$2';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['1','Force Lift']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
   router.get('/reports/date/solar', async (req, res) => {
    const getAllQ = 'SELECT * FROM reports left join projects on reports.pid=projects.id where reports.complete=$1 and projects.title=$2';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['1','Motorized Solar Borehole']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });


module.exports =  router;