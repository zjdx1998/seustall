const fetch = require('node-fetch');
postData('http://hanyuu.top:9200/index-users/_search',
{
	"query": {
		"match_all":
		{

		}
	}
})
	.then(data => console.log(data.hits.hits[1])) // JSON from `response.json()` call
	.catch(error => console.error(error))

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