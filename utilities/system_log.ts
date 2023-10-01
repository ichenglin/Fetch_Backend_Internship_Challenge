import chalk from "chalk";

export default class SystemLog {

    public static log_send(log_message: string, log_type: string = "LOG") {
        const log_signature = chalk.blue(`[${chalk.green.bold(log_type)} ${new Date().toLocaleTimeString()}]`);
        console.log(chalk.white(`${log_signature} ${log_message.replace(/\n/g, `\n${log_signature} `)}`));
    }

}