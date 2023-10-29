from flask import Flask, request, render_template, jsonify
from random import randrange
import sqlite3

app = Flask(__name__)
db_path = '/home/probablyrez/mysite/books.db' #pythonganywhere
db_path_local = 'books.db' #local testing

def db_paragraphs(level):
    try: 
        dbconnection = sqlite3.connect(db_path_local) # local today
        db = dbconnection.cursor()
        db.execute("SELECT * FROM paragraphs WHERE difficulty = ?", str(level))
    except sqlite3.Error as error:
        print("Error connecting to db", error)
        return None
    
    rows = db.fetchall()
    db.close()
    dbconnection.close()
    return rows


def db_book(book_id):
    try: 
        dbconnection = sqlite3.connect(db_path_local) # local today
        db = dbconnection.cursor()
        db.execute("SELECT authors.name AS author, books.title AS title FROM books JOIN authors ON books.author_id = authors.id WHERE books.id = ?", str(book_id))
    except sqlite3.Error as error:
        print("Error connecting to db", error)
        return None
    
    rows = db.fetchall()
    db.close()
    dbconnection.close()
    return rows


def clean_paragraph():
    range_start = 2
    range_end = 4
    level = randrange(range_start, range_end)
    result = db_paragraphs(level)
    if (len(result) > 1):
        target = randrange(1, len(result))
    else:
        target = 1
    print(result[target])
    paragraph = result[target][2].split(" ")
    details = {'book': result[target][1], 'text': paragraph}
    return details


@app.route("/")
def index():
    paragraph = clean_paragraph()
    book = db_book(paragraph['book'])
    return render_template("./index.html", paragraph=paragraph['text'], author=book[0][0], title=book[0][1])


if __name__ == '__main__':
    app.run()