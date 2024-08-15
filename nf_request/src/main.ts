import { Sql } from "postgres";
import createDatabaseConnection from "./database/database";
import { UsecaseRequestNf } from './usecase/request/NF';
import { RepositoriesRequestNf } from './infra/repositories/request/NF';
import { RoutesRequestNf } from "./infra/api/express/routes/request/NF";
import { EnqueueRequestNf } from "./infra/queue/request/NF";

import dotenv from 'dotenv';
import { ApiExpress } from "./infra/api/express/Api";
import { Producer } from "./exchange/rabbitmq";

dotenv.config()
const DATABASE_URL = `${process.env.DATABASE_URL}`
const PORT: number = parseInt(process.env.PORT || "4000")

const EXCHANGE_NAME = `${process.env.EXCHANGE_NAME || 'request'}`
const RABBIT_URL = `${process.env.RABBIT_URL}`

function bootstrap() {

    const sql: Sql = createDatabaseConnection(DATABASE_URL)
    const producerBroker: Producer = Producer.create(EXCHANGE_NAME, RABBIT_URL)

    // amqp..

    const enqueueRequestNf = EnqueueRequestNf.create(producerBroker)
    const repositoriesRequestNf = RepositoriesRequestNf.create(sql)

    const usecaseRequestNf = UsecaseRequestNf.create(repositoriesRequestNf, enqueueRequestNf)

    const createRoute = RoutesRequestNf.create(usecaseRequestNf)
    const api = ApiExpress.create([createRoute])
    api.run(PORT)
}

bootstrap();