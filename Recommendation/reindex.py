from flask import Flask, jsonify, request
import pymysql
import requests, json

conn = pymysql.connect(
    host="localhost",
    user="root", password="foof",
    database="foof",
    charset="utf8"
)

cursor = conn.cursor()

sql = "select itemid, note, price, title from items"

app = Flask(__name__)

@app.route('/')
def indexPage():
    cursor.execute(sql)
    retItem = cursor.fetchmany(2)
    headers = {"Content-Type": "application/json"}
    for item in retItem:
        hosturl = "http://localhost:9200/index-goods/goods/" + str(item[0]) + '/_update?pretty'
        additemjson = {
            "doc": {
                "note": item[1],
                "price": item[2],
                "title": item[3]
            },
            "doc_as_upsert": "true",
            "detect_noop": "false"
        }
        additemjson = json.dumps(additemjson)
        response = requests.post(hosturl, data=additemjson, headers = headers)
    sql = "select uuid, note, price, title from items"
    cursor.execute(sql)
    retItem = cursor.fetchmany(2)
    headers = {"Content-Type": "application/json"}
    for item in retItem:
        hosturl = "http://localhost:9200/index-goods/goods/" + str(item[0]) + '/_update?pretty'
        additemjson = {
            "doc": {
                "note": item[1],
                "price": item[2],
                "title": item[3]
            },
            "doc_as_upsert": "true",
            "detect_noop": "false"
        }
        additemjson = json.dumps(additemjson)
        response = requests.post(hosturl, data=additemjson, headers = headers)
    return response.json()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9600)
