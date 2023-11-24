package httplib

import (
	"log"
	"net/http"
	"os"

	routes "spookytype/pkg/routes"
)

func SpookyTypeServer() {
	// envStrings := os.Environ()
	// for index, estring := range envStrings {
	// 	fmt.Println(index, estring)
	// }
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	HOST := "0.0.0.0:" + PORT

	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/static/", fs)

	http.HandleFunc("/", routes.HandleIndex)

	serverErr := http.ListenAndServe(HOST, nil)
	if serverErr != nil {
		log.Fatal(serverErr)
	}
}
