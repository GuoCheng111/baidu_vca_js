
let path = require('path');
var moment = require('moment');
moment.locale('zh-cn');

let Auth = require('./auth');
let querystring = require('querystring');

var ak = '558e0647913e459686f660991bdc5b72'
var sk = 'a2b1117109ac43c6953b06ae2795ba79'

var params = params || {};
var formatDate = moment().utc().format('YYYY-MM-DDTHH:mm:ssZ');
var headers = {
	"x-bce-date": formatDate,
    'content-type': 'application/json; charset=utf-8',
	'Host': "vca.bj.baidubce.com"
};
var paths = "/v2/media";

var postData = {
    source:'http://www.sitvs.com:15414/vod/movie/heibao.mp4'
};
console.log('JSON.stringify = ' + JSON.stringify(postData));

request = {
    hostname: headers['Host'],
    path: paths,
    method: 'PUT',
    headers: headers,
    params: params
}

var auth = new Auth(ak, sk);
var authorization = auth.generateAuthorization(request);
console.log('authorization = ' + authorization);
headers.Authorization = authorization;

var req = require('http').request(request, function (res) { 
    // console.log('STATUS: ' + res.statusCode); 
    // console.log('HEADERS: ' + JSON.stringify(res.headers)); 
    var datas = '';
    res.setEncoding('utf8'); 
    res.on('data', function (chunk) { 
        console.log('chunk = ' + chunk);
        datas += chunk; 
    }); 
    req.on('end',function(){  
         console.log(datas);  
    }); 
}); 
   
req.on('error', function (e) { 
    console.log('problem with request: ' + e.message); 
}); 

req.write(JSON.stringify(postData));
   
req.end();










