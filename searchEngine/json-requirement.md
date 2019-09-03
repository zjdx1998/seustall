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

