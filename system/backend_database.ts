export class BackendDatabase {

    private database_transactions:  Array<DatabaseTransaction>;
    private database_payers:        Array<string>;

    constructor() {
        this.database_transactions  = new Array<DatabaseTransaction>();
        this.database_payers        = new Array<string>();
    }

    public transaction_add(transaction: DatabaseTransaction): void {
        // record the name of payer if not present
        if (!this.database_payers.includes(transaction.payer)) this.database_payers.push(transaction.payer);
        // don't need to do binary search if there's no transactions saved
        if (this.database_transactions.length <= 0) {
            this.database_transactions.push(transaction);
            return;
        }
        // perform binary search for finding where the new transaction should be inserted
        const transaction_time = transaction.timestamp.getTime(); 
        let range_upper = (this.database_transactions.length - 1);
        let range_lower = 0;
        while (range_upper > range_lower) {
            const center_index = Math.floor((range_upper + range_lower) / 2);
            const center_time  = this.database_transactions[center_index].timestamp.getTime();
            if (center_time <= transaction_time) range_lower = center_index + 1;
            else                                 range_upper = center_index;
        }
        // insert the transaction into the queue
        const transaction_index = range_upper + 1;
        this.database_transactions = [
            ...this.database_transactions.slice(0, transaction_index),
            transaction,
            ...this.database_transactions.slice(transaction_index),
        ];
    }

    public transaction_spend(spend_points: number): {payer: string, points: number}[] {
        const payers_involved = new Map<string, number>();
        let points_remain     = spend_points;
        for (let transaction_index = 0; transaction_index < this.database_transactions.length; transaction_index++) {
            const transaction_element = this.database_transactions[transaction_index];
            const transaction_deduct  = Math.min(transaction_element.points, points_remain);
            // record the amount of points deducted from each payer
            if (!payers_involved.has(transaction_element.payer)) payers_involved.set(transaction_element.payer, 0);
            payers_involved.set(transaction_element.payer, (payers_involved.get(transaction_element.payer) as number) + transaction_deduct);
            // check if the transaction have enough to cover the remaining points
            if (points_remain === transaction_element.points) {
                // have just enough to cover the remaining points
                this.database_transactions = this.database_transactions.slice(transaction_index + 1);
                return Array.from(payers_involved, ([payer, points]) => ({payer: payer, points: ((-1) * points)}));
            } else if (points_remain < transaction_element.points) {
                // have more than enough to cover the remaining points
                this.database_transactions[transaction_index].points -= points_remain;
                this.database_transactions = this.database_transactions.slice(transaction_index);
                return Array.from(payers_involved, ([payer, points]) => ({payer: payer, points: ((-1) * points)}));
            }
            // don't have enough, look for next transaction
            points_remain -= transaction_deduct;
        }
        // out of transactions, there's not enough points to spend
        return [];
    }

    public transaction_balance(): {} {
        // construct balance report with record of payer names and active transactions
        const balance = Object.fromEntries(this.database_payers.map(loop_payer => [loop_payer, 0]));
        for (const transaction of this.database_transactions) balance[transaction.payer] += transaction.points; 
        return balance;
    }

}

export interface DatabaseTransaction {
    payer:     string,
    points:    number,
    timestamp: Date
}