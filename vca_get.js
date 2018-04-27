let Auth = require('bce-sdk-js').Auth;
let path = require('path');
let querystring = require('querystring');
let moment = require('moment');
let http = require('http');
moment.locale('zh-cn');

var method = 'GET';
var mediaUrl = 'http://www.sitvs.com:15414/vod/movie/heibao.mp4';
var uri = '/v2/media';
var params = {
	source : mediaUrl
};
var formatDate = moment().utc().format('YYYY-MM-DDTHH:mm:ssZ');
var headers = {
    'host': 'vca.bj.baidubce.com',
    'content-type': 'application/json; charset=utf-8',
    'x-bce-date': formatDate
};
var auth = new Auth('558e0647913e459686f660991bdc5b72', 'a2b1117109ac43c6953b06ae2795ba79');
var authorization = auth.generateAuthorization(method, uri, params, headers);
console.log("authorization = " + authorization);
headers.authorization = authorization;

var options={  
   hostname:'vca.bj.baidubce.com',  
   path:uri+'?source='+encodeURIComponent(mediaUrl),//querystring.stringify(params),  
   method:method,  
   headers: headers
}  

//get 请求外网  
// http.get(options,function(req,res){  
//     var html='';  
//     req.on('data',function(data){  
//         html+=data;  
//     });  
//     req.on('end',function(){  
//         console.info(html);  
//     });  
// }); 

var req = http.request(options, function (res) { 
    console.log('STATUS: ' + res.statusCode); 
    console.log('HEADERS: ' + JSON.stringify(res.headers)); 
    res.setEncoding('utf8'); 
    var html = '';
    res.on('data', function (data) { 
    	console.log('data = ' + data); 
        html+=data;
    }); 
    req.on('end',function(){  
         console.log(html);  
    }); 
}); 
   
req.on('error', function (e) { 
    console.log('problem with request: ' + e.message); 
}); 
   
req.end();