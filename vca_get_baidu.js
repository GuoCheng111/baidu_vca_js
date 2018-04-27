
let path = require('path');
var moment = require('moment');
var http = require('http');
moment.locale('zh-cn');

let BceAuth = require('./bceAuth/auth');
let querystring = require('querystring');

var ak = '558e0647913e459686f660991bdc5b72'
var sk = 'a2b1117109ac43c6953b06ae2795ba79'

var params = {
    source : "http://www.sitvs.com:15414/vod/movie/heibao.mp4"
};
var formatDate = moment().utc().format('YYYY-MM-DDTHH:mm:ssZ');
var headers = {
    "x-bce-date": formatDate,
    'content-type': 'application/json; charset=utf-8',
    'host': "vca.bj.baidubce.com"
};
var method = "GET";
var paths = "/v2/media";

var auth = new BceAuth(ak, sk);
var authorization = auth.generateAuthorization(method, paths, params, headers);
console.log('authorization = ' + authorization);
headers.authorization = authorization;

var req = http.request({
    hostname: "vca.bj.baidubce.com",
    path: paths + "?" + querystring.stringify(params),
    method: method,
    headers: headers
}, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.')
    })
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

//write data to request body
//req.write(postData);
req.end();