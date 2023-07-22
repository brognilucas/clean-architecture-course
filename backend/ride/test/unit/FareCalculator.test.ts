import FareCalculator from "../../src/domain/FareCalculator"
import StandardFareCalculator from "../../src/domain/StandardFareCalculator"
import Segment from "../../src/domain/Segment"
import SundayFareCalculator from "../../src/domain/SundayFareCalculator"
import SundayNightFareCalculator from "../../src/domain/SundayNightFareCalculator"
import NightFareCalculator from '../../src/domain/NightFareCalculator';

test("should return StandardFareCalculator if segment date is during the week and during the day", () => {
  const fareCalculator = FareCalculator.create(new Segment(
    { lat: 10, long: 20 },
    { lat: 10, long: 20 },
    new Date("2020-01-01T10:00:00.000Z")
  ))
  expect(fareCalculator.FARE).toBe(2.1)
  expect(fareCalculator instanceof StandardFareCalculator).toBe(true)
})


test("should return NightFareCalculator if segment date is during the week and during the night", () => {
  const fareCalculator = FareCalculator.create(new Segment(
    { lat: 10, long: 20 },
    { lat: 10, long: 20 },
    new Date("2020-01-01T23:00:00.000Z")
  ))
  expect(fareCalculator.FARE).toBe(3.9)
  expect(fareCalculator instanceof NightFareCalculator).toBe(true)
})

test("should return SundayFareCalculator if segment date is during the sunday and during the day", () => {
  const fareCalculator = FareCalculator.create(new Segment(
    { lat: 10, long: 20 },
    { lat: 10, long: 20 },
    new Date("2021-03-07T10:00:00.000Z")
  ))
  expect(fareCalculator.FARE).toBe(2.9)
  expect(fareCalculator instanceof SundayFareCalculator).toBe(true)
})

test("should return SundayNightFareCalculator if segment date is during the sunday and during the night", () => {
  const fareCalculator = FareCalculator.create(new Segment(
    { lat: 10, long: 20 },
    { lat: 10, long: 20 },
    new Date("2021-03-07T23:00:00")
  ))
  expect(fareCalculator.FARE).toBe(5)
  expect(fareCalculator instanceof SundayNightFareCalculator).toBe(true)
})