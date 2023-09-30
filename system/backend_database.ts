export class BackendDatabase {

    private transaction_active:  Array<DatabaseTransaction>;
    private transaction_expired: Array<DatabaseTransaction>;

    constructor() {
        this.transaction_active  = new Array<DatabaseTransaction>();
        this.transaction_expired = new Array<DatabaseTransaction>();
    }

    public transaction_add(transaction: DatabaseTransaction) {
        if (this.transaction_active.length <= 0) {
            this.transaction_active.push(transaction);
            return;
        }
        const transaction_time = transaction.timestamp.getTime(); 
        // binary insert
        let range_upper = (this.transaction_active.length - 1);
        let range_lower = 0;
        while (range_upper > range_lower) {
            const center_index = Math.floor((range_upper + range_lower) / 2);
            const center_time  = this.transaction_active[center_index].timestamp.getTime();
            if      (transaction_time < center_time) range_upper = center_index - 1;
            else if (transaction_time > center_time) range_lower = center_index + 1;
            else                                     range_upper = range_lower = center_index;
        }
        const transaction_index = range_upper + 1;
        this.transaction_active = [
            ...this.transaction_active.slice(0, transaction_index),
            transaction,
            ...this.transaction_active.slice(transaction_index),
        ];
    }

}

export interface DatabaseTransaction {
    payer:     string,
    points:    number,
    timestamp: Date
}