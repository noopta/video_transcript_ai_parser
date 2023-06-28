package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/chromedp/chromedp"
	openai "github.com/sashabaranov/go-openai"
)

// var topicMap map[string][]string

var counter = struct {
	sync.RWMutex
	topicMap map[string][]string
}{topicMap: make(map[string][]string)}

func analyzeText() {
	textContent, err := os.ReadFile("./transcript.txt")

	if err != nil {
		fmt.Println("An error occurred while reading the file")
		fmt.Println(err)
		return
	}

	stringConversion := string(textContent)
	currentIndex := 0
	maxChars := len(stringConversion)
	stringSections := []string{}

	for currentIndex < maxChars {
		if currentIndex+4000 <= maxChars {
			stringSections = append(stringSections, stringConversion[currentIndex:currentIndex+4000])
		} else {
			stringSections = append(stringSections, stringConversion[currentIndex:])
		}

		currentIndex += 4000
	}

	var wg sync.WaitGroup

	wg.Add(len(stringSections))

	fmt.Println("calling Chat GPT")
	fmt.Println()
	for i := 0; i < len(stringSections); i++ {
		go func(i int) {
			defer wg.Done()
			callGpt(stringSections[i])
		}(i)
	}

	wg.Wait()
}

func callGpt(currentText string) {
	// get API key from AMEX_PIN folder
	client := openai.NewClient("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")
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleUser,
					Content: "Summarize the following text in the following way, find the central theme of the text, mention it in the beginning of your response (e.g. Economics: your explanation) be sure the explanation before your key point is a headline with 10 or less words " +
						" and list the key points as bullet points. Here is the text to analyze: \n\n" + currentText,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	// check if : exists and take text prior to it else it is misc info
	// if it is not key points

	// add key to map if not currently existing there, and  val

	fmt.Println(resp.Choices[0].Message.Content)
	fmt.Println("*******")
}

func getChessGames(username string) {

	url := "https://www.chess.com/member/noopdogg07"
	var urlList []string

	urlList = getLinks(username)

	var wg sync.WaitGroup

	wg.Add(len(urlList))

	for i := 0; i < len(urlList); i++ {
		go func(i int) {
			defer wg.Done()
			// pass in if it is expected that the user is white or black
			parseChessMatch(urlList[i], "white")
		}(i)
	}

	wg.Wait()

	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	fmt.Println("about to call timeout 2")
	// Create a timeout to limit the waiting time
	ctx, cancel = context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	fmt.Println("done timeout 2")
	err := chromedp.Run(ctx, chromedp.Navigate(url))
	if err != nil {
		log.Fatal(err)
	}

	// Wait for the page to load completely
	err = chromedp.Run(ctx, chromedp.WaitVisible(".archived-games-user-cell", chromedp.ByQueryAll))
	if err != nil {
		log.Fatal(err)
	}

	// Get the HTML content of the page
	var htmlContent string
	err = chromedp.Run(ctx, chromedp.Evaluate(`document.documentElement.outerHTML`, &htmlContent))
	if err != nil {
		log.Fatal(err)
	}

	// fmt.Println(html)
	ioutil.WriteFile("chessGameListData.txt", []byte(htmlContent), 0644)
}

func getLinks(username string) []string {
	var urlArray []string
	// Open the HTML file
	linkPrefix := "https://www.chess.com"
	linkMap := map[string]bool{}

	file, err := os.Open("./chessGameListData.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// Create a goquery document from the HTML file
	doc, err := goquery.NewDocumentFromReader(file)
	if err != nil {
		log.Fatal(err)
	}

	// Find all <a> tags and extract the href attribute
	doc.Find("a").Each(func(index int, element *goquery.Selection) {
		href, exists := element.Attr("href")
		if exists && strings.Contains(href, username) && strings.Contains(href, "game/live") {
			linkMap[linkPrefix+href] = true
		}
	})

	for key := range linkMap {
		urlArray = append(urlArray, key)
	}

	fmt.Println("done getting links")
	return urlArray
}

func parseChessMatch(url string, chessPiece string) {
	// url := "https://www.chess.com/game/live/80934761709?username=noopdogg07"
	// className := "white_node"
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	fmt.Println("about to call timeout 1")
	// Create a timeout to limit the waiting time
	ctx, cancel = context.WithTimeout(ctx, 30*time.Second)
	defer cancel()
	fmt.Println("done timeout 1")
	err := chromedp.Run(ctx, chromedp.Navigate(url))
	if err != nil {
		log.Fatal(err)
	}

	// Wait for the page to load completely
	err = chromedp.Run(ctx, chromedp.WaitVisible(".move", chromedp.ByQueryAll))
	if err != nil {
		log.Fatal(err)
	}

	// Get the HTML content of the page
	var htmlContent string
	err = chromedp.Run(ctx, chromedp.Evaluate(`document.documentElement.outerHTML`, &htmlContent))
	if err != nil {
		log.Fatal(err)
	}

	// fmt.Println(html)
	ioutil.WriteFile("./chessMatchData.txt", []byte(htmlContent), 0644)

	html, err := ioutil.ReadFile("./chessMatchData.txt")

	if err != nil {
		fmt.Println("An error occurred while reading the file")
		fmt.Println(err)
	}

	ctx, cancel = chromedp.NewContext(context.Background())
	defer cancel()

	htmlToString := string(html)

	whiteMoves := Search(htmlToString, "white node")
	blackMoves := Search(htmlToString, "black node")

	for i := 0; i < len(whiteMoves); i++ {
		fmt.Print("move ")
		fmt.Print(i + 1)
		fmt.Println(": white " + whiteMoves[i] + " black " + blackMoves[i])
	}
}

func main() {
	// podcastUrl := "https://www.youtube.com/watch?v=uJQmCFTYCh8&ab_channel=All-InPodcast"

	// var res []byte
	// ctx, cancel := chromedp.NewContext(context.Background(), chromedp.WithBrowserOption())
	// defer cancel()
	// log.Println("here")
	// err := chromedp.Run(ctx,
	// 	chromedp.Navigate("https://youtubetranscript.com/"),
	// 	chromedp.WaitReady("body"),
	// 	// chromedp.Click(`a[data-nav-role="signin"]`, chromedp.ByQuery),
	// 	// chromedp.Sleep(time.Second*2),
	// 	chromedp.SetValue(`video_url`, podcastUrl, chromedp.ByID),
	// 	chromedp.Click(`button[class="btn btn-block btn-lg btn-primary"]`, chromedp.ByID),
	// 	// chromedp.Sleep(time.Second*1),
	// 	// chromedp.CaptureScreenshot(&res),
	// )
	// log.Println("here5")
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// analyzeText()

	getChessGames("noopdogg07")
	// chessParser()
	// os.WriteFile("loggedin.png", res, 0644)
}
