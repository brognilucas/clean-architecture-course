import crypto from 'crypto';
import Document from "../document/Document";

export default class Passenger { 
  constructor(
    readonly id: string,
    readonly document: string,
    readonly name: string,
    readonly email: string,
  ) {
    if (!Document.validate(this.document)) {
      throw new Error("Invalid document");
    }
  }
  
  static create(
    document: string,
    name: string,
    email: string,
  ){
    const id = crypto.randomUUID();
    return new Passenger(id, document, name, email);
  }
}