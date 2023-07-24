import FareCalculator from "./FareCalculator";

export default class StandardFareCalculator extends FareCalculator {
  readonly FARE = 2.1;

  calculateFare(distance: number): number {
    return this.FARE * distance;
  }
}