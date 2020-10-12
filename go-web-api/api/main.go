package main

import (
	"fmt"
	"net/http"
	"log"
	"../data"
	"encoding/json"
	"strconv"
	"../auth"
)
func main() {
	handleRequsts()
}
func homePage(w http.ResponseWriter, r *http.Request)  {
	fmt.Fprint(w, "hello api")
}
func lines(w http.ResponseWriter, r *http.Request)  {
	if(auth.IsAuth(r)) {
		query := r.URL.Query()
		page := query.Get("page")
		p, _ := strconv.Atoi(page)
		lines := data.GetLines(p)
		json.NewEncoder(w).Encode(lines)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("401 - Unauthorized"))
	}
	
}
func login(w http.ResponseWriter, r *http.Request)  {
	query := r.URL.Query()
	email := query.Get("email")
	pass := query.Get("password")
	response := auth.Login(email, pass)
	json.NewEncoder(w).Encode(response)
}
func handleRequsts()  {
	http.HandleFunc("/lines", lines)
	http.HandleFunc("/login", login)
	log.Fatal(http.ListenAndServe(":8080", nil))
}