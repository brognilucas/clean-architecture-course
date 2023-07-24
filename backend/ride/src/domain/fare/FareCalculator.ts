import NightFareCalculator from "./NightFareCalculator";
import Segment from "../ride/Segment";
import StandardFareCalculator from "./StandardFareCalculator";
import SundayFareCalculator from "./SundayFareCalculator";
import SundayNightFareCalculator from "./SundayNightFareCalculator";

export default abstract class FareCalculator {
  abstract readonly FARE: number;
 
  abstract calculateFare(distance: number): number;

  static create(segment: Segment): FareCalculator {
    if (segment.isOvernight() && !segment.isSunday()) {
      return new NightFareCalculator();
    }
    if (segment.isOvernight() && segment.isSunday()) {
      return new SundayNightFareCalculator();
    }
    if (!segment.isOvernight() && segment.isSunday()) {
      return new SundayFareCalculator();
    }
    if (!segment.isOvernight() && !segment.isSunday()) {
      return new StandardFareCalculator();
    }

    throw new Error("Invalid segment");
  }
}