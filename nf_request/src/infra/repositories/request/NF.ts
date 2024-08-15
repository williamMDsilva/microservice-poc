import NF from "../../../domain/request/entity/NF";
import { RequestGatewayNF } from "../../../domain/request/gateway/NF";
import { Sql } from 'postgres';

export class RepositoriesRequestNf implements RequestGatewayNF {
    private constructor(private readonly sql: Sql) { }

    public static create(sql: Sql) {
        return new RepositoriesRequestNf(sql)
    }

    private async insertRequestNf(nf: any) {
        const nfSave = await this.sql`
          insert into nf
            (   id,
                name_provider,
                cnpj_provider,
                name_taker,
                cnpj_taker,
                cnae,
                value
            )
          values
            (
                ${nf.id},
                ${nf.name_provider},
                ${nf.cnpj_provider},
                ${nf.name_taker},
                ${nf.cnpj_taker},
                ${nf.cnae},
                ${nf.value}
            )
          returning id, name_provider
        `

        return {
            id: nf.id
        }
    }

    public async save(nf: NF): Promise<void> {
        const data = {
            id: nf.id,
            name_provider: nf.name_provider,
            cnpj_provider: nf.cnpj_provider,
            name_taker: nf.name_taker,
            cnpj_taker: nf.cnpj_taker,
            cnae: nf.cnae,
            value: nf.value
        }

        await this.insertRequestNf(data)
    }

}