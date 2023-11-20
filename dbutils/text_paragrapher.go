package main

import (
	"fmt"
	"log"
	"os"
	"strings"
)


func combineParagraphs(fileContent string) string {
	paragraphs := strings.Split(fileContent, "\n\n")
	var formattedParagraphs []string

	fmt.Println(paragraphs[0])

	for _, paragraph := range paragraphs {
		formattedParagraph := strings.Join(strings.Fields(paragraph), " ")
		formattedParagraphs = append(formattedParagraphs, formattedParagraph)
	}

	joinedParagraphs := strings.Join(formattedParagraphs, "\n\n")

	return joinedParagraphs
}


func ReadandReplace(filePath string) {
	fileContent, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}

	paragraphText := combineParagraphs(string(fileContent))
	os.WriteFile(filePath, []byte(paragraphText), 0644)
	fmt.Println(paragraphText)
}


func main() {
	args := os.Args[1:]
	if len(args) < 1 {
		log.Fatal("Insufficient arguments provided. Specify file name.")
	}
	
	ReadandReplace(args[0])
}
