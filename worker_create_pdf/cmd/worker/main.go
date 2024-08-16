package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-pdf/fpdf"
	rabbitmq "github.com/williamMDsilva/microservice-poc/worker_create_pdf/infra/queue/rabbitMQ"
)

type Functions struct{}

type NfProps struct {
	Id           string `json:"id"`
	NameProvider string `json:"name_provider"`
}

type NfRequest struct {
	Id    string  `json:"kind"`
	Props NfProps `json:"props"`
}

func (f Functions) genPdf(message []byte) {
	log.Printf("[NEW REQUEST] Received a request to create a new nota fiscal: %s\n", message)

	var nfRequest NfRequest

	err := json.Unmarshal([]byte(message), &nfRequest)
	if err != nil {
		panic(err)
	}

	pdf := fpdf.New("P", "mm", "A4", "")
	pdf.AddPage()
	pdf.SetFont("Arial", "B", 16)

	pdf.Cell(40, 10, fmt.Sprintf("\n\n%s\n", nfRequest.Props.NameProvider))

	fileName := fmt.Sprintf("%s.pdf", nfRequest.Props.Id)

	err = pdf.OutputFileAndClose(fileName)
	if err != nil {
		panic(err)
	}

	// // TODO - fix move file to fake S3
	// cmd := exec.Command(fmt.Sprintf("mv ./%s ../fake_s3/%s", fileName, fileName))
	// if err := cmd.Run(); err != nil {
	// 	log.Fatal(err)
	// }

	//TODO - notify dowload service
	requestURL := fmt.Sprintf("http://localhost:4001/api/document/status/%s", nfRequest.Props.Id)

	var client = &http.Client{}

	req, err := http.NewRequest(http.MethodPatch, requestURL, nil)
	if err != nil {
		log.Fatalln(err)
	}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Printf("StatusCode ", resp.StatusCode)

}

func (f Functions) Consume() {
	rabbit := rabbitmq.RabbitMQ{QueueName: "generate_nf_pdf", Callback: f.genPdf}
	rabbit.Consume()
}

func main() {
	consumer := Functions{}

	consumer.Consume()
}
