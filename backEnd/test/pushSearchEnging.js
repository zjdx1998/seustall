// import nodefetch from 'node-fetch';
const nodefetch =require('node-fetch');

postUser("http://hanyuu.top:9200/index-users/users/uuid", {
	"uuid": 1,
	"address": "M1A",
	"idcard": 213176666,
	"info": "none",
	"score": 10,
	"studentid": 71117501,
	"username": "WakamiyaEve"

})
postItem("http://hanyuu.top:9200/index-goods/goods/itemid", {
	"note": "write something",
	"price": 2.99,
	"title": "something",
})
function postUser(url, data)
{
	// Default options are marked with *
	return nodefetch(url, {
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
		.then(response => response.json())
		.then(json => console.log(json))
		// parses response to JSON
}
function postItem(url, data)
{
	// Default options are marked with *
	return nodefetch(url, {
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
		.then(response => response.json())
		.then(json => console.log(json))
		// parses response to JSON
}