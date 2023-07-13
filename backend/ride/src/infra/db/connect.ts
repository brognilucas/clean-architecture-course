import mongoose from "mongoose";
// import { UserModel } from "../user/user.schema";

export const connect = async () => {
  const uri = "mongodb://localhost:27017/ride";
  
  const db = await mongoose.connect(uri) 
  
  db.connection.on('error', (err) => {
    console.log(`[db]: Error ${err}`)
  })

  db.connection.on('disconnected', () => {
    console.log(`[db]: Disconnected`)
  })

  db.connection.on('connected', () => {
    console.log(`[db]: Connected`)
  })
 
}