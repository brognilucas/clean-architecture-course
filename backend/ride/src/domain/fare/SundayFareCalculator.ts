import FareCalculator from "./FareCalculator";

export default class SundayFareCalculator implements FareCalculator { 
  readonly FARE = 2.9;

  calculateFare(distance: number): number {
    return this.FARE * distance;
  }
}