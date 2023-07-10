// @ts-nocheck
import express from "express";
import RideCalculator from "./RideCalculator";
import { connect } from "./db/connect";
import { CreateDriver } from "./use-cases/CreateDriver";
import RequestRide from "./use-cases/RequestRide";
import CreatePassenger from './use-cases/CreatePassenger'
import Ride from './Ride';

const app = express();
app.use(express.json());

app.post("/calculate_ride", function (req, res) {
	try {
		const ride = new RideCalculator();
		for (const segment of req.body.segments) {
			ride.addSegment(segment.distance, new Date(segment.date));
		}
		const price = ride.calculate();
		res.json({ price });
	} catch (e) {
		res.status(422).send(e.message);
	}
});

app.post("/drivers", async (req, res) => {
	try {
		const driverUseCase = new CreateDriver();
		const driver_id = await driverUseCase.execute(req.body);
		return res.status(201).json({ driver_id })
	} catch (e) {
		return res.status(400).json({ message: e.message })
	}
})

app.post('/passengers', async (req, res) => {
	try {
		const passenger = new CreatePassenger();
		const passenger_id = await passenger.execute(req.body)
		return res.status(201).json({ passenger_id })
	} catch (e) {
		return res.status(400).json({ message: e.message })
	}
})

app.post('/request_ride', async (req, res) => {
	try {
		const requestRide = new RequestRide();
		const ride_id = await requestRide.execute(req.body)
		return res.status(201).json({ ride_id })
	} catch (e) {
		return res.status(400).json({ message: e.message })
	}
})


app.listen(3000, async () => {
	console.log("Example app listening on port 3000!");

	await connect();
});
