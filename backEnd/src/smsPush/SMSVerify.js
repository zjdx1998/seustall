/*
    @version: 1.0
    @author: 71117123张建东
    @date: 2019/9/4
*/
//npm install qcloudsms_js --save
var sc = require('./secret')
var QCloudSMS = require("qcloudsms_js");
var appID = sc.Decrypt("0DF115C3318934FCC9271317F1FE6E10");
var appKEY = sc.Decrypt("2C18DA9189DDC0BD6A55C50AB061779508685BD059D6E369BD2A5241578D24A661F919744954614304FAF53852524A2B");
var templatedID = sc.Decrypt("6180D11E229A73FFBD56ED0F025EC99E");
var smsSign = '东大杂货铺';
var qcloudsms = QCloudSMS(appID, appKEY);
var ssender = qcloudsms.SmsSingleSender();
function genCode(){
    var str = "";
    for(var i=1;i<=6;i++)
        str+=Math.floor(Math.random()*10);
    return parseInt(str);
}

function callback(err, res, resData) {
    if (err) {
        console.log("err: ", err);
    } else {
        console.log("request data: ", res.req);
        console.log("response data: ", resData);
    }
}

function SMSVerify(phoneNumber,VerifyCode){
    // let VerifyCode = genCode();
    ssender.sendWithParam(86, phoneNumber, templatedID, [VerifyCode], smsSign, "", "", callback);
    return VerifyCode;
}

module.exports = {
    SMSVerify
}
