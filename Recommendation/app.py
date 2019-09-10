# @author: 71117123
# @CreateTime: 2019/9/8
# @LastUpdate: 2019/9/10
from flask import Flask, render_template, jsonify
from random import *

# conn = pymysql.connect(host="localhost", port=3306, user='app', password='foof', db='foof', charset='utf8')
# sql = 'select * from foof.users'
# cursor = conn.cursor()
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://app:hanyuu.8@localhost:3306/foof?charset=utf8'
#
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
#
# db = SQLAlchemy(app)

from pyspark import SparkContext
from pyspark.sql import SQLContext
# echo 127.0.0.1 iZuf69je5krmazh7cw9x0iZ >> /etc/hosts
sc = SparkContext(appName='flaskserver')
sqlctx = SQLContext(sc)
df = sqlctx.read.format("jdbc").options(url="jdbc:mysql://localhost:3306/foof?user=app&password=foof",dbtable="items").load()

@app.route('/')
def indexPage():
    return render_template('index.html',name='SEUer')

@app.route('/<int:uuid>')
def recommend(uuid):
    mylist = []
    itemmax = df.count()
    for i in range(0,10):
        mylist.append(randint(1, itemmax))
    mylist = list(set(mylist))
    return jsonify(mylist)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9500)
