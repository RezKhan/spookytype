import math
import sqlite3
from string import punctuation
import sys

def max_recurring_char(candidate_string):
    nchars = {}
    length = len(candidate_string)
    result = {'char': "", 'count': 0}

    for i in range(length):
        if (candidate_string[i] == " "):
            continue
        if (candidate_string[i] in nchars):
            nchars[candidate_string[i]] += 1
        else:
            nchars[candidate_string[i]] = 1
        
        if (result['count'] < nchars[candidate_string[i]]):
            result['char'] = candidate_string[i]
            result['count'] = nchars[candidate_string[i]]
    
    return result


def line_value(candidate_string):
    qwerty_values = {"`": 8, "~": 9, "1": 6, "!": 7, "2": 4, "@": 5, "3": 3, "#": 4, "4": 3, "$": 4, "5": 3, "%": 4, "6": 4, "^": 5, "7": 3, "&": 4, "8": 3, "*": 4, "9": 4, "(": 5, "0": 5, ")": 6, "-": 6, "_": 7, "=": 8, "+": 9, "[": 5, "{": 6, "]": 6, "}": 7, "\\": 7, "|": 8, ";": 3, ":": 4, "'": 4, "\"": 5, ",": 2, "<": 3, ".": 3, ">": 4, "/": 5, "?": 6, "q": 5, "w": 4, "e": 3, "r": 3, "t": 3, "y": 4, "u": 3, "i": 3, "o": 3, "p": 4, "a": 3, "s": 2, "d": 1, "f": 1, "g": 2, "h": 2, "j": 1, "k": 1, "l": 2, "z": 3, "x": 2, "c": 2, "v": 2, "b": 3, "n": 2, "m": 2, " ": 1, "\n": 2}
    length = len(candidate_string)
    stringsum = 0

    for i in range(length):
        stringsum += qwerty_values[str(candidate_string[i].lower())]
        if (candidate_string[i].isupper()):
            stringsum += 2
        if ((candidate_string[i] in punctuation) and candidate_string[i] != " "):
            stringsum += 4
            
    char_mod = max_recurring_char(candidate_string)
    stringsum += (qwerty_values[char_mod['char']] * char_mod['count'])
    stringsum = round(math.log(stringsum, 10))

    return stringsum

def handle_line(tline):
    try:
        line_rating = line_value(tline)
        return line_rating
    except:
        print ("Unable to rate line")
        return None


def rate_file(file_path, book_id):
    minlength = 50
    with open(file_path, "r", encoding='utf8') as file:
        for line in file:
            if (len(line) > minlength):
                line = line.replace('\ufeff','')
                line_rating = handle_line(line)
                if (line_rating != None):
                    line = line.replace("\n", "")
                    db_insert(book_id, line, line_rating)


def db_insert(book_id, line, rating):
    conn = sqlite3.connect("books.db")
    cursor = conn.cursor()
    sql = "INSERT INTO paragraphs (book_id, text, difficulty) VALUES (?, ?, ?)"
    try:
        cursor.execute(sql, (book_id, line, str(rating)))
        conn.commit()
    except sqlite3.Error as e:
        print("SQLite error:", e)
        conn.rollback()
    cursor.close()
    conn.close()


def main():
    file_path = sys.argv[1]
    book_id = sys.argv[2]
    rate_file(file_path, book_id)
    print()


if __name__ == '__main__': 
	main()  
