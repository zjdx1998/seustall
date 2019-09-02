对于index-users的search，json为:

{

​	"source": "_id",

​	"query": {

​		"multi_match": {

​        	"query": 这里是传入的参数,

​			"fields":["username","info"]

​		}

​	}

}



对于index-goods的search, json为:

{

​	"source": "_id",

​	"query": {

​		"multi_match": {

​        	"query": 这里是传入的参数,

​			"fields":["note","title"]

​		}

​	}

}