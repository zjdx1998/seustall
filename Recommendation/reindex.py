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

app = Flask(__name__)

@app.route('/')
def indexPage():
    sql = "select itemid, note, price, title from items"
    cursor.execute(sql)
    retItem = cursor.fetchall()
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
    sql = "select uuid, address, idcard, info, score, studentid, username from users"
    cursor.execute(sql)
    retUser = cursor.fetchall()
    headers = {"Content-Type": "application/json"}
    for user in retUser:
        hosturl = "http://localhost:9200/index-users/users/" + str(user[0]) + '/_update?pretty'
        adduserjson = {
            "doc": {
                "address": user[1],
                "idcard": user[2],
                "info": user[3],
                "score": user[4],
                "studentid": user[5],
                "username": user[6]
            },
            "doc_as_upsert": "true",
            "detect_noop": "false"
        }
        adduserjson = json.dumps(adduserjson)
        response = requests.post(hosturl, data=adduserjson, headers = headers)
    return response.json()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9600)
