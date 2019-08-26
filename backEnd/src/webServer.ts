console.log("[info] index loaded.");
import path from 'path';
import Koa from 'koa';
import koaRouter from 'koa-router';
import parser from 'koa-bodyparser';
// import koaStatic from 'koa-static';
import fs from 'fs';
import data from "./database";
import { User, Good } from './role';

const router = new koaRouter();
// const staticPath = path.join(__dirname,'../src/asset')
// const staticPath = '../src/asset';
function webServer()
{
	try
	{
		const database = new data();;
		const app = new Koa();
		app.use(parser());
		// app.use(koaStatic(staticPath));
		app.use(router.routes());
		// console.log('[asset]' + staticPath);
		// app.use(async ctx =>
		// 	{
		// 		ctx.response.body = fs.readFileSync(path.join(staticPath, './about.html'));
		// 		ctx.response.status = 400;
		// 		ctx.response.type = 'text/html';
		// 	})
		router.get('/item/:itemid', async (ctx, next) =>
		{
			const res = await database.queryGood(ctx.params.itemid);
			ctx.body = res;
			ctx.type = 'application/json';
		})
		router.get('/user/:uuid', async (ctx, next) =>
		{
			// const res = await getUser(ctx.params.uuid);
			const res = await database.queryUser(ctx.params.uuid);
			ctx.body = res;
			ctx.type = 'application/json';
		})
		app.listen(4000);
	} catch (error)
	{
		console.error(error);
	}
}
export default webServer;