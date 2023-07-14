import Location from './Location';
import { RideStatus } from './RideStatus';
import crypto from 'crypto';
import Segment from './Segment';

export default class Ride {
  driverId: string | null = null;
  waitingTime: number = 0;
  segments: Segment[];
  startedAt: Date | null = null;
  status: RideStatus = RideStatus.WAITING_DRIVER;
  acceptedAt: Date | null;
  requestedAt: Date | null;

  constructor(
    readonly id: string,
    readonly from: Location,
    readonly to: Location,
    readonly passengerId: string,
    driverId: string | null = null,
    status: RideStatus = RideStatus.WAITING_DRIVER,
    requestedAt: Date | null = new Date(),
    acceptedAt: Date | null = null,
    startedAt: Date | null = null,
    segments: Segment[] = []
  ) {
    this.driverId = driverId;
    this.acceptedAt = acceptedAt;
    this.requestedAt = requestedAt;
    this.status = status;
    this.startedAt = startedAt;
    this.segments = segments;
  }

  start() {
    if (this.status !== RideStatus.ACCEPTED) {
      throw new Error('Ride is not accepted');
    }
    this.startedAt = new Date();
    this.status = RideStatus.STARTED;
  }

  accept(driverId: string) {
    if (this.status !== RideStatus.WAITING_DRIVER) {
      throw new Error('Ride is not waiting for a driver');
    }
    this.driverId = driverId;
    this.status = RideStatus.ACCEPTED;
    this.acceptedAt = new Date();
  }

  static create(
    from: Location,
    to: Location,
    passengerId: string,
    driverId: string | null = null,
    status: RideStatus = RideStatus.WAITING_DRIVER,
    requestedAt: Date = new Date(),
    acceptedAt: Date | null = null,
  ) {
    const id = crypto.randomUUID();
    return new Ride(id, from, to, passengerId, driverId, status, requestedAt, acceptedAt);
  }

  addSegment(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }

  calculatePrice() {
    const OVERNIGHT_FARE = 3.90;
    const OVERNIGHT_SUNDAY_FARE = 5;
    const SUNDAY_FARE = 2.9;
    const NORMAL_FARE = 2.1;
    const MIN_PRICE = 10;
    let price = 0;

    for (const segment of this.segments) {
      if (segment.isOvernight() && !segment.isSunday()) {
        price += segment.distance * OVERNIGHT_FARE;
      }
      if (segment.isOvernight() && segment.isSunday()) {
        price += segment.distance * OVERNIGHT_SUNDAY_FARE;
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        price += segment.distance * SUNDAY_FARE;
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        price += segment.distance * NORMAL_FARE;
      }
    }
    return (price < MIN_PRICE) ? MIN_PRICE : price;
  }


  calculateWaitingTime(): number {
    if (this.acceptedAt && this.requestedAt) {
      this.waitingTime = this.acceptedAt.getTime() - this.requestedAt.getTime();
    } else if (this.requestedAt) {
      this.waitingTime = new Date().getTime() - this.requestedAt.getTime();
    }

    return this.waitingTime
  }
}