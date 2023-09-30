import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";
import { BackendDatabase } from "../system/backend_database";

export default class EndpointBalance extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.GET, "/balance");
    }

    public override endpoint_callback(request: Request, response: Response, database: BackendDatabase): void {
        response.json(database.transaction_balance());
    }

}