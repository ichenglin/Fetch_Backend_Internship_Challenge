import fetch, { Response } from "node-fetch";
import { BackendEndpointType } from "../system/backend_endpoint";
import { BackendApplication } from "../system/backend_application";

/**
 * The utility object for performing tests to the server endpoints.
 */
export default class BackendTester {

    private server_application: BackendApplication;

    constructor(server_application: BackendApplication) {
        this.server_application = server_application;
    }

    /**
     * Send a request to localhost REST API endpoint, used to test the functionality of the program.
     * 
     * @param request_path The path of the endpoint to send the request.
     * @param request_type The type of the request to send to endpoint.
     * @param request_bodies The request bodies, each one has its own request.
     * @returns The response of the request sent.
     */
    public async tester_requests(request_path: string, request_type: BackendEndpointType, request_bodies: any[]): Promise<Response[]> {
        const request_port    = this.server_application.get_port();
        const request_method  = BackendEndpointType[request_type];
        const request_headers = (request_type === BackendEndpointType.POST) ? {"Content-Type": "application/json; charset=utf-8"} : undefined;
        // send a request to test local REST API
        return Promise.all(request_bodies.map(async (loop_body) => await fetch(`http://localhost:${request_port}${request_path}`, {
            method:  request_method,
            headers: request_headers,
            body:    JSON.stringify(loop_body)
        })));
    }

}