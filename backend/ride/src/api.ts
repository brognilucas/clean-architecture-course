// @ts-nocheck
import express from "express";
import { connect } from "./infra/db/connect";
import { CreateDriver } from "./application/use-cases/CreateDriver";
import RequestRide from "./application/use-cases/RequestRide";
import CreatePassenger from './application/use-cases/CreatePassenger'
import { AcceptRide } from "./application/use-cases/AcceptRide";
import GetRide from './application/use-cases/GetRide'
import CalculateRide from "./application/use-cases/CalculateRide";

const app = express();
app.use(express.json());

app.post("/calculate_ride", function (req, res) {
	try {
		const useCase = new CalculateRide()
		const output = useCase.execute(req.body)
		res.json(output);
	} catch (e) {
		res.status(422).send(e.message);
	}
});

app.post("/drivers", async (req, res) => {
	try {
		const driverUseCase = new CreateDriver();
		const output = await driverUseCase.execute(req.body);
		return res.status(201).json(output)
	} catch (e) {
		return res.status(400).json({ message: e.message })
	}
})

app.post('/passengers', async (req, res) => {
	try {
		const passenger = new CreatePassenger();
		const output = await passenger.execute(req.body)
		return res.status(201).json(output)
	} catch (e) {
		return res.status(400).json({ message: e.message })
	}
})

app.post('/request_ride', async (req, res) => {
	try {
		const requestRide = new RequestRide();
		const output = await requestRide.execute(req.body)
		return res.status(201).json(output)
	} catch (e) {
		return res.status(400).json({ message: e.message })
	}
})

app.post('/accept_ride/:rideId', async (req, res) => {
	try { 
		const acceptRide = new AcceptRide();
		const ride = await acceptRide.execute({
			rideId: req.params.rideId,
			driverId: req.body.driverId
		})
		return res.status(201).json(ride)
	} catch (e) { 
		return res.status(400).json({ message: e.message })
	}
})

app.get('/rides/:rideId', async (req, res) => {
	try {
		const getRides = new GetRide();
		const ride = await getRides.execute(req.params.rideId)
		return res.status(200).json(ride)
	} catch (e) {
		return res.status(400).json({ message: e.message })
	}
})

app.listen(3000, async () => {
	console.log("Example app listening on port 3000!");

	await connect();
});
