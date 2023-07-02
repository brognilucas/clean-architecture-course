// @ts-nocheck
import express from "express";
import Ride from "./Ride";
import { Driver } from './Driver';
import { connect } from "./db/connect";
const app = express();
app.use(express.json());

app.post("/calculate_ride", function (req, res) {
	try {
		const ride = new Ride();
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
		const driver = new Driver();
		const driver_id = await driver.createDriver(req.body)
		return res.status(201).json({ driver_id })
	} catch (e) {
		return res.status(400).json({ message: e.message })
	}
})

app.listen(3000, async () => {
	console.log("Example app listening on port 3000!");

	await connect();
});
