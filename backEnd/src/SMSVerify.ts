/**
 * @author Hanyuu
 * @version 2.0.0
 * @date 2019/09/03
 * @updated 2019/09/04
 */
import qcloudsms from 'qcloudsms_js';
import jwt from 'jsonwebtoken';
import conf from './conf';
/**
 * @description https://cloud.tencent.com/document/product/382/3772

 */
/**
 * @description 生成验证码
 */
function generateCode(phoneNumber: string)
{
	if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber)))
	{
		return undefined;
	}
	const payload = {
		phoneNumber,
		generate: (new Date()).valueOf() / 3600
	}
	const token = jwt.sign(payload, conf.secretkey);
	const code = token.substr(token.length - 4);
	return code;
}
/**
 * @description 请求验证码短信
 */
export function requireCode(phoneNumber: string)
{
	var res = new Object() as any;
	var code = generateCode(phoneNumber);
	if (code)
	{
		var sms = qcloudsms(conf.SMSConfig.appid, conf.SMSConfig.appkey);
		var ssender = sms.SmsSingleSender;
		ssender(conf.SMSConfig.zone, phoneNumber, conf.SMSConfig.templateId, [code], conf.SMSConfig.sign, "", "", callback);
		res.status = conf.res.success;
		return res;
		// var smsType = 0;
	                              	// var ssender = qcloudsms.SmsSingleSender;
		// ssender(smsType, conf.SMSConfig.zone, phoneNumber, code, "", "", callback);
		// var sms = qcloudsms(conf.SMSConfig.appid, conf.SMSConfig.appkey);
		// var ssender = sms.SmsSingleSender;
		// ssender.sendWithParam(conf.SMSConfig.zone,phoneNumber,conf.SMSConfig.templateId,code,conf.SMSConfig.smsSign,"","",callback);
	}
	else
	{
		res.status = conf.res.failure;
		res.info = conf.except.invaildReq;
		return res;
	}
}
export function testCode(phoneNumber: string)
{
	var res = new Object() as any;
	var code = generateCode(phoneNumber);
	if (code)
	{
		var QcloudSms = require("qcloudsms_js");
		// 短信应用 SDK AppID
		var appid = conf.SMSConfig.appid;  // SDK AppID 以1400开头
		// 短信应用 SDK AppKey
		var appkey = "9ff91d87c2cd7cd0ea762f141975d1df37481d48700d70ac37470aefc60f9bad";
		// 需要发送短信的手机号码
		var phoneNumbers = ["21212313123", "12345678902", "12345678903"];
		// 短信模板 ID，需要在短信控制台中申请
		var templateId = 7839;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
		// 签名
		var smsSign = "腾讯云";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
		// 实例化 QcloudSms
		var qcloudsms = QcloudSms(appid, appkey);
		// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
		function callback(err:any, res:any, resData:any)
		{
			if (err)
			{
				console.log("err: ", err);
			} else
			{
				console.log("request data: ", res.req);
				console.log("response data: ", resData);
			}
		}
	}
	else
	{
		res.status = conf.res.failure;
		res.info = conf.except.invaildReq;
		return res;
	}
}
function callback(err:any, res:any, resData:any)
{
	if (err)
	{
		console.log("err: ", err);
	} else
	{
		console.log("request data: ", res.req);
		console.log("response data: ", resData);
	}
}
/**
 * @description 校验验证码
 */
export function verifyCode(phoneNumber: string, verifyCode: string)
{
	var res = new Object() as any;
	try
	{
		const resrequire = generateCode(phoneNumber);
		if (resrequire)
		{
			if (resrequire == verifyCode)
			{
				res.status = conf.res.success;
			}
			else
			{
				res.status = conf.res.failure;
				res.info = conf.except.invaildReq;
			}
			return res;
		}
		else
		{
			res.status = conf.res.failure;
			res.info = conf.except.invaildReq;
			return res;
		}
	} catch (error)
	{
		res.status = conf.res.failure;
		res.info = error;
		return res;
	}

}
// import nodefetch from 'node-fetch';
// import conf from './conf';
// export default async function (phoneNumber: string, code: string)
// {
// 	return (nodefetch as any)(conf.SMSConfig.host,
// 		{
// 			body: `appkey=${conf.SMSConfig.appkey}&phone=${phoneNumber}&zone=${conf.SMSConfig.zone}&code=${code}`,
// 			cache: 'no-cache',
// 			credentials: 'same-origin',
// 			headers: {
// 				'user-agent': 'Mozilla/4.0 MDN Example',
// 				'content-type': 'text/plain'
// 			},
// 			method: 'POST',
// 			mode: 'cors',
// 			redirect: 'follow',
// 			referrer: 'no-referrer',
// 		}
// 	).then((response: any) => response.json())

// }