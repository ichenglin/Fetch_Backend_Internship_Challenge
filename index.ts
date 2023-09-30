import dotenv from "dotenv";
import { BackendApplication } from "./system/backend_application";
import EndpointAdd from "./endpoints/endpoint_add";

dotenv.config();

const server_endpoints = [
    new EndpointAdd()
];

export const server_application = new BackendApplication(parseInt(process.env.SERVER_PORT as string), server_endpoints);