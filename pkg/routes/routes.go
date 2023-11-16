package routes

import (
	"fmt"
	"net/http"
	models "spookytype/pkg/utils"
)

func HandleIndex(writer http.ResponseWriter, request *http.Request) {
	paragraph := models.GetParagraph()
	fmt.Println(paragraph)
}
