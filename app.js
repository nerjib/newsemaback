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
const Reports = require('./src/controllers/reports')
const Analytics = require('./src/controllers/analytics')
//var request = require('request');
const MessagingResponse = require('twilio').twiml.MessagingResponse;






//const Request = require('./src/middleware/requestlog')

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
  
  app.post('/sms', function(req,res){
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";
  
    if (text === "") {
      console.log(text);
      // This is the first request. Note how we start the response with CON
      response = `CON What would you like to check
          1. My account
          2. My phone number`;
    } else if (text === "1") {
      // Business logic for first level response
      response = `CON Choose account information you want to view
          1. Account number
          2. Account balance`;
    } else if (text === "2") {
      // Business logic for first level response
      // This is a terminal request. Note how we start the response with END
      response = `END Your phone number is ${phoneNumber}`;
    } else if (text === "1*1") {
      // This is a second level response where the user selected 1 in the first instance
      const accountNumber = "ACC100101";
      // This is a terminal request. Note how we start the response with END
      response = `END Your account number is ${accountNumber}`;
    } else if (text === "1*2") {
      // This is a second level response where the user selected 1 in the first instance
      const balance = "KES 10,000";
      // This is a terminal request. Note how we start the response with END
      response = `END Your balance is ${balance}`;
    }
  
    // Print the response onto the page so that our SDK can read it
    res.set("Content-Type: text/plain");
    res.send(response);
    // DONE!!!
  })

     
app.get('/', function(req,res){
res.json({
    m:'sdg'
})
})

app.use('/api/v1/users', Users);
app.use('/api/v1/reports', Reports);
app.use('/api/v1/analytics', Analytics);

/*
app.post('/api/v1/upload', upload.single('image'), (req, res) => {

  // console.log(req.body)
    cloudinary.uploader.upload(req.file.path, function (result) {
     //  console.log(result.secure_url)
       res.send({imgurl:result.secure_url})
   //   Activity.createReport(req, res, result.secure_url);
     });
   }); 

*/

module.exports = app;