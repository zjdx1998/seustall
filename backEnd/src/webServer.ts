/**
 * @author Hanyuu
 */
console.log("[info] in dex loaded.");
import Koa from 'koa';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import koaRouter from 'koa-router';
import fs from 'fs';
import path from 'path';
import conf from './conf';
import data from "./database";
import { User, Item, UserInterface, ItemInterface } from './role';
import jwt, { decode } from 'jsonwebtoken';

console.log(conf);
console.log(conf.avatar);
const router = new koaRouter();
// const staticPath = path.join(__dirname,'../src/asset')
// const staticPath = '../src/asset';
function webServer()
{
	try
	{
		const database = new data();;
		const app = new Koa();
		app.use(logger());
		app.use(koaBody({ multipart: true }));
		// app.use(parser());
		app.use(router.routes());
		router.get('/item/:itemid', async (ctx, next) =>
		{
			const res = await database.queryItem(ctx.params.itemid);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.get('/user/:uuid', async (ctx, next) =>
		{
			// const res = await getUser(ctx.params.uuid);
			const res = await database.queryUser(ctx.params.uuid);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/user/me', async (ctx, next) =>
		{
			const verify: any = verifyToken(ctx.request.body.token);
			if (!verify || ctx.request.body.uuid != verify.uuid)
			{
				ctx.response.status = 403;
				return;
			}
			const res = await database.queryUserSelf(ctx.request.body.uuid);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/user/published', async (ctx, next) =>
		{
			const verify: any = verifyToken(ctx.request.body.token);
			if (!verify || ctx.request.body.uuid != verify.uuid)
			{
				ctx.response.status = 403;
				return;
			}
			const res = await database.queryPublished(ctx.request.body.uuid);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/user/login', async (ctx, next) =>
		{
			console.log(ctx.request.body);
			const res = await database.loginByPhonenumber(ctx.request.body);
			const payload = {
				uuid: res.info.uuid,
				generate: (new Date()).valueOf()
			}
			const token = jwt.sign(payload, conf.secretkey);
			res.token = token;
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/user/register', async (ctx, next) =>
		{
			var newUser = new Object() as UserInterface;
			newUser = ctx.request.body;
			newUser.score = 10;
			newUser.verified = false;
			newUser.avatarurl = path.join(conf.avatar, "default.jpg")
			const res = await database.writeUser(newUser);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/item/add', async (ctx, next) =>
		{
			const verify: any = verifyToken(ctx.request.body.token);
			if (!verify || ctx.request.body.uuid != verify.uuid)
			{
				ctx.response.status = 403;
				return;
			}
			var newGood = new Object() as ItemInterface;
			newGood = ctx.request.body;
			newGood.sold = 0;
			const res = await database.writeItem(newGood);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/user/avatar', async (ctx, next) =>
		{
			const verify: any = verifyToken(ctx.request.body.token);
			if (!verify || ctx.request.body.uuid != verify.uuid)
			{
				ctx.response.status = 403;
				return;
			}
			var response = new Object() as any;
			try
			{
				const uuid = ctx.request.body.uuid;
				const files: any = ctx.request.files;
				const file = files.file;
				const url = path.join(conf.avatarfs, `${uuid}.jpg`)
				const exist = await database.updateAvatorURL(uuid, path.join(conf.avatar, `${uuid}.jpg`));
				if (exist)
				{
					const reader = fs.createReadStream(file.path);
					const stream = fs.createWriteStream(url);
					reader.pipe(stream);
					console.log(`${file.name} -> ${url}`);
					response.status = "success"
					ctx.response.body = JSON.stringify(response);
					ctx.response.type = "application/json";
				} else
				{
					response.status = "failure";
					response.info = "invaild request";
					ctx.response.body = JSON.stringify(response);
					ctx.response.type = "application/json";
				}
			} catch (error)
			{
				console.error(`[ERROR] ${error}`);
				response.status = "failure";
				response.info = "server failed";
				ctx.response.body = JSON.stringify(response);
				ctx.response.type = "application/json";
			}

		});
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
				const itemid = ctx.request.body.itemid;
				const files: any = ctx.request.files;
				var count = 0;
				var imgList = new Array();
				for (var file in files)
				{
					const urlfs = path.join(conf.imgurlfs, `${itemid}_${count}.jpg`);
					const url = path.join(conf.imgurl, `${itemid}_${count}.jpg`);
					imgList.push(url);
					++count;
				}
				const exist = await database.updateImageURL(itemid, JSON.stringify(imgList));
				if (exist)
				{
					var count = 0;
					for (var file in files)
					{
						const urlfs = path.join(conf.imgurlfs, `${itemid}_${count}.jpg`);
						const reader = fs.createReadStream(files[file].path);
						const stream = fs.createWriteStream(urlfs);
						reader.pipe(stream);
						response.status = "success"
						ctx.response.body = JSON.stringify(response);
						ctx.response.type = "application/json";
						++count;
					}
				} else
				{
					response.status = "failure";
					response.info = "bad request";
					ctx.response.body = JSON.stringify(response);
					ctx.response.type = "application/json";
				}
			} catch (error)
			{
				console.error(`[ERROR] ${error}`);
				response.status = "failure";
				response.info = "invaild request";
				ctx.response.body = JSON.stringify(response);
				ctx.response.type = "application/json";
			}
		});
		app.listen(4000);
	} catch (error)
	{
		console.error(error);
	}
}
function verifyToken(token: string)
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