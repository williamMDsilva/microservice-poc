package rabbitmq

import (
	"log"
)

type RabbitMQ struct {
	Body      string
	QueueName string
	Callback  func(mesage []byte)
}

func (r *RabbitMQ) Consume() {

	conn, ch := ConnectMQ()
	defer CloseMQ(conn, ch)

	err := ch.ExchangeDeclare(
		"request", // name
		"direct",  // type
		true,      // durable
		false,     // auto-deleted
		false,     // internal
		false,     // no-wait
		nil,       // arguments
	)
	if err != nil {
		panic(err)
	}

	// log.Println(ch)
	q, err := ch.QueueDeclare(
		"generate_nf_pdf", // name
		false,             // durable
		false,             // delete when unused
		false,             // exclusive
		false,             // no-wait
		nil,               // arguments
	)
	if err != nil {
		panic(err)
	}

	err = ch.QueueBind(
		r.QueueName,       // queue name
		"generate_nf_pdf", // routing key
		"request",         // exchange
		false,
		nil,
	)
	if err != nil {
		panic(err)
	}

	msgs, err := ch.Consume(
		q.Name,        // queue
		"Pdf_reciver", // consumer
		true,          // auto-ack
		false,         // exclusive
		false,         // no-local
		false,         // no-wait
		nil,           // args
	)
	if err != nil {
		panic(err)
	}

	k := make(chan bool)

	go func() {
		for d := range msgs {
			r.Callback(d.Body)
			// d.Ack(false)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-k
}
