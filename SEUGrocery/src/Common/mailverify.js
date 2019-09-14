/**
 * @description 邮件推送
 * @author Hanyuu Furude
 */
const fetch = require('node-fetch');
module.exports = function (token,idcard)
{
	postData('http://hanyuu.top:8080/user/mail/verify',
		{
			token: token,
			idcard: idcard
		});
}
function postData(url, data)
{
	// Default options are marked with *
	return fetch(url, {
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
		.then(response => response.json()) // parses response to JSON
}