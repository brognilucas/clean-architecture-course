import CreateTransaction from "../../application/use-cases/CreateTransaction";
import GetTransaction from "../../application/use-cases/GetTransaction";
import HttpServer from "../http/HttpServer";

export default class TransactionController { 
  constructor(
    httpServer: HttpServer,
    createTransaction: CreateTransaction,
    getTransaction: GetTransaction
  ){
    
    httpServer.on("get", "/transactions/:transactionId", async (params: any) => {
      const output = await getTransaction.execute(params)
      return output;
    })
    
    httpServer.on("post", "/transactions", async (_: any, body: any) => {
      const output = await createTransaction.execute(body)

      return output;
    })
  }
}