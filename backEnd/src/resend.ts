// const nodefetch = require('node-fetch');
import nodefetch from 'node-fetch';
/**
 * @author Hanyuu
 * @version 1.0.0
 * @date 2019/09/02
 * @description 消息重传插件
 */


// import fetch from 'node-fetch';
// const config =
// {
// 	host: `http://localhost:9200/index-users/_search`,

// }

// function listen()
// {
// 	return async function (ctx: any, next: any)
// 	{
// 		console.log(`middle wire ${ctx.body}`);
// 		postData(config.host,
// 			{
// 				"query": {
// 					"match_all":
// 					{

// 					}
// 				}
// 			})
// 			.then((data:any) => console.log(data.hits.hits[1])) // JSON from `response.json()` call
// 			.catch((error:ErrorEvent) => console.error(error))
// 		await next();
// 	};
// }


export default async function postData(url:string, data:any)
{
	// Default options are marked with *
	return (nodefetch as any)(url, {
		body: JSON.stringify(data), // must match 'Content-Type' header
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, same-origin, *omit
		headers: {
			'user-agent': 'Mozilla/4.0 MDN Example',
			'content-type': 'application/json'
		},
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // *client, no-referrer
	})
		.then((response:any) => response.json()) // parses response to JSON
}