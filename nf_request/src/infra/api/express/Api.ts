import express, { Express } from 'express';
import { Api } from '../IApi';
import { Route } from './routes/IRoutes';

export class ApiExpress implements Api {
    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express()
        this.app.use(express.json())

        this.createRoutes(routes)

    }

    private createRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const handler = route.getHandler()
            const path = `/api${route.getPath()}`
            const method = route.getMethod()

            this.app[method](path, handler)
            this.printRoutesAvailable()
        })
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes)
    }

    public run(port: number): void {
        this.app.listen(port, () => {
            console.log(`running on ${port}... \npress CTRL + C to cancel`)
        })
    }

    private printRoutesAvailable() {
        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method,
                };
            });

        console.log(routes);
    }
}