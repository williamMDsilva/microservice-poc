import NF from "../entity/NF";

export interface RequestGatewayNF {
    save(nf: NF): Promise<void> /// save database
}