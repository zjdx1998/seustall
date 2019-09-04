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
		var ssender = qcloudsms.SmsSingleSender();
		ssender.sendWithParam(conf.SMSConfig.zone,phoneNumber,conf.SMSConfig.templateId,code,conf.SMSConfig.smsSign,"","",callback);
	}
	else
	{
		res.status = conf.res.failure;
		res.info = conf.except.invaildReq;
		return
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