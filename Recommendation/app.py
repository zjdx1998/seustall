from flask import Flask, render_template, jsonify
from random import *

app = Flask(__name__)


@app.route('/')
def indexPage():
    return render_template('index.html',name='SEUer')

@app.route('/<int:uuid>')
def recommend(uuid):
    mylist = []
    for i in range(0,10):
        mylist.append(randint(0,200))
    return jsonify(mylist)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=9500)
