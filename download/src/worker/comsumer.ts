// #!/usr/bin/env node
import amqp from 'amqplib';
import dotenv from 'dotenv';
import saveStausDownload from '../database/database';

dotenv.config()

const EXCHANGE_NAME = `${process.env.EXCHANGE_NAME || 'request'}`
const RABBIT_URL = `${process.env.RABBIT_URL}`
const DATABASE_URL = `${process.env.DATABASE_URL}`

const connection = amqp.connect(RABBIT_URL);

connection.then((conn) => conn.createChannel()).then(async channel => {
    console.log('Waiting for entities...\nTo exit press CTRL+C');

    await channel.assertExchange(EXCHANGE_NAME, "direct", {
        durable: true
    });

    let q: any = channel.assertQueue('create_entity_to_download', { durable: false });

    q = await channel.bindQueue('create_entity_to_download', EXCHANGE_NAME, "create_entity_to_download");

    channel.consume(q.queue, function (msg: any) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());

        saveStausDownload(DATABASE_URL, JSON.parse(msg.content.toString()))
    }, {
        noAck: true
    });
})


// TODO - refactory follow this model
// export class RabbitMQ {
//     private channel: any

//     private constructor(private readonly exchangeName: string, private readonly connectUrl: string) {
//     }

//     private async createChannel() {
//         const connection = await amqp.connect(this.connectUrl);
//         this.channel = await connection.createChannel();
//     }


//     public Worker() {

//     }
// }
