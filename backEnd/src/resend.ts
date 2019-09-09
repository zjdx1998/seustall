/**
 * @author Hanyuu
 * @version 1.0.0
 * @date 2019/09/02
 * @description 消息重传插件
 */

import nodefetch from 'node-fetch';
import { UserInterface, ItemInterface } from './role';
import conf from './conf';
export async function postUser(user: UserInterface)
{
	try
	{
		const res = await postData(conf.resend.host.root + conf.resend.host.user + user.uuid,
			{
				address: user.address,
				idcard: user.idcard,
				info: user.info,
				score: user.score,
				studentid: user.studentid,
				username: user.username
			});
		// console.log(res);
	}
	catch (error)
	{
		console.error(error)
	}

}
export async function updateUser(user: UserInterface)
{
	try
	{
		const res = await postData(conf.resend.host.root + conf.resend.host.user + user.uuid + `/_update`,
			{
				address: user.address,
				idcard: user.idcard,
				info: user.info,
				score: user.score,
				studentid: user.studentid,
				username: user.username
			});
		// console.log(res);
	}
	catch (error)
	{
		console.error(error)
	}

}
export async function postItem(item: ItemInterface)
{
	try
	{
		const res = await postData(conf.resend.host.root + conf.resend.host.item + item.itemid,
			{
				note: item.note,
				price: item.price,
				title: item.title,
			});
		// console.log(res);
	} catch (error)
	{
		console.error(error);
	}
}
export async function updateItem(item: ItemInterface)
{
	try
	{
		const res = await postData(conf.resend.host.root + conf.resend.host.item + item.itemid + `/_update`,
			{
				note: item.note,
				price: item.price,
				title: item.title,
			});
		// console.log(res);
	} catch (error)
	{
		console.error(error);
	}
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
					"from": 0,
					"size": 4000,
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
					"from": 0,
					"size": 4000,
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
	if (conf.resend.switchOn)
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
}