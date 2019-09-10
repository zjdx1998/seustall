## Front-API

对于index-users的search，命令为`curl -XPOST "localhost:9200/index-users/_search?pretty -d @jsonfile`, 其中`jsonfile`为:

```json
{
	"from": 0,
    "size": 1000,
    "query": {
  	"multi_match": {
    	"query": 这里是传入的参数,
  		"fields":["username","info"]
  	}
  }
}
```

对于index-goods的search，命令为`curl -XPOST "localhost:9200/index-goods/_search?pretty -d @jsonfile`, 其中`jsonfile`为:

```json
{
    "from": 0,
    "size":1000,
		"query": {
  		"multi_match": {
    		"query": 这里是传入的参数,
  			"fields":["note","title"]
  		}
  	}
}
```



## Back-end

对于前端提交的User信息

`curl -H "Content-Type: application/json" -XPOST "localhost:9200/index-users/users/uuid" -d @jsonfile`

其中`jsonfile`为:

```json
{
  "doc":{
    "address": a,
    "idcard":b,
    "info":c,
    "score":d,
    "studentid":e,
    "username":f
  },
  "doc_as_upsert": true,
  "detect_noop": false
}
```



Good 信息:

`curl -H "Content-Type: application/json" -XPOST "localhost:9200/index-goos/goods/itemid" -d @jsonfile`

其中`jsonfile`为:

```json
{
  "note": a,
  "price": b,
  "title": c,
}
```

