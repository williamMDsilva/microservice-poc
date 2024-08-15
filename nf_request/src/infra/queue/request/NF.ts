import NF from "../../../domain/request/entity/NF";
import { RequestGatewayNFPub } from "../../../domain/request/gateway/NFPub";
import { Producer } from "../../../exchange/rabbitmq";

export class EnqueueRequestNf implements RequestGatewayNFPub {
    private constructor(private readonly producerBroker: Producer) { }

    public static create(producerBroker: Producer) {
        return new EnqueueRequestNf(producerBroker)
    }

    public async emmit_event(nf: NF, kind: string) {
        const message: string = JSON.stringify({ kind, ...nf })

        await this.producerBroker.enqueue(kind, message)
    }
}