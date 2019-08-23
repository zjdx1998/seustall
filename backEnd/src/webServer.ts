console.log("√[info] index loaded.");
import Koa from 'koa';
import router from 'koa-router';
function webServer()
{
	const app = new Koa();
	app.use(async ctx =>
	{
		ctx.body = "hanyuu desu";
	})
	app.listen(3000);
}
export default webServer;