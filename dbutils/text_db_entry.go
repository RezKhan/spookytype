package main

import (
	"bufio"
	"strconv"
	"strings"
	"unicode"

	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func dbInsert(bookID uint64, paragraphText string, lineRating int) {
	db, err := sql.Open("sqlite3", "../books.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	
	_, err = db.Exec("INSERT INTO paragraphs (book_id, text, rating) VALUES (?, ?, ?)", 
		bookID, paragraphText, lineRating)
	if err != nil {
		log.Println(err)
	}
}

func handleLine(lineText string) int {
	qwertyValues := map[string]int{
		"`": 8, "~": 9, "1": 6, "!": 7, "2": 4, "@": 5, "3": 3, "#": 4, "4": 3, "$": 4, "5": 3, 
		"%": 4, "6": 4, "^": 5, "7": 3, "&": 4, "8": 3, "*": 4, "9": 4, "(": 5, "0": 5, ")": 6, 
		"-": 6, "_": 7, "=": 8, "+": 9, "[": 5, "{": 6, "]": 6, "}": 7, "\\": 7, "|": 8, ";": 3, 
		":": 4, "'": 4, "\"": 5, ",": 2, "<": 3, ".": 3, ">": 4, "/": 5, "?": 6, "q": 5, "w": 4, 
		"e": 3, "r": 3, "t": 3, "y": 4, "u": 3, "i": 3, "o": 3, "p": 4, "a": 3, "s": 2, "d": 1, 
		"f": 1, "g": 2, "h": 2, "j": 1, "k": 1, "l": 2, "z": 3, "x": 2, "c": 2, "v": 2, "b": 3, 
		"n": 2, "m": 2, " ": 1, "\n": 2,
	}
	stringSum := 0
	wordCount := 0
	
	for _, ch := range lineText {
		stringSum += qwertyValues[strings.ToLower(string(ch))]
		if unicode.IsUpper(ch) {
			stringSum += 2
		}
		if string(ch) == " " {
			wordCount++
		}
	}

	return stringSum + wordCount
}

func rateLinesInTextFile(textFilePath string, bookID uint64) {
	minLength := 50
	textFile, err := os.Open(textFilePath)
	if err != nil {
		log.Fatal(err)
	}
	defer textFile.Close()
	textScanner := bufio.NewScanner(textFile)

	for textScanner.Scan() {
		if len(textScanner.Text()) > minLength {
			lineText := textScanner.Text()
			lineScore := handleLine(lineText)
			dbInsert(bookID, lineText, lineScore)
		}
	}
}


func main() {
	if len(os.Args) != 3 {
		log.Fatal("Not enough arguments..")
	}
	textFilePath := os.Args[1]
	bookID, err := strconv.ParseUint(os.Args[2], 10, 32)
	if err != nil {
		log.Fatal(err)
	}

	rateLinesInTextFile(textFilePath, bookID)
}
