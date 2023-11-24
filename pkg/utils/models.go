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
	db, err := sql.Open("sqlite3", "books.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	minmaxrow := db.QueryRow("SELECT MIN(rating), MAX(rating) FROM paragraphs")
	minrating := 0
	maxrating := 0
	level := 1
	minmaxrow.Scan(&minrating, &maxrating)

	subrange := (maxrating - minrating + 1) / 25

	idrows, err := db.Query("SELECT id FROM paragraphs WHERE rating BETWEEN ? AND ?", 
		minrating, minrating + (subrange * level) - 1)
	if err != nil {
		log.Fatal(err)
	}
	
	var pids []int
	for idrows.Next() {
		var pid int
		err = idrows.Scan(&pid)
		if err != nil {
			log.Println(err)
		}
		pids = append(pids, pid)
	}
	idrows.Close()

	rand.New(rand.NewSource(time.Now().UnixNano()))
	rnum := rand.Intn(len(pids))

	row := db.QueryRow("SELECT paragraphs.text, paragraphs.id, paragraphs.rating, books.title, authors.name "+ 
		"FROM paragraphs "+
		"INNER JOIN books ON books.id = paragraphs.book_id "+
		"INNER JOIN authors ON authors.id = books.author_id "+
		"WHERE paragraphs.id = ?", pids[rnum])
	if err != nil {
		log.Fatal(err)
	}

	var paragraph Paragraph
	var ptext string
	var prating int

	err = row.Scan(&ptext, &paragraph.ID, &prating, &paragraph.BookTitle, &paragraph.Author)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(paragraph.ID, prating)
	words := strings.Fields(ptext)
	for _, word := range words {
		chars := strings.Split(word, "")
		paragraph.Chars = append(paragraph.Chars, chars)
	}
	paragraph.Text = strings.Split(ptext, "")

	return paragraph
}
