import dotenv from "dotenv";
import chalk from "chalk";
import { BackendApplication } from "./system/backend_application";
import EndpointAdd from "./endpoints/endpoint_add";
import { BackendDatabase } from "./system/backend_database";
import EndpointSpend from "./endpoints/endpoint_spend";
import EndpointBalance from "./endpoints/endpoint_balance";
import BackendTester from "./utilities/backend_tester";
import { BackendEndpointType } from "./system/backend_endpoint";
import SystemLog from "./utilities/system_log";

dotenv.config();

/**
 * The entry point of the program when "npm run sample" is executed in terminal
 */
(async() => {
    // register endpoints
    const server_endpoints = [
        new EndpointAdd(),    // POST /add
        new EndpointSpend(),  // POST /spend
        new EndpointBalance() // GET  /balance
    ];

    // start REST API
    const server_port        = parseInt(process.env.SERVER_PORT as string);
    const server_database    = new BackendDatabase();
    const server_application = new BackendApplication(server_port, server_endpoints, server_database);
    const server_status      = await server_application.server_connect();
    if (!server_status) return;

    // run tester
    SystemLog.log_send(chalk.yellow("\nNow running sample code...\n"), "TESTER");
    const server_tester      = new BackendTester(server_application);
    // add transactions
    await server_tester.tester_requests("/add", BackendEndpointType.POST, [
        {payer: "DANNON",       points: 300,   timestamp: "2022-10-31T10:00:00Z"},
        {payer: "UNILEVER",     points: 200,   timestamp: "2022-10-31T11:00:00Z"},
        {payer: "DANNON",       points: -200,  timestamp: "2022-10-31T15:00:00Z"},
        {payer: "MILLER COORS", points: 10000, timestamp: "2022-11-01T14:00:00Z"},
        {payer: "DANNON",       points: 1000,  timestamp: "2022-11-02T14:00:00Z"}
    ]);
    // spend points and check balance
    await server_tester.tester_requests("/spend",   BackendEndpointType.POST, [{points: 5000}]);
    await server_tester.tester_requests("/balance", BackendEndpointType.GET,  [undefined]).then(async (response) => {
        const test_result = await response[0].json();
        SystemLog.log_send(chalk.yellow(`\nTest completed with the following balance:\n${JSON.stringify(test_result, null, " ".repeat(4))}`),                 "TESTER");
        SystemLog.log_send(chalk.red   (`\n(This is a reproduction of the sample, please use \"npm run start\"\nto run the REST API without tester code)\n`), "TESTER");
    });
})();