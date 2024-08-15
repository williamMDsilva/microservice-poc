import { Usecase } from '../usecase';
import { RequestGatewayNF } from '../../domain/request/gateway/NF';
import { resourceUsage } from 'process';
import NF from '../../domain/request/entity/NF';
import { RequestGatewayNFPub } from '../../domain/request/gateway/NFPub';

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

    private constructor(private readonly requestGatewayNF: RequestGatewayNF, private readonly requestGatewayNFPub: RequestGatewayNFPub) { }

    async call(input: UsecaseRequestNfInput): Promise<UsecaseRequestNfOut> {
        const requestNf = NF.create(
            input.name_provider,
            input.cnpj_provider,
            input.name_taker,
            input.cnpj_taker,
            input.cnae,
            input.value,
        )

        await this.requestGatewayNF.save(requestNf)
        await this.requestGatewayNFPub.emmit_event(requestNf, "generate_nf_pdf") // todo - use enum kind

        return this.buildOutput(requestNf);
    }

    private buildOutput(nf: NF): UsecaseRequestNfOut {
        const usecaseRequestNfOut: UsecaseRequestNfOut = {
            id: nf.id
        }

        return usecaseRequestNfOut
    }

    public static create(requestGatewayNF: RequestGatewayNF, requestGatewayNFPub: RequestGatewayNFPub) {
        return new UsecaseRequestNf(requestGatewayNF, requestGatewayNFPub);
    }
}