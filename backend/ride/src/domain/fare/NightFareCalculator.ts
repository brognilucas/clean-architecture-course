import FareCalculator from "./FareCalculator";

export default class NightFareCalculator implements FareCalculator {
    readonly FARE = 3.9;

    calculateFare(distance: number): number {
        return this.FARE * distance;
    }
}