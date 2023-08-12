import Transaction from "../../src/domain/Transaction";

test("should create a transaction through a static factory method " , () => { 
  const amount = 10; 
  const rideId = "random-ride-id";
  const date = new Date();
  const transaction = Transaction.create(
    amount, 
    rideId, 
    date,
  )
  expect(transaction.id).toBeDefined();
})

test("should fail if try to create a transaction with amount 0" , () => {
  const amount = 0; 
  const rideId = "random-ride-id";
  const date = new Date();
  expect(() => Transaction.create(
    amount, 
    rideId, 
    date,
  )).toThrow("Amount must be positive")
})
test("should fail if try to create a transaction with a negative amount" , () => {
  const amount = -1; 
  const rideId = "random-ride-id";
  const date = new Date();
  expect(() => Transaction.create(
    amount, 
    rideId, 
    date,
  )).toThrow("Amount must be positive")
})