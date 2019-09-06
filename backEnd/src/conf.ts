/**
 * @author Hanyuu
 * @version 1.0.0
 * @description config
 */
export default {
	res:
	{
		success: "success",
		failure: "failure",
	},
	table:
	{

		users: "users",
		items: "items",
		favorites: "favourites",
		chat: "chat",
	},
	port: 4000,
	host: "localhost",
	datatable: "foof",
	username: "app",
	password: "foof",
	avatar: "./image/avatar",
	imgurl: "./image/item",
	avatarfs: "./asset/image/avatar",
	imgurlfs: "./asset/image/item",
	secretkey: "5593a7901f990f28c117027f519a1a851c382520",
	except: {
		reset: "fetal error,reseting server",
		dbConnT: "database connect success",
		dbConnF: "database connect failed",
		databaseexception: "database exception",
		invaildReq: "invaild request",
		noUser: "no such user",
		badverifycode: "bad verify code",
	},
	SMSConfig:
	{
		appkey: "5d3689b4c39a53ce7526fdeace54d9e3",
		appid: 1400253561,
		templateId: 233504,
		zone: 86,
		host: "",
		smsSign: "东大杂货铺",
		sign: "东大杂货铺"

		// host: "https://webapi.sms.mob.com/sms/verify",
		// appkey: "2c3bb00a9ca40",
		// error:
		// {
		// 	200: "验证成功",
		// 	405: "AppKey为空",
		// 	456: "国家代码或手机号码为空",
		// 	457: "手机号码格式错误",
		// 	466: "请求校验的验证码为空",
		// 	467: "请求校验验证码频繁",
		// 	468: "验证码错误",
		// 	474: "没有打开服务端验证开关",
		// }
	},
	mailConfig:
	{
		serivce: "qq",
		user: "wakamiyaeve@qq.com",
		pass: "azffygurwzxfdhgf",
	},
	searchConfig:
	{
		host: "http://hanyuu.top:9200/index-users/_search",
	},
	sold:
	{
		sale: 1,
		sold: 2,
		want: -1,
		got: -2,
	},
	resend:
	{
		host:
		{
			root: "http://hanyuu.top:9200",
			item: "/index-goods/goods/",
			user: "/index-users/users/",
		},
		search:
		{
			root: "http://hanyuu.top:9200",
			item: "/index-goods/_search",
			user: "/index-users/_search",
			method:
			{
				user: "user",
				item: "good",
			}
		}

	}

}
