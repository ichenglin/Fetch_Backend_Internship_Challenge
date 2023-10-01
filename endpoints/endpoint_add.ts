import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";
import { BackendDatabase, DatabaseTransaction } from "../system/backend_database";

/**
 * The object that implements the dynamic "/add" endpoint, passed to BackendApplication on construction
 * to register the endpoint.
 */
export default class EndpointAdd extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.POST, "/add");
    }

    /**
     * The callback function for the "/add" endpoint, called when the endpoint is accessed.
     * 
     * @param request Request data that the server received, including request body if provided.
     * @param response The handler for responding to client, including status code and json response.
     * @param database The database for interacting with server data.
     */
    public override endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        // request body validation
        const request_validation = typeof request.body           === "object" &&
                                   typeof request.body.payer     === "string" &&
                                   typeof request.body.points    === "number" &&
                                   typeof request.body.timestamp === "string" &&
                                   /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(request.body.timestamp);
        if (!request_validation) {
            response.status(400).json({error: "Invalid request body"});
            return;
        }
        // process the transaction and return status
        database.transaction_add({
            payer:     request.body.payer,
            points:    request.body.points,
            timestamp: new Date(request.body.timestamp),
        } as DatabaseTransaction);
        response.status(200).json({success: true});
    }

}