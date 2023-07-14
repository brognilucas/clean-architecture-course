import Location  from './Location';
import { RideStatus } from './RideStatus';
import crypto from 'crypto';
import Segment from './Segment';

export default class Ride {
  waitingTime: number = 0;
  segments: Segment[];

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

    this.segments = [];
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
  
}