import NF from "../entity/NF";

export interface RequestGatewayNFPub {
    enqueue(nf: NF, kind: string): Promise<void> /// send message broker
}