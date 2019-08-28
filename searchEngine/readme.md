i# SearchEngine documents

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
