import { Schema, model } from 'mongoose';
import {DriverOutput} from '../Driver';

const DriverSchema = new Schema({
  name: String,
  email: String,
  document: String,
  carPlate: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

export const DriverModel = model<DriverOutput>('Driver', DriverSchema);