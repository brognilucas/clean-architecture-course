import axios from "axios";
import { VALID_MOCK_DOCUMENT } from "./Document.test";

axios.defaults.validateStatus = function () {
	return true;
};
test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
	const input = {
		segments: [
			{ distance: 10, date: "2021-03-01T10:00:00" }
		]
	};
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	const output = response.data;
	expect(output.price).toBe(21);
});

test("Se a distância for inválida deve lançar um erro", async function () {
	const input = {
		segments: [
			{ distance: -10, date: "2021-03-01T10:00:00" }
		]
	};
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("Invalid distance");
});

test("should create a driver", async () => {
	const input = {
		name: "John Doe",
		email: "john@doe.com",
		document: VALID_MOCK_DOCUMENT,
		carPlate: "ABC1234"
	};
	const output = await axios.post("http://localhost:3000/drivers", input);
	expect(output.status).toBe(201);
	expect(output.data).toHaveProperty('driver_id')
})

test('should return 400 when creating a driver with invalid document', async () => {
	const input = {
		name: "John Doe",
		email: "john@doe.com",
		document: "jdsahijdjhsa",
		carPlate: "ABC1234"
	};
	const output = await axios.post("http://localhost:3000/drivers", input);
	expect(output.status).toBe(400);
})

test('should be able to create a passenger', async () => {
	const input = {
		name: "John Doe",
		email: "john@doe.com",
		document: VALID_MOCK_DOCUMENT,
	};
	const output = await axios.post("http://localhost:3000/passengers", input);
	expect(output.status).toBe(201);
	expect(output.data).toHaveProperty('passenger_id')
})

test('should return 400 when creating a passenger with invalid document', async () => {
	const input = {
		name: "John Doe",
		email: "john@doe.com", 
		document: "23449232433",
	};
	const output = await axios.post("http://localhost:3000/passengers", input);
	expect(output.status).toBe(400);
})

test("should be able to request a ride", async () => { 

	const {data: { 
		passenger_id
	}} = await axios.post("http://localhost:3000/passengers", {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: VALID_MOCK_DOCUMENT
	})
	
	const input = {
		from: { 
			lat: 123,
			long: 123
		},
		to: { 
			lat: 123,
			long: 123
		},
		passenger_id
	}


	const output = await axios.post("http://localhost:3000/request_ride", input);
	expect(output.status).toBe(201);
	expect(output.data).toHaveProperty('ride_id')
})

test("should throw if passenger id is invalid", async () => {
	const input = {
		from: { 
			lat: 123,
			long: 123
		},
		to: { 
			lat: 123,
			long: 123
		},
		passengerId: "123"
	}

	const output = await axios.post("http://localhost:3000/request_ride", input);
	expect(output.status).toBe(400);
	expect(output.data.message).toBe("Invalid passenger id")
})