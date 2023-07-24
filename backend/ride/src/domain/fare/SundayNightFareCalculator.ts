import FareCalculator from "./FareCalculator";

export default class SundayNightFareCalculator extends FareCalculator { 
  readonly FARE = 5;

  calculateFare(distance: number): number {
    return this.FARE * distance;
  }
}