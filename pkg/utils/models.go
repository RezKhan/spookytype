package models

import (
	"database/sql"
	"fmt"
	"log"
	"math/rand"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type Paragraph struct {
	ParagraphText []string
	ParagraphID int
	BookTitle string
	Author string

}

func GetParagraph() {
	rand.New(rand.NewSource(time.Now().UnixNano()))
	// TODO: Fix the typing difficulty and make sure there's a minimum rating of 1
	rnum := rand.Intn(4)
	if rnum <= 1 {
		rnum = 2
	}

	db, err := sql.Open("sqlite3", "books.db")
	if err != nil {
		log.Fatal(err)
	}
	
	defer db.Close()

	// SELECT paragraphs.text, paragraphs.id, books.title, authors.name
	// FROM paragraphs
	// INNER JOIN books ON books.id = paragraphs.book_id
	// INNER JOIN authors on authors.id = books.author_id
	// WHERE paragraphs.difficulty = ?

	rows, err := db.Query("SELECT paragraphs.text, paragraphs.id, books.title, authors.name FROM paragraphs INNER JOIN books ON books.id = paragraphs.book_id INNER JOIN authors ON authors.id = books.author_id WHERE paragraphs.difficulty = ?", rnum)
	if err != nil {
		log.Fatal(err)
	}

	var paragraphs []Paragraph
	for rows.Next() {
		var paragraph Paragraph
		var ptext string

		err = rows.Scan(&ptext, &paragraph.ParagraphID, &paragraph.BookTitle, &paragraph.Author)
		if err != nil {
			log.Fatal(err)
		}
		paragraph.ParagraphText = strings.Split(ptext, "")
		paragraphs = append(paragraphs, paragraph)
	}

	fmt.Println(len(paragraphs))
}

