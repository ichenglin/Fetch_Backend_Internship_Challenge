import { Request, Response } from "express";
import BackendEndpoint, { BackendEndpointType } from "../system/backend_endpoint";

export default class EndpointAdd extends BackendEndpoint {

    constructor() {
        super(BackendEndpointType.POST, "/add");
    }

    public override endpoint_callback(request: Request, response: Response): void {
        console.log(request.body);
        console.log(new Date(request.body.timestamp).toLocaleString());
    }

}