import { Location } from './Location';
import { RideStatus } from './RideStatus';

export default class Ride {
  waitingTime: number = 0;

  constructor(
    readonly from: Location,
    readonly to: Location,
    readonly passenger_id: string,
    readonly driver_id: string | null = null,
    readonly status: RideStatus = RideStatus.WAITING_DRIVER,
    readonly requestedAt: Date = new Date(),
    readonly acceptedAt: Date | null = null,
    readonly id: string = ''
  ){
    if (this.acceptedAt && this.requestedAt){ 
      this.waitingTime = this.acceptedAt.getTime() - this.requestedAt.getTime()
    }
  }


}