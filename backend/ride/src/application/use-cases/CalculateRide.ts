import Ride from "../../domain/ride/Ride";
import Coord from "../../domain/distance/Coord";
import Segment from "../../domain/ride/Segment";
export default class CalculateRide {

  execute(input: Input): Output {
    const ride = Ride.create(
      new Coord(10, 20),
      new Coord(10, 20),
      "passengerId"
    );

    for (const segment of input.segments) {
      ride.addSegment(segment.from, segment.to, new Date(segment.date));
    }
    const price = ride.calculatePrice();
    return { price };
  }
}

type Input = {
  segments: Segment[];
}

type Output = {
  price: number;
}