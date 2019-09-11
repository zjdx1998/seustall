import fetch from 'node-fetch';
import xlsx from 'node-xlsx';
import item from './item';
import fs from 'fs';
import conf from './conf';
import jwt from 'jsonwebtoken';
import key from './secreatkey';
const rawdata = xlsx.parse(fs.readFileSync(`${conf.dataFile}`));
var data = rawdata;
for (var sheet in data)
{
	for (var rec in data[sheet].data)
	{
		const record: any = data[sheet].data[rec];
		const item =
		{
			token: jwt.sign({
				uuid: record[0],
				generate: (new Date()).valueOf()
			}, key
			),
			title: record[1],
			type: record[2],
			price: record[3],
			imgurl: record[4],
			depreciatione: record[5],
			note: record[6],
			sold: record[7],
		}
		console.log(item)
		post(item);
	}
}
function post(data: any)
{

	const res = (fetch as any)(
		conf.root + conf.addItem,
		{
			body: JSON.stringify(data),
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
		}
	).then((response: any) => console.log(response.status))

}