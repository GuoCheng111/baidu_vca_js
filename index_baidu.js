
let path = require('path');
var moment = require('moment');
moment.locale('zh-cn');

let Auth = require('./auth');

var ak = ''
var sk = ''

var params = params || {};
var formatDate = moment().utc().format('YYYY-MM-DDTHH:mm:ssZ');
var headers = {
	"x-bce-date": formatDate,
	'Host': "gz.bcebos.com"
};

request = {
    hostname: headers['Host'],
    path: "/",
    method: 'GET',
    headers: headers,
    params: params
}

var auth = new Auth(ak, sk);
var authorization = auth.generateAuthorization(request);
console.log(authorization)
headers.Authorization = authorization
   
var req = require('http').request(request, function (res) { 
    // console.log('STATUS: ' + res.statusCode); 
    // console.log('HEADERS: ' + JSON.stringify(res.headers)); 
    res.setEncoding('utf8'); 
    res.on('data', function (chunk) { 
        console.log(chunk); 
    }); 
}); 
   
req.on('error', function (e) { 
    console.log('problem with request: ' + e.message); 
}); 
   
req.end();










