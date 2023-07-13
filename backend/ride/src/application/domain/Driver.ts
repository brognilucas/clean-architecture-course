import Document from "./Document"
import crypto from 'crypto'
export default class Driver {
  constructor(
    readonly id: string,
    readonly document: string,
    readonly name: string,
    readonly email: string,
    readonly carPlate: string,
  ) {
    if (!Document.validate(this.document)) {
      throw new Error("Invalid document");
    }
  }
  
  static create(
    document: string,
    name: string,
    email: string,
    carPlate: string,
  ): Driver {

    const id = crypto.randomUUID();
    return new Driver(id, document, name, email, carPlate);
  }
}

export interface DriverOutput {
  id: string,
  name: string,
  email: string,
  document: string,
  carPlate: string,
  createdAt: Date,
  updatedAt: Date,
}