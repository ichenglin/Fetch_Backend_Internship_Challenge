import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";
import { BackendDatabase } from "../system/backend_database";

export default class EndpointSpend extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.POST, "/spend");
    }

    public override endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        const request_validation = typeof request.body        === "object" &&
                                   typeof request.body.points === "number";
        if (!request_validation) {
            response.status(400).json({error: "Invalid request body"});
            return;
        }
        if (request.body.points === 0) {
            response.status(200).json([]);
            return;
        }
        const payers_involved = database.transaction_spend(request.body.points);
        if (payers_involved.length <= 0) response.status(400).json({error: "User have insufficient points"});
        response.status(200).json(payers_involved);
    }

}