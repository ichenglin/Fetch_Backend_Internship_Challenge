import { Request, Response } from "express";
import SystemLog from "../utilities/system_log";

export default class BackendEndpoint {

    private endpoint_type: BackendEndpointType;
    private endpoint_path: string;

    constructor(endpoint_type: BackendEndpointType, endpoint_path: string) {
        this.endpoint_type = endpoint_type;
        this.endpoint_path = endpoint_path;
    }

    public endpoint_callback(request: Request, response: Response): void {
        SystemLog.log_send(`Callback executed for endpoint \"${BackendEndpointType[this.endpoint_type]} ${this.endpoint_path}\"`);
    }

    public get_endpoint_type(): BackendEndpointType {
        return this.endpoint_type;
    }

    public get_endpoint_path(): string {
        return this.endpoint_path;
    }

}

export enum BackendEndpointType {
    GET,
    POST
}