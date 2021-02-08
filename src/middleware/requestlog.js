const path = require('path')
const fs = require('fs')

async function logRequest(req, res, next) {
    console.log('reqq')

 const { statusCode } =res;
 const { method, url } =req;
 const ur= '/api/v1/on-covid-19';
 const requestTime = ((process.hrtime()[0]*1e9+process.hrtime()[1])/1e6).toLocaleString().substr(0,2)
  const data = `${method}\t\t${ur+url}\t\t${statusCode}\t\t${requestTime}ms`
  const file= path.join(__dirname,'logs.txt')
  fs.appendFile(file, `${data}\n`,(err)=>{
      console.log('done')
  })

next()
}

module.exports = {
  logRequest,

};