package main

import (
	"log"
	"sync"
	"hey_google/activity"
	"hey_google/web"
	"hey_google/response"
)

func main() {
	var wg sync.WaitGroup
	response := &response.Response{}
	activityLog := activity.NewLog(response)
	web := web.NewWeb(response)
	wg.Add(1)
	go func() {
		log.Fatal(web.Start())
		wg.Done()
	}()
	wg.Add(1)
	go func() {
		log.Fatal(activityLog.Start())
		wg.Done()
	}()
	wg.Wait()
}
