from flask import Flask, request, render_template, jsonify
from random import randrange
import sqlite3

app = Flask(__name__)


def db_paragraphs(level):
    try: 
        dbconnection = sqlite3.connect('books.db')
        db = dbconnection.cursor()
        db.execute("SELECT * FROM paragraphs WHERE difficulty = ?", str(level))
    except sqlite3.Error as error:
        print("Error connecting to db", error)
        return None
    
    rows = db.fetchall()
    db.close()
    dbconnection.close()
    return rows

def clean_paragraph():
    range_start = 1
    range_end = 4
    level = randrange(range_start, range_end)
    result = db_paragraphs(level)
    target = randrange(1, len(result))
    print(result[target])
    paragraph = result[target][2].split(" ")
    return paragraph


@app.route("/")
def index():
    paragraph = clean_paragraph()    
    return render_template("./index.html", paragraph=paragraph)


if __name__ == '__main__':
    app.run()