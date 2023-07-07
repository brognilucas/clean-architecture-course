import Document from "./Document";

export class Passenger { 
  constructor(
    readonly document: string,
    readonly name: string,
    readonly email: string,
  ) {
    if (!Document.validate(this.document)) {
      throw new Error("Invalid document");
    }
  }
}

export interface PassengerInput {
  name: string;
  email: string;
  document: string;
}

export interface PassengerOutput {
  id: string;
  name: string;
  email: string;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}