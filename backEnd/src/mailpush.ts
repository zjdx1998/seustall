/**
 * @author Hanyuu
 * @version 1.0.0
 * @date 2019/09/01
 * @description verify mail push module
 */
var nodemailer = require('nodemailer');
import conf from './conf';
import jwt from 'jsonwebtoken';
import { UserInterface } from './role';
export default async function (src: UserInterface)
{


	//https://github.com/andris9/nodemailer-wellknown#supported-services
	var transporter = nodemailer.createTransport({
		service: conf.mailConfig.serivce,
		// SMTP
		port: 465,
		// 使用 SSL
		secureConnection: true,
		auth: {
			user: conf.mailConfig.user,
			pass: conf.mailConfig.pass,
		}
	});
	//签发token
	const payload = {
		uuid: src.uuid,
		useage: "mail",
		generate: (new Date()).valueOf()
	}
	const timeout = {
		expiresIn: 1800 //秒到期时间
	}
	const token = jwt.sign(payload, conf.secretkey, timeout);
	const url = `http://localhost/user/verify/${token}`;
	const text = `${src.username} ${url}.`
	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: conf.mailConfig.user,
		to: `${src.idcard}@seu.edu.cn`,
		subject: "foof",
		text: token,
	};

	var res = false;
	res = await transporter.sendMail(mailOptions, function (error: any, info: any)
	{
		if (error)
		{
			console.error(error);
			res = false;
		} else
		{
			// console.log('Message sent: ' + info.response);
			res = true;
		}
	});
	if (res)
	{
		return true;
	}
	return false;
}