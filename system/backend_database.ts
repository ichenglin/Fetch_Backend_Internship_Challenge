export class BackendDatabase {

    private transaction_active:  Array<DatabaseTransaction>;
    private transaction_expired: Array<DatabaseTransaction>;

    constructor() {
        this.transaction_active  = new Array<DatabaseTransaction>();
        this.transaction_expired = new Array<DatabaseTransaction>();
    }

    public transaction_add(transaction: DatabaseTransaction): void {
        if (this.transaction_active.length <= 0) {
            this.transaction_active.push(transaction);
            return;
        }
        const transaction_time = transaction.timestamp.getTime(); 
        // insert with binary search
        let range_upper = (this.transaction_active.length - 1);
        let range_lower = 0;
        while (range_upper > range_lower) {
            const center_index = Math.floor((range_upper + range_lower) / 2);
            const center_time  = this.transaction_active[center_index].timestamp.getTime();
            if (center_time <= transaction_time) range_lower = center_index + 1;
            else                                 range_upper = center_index;
        }
        const transaction_index = range_upper + 1;
        this.transaction_active = [
            ...this.transaction_active.slice(0, transaction_index),
            transaction,
            ...this.transaction_active.slice(transaction_index),
        ];
        console.log(this.transaction_active);
    }

    public transaction_spend(spend_points: number): {}[] {
        const payers_involved = new Map<string, number>();
        let points_remain     = spend_points;
        for (let transaction_index = 0; transaction_index < this.transaction_active.length; transaction_index++) {
            const transaction_element = this.transaction_active[transaction_index];
            const transaction_deduct  = Math.min(transaction_element.points, points_remain);
            // record the amount of points deducted from each payer
            if (!payers_involved.has(transaction_element.payer)) payers_involved.set(transaction_element.payer, 0);
            payers_involved.set(transaction_element.payer, (payers_involved.get(transaction_element.payer) as number) + transaction_deduct);
            // check if the transaction have enough to cover the remaining points
            if (points_remain === transaction_element.points) {
                // have just enough to cover the remaining points
                this.transaction_active = this.transaction_active.slice(transaction_index + 1);
                return Array.from(payers_involved, ([payer, points]) => ({payer: payer, points: ((-1) * points)}));
            } else if (points_remain < transaction_element.points) {
                // have more than enough to cover the remaining points
                this.transaction_active[transaction_index].points -= points_remain;
                this.transaction_active = this.transaction_active.slice(transaction_index);
                return Array.from(payers_involved, ([payer, points]) => ({payer: payer, points: ((-1) * points)}));
            }
            // don't have enough, look for next transaction
            points_remain -= transaction_deduct;
        }
        // out of transactions, there's not enough points to spend
        return [];
    }

}

export interface DatabaseTransaction {
    payer:     string,
    points:    number,
    timestamp: Date
}