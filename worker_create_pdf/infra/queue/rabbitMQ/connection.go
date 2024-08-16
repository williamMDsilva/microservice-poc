package rabbitmq

import (
	amqp "github.com/rabbitmq/amqp091-go"
)

func ConnectMQ() (*amqp.Connection, *amqp.Channel) {
	conn, err := amqp.Dial("amqp://rabbit:rabbit@localhost:5672/vhost")
	if err != nil {
		panic(err)
	}

	// defer conn.Close()
	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	// defer ch.Close()
	return conn, ch
}

func CloseMQ(conn *amqp.Connection, channel *amqp.Channel) {
	defer conn.Close()    //rabbit mq close
	defer channel.Close() //rabbit mq channel close
}
