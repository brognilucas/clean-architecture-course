import axios from 'axios'; 

test("should create and get a transaction " , async () => {
  const input = {
    "rideId": "9538f1f6-53e3-49b8-bd96-4ee58763b873",
    "date": "2023-08-12T18:08:00.000Z",
    "amount": 9.57
  }; 

  const { data } = await axios.post("http://localhost:3002/transactions", input);
  expect(data.transactionId).toBeDefined(); 

  const {
    data: getBody
  } = await axios.get(`http://localhost:3002/transactions/${data.transactionId}`)


  expect(getBody.transactionId).toEqual(data.transactionId);
  expect(getBody.rideId).toEqual(input.rideId)
  expect(getBody.date).toEqual(input.date)
  expect(getBody.amount).toEqual(input.amount);
})