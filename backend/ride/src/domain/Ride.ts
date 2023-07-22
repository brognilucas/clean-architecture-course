import Coord from './Coord';
import { RideStatus } from './RideStatus';
import crypto from 'crypto';
import Segment from './Segment';
import DistanceCalculator from './DistanceCalculator';

export default class Ride {
  driverId: string | null = null;
  waitingTime: number = 0;
  segments: Segment[];
  startedAt: Date | null = null;
  status: RideStatus = RideStatus.WAITING_DRIVER;
  acceptedAt: Date | null;
  requestedAt: Date | null;
  completedAt: Date | null;

  constructor(
    readonly id: string,
    readonly from: Coord,
    readonly to: Coord,
    readonly passengerId: string,
    driverId: string | null = null,
    status: RideStatus = RideStatus.WAITING_DRIVER,
    requestedAt: Date | null = new Date(),
    acceptedAt: Date | null = null,
    startedAt: Date | null = null,
    segments: Segment[] = [],
    completedAt: Date | null = null,
  ) {
    this.driverId = driverId;
    this.acceptedAt = acceptedAt;
    this.requestedAt = requestedAt;
    this.status = status;
    this.startedAt = startedAt;
    this.segments = segments;
    this.completedAt = completedAt;
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
    from: Coord,
    to: Coord,
    passengerId: string,
    driverId: string | null = null,
    status: RideStatus = RideStatus.WAITING_DRIVER,
    requestedAt: Date = new Date(),
    acceptedAt: Date | null = null,
  ) {
    const id = crypto.randomUUID();
    return new Ride(id, from, to, passengerId, driverId, status, requestedAt, acceptedAt);
  }

  addSegment(from: Coord, to: Coord, date: Date) {
    this.segments.push(new Segment(from, to, date));
  }

  calculatePrice() {
    const OVERNIGHT_FARE = 3.90;
    const OVERNIGHT_SUNDAY_FARE = 5;
    const SUNDAY_FARE = 2.9;
    const NORMAL_FARE = 2.1;
    const MIN_PRICE = 10;
    let price = 0;

    for (const segment of this.segments) {
      const distance = DistanceCalculator.calculate(segment.from, segment.to);
      if (segment.isOvernight() && !segment.isSunday()) {
        price += distance * OVERNIGHT_FARE;
      }
      if (segment.isOvernight() && segment.isSunday()) {
        price += distance * OVERNIGHT_SUNDAY_FARE;
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        price += distance * SUNDAY_FARE;
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        price += distance * NORMAL_FARE;
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

  end() {
    if (this.status !== RideStatus.STARTED) {
      throw new Error('Ride is not started');
    }
    this.status = RideStatus.COMPLETED;
    this.completedAt = new Date();
  }
}