import NF from "../entity/NF";

export type PropDownload = {
    kind: string,
    nf: NF
}

export interface RequestGatewayDowloadPub {
    publish(propDownload: PropDownload, kind: string): Promise<void> /// send message broker
}