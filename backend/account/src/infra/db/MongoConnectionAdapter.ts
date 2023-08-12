import mongoose, { Mongoose } from "mongoose"
export default class MongoConnection {
  constructor(
    private readonly connectionString: string = "mongodb://localhost:27017/account",
  ) { }

  async connect(): Promise<Mongoose> {
    const db = await mongoose.connect(this.connectionString)

    db.connection.on('error', (err) => {
      console.log(`[db]: Error ${err}`)
    })

    db.connection.on('disconnected', () => {
      console.log(`[db]: Disconnected`)
    })

    db.connection.on('connected', () => {
      console.log(`[db]: Connected`)
    })

    return db;
  }
}