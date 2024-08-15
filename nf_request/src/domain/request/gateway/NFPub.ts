import NF from "../entity/NF";

export interface RequestGatewayNFPub {
    emmit_event(nf: NF, kind: string): Promise<void> /// send message broker
}