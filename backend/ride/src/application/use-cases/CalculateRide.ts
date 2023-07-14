import Ride from "../../domain/Ride";
import Location from "../../domain/Location";
export default class CalculateRide {

  execute(input: Input): Output {
    const ride = Ride.create(
      new Location(10, 20),
      new Location(10, 20),
      "passengerId"
    );

    for (const segment of input.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculatePrice();
    return { price };
  }
}

type Input = {
  segments: {
    distance: number;
    date: string;
  }[];
}

type Output = {
  price: number;
}