import sqlite3
import sys


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

    return round(cl_rating)

def handle_line(line):
    line_rating = coleman_liau_rating(line)
    print(f"rating: {line_rating}")
    print(f"line: {line}")


def rate_file(file_path):
    with open(file_path, "r") as file:
        for line in file:
            if (len(line) > 2):
                handle_line(line)

def main():
    file_path = sys.argv[1]
    rate_file(file_path)

if __name__ == '__main__': 
	main()  