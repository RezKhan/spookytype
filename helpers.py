import sqlite3
import sqlite3
import sys

# TODO: Coleman-Liau is a readability rating, not typing, new rating needed.
def get_index_values(candidate_string):
    indices = {"letters": 0, "words": 0, "sentences": 0}
    length = len(candidate_string)

    for i in range(length):
        if candidate_string[i].isalpha():
            indices["letters"] += 1
        if candidate_string[i].isspace() or i == length - 1:
            indices["words"] += 1
            if i + 1 < length:
                while candidate_string[i + 1].isspace():
                    candidate_string[i + 1].replace(" ", "")
        if candidate_string[i] == "." or candidate_string[i] == "!" or candidate_string[i] == "?":
            indices["sentences"] += 1
    return indices


def coleman_liau_rating(candidate_string):
    index_values = get_index_values(candidate_string)
    L_value = float(index_values["letters"] / index_values["words"]) * 100
    S_value = float(index_values["sentences"] / index_values["words"]) * 100
    cl_rating = (0.0588 * L_value) - (0.296 * S_value) - 15.8
    if cl_rating < 1:
        cl_rating = 1
    return round(cl_rating)


def handle_line(tline):
    try:
        line_rating = coleman_liau_rating(tline)
        tline = tline.replace("\n", "")
        result = {'rating': line_rating, 'line': tline}
        # print(result)
        return result
    except:
        print ("Unable to rateline")
        return None


def rate_file(file_path):
    minlength = 40
    with open(file_path, "r") as file:
        for line in file:
            if (len(line) > minlength):
                line_rating = handle_line(line)
                db_insert(1, line_rating)


def db_insert(book_id, line):
    conn = sqlite3.connect("books.db")
    cursor = conn.cursor()
    sql = "INSERT INTO paragraphs (book_id, text, difficulty) VALUES (?, ?, ?)"
    try:
        cursor.execute(sql, (book_id, line['line'], line['rating']))
        conn.commit()
    except sqlite3.Error as e:
        print("SQLite error:", e)
        conn.rollback()
    cursor.close()
    conn.close()


def main():
    file_path = sys.argv[1]
    rate_file(file_path)
    # db_insert()


if __name__ == '__main__': 
	main()  