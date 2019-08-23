console.log("√[info] index loaded.");
import path from 'path';
import Koa from 'koa';
import koaRouter from 'koa-router';
import parser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import { getItem, getUser } from './processor';
import fs from 'fs';

const router = new koaRouter();
const staticPath = '../src/asset';
function webServer()
{
	const app = new Koa();
	app.use(parser());
	app.use(koaStatic(path.join(__dirname, staticPath)));
	console.log('[asset]' + path.join(__dirname, staticPath));
	app.use(router.routes());
	app.use(async ctx =>
	{
		ctx.body = fs.readFileSync('../src/asset/index.html');
		ctx.body.type = 'text/html';
	})
	router.get('/item/:itemid', async (ctx, next) =>
	{
		const res = await getItem(ctx.params.itemid);
		ctx.body = res;
		ctx.type = 'application/json';
	})
	router.get('/user/:uuid', async (ctx, next) =>
	{
		const res = await getUser(ctx.params.uuid);
		ctx.body = res;
		ctx.type = 'application/json';
	})
	app.listen(4000);
}
export default webServer;