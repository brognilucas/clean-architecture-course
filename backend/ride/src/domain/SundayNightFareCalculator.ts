import FareCalculator from "./FareCalculator";

export default class SundayNightFareCalculator implements FareCalculator { 
  readonly FARE = 5;

  calculateFare(distance: number): number {
    return this.FARE * distance;
  }
}