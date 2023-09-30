import dotenv from "dotenv";
import { BackendApplication } from "./system/backend_application";
import EndpointAdd from "./endpoints/endpoint_add";
import BackendEndpoint, { BackendEndpointType } from "./system/backend_endpoint";
import { BackendDatabase } from "./system/backend_database";

dotenv.config();

const server_endpoints = [
    new EndpointAdd(),
    new BackendEndpoint(BackendEndpointType.POST, "/f")
];
const server_port        = parseInt(process.env.SERVER_PORT as string);
const server_database    = new BackendDatabase();
const server_application = new BackendApplication(server_port, server_endpoints, server_database);
