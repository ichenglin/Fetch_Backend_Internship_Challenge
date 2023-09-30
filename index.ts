import dotenv from "dotenv";
import express from "express";
import SystemLog from "./utilities/system_log";

// initialize dotenv
dotenv.config();
// initialize express
const express_application = express();
express_application.use(express.json());
express_application.set("json spaces", "\t");

express_application.get("/", (request, response) => {
    response.json({hello: "world"});
});

// establish connection
express_application.listen(process.env.EXPRESS_PORT, () => {
    SystemLog.log_send(`Server running on port ${process.env.EXPRESS_PORT}`)
});