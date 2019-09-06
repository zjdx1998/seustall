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
		reqtoofreq:"request too frequent"
	},
	SMSConfig:
	{
		minInterval:60000,
		livetime: 1800000,
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
