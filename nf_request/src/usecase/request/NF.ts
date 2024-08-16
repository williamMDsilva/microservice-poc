import { Usecase } from '../usecase';
import { RequestGatewayNF } from '../../domain/request/gateway/NF';
import { resourceUsage } from 'process';
import NF from '../../domain/request/entity/NF';
import { RequestGatewayNFPub } from '../../domain/request/gateway/NFPub';
import { PropDownload, RequestGatewayDowloadPub } from '../../domain/request/gateway/DowloadPub';

export type UsecaseRequestNfInput = {
    name_provider: string,
    cnpj_provider: string,
    name_taker: string,
    cnpj_taker: string,
    cnae: string,
    value: number
}
export type UsecaseRequestNfOut = {
    id: string
}

export class UsecaseRequestNf implements Usecase<UsecaseRequestNfInput, UsecaseRequestNfOut> {

    private constructor(
        private readonly requestGatewayNF: RequestGatewayNF,
        private readonly requestGatewayNFPub: RequestGatewayNFPub,
        private readonly requestGatewayDowloadPub: RequestGatewayDowloadPub
    ) { }

    async call(input: UsecaseRequestNfInput): Promise<UsecaseRequestNfOut> {
        const requestNf = NF.create(
            input.name_provider,
            input.cnpj_provider,
            input.name_taker,
            input.cnpj_taker,
            input.cnae,
            input.value,
        )

        const statusDownload: PropDownload = {
            kind: "create_entity_to_download",
            nf: requestNf
        }

        await this.requestGatewayNF.save(requestNf)
        await this.requestGatewayNFPub.enqueue(requestNf, "generate_nf_pdf") // todo - use enum kind
        await this.requestGatewayDowloadPub.publish(statusDownload, "create_entity_to_download") // todo - use enum kind

        return this.buildOutput(requestNf);
    }

    private buildOutput(nf: NF): UsecaseRequestNfOut {
        const usecaseRequestNfOut: UsecaseRequestNfOut = {
            id: nf.id
        }

        return usecaseRequestNfOut
    }

    public static create(requestGatewayNF: RequestGatewayNF, requestGatewayNFPub: RequestGatewayNFPub, requestGatewayDowloadPub: RequestGatewayDowloadPub) {
        return new UsecaseRequestNf(requestGatewayNF, requestGatewayNFPub, requestGatewayDowloadPub);
    }
}