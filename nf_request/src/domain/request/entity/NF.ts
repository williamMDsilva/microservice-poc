export type NFProps = {
    id: string,
    name_provider: string,
    cnpj_provider: string,
    name_taker: string,
    cnpj_taker: string,
    cnae: string,
    value: number
}

export default class NF {
    private constructor(private props: NFProps) {
        this.check_props()
    }

    public static create(
        name_provider: string,
        cnpj_provider: string,
        name_taker: string,
        cnpj_taker: string,
        cnae: string,
        value: number) {
        return new NF({
            id: crypto.randomUUID().toString(),
            name_provider,
            cnpj_provider,
            name_taker,
            cnpj_taker,
            cnae,
            value,
        })
    }

    public static with(props: NFProps) {
        return new NF(props)
    }

    private check_props() {
        if (this.props.value <= 0 || this.props.value == null) throw new Error("Invalid value")
    }

    //TODO - create get or any method usefull


    public get id(): string {
        return this.props.id
    }

    public get name_provider(): string {
        return this.props.name_provider
    }

    public get cnpj_provider(): string {
        return this.props.cnpj_provider
    }

    public get name_taker(): string {
        return this.props.name_taker
    }

    public get cnpj_taker(): string {
        return this.props.cnpj_taker
    }

    public get cnae(): string {
        return this.props.cnae
    }

    public get value(): number {
        return this.props.value
    }
}