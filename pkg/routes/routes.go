package routes

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	models "spookytype/pkg/utils"
)

func HandleIndex(writer http.ResponseWriter, request *http.Request) {
	if request.Method != "GET" || request.URL.Path != "/" {
		http.NotFound(writer, request)
	}

	paragraph := models.GetParagraph()
	fmt.Println(paragraph)

	indexfile := "./pkg/routes/html/index.html"
	tmpl, err := template.ParseFiles(indexfile)
	if err != nil {
		log.Print(err.Error())
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}

	err = tmpl.ExecuteTemplate(writer, "index", paragraph)
	if err != nil {
		log.Print(err.Error())
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}
}
