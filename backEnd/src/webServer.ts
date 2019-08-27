/**
 * @author Hanyuu
 */
console.log("[info] in dex loaded.");
import logger from 'koa-logger';
import path from 'path';
import Koa from 'koa';
import koaRouter from 'koa-router';
import parser from 'koa-bodyparser';
// import koaStatic from 'koa-static';
import fs from 'fs';
import data from "./database";
import { User, Good, UserInterface, GoodInterface } from './role';
import conf from './conf';
import mkdirp from 'mkdirp';
import koaBody from 'koa-body';


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
		app.use(parser());
		app.use(router.routes());
		router.get('/item/:itemid', async (ctx, next) =>
		{
			const res = await database.queryGood(ctx.params.itemid);
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
		router.post('/user/login', async (ctx, next) =>
		{
			console.log(ctx.request.body);
			const res = await database.loginByPhonenumber(ctx.request.body);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/user/register', async (ctx, next) =>
		{
			//ON DEV ONLY!!!
			if (ctx.request.body.devtoken != "412458ea93597da7a7f9e72a9469bc86c49c4bfb")
			{
				ctx.response.body = "reject";
				ctx.response.type = 'application/json';
				return;
			};
			//ON DEV ONLY!!!
			var newUser = new Object() as UserInterface;
			newUser = ctx.request.body;
			newUser.score = 10;
			newUser.verified = false;
			newUser.avatarurl = path.join(conf.avator, "default.jpg")
			const res = await database.writeUser(newUser);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/item/add', async (ctx, next) =>
		{
			//ON DEV ONLY!!!
			if (ctx.request.body.devtoken != "412458ea93597da7a7f9e72a9469bc86c49c4bfb")
			{
				ctx.response.body = "reject";
				ctx.response.type = 'application/json';
				return;
			};
			//ON DEV ONLY!!!
			var newGood = new Object() as GoodInterface;
			newGood = ctx.request.body;
			newGood.sold = 0;
			const res = await database.writeGood(newGood);
			ctx.response.body = JSON.stringify(res);
			ctx.response.type = 'application/json';
		})
		router.post('/user/avatar', async (ctx, next) =>
		{
			var response = new Object() as any;
			try
			{
				const uuid = ctx.body.uuid;
				const fileObj:any = ctx.request.files;
				const file = fileObj.avatar;
				const reader = fs.createReadStream(file.path);
				const stream = fs.createWriteStream(path.join(conf.avator, uuid + ".jpg"));
				reader.pipe(stream);
				console.log(`${file.name} -> ${stream.path}`);
				ctx.response.body = JSON.stringify({ "status": "success" });
				ctx.response.type = "application/json";
			} catch (error)
			{
				console.error(`[ERROR] ${error}`);
			}

		})
		app.listen(4000);
	} catch (error)
	{
		console.error(error);
	}
}
export default webServer;