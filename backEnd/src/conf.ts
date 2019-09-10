/**
 * @author Hanyuu
 * @version 1.0.0
 * @description config
 */
export default {
	root: "http://hanyuu.top:8080",
	// root:"http://localhost",
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
	host: process.env.SEUSTALL || 'localhost',
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
		databaseException: "database exception",
		invaildReq: "invaild request",
		noUser: "no such user",
		noItem: "no such item",
		noFav: "no such favorites",
		noMwg: "no such message",
		badVerifycode: "bad verify code",
		reqtoofreq: "request too frequent",
		notfortrade: "not for trade",
		noPermission:"Insufficient permissions",
	},
	SMSConfig:
	{
		minInterval: 60000,
		livetime: 1800000,
	},
	mailConfig:
	{
		serivce: "126",
		user: "TomotakeYoshino@126.com",
		pass: "gitpushf1"
	},
	searchConfig:
	{
		host: "http://hanyuu.top:9200/index-users/_search",
	},
	sold:
	{
		sale: 1,
		sold: 2,
		selling: 3,
		want: -1,
		got: -2,
		trading: -3,
	},
	resend:
	{
		// todo 打包时打开此开关
		switchOn: true,
		/**
		switchOn: false,
			//*/
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