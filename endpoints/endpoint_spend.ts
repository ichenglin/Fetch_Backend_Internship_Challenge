import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";
import { BackendDatabase } from "../system/backend_database";

export default class EndpointSpend extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.POST, "/spend");
    }

    public override endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        if (request.body.points === 0) {
            response.json([]);
            return;
        }
        const payers_involved = database.transaction_spend(request.body.points);
        if (payers_involved.length <= 0) response.status(400).json({error: "User have insufficient points"});
        response.json(payers_involved);
    }

}