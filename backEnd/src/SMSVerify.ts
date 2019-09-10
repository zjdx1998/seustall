/**
 * @author Hanyuu
 * @version 2.0.2
 * @date 2019/09/03
 * @updated 2019/09/05
 */
// import qcloudsms from 'qcloudsms_js';
import jwt from 'jsonwebtoken';
import conf from './conf';
import { SMSVerify } from './smsPush/SMSVerify';
import crypto from 'crypto';
/**
 * @description https://cloud.tencent.com/document/product/382/3772

 */
export default function sendSMS(phoneNumber:string,code:string)
{
	const respush = (SMSVerify as any)(phoneNumber, code);
}
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
	const ts = crypto.createHash('md5').update(token).digest('hex')
	var codeStr = ts.substr(ts.length - 4);
	var code = parseInt(codeStr, 16) % 1000;
	if (code <= 1000)
	{
		code += 1000;
	}
	return code;
}
/**
 * @description 请求验证码短信
 */
function requireCode(phoneNumber: string)
{
	var res = new Object() as any;
	var code = generateCode(phoneNumber);
	if (code)
	{
		const respush = (SMSVerify as any)(phoneNumber, code);
		res.status = conf.res.success;
		// todo 上线时删除此调试信息
		// res.info = respush;
		res.info = code;
		return res;
	}
	else
	{
		res.status = conf.res.failure;
		res.info = conf.except.invaildReq;
		return res;
	}
}
/**
 * @description 校验验证码
 */
function verifyCode(phonenumber: string, verifyCode: string)
{
	var res = new Object() as any;
	try
	{
		const resrequire = generateCode(phonenumber);
		if (resrequire)
		{
			if (resrequire.toString() == verifyCode)
			{
				res.status = conf.res.success;
			}
			else
			{
				res.status = conf.res.failure;
				res.info = conf.except.badVerifycode;
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