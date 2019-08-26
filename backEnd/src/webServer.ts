/**
 * @author Hanyuu
 */
console.log("[info] index loaded.");
import path from 'path';
import Koa from 'koa';
import koaRouter from 'koa-router';
import parser from 'koa-bodyparser';
// import koaStatic from 'koa-static';
import fs from 'fs';
import data from "./database";
import { User, Good, UserInterface, GoodInterface } from './role';
import { DatabaseError } from 'sequelize/types';

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
		app.use(router.routes());
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
		router.post('/user/login', async (ctx, next) =>
		{
			console.log(ctx.request.body);
			const res = await database.loginByPhonenumber(ctx.request.body);
			ctx.response.body = res;
		})
		router.post('/user/register', async (ctx, next) =>
		{
			var newUser = new Object() as UserInterface;
			newUser = ctx.request.body;
			newUser.score = 10;
			newUser.verified = false;
			const res = await database.writeUser(newUser);
			ctx.response.body = JSON.stringify(res);
		})
		app.listen(4000);
	} catch (error)
	{
		console.error(error);
	}
}
export default webServer;