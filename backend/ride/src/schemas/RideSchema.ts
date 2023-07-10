import { Schema, model } from 'mongoose';
import Ride from '../Ride';
import { RideStatus } from '../RideStatus';

const RideSchema = new Schema({
  from: {
    type: Object,
    required: true,
  },
  to: {
    type: Object,
    required: true,
  },
  driver_id: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  },
  passenger_id: {
    type: Schema.Types.ObjectId,
    ref: 'Passenger',
  },
  status: {
    type: String, 
    enum: RideStatus
  },
  acceptedAt: {
    type: Date
  },
  requestedAt: { 
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

export const RideModel = model<Ride>('Ride', RideSchema);