import { Schema, model } from 'mongoose';
import Ride from '../../domain/Ride';
import { RideStatus } from '../../domain/RideStatus';

const RideSchema = new Schema({
  id: String,
  from: {
    type: Object,
    required: true,
  },
  to: {
    type: Object,
    required: true,
  },
  driverId: {
    type: Schema.Types.String,
    ref: 'Driver',
  },
  passengerId: {
    type: Schema.Types.String,
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