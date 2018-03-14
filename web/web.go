package web

import (
	"net/http"
	"hey_google/response"
	"encoding/json"
)

type web struct {
	resp *response.Response
}

func (srv *web) respond(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(srv.resp)
}

func NewWeb(r *response.Response) *web {
	return &web{r}
}

func (srv *web) Start() error {
	http.Handle("/", http.FileServer(http.Dir("public/")))
	http.HandleFunc("/request", srv.respond)
	return http.ListenAndServe(":8000", nil)
}
