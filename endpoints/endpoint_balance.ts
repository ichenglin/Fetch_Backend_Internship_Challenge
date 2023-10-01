import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";
import { BackendDatabase } from "../system/backend_database";

/**
 * The object that implements the dynamic "/balance" endpoint, passed to BackendApplication on construction
 * to register the endpoint.
 */
export default class EndpointBalance extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.GET, "/balance");
    }

    /**
     * The callback function for the "/balance" endpoint, called when the endpoint is accessed.
     * 
     * @param request Request data that the server received, including request body if provided.
     * @param response The handler for responding to client, including status code and json response.
     * @param database The database for interacting with server data.
     */
    public override endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        response.status(200).json(database.transaction_balance());
    }

}