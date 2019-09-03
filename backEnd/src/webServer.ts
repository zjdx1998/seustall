/**
 * @author Hanyuu
 * @version 1.0.0
 * @date 2019/08/31
 */
console.log("[info] web server loaded.");
import Koa from 'koa';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import koaRouter from 'koa-router';
import fs from 'fs';
import path from 'path';
import jwt, { decode } from 'jsonwebtoken';
import { User, Item, UserInterface, ItemInterface } from './role';
import conf from './conf';
import data from "./database";
import mail from './mailpush';
import resend from './resend';
import SMSVerify from './SMSVerify';
import { any } from 'bluebird';

const router = new koaRouter();
function webServer()
{
	//尝试连接数据库，若失败则抛出异常重新尝试连接
	const database = new data();;
	try
	{
		const app = new Koa();
		app.use(logger());
		app.use(koaBody({ multipart: true }));
		app.use(router.routes());
		/**
		 * @description public 根据uuid查询用户脱敏信息
		 */
		router.get('/user/:uuid', async (ctx, next) =>
		{
			const res = await database.queryUser(ctx.params.uuid);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		/**
		 * @description token 用户查询自身非脱敏信息
		 */
		router.post('/user/me', async (ctx, next) =>
		{
			const verify: any = verifyToken(ctx.request.body.token);
			if (!verify)
			{
				ctx.response.status = 403;
				return;
			}
			const res = await database.queryUserS(verify.uuid);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		/**
		 * @description public 查看用户发布的商品
		 */
		router.post('/user/published', async (ctx, next) =>
		{
			const res = await database.queryPublished(ctx.request.body.uuid);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		/**
		 * @description public->token 用户登录
		 */
		router.post('/user/login', async (ctx, next) =>
		{
			const res = await database.loginByPhonenumber(ctx.request.body.phonenumber, ctx.request.body.password);
			if (res.status === "success")
			{

				//签发token
				const payload = {
					uuid: res.info.uuid,
					generate: (new Date()).valueOf()
				}
				const token = jwt.sign(payload, conf.secretkey);
				res.token = token;
			}
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';

		})
		/**
		 * @description public 用户注册
		 * @todo 前端完成后添加短信验证码验证
		 */
		router.post('/user/register', async (ctx, next) =>
		{
			var res = new Object() as any;
			try
			{
				const smsres = await SMSVerify(ctx.request.body.phonenumber, ctx.request.body.verifycode)
				/**
				 * @description 临时跳过手机验证
				 * @todo 正式版上线时删除
				 */
				// if (smsres.status === "200")
				if (true)
				{
					var newUser = new Object() as UserInterface;
					newUser = ctx.request.body;
					newUser.username = "新手咸鱼人员";
					newUser.idcard = "";
					newUser.studentid = 0;
					newUser.address = "";
					newUser.score = 10;
					newUser.info = "这家伙很懒，什么都没有写＞︿＜"
					newUser.verified = false;
					newUser.avatarurl = path.join(conf.avatar, "default.jpg")
					const resdatabase = await database.writeUser(newUser);
					if (resdatabase.status === "success")
					{
						res.status = conf.res.success
					}
					else
					{
						res.status = conf.res.failure;
						res.info = resdatabase.info;
					}
				}
				else
				{
					res.status = conf.res.failure;
					res.info = smsres.error;
					res.extra = smsres.status;
				}
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = 'application/json';

			} catch (error)
			{
				console.error(error);
			}
		})
		/**
		 * @description 更改用户头像
		 */
		router.post('/user/avatar', async (ctx, next) =>
		{
			const verify: any = verifyToken(ctx.request.body.token);
			if (!verify)
			{
				ctx.response.status = 403;
				return;
			}
			var response = new Object() as any;
			try
			{
				const uuid = verify.uuid;
				const files: any = ctx.request.files;
				const file = files.file;
				const url = path.join(conf.avatarfs, `${uuid}.jpg`)
				const exist = await database.updateAvatorURL(uuid, path.join(conf.avatar, `${uuid}.jpg`));
				if (exist)
				{
					const reader = fs.createReadStream(file.path);
					const stream = fs.createWriteStream(url);
					reader.pipe(stream);
					// console.log(`${file.name} -> ${url}`);
					response.status = conf.res.success
					ctx.response.body = JSON.stringify(response);
					ctx.response.type = "application/json";
				} else
				{
					response.status = conf.res.failure;
					response.info = "invaild request";
					ctx.response.body = JSON.stringify(response);
					ctx.response.type = "application/json";
				}
			} catch (error)
			{
				console.error(`[ERROR] ${error}`);
				response.status = conf.res.failure;
				response.info = "server failed";
				ctx.response.body = JSON.stringify(response);
				ctx.response.type = "application/json";
			}
		});
		/**
		 * @description 修改用户信息
		 */
		router.post('/user/modify', async (ctx, next) =>
		{
			var res = new Object() as any;
			try
			{
				const verifyres = verifyToken(ctx.request.body.token)
				if (!verifyres)
				{
					ctx.response.status = 403;
					return;
				}
				ctx.request.body.uuid = verifyres.uuid;
				const databaseres = await database.updateUser(ctx.request.body)
				if (!databaseres)
				{
					ctx.response.status = 403
					return;
				}
				res.status = conf.res.success;
				ctx.response.type = "application/json";
				ctx.response.body = JSON.stringify(res)

			} catch (error)
			{
				console.error(error)
				res.status = "false"
				ctx.response.type = "application/json";
				ctx.response.body = JSON.stringify(res)
			}
		})
		/**
		 * @description 邮箱验证
		 */
		router.get('/user/verify/:token', async (ctx, next) =>
		{
			const res = new Object() as any;
			const userInfo = verifyToken(ctx.params.token);
			if (userInfo.useage === "mail")
			{
				const verifyRes = database.verifyUser(userInfo.uuid);
				if (verifyRes)
				{
					res.status = conf.res.success;
					ctx.response.body = JSON.stringify(res);
					ctx.response.type = "application/json";
					return;
				}
			}
			res.status = conf.res.failure;
			res.info = "invaild request"
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = "application/json";
			return;
		})
		/**
		 * @description 邮箱验证请求
		 */
		router.post('/user/verify', async (ctx, next) =>
		{
			try
			{
				var res: any = new Object() as any;
				const verify: any = verifyToken(ctx.request.body.token);
				if (!verify)
				{
					ctx.response.status = 403;
					return;
				}
				const queryres: any = await database.queryUserS(verify.uuid);
				if (await mail(queryres as UserInterface))
				{
					res.status = conf.res.success;
				} else
				{
					res.status = conf.res.failure;
				}
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = 'application/json';

			} catch (error)
			{
				console.error(error);
				res.status = "server error";
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = 'application/json';
			}
		})
		/**
		 * @description token 用户添加求购/商品
		 */
		router.post('/item/add', async (ctx, next) =>
		{
			const verify: any = verifyToken(ctx.request.body.token);
			if (!verify)
			{
				ctx.response.status = 403;
				return;
			}
			var newGood = new Object() as ItemInterface;
			newGood = ctx.request.body;
			newGood.uuid = verify.uuid;
			const res = await database.writeItem(newGood);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		/**
		 * @description 商品添加图片
		 */
		router.post('/item/image', async (ctx, next) =>
		{
			const verify: any = verifyToken(ctx.request.body.token);
			if (!verify)
			{
				ctx.response.status = 403;
				return;
			}
			var response = new Object() as any;
			try
			{
				const files: any = ctx.request.files;
				var count = 0;
				var imgList = new Array();
				var imgListfs = new Array();
				for (var file in files)
				{
					const filename = `${Math.random()}.jpg`
					const urlfs = path.join(conf.imgurlfs, filename);
					const url = path.join(conf.imgurl, filename);
					imgListfs.push(urlfs);
					imgList.push(url);
					++count;
				}
				count = 0
				for (var file in files)
				{
					const reader = fs.createReadStream(files[file].path);
					const stream = fs.createWriteStream(imgListfs[count]);
					reader.pipe(stream);
					++count;
				}
				response.status = conf.res.success
				response.imgurl = imgList;
				ctx.response.body = JSON.stringify(response);
				ctx.response.type = "application/json";

			} catch (error)
			{
				console.error(`[ERROR] ${error}`);
				response.status = conf.res.failure;
				response.info = conf.except.invaildReq;
				ctx.response.body = JSON.stringify(response);
				ctx.response.type = "application/json";
			}
		});
		/**
		 * @description public 根据itemid查询商品信息
		 */
		router.get('/item/:itemid', async (ctx, next) =>
		{
			const res = await database.queryItem(ctx.params.itemid);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		/**
		 * @description 修改商品信息
		 */
		router.post('/item/modify', async (ctx, next) =>
		{
			var res = new Object() as any;
			try
			{
				const verifyres = verifyToken(ctx.request.body.token)
				var uuid: any = await database.queryItem(ctx.request.body.itemid)
				uuid = uuid.uuid;
				if (!verifyres || uuid != verifyres.uuid)
				{
					ctx.response.status = 403;
					return;
				}
				const databaseres = await database.updateItem(ctx.request.body)
				if (!databaseres)
				{
					ctx.response.status = 403
					return;
				}
				res.status = conf.res.success;
				ctx.response.type = "application/json";
				ctx.response.body = JSON.stringify(res)

			} catch (error)
			{
				console.error(error)
				res.status = "false"
				ctx.response.type = "application/json";
				ctx.response.body = JSON.stringify(res)
			}
		})
		/**
		 * @description 物品交易
		 */
		router.post('/item/trade', async (ctx, next) =>
		{
			try
			{
				var res = new Object() as any;
				const verifyres = verifyToken(ctx.request.body.token)
				if (!verifyres)
				{
					ctx.response.status = 403;
					return;
				}
				const restrade = await database.tradeItem(ctx.body.itemid, verifyres.uuid);
				if (restrade)
				{
					res.status = conf.res.success;
				} else
				{
					res.status = conf.res.failure;
					res.info = "item not availabe for trade"
				}

			} catch (error)
			{
				res.status = "filure";
				res.info = "invaild requests";
			}
		});
		/**
		 * @description 用户搜索功能
		 */
		router.get('/item/search/:str', async (ctx, next) =>
		{
			const res = await resend(conf.searchConfig.host,
				{
					// "source": "_id",
					"query": {
						"multi_match": {
							"query": ctx.params.str,
							"fields": ["username", "info"]
						}
					}
				}
			)
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = "application/json";
			return;
		})
		/**
		 * @description 商品搜索功能
		 */
		router.get('/item/search/:str', async (ctx, next) =>
		{
			const res = await resend(conf.searchConfig.host,
				{
					// "source": "_id",
					"query": {
						"multi_match": {
							"query": ctx.params.str,
							"fields": ["username", "info"]
						}
					}
				}
			)
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = "application/json";
			return;
		})
		/**
		 * @description 查询收藏夹
		 */
		router.post('/fav/query', async (ctx, next) =>
		{
			var res = new Object() as any;
			try
			{
				var res = new Object() as any;
				const verifyres = verifyToken(ctx.request.body.token)
				if (!verifyres)
				{
					ctx.response.status = 403;
					return;
				}
				const resfav = await database.favouritesQuery(verifyres.uuid);
				res.status = conf.res.success;
				res.res = resfav;
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = "application/json";
				return;

			} catch (error)
			{
				res.status = conf.res.success;
				res.info = conf.except.invaildReq;
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = "application/json";
				console.error(error);
			}
		});
		/**
		 * @description 添加到收藏夹
		 * @todo 收藏夹权限隔离
		 */
		router.post('/fav/add', async (ctx, next) =>
		{
			var res = new Object() as any;
			try
			{
				var res = new Object() as any;
				const verifyres = verifyToken(ctx.request.body.token)
				if (!verifyres)
				{
					ctx.response.status = 403;
					return;
				}
				const resdatabase = await database.favouritesAdd(verifyres.uuid, JSON.parse(ctx.request.body.data));
				if (resdatabase.status === conf.res.success)
				{
					res.status = conf.res.success;
				}
				else
				{
					res.status = conf.res.failure;
					res.info = resdatabase.info;
				}
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = "application/json";
			} catch (error)
			{
				res.status = conf.res.failure;
				res.info = error;
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = "application/json";
			}
		});
		/**
		 * @description  从收藏夹删除
		 * @todo  收藏夹权限隔离
		 */
		router.post('/fav/delete', async (ctx, next) =>
		{
			var res = new Object() as any;
			try
			{
				var res = new Object() as any;
				const verifyres = verifyToken(ctx.request.body.token)
				if (!verifyres)
				{
					ctx.response.status = 403;
					return;
				}
				const resdatabase = await database.favouritesDelete(verifyres.uuid,JSON.parse(ctx.request.body.data));
				if (resdatabase.status === conf.res.success)
				{
					res.status = conf.res.success;
				}
				else
				{
					res.status = conf.res.failure;
					res.info = resdatabase.info;
				}
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = "application/json";
			} catch (error)
			{
				res.status = conf.res.failure;
				res.info = error;
				ctx.response.body = JSON.stringify(res);
				ctx.response.type = "application/json";
			}
		})
		app.listen(conf.port);
	} catch (error)
	{
		console.error(error);
	}
}
/**
 * @description 验证token，验证正确返回对应uuid，失败返回null
 * @returns uuid:string | null
 */
function verifyToken(token: string): any
{
	var response = new Object() as any;
	return jwt.verify(token, conf.secretkey, (error, decoded) =>
	{
		if (error)
		{ return }
		return decoded
	})
}
export default webServer;