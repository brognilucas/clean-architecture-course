import { Schema, model } from 'mongoose';
import Passenger from '../../domain/passenger/Passenger';

const PassengerSchema = new Schema({
  id: String,
  name: String,
  email: String,
  document: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

export const PassengerModel = model<Passenger>('Passenger', PassengerSchema);