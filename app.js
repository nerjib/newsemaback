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

    var webURL = 'http://kadruwassa.ng'
    var welcomeMsg = `CON Kadruwassa functionality reports
    select facility type to continue
    1. Solar Motorized Borehole
    2. Handpump Borehole`;

    /*var facilityDetails = {
        facility: "",
        fault: "",
        fid: "",
        telephone: "",
        open: true
    }*/
    let facility='';
    fault='';
    fid="";

    var lastData = "";
    var textValue = text.split('*').length
    var message = ""

  let response = "";
if(text === ''){
  message = welcomeMsg
 facility = text;

}else if(textValue === 1){
  message = "CON Facility code?"
  fid = text.split('*')[0];
}else if(textValue === 2){
  message = `CON What's your facility fault?`
  fault = `text.split('*')[1]`;
}else{
  message = `END Thanks for your report ${facility} fid ${fid}  ${fault} ${phoneNumber}`
    console.log(fid)
    console.log(facility)

}

  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type: text/plain");
  res.send(message);
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