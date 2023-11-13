package routes

import (
	"net/http"
)

func SpookyTypeRoutes() {
	http.HandleFunc("/", HandleIndex)
}

func HandleIndex() {

}
