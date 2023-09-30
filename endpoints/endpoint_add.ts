import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";
import { BackendDatabase, DatabaseTransaction } from "../system/backend_database";

export default class EndpointAdd extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.POST, "/add");
    }

    public override endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        database.transaction_add({
            payer:     request.body.payer,
            points:    request.body.points,
            timestamp: new Date(request.body.timestamp),
        } as DatabaseTransaction);
        response.json({success: true});
    }

}