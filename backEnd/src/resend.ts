// const nodefetch = require('node-fetch');
import nodefetch from 'node-fetch';
/**
 * @author Hanyuu
 * @version 1.0.0
 * @date 2019/09/02
 * @description 消息重传插件
 */

import { UserInterface, ItemInterface } from './role';
import conf from './conf';
export async function postUser(user: UserInterface)
{
	const res = await postData(conf.resend.host.root + conf.resend.host.user,
		{
			uuid: user.uuid,
			address: user.address,
			idcard: user.idcard,
			info: user.info,
			score: user.score,
			studentid: user.studentid,
			username: user.username
		});
	// console.log(res);
}
export async function postItem(item: ItemInterface)
{
	const res = await postData(conf.resend.host.root + conf.resend.host.item,
		{
			note: item.note,
			price: item.price,
			title: item.title,
		});
	// console.log(res);
}
export async function search(method: string, src: any)
{
	try
	{
		var res = new Object() as any;
		if (method == conf.resend.search.method.item)
		{
			res = await postData(conf.resend.search.root + conf.resend.search.item,
				{
					"query": {
						"multi_match": {
							"query": src,
							"fields": ["note", "title"]
						}
					}
				});
			return res;
		}
		else if (method == conf.resend.search.method.user)
		{
			res = await postData(conf.resend.search.root + conf.resend.search.user,
				{
					"query": {
						"multi_match": {
							"query": src,
							"fields": ["username", "info"]
						}
					}

				});
			return res;
		}
		else
		{
			return {
				status: conf.res.failure,
				info: conf.except.invaildReq
			};
		}
	} catch (error)
	{
		console.error(error);
	}
}
async function postData(url: string, data: any)
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
		method: 'POST', // *GET, PST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // *client, no-referrer
	})
		.then((response: any) => response.json()) // parses response to JSON
}