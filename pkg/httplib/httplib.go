package httplib

import (
	"log"
	"net/http"
)

func SpookyTypeServer() {
	serverErr := http.ListenAndServe("localhost:8080", nil)
	if serverErr != nil {
		log.Fatal(serverErr)
	}
}
