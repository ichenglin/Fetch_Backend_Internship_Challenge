import chalk from "chalk";

/**
 * The utility object for handling system logs.
 */
export default class SystemLog {

    /**
     * Send a log message to the server terminal.
     * 
     * @param log_message The content of the log message.
     * @param log_type The (optional) type of the log message, default is "LOG" if not specified.
     */
    public static log_send(log_message: string, log_type: string = "LOG"): void {
        const log_signature = chalk.blue(`[${(log_type === "LOG") ? chalk.green.bold(log_type) : chalk.red.bold(log_type)} ${new Date().toLocaleTimeString()}]`);
        console.log(chalk.white(`${log_signature} ${log_message.replace(/\n/g, `\n${log_signature} `)}`));
    }

}