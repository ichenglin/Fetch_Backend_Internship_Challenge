import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";
import { BackendDatabase } from "../system/backend_database";

/**
 * The object that implements the dynamic "/spend" endpoint, passed to BackendApplication on construction
 * to register the endpoint.
 */
export default class EndpointSpend extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.POST, "/spend");
    }

    /**
     * The callback function for the "/spend" endpoint, called when the endpoint is accessed.
     * 
     * @param request Request data that the server received, including request body if provided.
     * @param response The handler for responding to client, including status code and json response.
     * @param database The database for interacting with server data.
     */
    public override endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        // request body validation
        const request_validation = typeof request.body        === "object" &&
                                   typeof request.body.points === "number";
        if (!request_validation) {
            response.status(400).json({error: "Invalid request body"});
            return;
        }
        // skip out zero points case
        if (request.body.points === 0) {
            response.status(200).json([]);
            return;
        }
        // retrieve result from database, report on failure
        const payers_involved = database.transaction_spend(request.body.points);
        if (payers_involved.length <= 0) {
            response.status(400).json({error: "User have insufficient points"});
            return;
        }
        response.status(200).json(payers_involved);
    }

}