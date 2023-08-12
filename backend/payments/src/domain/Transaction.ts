import crypto from 'crypto';

export default class Transaction { 
  constructor(
    readonly id: string,
    readonly amount: number,
    readonly rideId: string,
    readonly date: Date
  ){
    if (this.amount <= 0) { 
      throw new Error('Amount must be positive');
    }
  }

  static create(amount: number, rideId: string, date: Date) { 
    const id = crypto.randomUUID()
    return new Transaction(id, amount, rideId, date);
  }
}