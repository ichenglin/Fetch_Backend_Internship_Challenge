export default class SystemLog {

    public static log_send(log_message: string, log_type: string = "LOG") {
        const log_signature = `[${log_type} ${new Date().toLocaleTimeString()}]`;
        console.log(`${log_signature} ${log_message.replace(/\n/g, `\n${log_signature} `)}`);
    }

}