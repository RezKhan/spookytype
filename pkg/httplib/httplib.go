package httplib

import (
	"log"
	"net/http"

	routes "spookytype/pkg/routes"
)

func SpookyTypeServer() {
	http.Handle("./static", http.FileServer(http.Dir("./public")))

	http.HandleFunc("/", routes.HandleIndex)

	serverErr := http.ListenAndServe("localhost:8080", nil)
	if serverErr != nil {
		log.Fatal(serverErr)
	}
}
