import { Request, Response } from "express";
import SystemLog from "../utilities/system_log";
import { BackendDatabase } from "./backend_database";

/**
 * The object that implements dynamic endpoints, should be extended by endpoint objects
 * and passed to BackendApplication on construction to register the endpoint.
 */
export default class BackendEndpoint {

    private endpoint_type: BackendEndpointType;
    private endpoint_path: string;

    constructor(endpoint_type: BackendEndpointType, endpoint_path: string) {
        this.endpoint_type = endpoint_type;
        this.endpoint_path = endpoint_path;
    }

    /**
     * The callback function for endpoint, called when the endpoint is accessed.
     * 
     * @param request Request data that the server received, including request body if provided.
     * @param response The handler for responding to client, including status code and json response.
     * @param database The database for interacting with server data.
     */
    public endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        // default callback function, should be overrided
        SystemLog.log_send(`Callback executed for endpoint \"${BackendEndpointType[this.endpoint_type]} ${this.endpoint_path}\"`);
    }

    /**
     * Access the type of the endpoint.
     * 
     * @returns The type of the endpoint.
     */
    public get_endpoint_type(): BackendEndpointType {
        return this.endpoint_type;
    }

    /**
     * Access the path of the endpoint.
     * 
     * @returns The path of the endpoint.
     */
    public get_endpoint_path(): string {
        return this.endpoint_path;
    }

}

/**
 * The type of the endpoint, there are more than just GET and POST in REST
 * but these are all we need in this coding challenge
 */
export enum BackendEndpointType {
    GET,
    POST
}