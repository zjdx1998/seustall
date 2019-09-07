import fetch from 'node-fetch';
import xlsx from 'node-xlsx';
import Res from './item';
import conf from './conf';
import jwt from 'jsonwebtoken';
import key from './secreatkey';
const res = (fetch as any)(
	conf.root + conf.addItem,
	{
		body: JSON.stringify(
			{
				token: jwt.sign({
					uuid: 1,
					generate: (new Date()).valueOf()
				},key
				),
				title: "《他改变了中国》",
				type: 6,
				price: 69.99,
				imgurl: "image\\item\\0.6660873908429066.jpg",
				depreciatione: 99,
				note: "必读好书不容错过，速速购买。",
				sold: -1,
			}
		),
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
).then((response: any) => console.log(response))
