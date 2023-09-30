import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";
import { BackendDatabase, DatabaseTransaction } from "../system/backend_database";

export default class EndpointAdd extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.POST, "/add");
    }

    public override endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        const request_validation = typeof request.body           === "object" &&
                                   typeof request.body.payer     === "string" &&
                                   typeof request.body.points    === "number" &&
                                   typeof request.body.timestamp === "string" &&
                                   /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(request.body.timestamp);
        if (!request_validation) {
            response.status(400).json({error: "Invalid request body"});
            return;
        }
        database.transaction_add({
            payer:     request.body.payer,
            points:    request.body.points,
            timestamp: new Date(request.body.timestamp),
        } as DatabaseTransaction);
        response.status(200).json({success: true});
    }

}