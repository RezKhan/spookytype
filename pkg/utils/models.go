package models

import (
	"database/sql"
	"log"
	"math/rand"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type Paragraph struct {
	Text      []string
	Chars     [][]string
	ID        int
	BookTitle string
	Author    string
}

func GetParagraph() Paragraph {
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

	rows, err := db.Query("SELECT paragraphs.text, paragraphs.id, books.title, authors.name "+
		"FROM paragraphs "+
		"INNER JOIN books ON books.id = paragraphs.book_id "+
		"INNER JOIN authors ON authors.id = books.author_id "+
		"WHERE paragraphs.difficulty = ?", rnum)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var paragraphs []Paragraph
	for rows.Next() {
		var paragraph Paragraph
		var ptext string

		err = rows.Scan(&ptext, &paragraph.ID, &paragraph.BookTitle, &paragraph.Author)
		if err != nil {
			log.Fatal(err)
		}

		words := strings.Fields(ptext)
		for _, word := range words {
			chars := strings.Split(word, "")
			paragraph.Chars = append(paragraph.Chars, chars)
		}
		paragraph.Text = strings.Split(ptext, "")
		paragraphs = append(paragraphs, paragraph)
	}

	return paragraphs[rand.Intn(len(paragraphs))]
}
