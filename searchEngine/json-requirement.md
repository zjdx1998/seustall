## Front-API

对于index-users的search，命令为`curl -XPOST "localhost:9200/index-users/_search?pretty -d @jsonfile`, 其中`jsonfile`为:

```json
{
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

`curl -H "Content-Type: application/json" -XPOST "localhost:9200/index-users/users" -d @jsonfile`

其中`jsonfile`为:

```json
{
  "_id": uuid //This can also move to curl address: /index-users/users/uuid, recommend this way.
  "address": a,
  "idcard":b,
  "info":c,
  "score":d,
  "studentid":e,
  "username":f
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

