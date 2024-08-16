import NF from "../../../domain/request/entity/NF";
import { PropDownload, RequestGatewayDowloadPub } from "../../../domain/request/gateway/DowloadPub";
import { Producer } from "../../../exchange/rabbitmq";

export class PusblishDowloadNf implements RequestGatewayDowloadPub {
    private constructor(private readonly producerBroker: Producer) { }

    public static create(producerBroker: Producer) {
        return new PusblishDowloadNf(producerBroker)
    }

    public async publish(propDownload: PropDownload, kind: string) {
        const message: string = JSON.stringify(propDownload)

        await this.producerBroker.enqueue(kind, message)
    }
}