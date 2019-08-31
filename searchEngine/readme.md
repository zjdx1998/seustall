# SearchEngine documents

## Documents
### Common API
1. create index: `curl -H "Content-Type: application/json" -XPUT "host/$indexName" -d $index-info.json`
2. delete index: `curl -XDELETE "host/$indexName" `
3. Add User: `curl -H "Content-Type: application/json" -XPOST "localhost:9200/index-users/users -d @addUser.json`
4. Get All Users: `curl -XGET "localhost:9200/_search?pretty` 
5. Get someone: `curl -XGET "localhost:9200/index-users/users/1`
6. Delete someone: 
```js
curl -H "Content-Type: application/json" -XPOST 'http://localhost:9200/index-users/_delete_by_query?pretty' -d '
{
    "query": {
        "match": {
            "id": "1" // or other property
        }
    }
}'
```
7. Simple query: `curl -XGET "localhost:9200/index-users/_search?q=key:value&pretty`
8. Complex query: `curl -XPOST "localhost:9200/index-users/_search?pretty` -d @queryjson
And the queryjson usually has the structure like above.
### Parameters in Query
#### Term&Terms
```
    "query":{
        "terms":{
            "key": ["value1", "value2"] // or relationship here   
        }
    }
```
Term/Terms is usually used as searching keyword, date etc.
#### Match
1. The match in '6. Delete someone' may cut the word and calculate the similarities.
2. The substitute for match is match\_all, which matches all the documents in the index, usually used in deleting all the documents in some indexs.
2. Another match-like parameter is `multi_match`, the usage as below:
```json
{ 
    "query": someword,
    "fields":{
        "interests",
        "name",
        etc.
    }
}
```
4. The last one is `match_phrase` and `match_phrase_prefilx`, the former means matching all the word in phrase and keeping the order in it, and the latter means matching prefix.
The usage:
```json
{
    "query": {
        "match_phrase_prefix" : {
            "message" : {
                "query" : "the prefix",
                "max_expansions" : 10  //recommended to use to save time when searching.
            }
        }
    }
}
```
#### Other parameters parallel or adopted to query
1. `from` and `size` controls the search range \[from, from+size).
2. `\_sources` controls the fields in return-json.
    * use "includes" to include field in return-json
    * use "excludes" to exclude field in return-json
3. use `sort` to return sorted result like this:
```json
{
    "sort": {
        "field": {
            "order": "asc" or "desc"  
        }
    }
}
```
4. `range`:
```json
{
    "query": {
        "range": {
            "age": {
                "from": 20,
                "to": 25,
                "include_lower": true,
                "include_upper": false // represents the range 
            }
        }
    }
}
```
5.`wildcard`:
```json
{
    "query": {
        "wildcard": {
            "name": "zhao*" // * means 0+ character and ? means 0 or 1 character.
        }
    }
}
```
6. `fuzzy`:
```
{
    "query": {
        "fuzzy": {
            "boost": 1.0, // query deafult weight
            "min_similarity": 0.5(0-1,default string sims), 1d(date sims)
            "prefix_length": 0 //default prefix length
            "max_expansions": maximum expansions.
            "interests": {
                "value": "sinng" 
            }
        }
    }
}
```


## Back-Endconfiguration
### Docker
1. pull the image: `docker pull docker.elastic.co/elasticsearch/elasticsearch:6.4.3`
2. run:  
```bash
docker run -p 9200:9200 -p 9300:9300 -d --name es -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.5.3
# ik-plugins
docker exec -it containerID /bin/bash
elaticsearch-plugins install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v6.4.3/elasticsearch-analysis-ik-6.4.3.zip
```
3. 配置head
`docker pull mobz/elasticsearch-head:5` and Run it.

## Reference
1.[Documents-1](https://my.oschina.net/wuweixiang/blog/2990460)
