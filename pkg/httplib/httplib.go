package httplib

import (
	"log"
	"net/http"

	routes "spookytype/pkg/routes"
)

func SpookyTypeServer() {
	http.HandleFunc("/", routes.HandleIndex)

	serverErr := http.ListenAndServe("localhost:8080", nil)
	if serverErr != nil {
		log.Fatal(serverErr)
	}
}
