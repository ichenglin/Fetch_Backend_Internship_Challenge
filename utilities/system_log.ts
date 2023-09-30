export default class SystemLog {

    public static log_send(log_message: string) {
        console.log(`[LOG ${new Date().toLocaleTimeString()}] ${log_message}`);
    }

}