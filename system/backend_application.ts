import * as http from "http";
import express, { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import chalk from "chalk";
import SystemLog from "../utilities/system_log";
import BackendEndpoint, { BackendEndpointType } from "./backend_endpoint";
import { BackendDatabase } from "./backend_database";

/**
 * The main handler of the REST API server, registers endpoints and launch the server.
 */
export class BackendApplication {

    private server_application: Express;
    private server_server:      http.Server | undefined;
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
    }

    /**
     * Enable json middleware with tab spacing.
     */
    private server_load_configuration(): void {
        this.server_application.use(express.json());
        this.server_application.set("json spaces", "\t");
    }

    /**
     * Load the dynamic server endpoints.
     */
    private server_load_endpoints(): void {
        // loop through the dynamic server endpoints
        for (const server_endpoint of this.server_endpoints) {
            const endpoint_method   = BackendEndpointType[server_endpoint.get_endpoint_type()];
            const endpoint_path     = server_endpoint.get_endpoint_path();
            const endpoint_callback = server_endpoint.endpoint_callback.bind(server_endpoint);
            const endpoint_registry = (this.server_application as any as {[key: string]: Function}).bind(server_endpoint);
            // register the dynamic server endpoint
            endpoint_registry[endpoint_method.toLowerCase()](endpoint_path, (request: Request, response: Response) => {
                SystemLog.log_send(`Endpoint pinged \"${endpoint_method} ${endpoint_path} ${JSON.stringify(request.body)}\"`);
                endpoint_callback(request, response, this.server_database)
            });
            SystemLog.log_send(`Registered endpoint \"${endpoint_method} ${endpoint_path}\"`);
        }
    }

    /**
     * Launch the server on the port number specified during object construction.
     * 
     * @returns The status code of server connection, true if successfully launched and false otherwise.
     */
    public async server_connect(): Promise<boolean> {
        // start the server on specified port
        return new Promise((resolve, reject) => {
            this.server_server = this.server_application.listen(this.server_port);
            this.server_server.on("listening", () => {
                SystemLog.log_send(`Server is now running on port ${this.server_port}`);
                resolve(true);
            });
            // handle server startup error (such as port in use)
            this.server_server.on("error", (error) => {
                SystemLog.log_send(chalk.red(`An error has occured while starting server on port ${this.server_port}\n${error.message}`));
                resolve(false);
            });
        });
    }

    /**
     * Access the port number of the server.
     * 
     * @returns The port number of the server.
     */
    public get_port(): number {
        return this.server_port;
    }

}