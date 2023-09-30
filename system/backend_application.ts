import express, { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import SystemLog from "../utilities/system_log";
import BackendEndpoint, { BackendEndpointType } from "./backend_endpoint";
import { BackendDatabase } from "./backend_database";

export class BackendApplication {

    private server_application: Express;
    private server_database:    BackendDatabase;
    private server_endpoints:   Array<BackendEndpoint>;
    private server_port:        number;

    constructor(server_port: number, server_endpoints: Array<BackendEndpoint>, server_database: BackendDatabase) {
        this.server_application = express();
        this.server_database    = server_database;
        this.server_endpoints   = server_endpoints;
        this.server_port        = server_port;
        this.server_load_configuration();
        this.server_load_endpoints();
        this.server_connect();
    }

    private server_load_configuration(): void {
        // enable json middleware with tab spacing
        this.server_application.use(express.json());
        this.server_application.set("json spaces", "\t");
    }

    private server_load_endpoints(): void {
        for (const server_endpoint of this.server_endpoints) {
            const endpoint_method   = BackendEndpointType[server_endpoint.get_endpoint_type()].toLowerCase();
            const endpoint_path     = server_endpoint.get_endpoint_path();
            const endpoint_callback = server_endpoint.endpoint_callback.bind(server_endpoint);
            const endpoint_registry = (this.server_application as any as {[key: string]: Function}).bind(server_endpoint);
            endpoint_registry[endpoint_method](endpoint_path, (request: Request, response: Response) => endpoint_callback(request, response, this.server_database));
        }
    }

    private server_connect(): void {
        this.server_application.listen(this.server_port, () => SystemLog.log_send(`Server running on port ${this.server_port}`));
    }

}