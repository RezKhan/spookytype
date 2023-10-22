from flask import Flask, request
import sqlite3

app = Flask(__name__)

try: 
    dbconnection = sqlite3.connect('books.db')
    db = dbconnection.cursor()
except sqlite3.Error as error:
    print("Error connecting to db", error)

# to run query
# db.execute("SQL Query WHERE field = ?", variable)
# rows = db.fetchall()
# 
# 
# To close connection:
# db.close()
# dbconnection.close()

@app.route("/")
def hello_world():
    return "<p>Hello, Mum!</>"

