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
  
  let fid="";
  let facility='';
  let fault='';
  let lang = ""

  var facilityDetails = {
    facility: "",
    fault: "",
    fid: "",
    telephone: "",
    open: true
}
  app.post('/sms', function(req,res){
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    var webURL = 'http://kadruwassa.ng'
    var welcomeMsg = `CON Select language/ Zabi yare 
    1. English
    2. Hausa`;

    /*var facilityDetails = {
        facility: "",
        fault: "",
        fid: "",
        telephone: "",
        open: true
    }*/


    var lastData = "";
    var textValue = text.split('*').length
    var message = ""

  let response = "";
if(text === ''){
  message = welcomeMsg

}else if(textValue === 1){
  if(text.split('*')[0]==='2'){
    lang = 2
    message = `CON Wani irin famfo ne?
    1. Famfon tuka-tuka
    2. Famfon sola`
  }else {
    lang = 1
    message = `CON Select facility type
    1. Handpump borehole
    2. Solar motorized Borehole`
  }
 
}else if(textValue === 2){
    if (lang === 2){
      message = `CON Saka lambar famfo` 
      if(text.split('*')[1] === "1"){
        facilityDetails.facility='Famfon tuka-tuka'
      facility='Famfon tuka-tuka'
    
      }else if (text.split('*')[1] === "2"){
        facilityDetails.facility='Famfon sola'
        facility='Famfon sola'    
      }     
    }else{
      message = "CON Input facility code"
       if(text.split('*')[1] === "1"){
        facilityDetails.facility='Handpump Borehole'
      facility='Handpump Borehole'
    
      }else if (text.split('*')[1] === "2"){
        facilityDetails.facility='Solar Motorize Borehole'
        facility='Solar Motorize Borehole'
    
      }

    }

  /*message = `CON What is the problem?`
  fid = text.split('*')[1];
  facilityDetails.fid=text.split('*')[1]*/
}else if(textValue === 3){
  facilityDetails.fid= text.split('*')[2]

  if (lang === 2){
    message = `CON Menene matsalan famfo
    1. Baya aiki gaba daya
    2. Famfo baya bada wadataccen ruwa
    3. Ruwa baya taruwa a tanki
    4. wani matsala daban ` 
   
  }else{
    message = `CON What is the problem?
    1. Not working completely
    2. Low yield
    3. Water not pumpimg to tank
    4. others`
 

  }

}
else{
  message = `END Thanks for your feedback on ${facilityDetails.facility} with details
   facility Id: ${facilityDetails.fid}
   fault:   ${text.split('*')[2]}`
  fault = text.split('*')[3];
  facilityDetails.fault= text.split('*')[3]
    console.log(fid)
    console.log(facility)

    console.log(facilityDetails)

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