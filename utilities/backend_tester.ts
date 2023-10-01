import fetch, { Response } from "node-fetch";
import { BackendEndpointType } from "../system/backend_endpoint";
import { BackendApplication } from "../system/backend_application";

export default class BackendTester {

    private server_application: BackendApplication;

    constructor(server_application: BackendApplication) {
        this.server_application = server_application;
    }

    public async tester_requests(request_path: string, request_type: BackendEndpointType, request_bodies: any[]): Promise<Response[]> {
        // send a request to test my REST API
        const request_port    = this.server_application.get_port();
        const request_method  = BackendEndpointType[request_type];
        const request_headers = (request_type === BackendEndpointType.POST) ? {"Content-Type": "application/json; charset=utf-8"} : undefined;
        return Promise.all(request_bodies.map(async (loop_body) => await fetch(`http://localhost:${request_port}${request_path}`, {
            method:  request_method,
            headers: request_headers,
            body:    JSON.stringify(loop_body)
        })));
    }

}