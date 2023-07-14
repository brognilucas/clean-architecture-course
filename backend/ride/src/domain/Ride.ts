import Location  from './Location';
import { RideStatus } from './RideStatus';
import crypto from 'crypto';

export default class Ride {
  waitingTime: number = 0;

  constructor(
    readonly id: string,
    readonly from: Location,
    readonly to: Location,
    readonly passengerId: string,
    readonly driverId: string | null = null,
    readonly status: RideStatus = RideStatus.WAITING_DRIVER,
    readonly requestedAt: Date = new Date(),
    readonly acceptedAt: Date | null = null,
  ){
    if (this.acceptedAt && this.requestedAt){ 
      this.waitingTime = this.acceptedAt.getTime() - this.requestedAt.getTime()
    }
  }

  static create(
    from: Location,
    to: Location,
    passengerId: string,
    driverId: string | null = null,
    status: RideStatus = RideStatus.WAITING_DRIVER,
    requestedAt: Date = new Date(),
    acceptedAt: Date | null = null,
  ){
    const id = crypto.randomUUID();
    return new Ride(id, from, to, passengerId, driverId, status, requestedAt, acceptedAt);
  }
  
}