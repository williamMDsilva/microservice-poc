import { Request, response, Response } from 'express';
import { UsecaseRequestNf, UsecaseRequestNfInput, UsecaseRequestNfOut } from '../../../../../usecase/request/NF';
import { Usecase } from '../../../../../usecase/usecase';
import { Method, Route } from '../IRoutes';

export type RequestNfResponse = {
    id: string
}

// TODO - improve usecaseRequestNf dependencie as interface usecase
export class RoutesRequestNf implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: Method,
        private readonly usecaseRequestNf: UsecaseRequestNf
    ) { }

    public static create(usecaseRequestNf: UsecaseRequestNf) {
        return new RoutesRequestNf("/request/nf", Method.POST, usecaseRequestNf)
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            const {
                name_provider,
                cnpj_provider,
                name_taker,
                cnpj_taker,
                cnae,
                value,
            } = request.body

            const input: UsecaseRequestNfInput = {
                name_provider,
                cnpj_provider,
                name_taker,
                cnpj_taker,
                cnae,
                value,
            }

            const usecaseRequestNfOut: UsecaseRequestNfOut = await this.usecaseRequestNf.call(input);

            const outputResponse = this.buildResponse(usecaseRequestNfOut)

            response.status(201).json(outputResponse)
        }
    }

    private buildResponse(usecaseRequestNfOut: UsecaseRequestNfOut): RequestNfResponse {
        const response: RequestNfResponse = { id: usecaseRequestNfOut.id }

        return response
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): Method {
        return this.method
    }

}