import dotenv from "dotenv";
import { BackendApplication } from "./system/backend_application";
import EndpointAdd from "./endpoints/endpoint_add";
import { BackendDatabase } from "./system/backend_database";
import EndpointSpend from "./endpoints/endpoint_spend";
import EndpointBalance from "./endpoints/endpoint_balance";

dotenv.config();

(async() => {
    // register endpoints
    const server_endpoints = [
        new EndpointAdd(),    // POST /add
        new EndpointSpend(),  // POST /spend
        new EndpointBalance() // GET  /balance
    ];

    // start REST API
    const server_port        = parseInt(process.env.SERVER_PORT as string);
    const server_database    = new BackendDatabase();
    const server_application = new BackendApplication(server_port, server_endpoints, server_database);
    const server_status      = await server_application.server_connect();
    if (!server_status) return;
})();