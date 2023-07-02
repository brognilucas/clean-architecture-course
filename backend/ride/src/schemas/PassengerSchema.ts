import { Schema, model } from 'mongoose';
import {PassengerOutput} from '../Passenger';

const PassengerSchema = new Schema({
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

export const PassengerModel = model<PassengerOutput>('Passenger', PassengerSchema);