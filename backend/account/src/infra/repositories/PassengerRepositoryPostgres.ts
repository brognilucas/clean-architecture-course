import PassengerRepository from "../../application/repository/PassengerRepository";
import Passenger from "../../domain/passenger/Passenger";
import DatabaseConnection from "../db/DatabaseConnect";

export default class PassengerRepositoryPostgres implements PassengerRepository { 
  constructor(private connection: DatabaseConnection){}
  
  async createPassenger(passenger: Passenger): Promise<void> {
    await this.connection.query('INSERT INTO passengers (id, document, name, email) VALUES (${id}, ${document}, ${name}, ${email})', passenger);
  }

  async getPassengerById(passengerId: string): Promise<Passenger> {
    const [passengerData] = await this.connection.query("SELECT * FROM passengers where id = $1", [passengerId])
    if (!passengerData){
      throw new Error("Invalid Passenger id");
    }
    return new Passenger(passengerData.id, passengerData.document, passengerData.name, passengerData.email);
  }
  
}