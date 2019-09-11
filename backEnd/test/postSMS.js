const nodefetch = require('node-fetch');
postData('https://webapi.sms.mob.com/sms/verify',
{
	appkey: '2c3bb00a9ca40',
	phone: "17551046561",
	zone: "86",
	code:"1900",
})
	.then(data => console.log(data)) // JSON from `response.json()` call
	.catch(error => console.error(error))

function postData(url, data)
{
	// Default options are marked with *
	return nodefetch(url, {
		// body: JSON.stringify(data), // must match 'Content-Type' header
		body: "appkey=2c3bb00a9ca40&phone=17551046561&zone=86&code=2900", // must match 'Content-Type' header
		cache: 'no-cache', // *default, no-cache, reload,  force-cache, only-if-cached
		credentials: 'same-origin', // include, same-origin, *omit
		headers: {
			'user-agent': 'Mozilla/4.0 MDN Example',
			// 'content-type': 'application/json'
			'content-type': 'text/plain'
		},
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // *client, no-referrer
	})
		.then(response => response.json()) // parses response to JSON
}