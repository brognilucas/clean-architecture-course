import Document from "./Document"
import {DriverRepository, IDriverRepository} from "./repositories/DriverRepository"

export class Driver {
  constructor(
    public document: string,
    public name: string,
    public email: string,
    public carPlate: string,
  ) {
    if (!Document.validate(this.document)) {
      throw new Error("Invalid document");
    }
  }
}

export interface DriverInput { 
  name: string,
  email: string,
  document: string, 
  carPlate: string,
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