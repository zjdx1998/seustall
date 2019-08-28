curl -H "Content-Type: application/json" -XPUT "localhost:9200/index_goods" -d '{
  "settings": {
    "index.number_of_shards": 5,
    "index.number_of_replicas": 0,
    "index.refresh_interval": "-1"
  },
  "mappings": {
    "index_goods": {
      "properties": {
        "journal_title": {
          "type": "text",
          "analyzer": "ik_max_word",
          "search_analyzer": "ik_max_word",
          "fielddata": true,
          "fields": {
            "raw": {
              "type": "keyword"
            }
          }
        },
        "journal_volumn": {
          "type": "text"
        },
        "title": {
          "type": "text",
          "analyzer": "ik_max_word",
          "search_analyzer": "ik_max_word",
          "boost": 1.5
        },
        "author": {
          "type": "text"
        },
        "begin_page": {
          "type": "integer",
          "index": false
        },
        "end_page": {
          "type": "integer",
          "index": false
        },
        "publish_date": {
          "type": "date",
          "format": "yyyy-MM-dd HH:mm:ss"
        },
        "publisher": {
          "type": "text"
        }
      }
    }
  }
}'
