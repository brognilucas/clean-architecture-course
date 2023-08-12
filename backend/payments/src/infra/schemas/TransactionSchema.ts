import { Schema, model } from 'mongoose';
import Transaction from '../../domain/Transaction';
const TransactionSchema = new Schema({
  id: String,
  amount: Number,
  date: Date,
  rideId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

export const TransactionModel = model<Transaction>('Transactions', TransactionSchema);