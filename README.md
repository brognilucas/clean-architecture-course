### Introduction

This project was developed as part of the Clean Archictecture coursed mentored by [Rodrigo Branas](https://github.com/rodrigobranas). 

The idea of the project was creating a small microservice architecture for a Uber-like application, where the operations that can be realized are: 
* Create a passenger
* Create a driver
* Request a ride
* Calculate the price of a ride
* Accept a ride
* Start a ride
* Add a segment to a ride
* Complete a ride
* Process the payment and create a transaction


While the project allows it, the main goal of the course and the project though, was to go through many scenarios, and decide what design pattern to use, implement as many principles as possible, and in the end achieve the goal using TDD, and keep a clean code, following Clean Architecture. 

It had yet, a small frontend (that has no UI design at all), where the idea behind was to demonstrate and practice the use of DI and TDD not only on the backend. 

### Running the project

The database and RabbitMQ are centralized on the docker-compose on the backend folder, so you have to spin it as the first step. 
> cd backend && docker-compose up 

After that, each microservice would have it's on test coverage as well as run independently, so it can be ran by: 

> cd ride && yarn start

> cd payments && yarn start

> cd account && yarn start

For tests 

> cd ride && yarn start 

### Tests 

The tests have it's coverage based on Unit and  Narrow integration tests. 

For creation of narrow tests, the use of Fakes were applied, those had the paper of emulating an actual implementation of a database, but rather saving in memory the data that could eventually be consumed later.
