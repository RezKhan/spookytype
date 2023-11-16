package main

import (
	"fmt"
	// httplib "spookytye/pkg/httplib"
	models "spookytype/pkg/utils"
)

func main() {
	fmt.Println("Hello, Mum!")
	paragraph := models.GetParagraph()
	fmt.Println(paragraph)

	// httplib.SpookyTypeServer()
}
