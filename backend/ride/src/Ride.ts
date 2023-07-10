import { Location } from './Location';
import { RideStatus } from './RideStatus';

export default class Ride {
  constructor(
    readonly from: Location,
    readonly to: Location,
    readonly passenger_id: string,
    readonly driverId: string | null = null,
    readonly status: RideStatus = RideStatus.WAITING_DRIVER,
    readonly requestedAt: Date = new Date(),
    readonly id: string = ''
  ){}
}