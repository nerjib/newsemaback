const express = require('express')
const http = require('http')
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path')
const responseTime = require('response-time');
const fs = require('fs')
const app = express();
const multer = require('multer');
const cloudinary = require('cloudinary');
const Estimator = require('./src/controllers/estimator')
//const Activity= require('./src/controllers/activity')
const Users= require('./src/controllers/users')
const Projects= require('./src/controllers/projects')
const Analytics = require('./src/controllers/analytics');
const Analytics2 = require('./src/controllers/analytics2');
const Activity = require('./src/controllers/activitiesform')
const ChangeOfLocation = require('./src/controllers/changeLocation')
const Contractors = require('./src/controllers/contractors');
const Monitors = require('./src/controllers/monitors')
const MonitorsRep = require('./src/controllers/monitorsReport')
const Phases = require('./src/controllers/phases')
const Training = require('./src/controllers/training')
const Reports = require('./src/controllers/reports');
const Update = require('./src/controllers/updates')
const VLC = require('./src/controllers/vlc')
const SupaInfo = require('./src/controllers/supervisorinfo')









const Request = require('./src/middleware/requestlog')

app.use(cors())

http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


dotenv.config();


app.use(express.static(path.join(__dirname, 'public')));


const storage = multer.diskStorage({
    distination: function (req, file, cb) {
      cb(null, './src');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/gif'||'image/png') {
      cb(null, true);
    } else {
      cb(new Error('image is not gif'), false);
    }
  };
  
  const upload = multer({
    storage,
    fileFilter,
  });
  

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
      return res.status(200).json({});
    }
    next();
  });
  
  

     
app.get('/', function(req,res){
res.json({
    m:'sdg'
})
})

app.use('/api/v1/', Estimator);
app.use('/api/v1/users', Users);
app.use('/api/v1/projects', Projects);
app.use('/api/v1/analytics', Analytics);
app.use('/api/v2/analytics', Analytics2);
app.use('/api/v1/changeoflocation', ChangeOfLocation);
app.use('/api/v1/contractors', Contractors);
app.use('/api/v1/monitors', Monitors);
app.use('/api/v1/monitorsreports', MonitorsRep);
app.use('/api/v1/phases', Phases);
app.use('/api/v1/training', Training);
app.use('/api/v1/reports', Reports);
app.use('/api/v1/vlc', VLC);
app.use('/api/v1/update', Update);
app.use('/api/v1/superinfo', SupaInfo);





//app.get('/api/v1/ggg/:id', Activity.getUser)
  
app.post('/api/v1/update2', upload.single('image'), (req, res) => {
    // console.log(req.body)
      cloudinary.uploader.upload(req.file.path, function (result) {
       //  console.log(result.secure_url)
         res.send({imgurl:result.secure_url})
        Activity.UpdateBeneficiary(req, res, result.secure_url);
       });
     });
  
     app.post('/api/v1/activityform', upload.single('image'), (req, res) => {
      // console.log(req.body)
        cloudinary.uploader.upload(req.file.path, function (result) {
           console.log(result.secure_url)
          // res.send({imgurl:result.secure_url})
          Activity.createReport(req, res, result.secure_url);
         });
       });
       
       app.post('/api/v1/weeklyactivityform', upload.single('image'), (req, res) => {
         // console.log(req.body)
           cloudinary.uploader.upload(req.file.path, function (result) {
              console.log(result.secure_url)
             // res.send({imgurl:result.secure_url})
             Activity.createWeeklyReport(req, res, result.secure_url);
            });
          });
        
       app.post('/api/v1/upload', upload.single('image'), (req, res) => {
        // console.log(req.body)
          cloudinary.uploader.upload(req.file.path, function (result) {
           //  console.log(result.secure_url)
             res.send({imgurl:result.secure_url})
         //   Activity.createReport(req, res, result.secure_url);
           });
         });
       
     app.post('/api/v1/activityform1', (req, res) => {
          Activity.createActivity(req, res);
       });
     
       app.post('/api/v1/weeklyactivityform1', (req, res) => {
         Activity.createWeeklyActivity(req, res);
      });
     
     //Change daily report image
      app.post('/api/v1/updatedailyreport', upload.single('image'), (req, res) => {
       // console.log(req.body)
         cloudinary.uploader.upload(req.file.path, function (result) {
            console.log(result.secure_url)
           // res.send({imgurl:result.secure_url})
           Activity.UpdateDailyReport(req, res, result.secure_url);
          });
        });
     
        app.post('/api/v1/updateweeklyreport', upload.single('image'), (req, res) => {
         // console.log(req.body)
           cloudinary.uploader.upload(req.file.path, function (result) {
              console.log(result.secure_url)
             // res.send({imgurl:result.secure_url})
             Activity.UpdateWeeklyReport(req, res, result.secure_url);
            });
          });
       
     
    
module.exports = app;