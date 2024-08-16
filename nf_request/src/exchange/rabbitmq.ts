import amqp from 'amqplib';

export interface Producer {
    publishMessage(routingKey: string, message: string): Promise<void>;
    enqueue(queue: string, message: string): Promise<void>;
}

export class RabbitMQ implements Producer {
    private channel: any

    private constructor(private readonly exchangeName: string, private readonly connectUrl: string) {
        if (!this.channel) {
            this.createChannel();
        }
    }

    private async createChannel() {
        const connection = await amqp.connect(this.connectUrl);
        this.channel = await connection.createChannel();
    }

    public static create(exchangeName: string, connectUrl: string) {
        return new RabbitMQ(exchangeName, connectUrl)
    }

    public async publishMessage(routingKey: string, message: string) {
        if (!this.channel) {
            await this.createChannel();
        }

        await this.channel.assertExchange(this.exchangeName, "direct", { durable: false });

        const dataDetails = {
            logType: routingKey,
            message: message,
            dateTime: new Date(),
        };

        await this.channel.publish(
            this.exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(dataDetails))
        );

        console.log(`[SENT] routingKey: ${routingKey} exchangeName:${this.exchangeName} - ${message}`);
    }

    public async enqueue(queue: string, message: string) {
        await this.channel.assertQueue(queue, {
            durable: false
        });

        await this.channel.sendToQueue(queue, Buffer.from(message));

        console.log(`[SENT] queue:${queue} - ${message}`, message);
    }
}
