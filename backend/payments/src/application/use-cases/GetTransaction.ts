import RepositoryFactory from "../factory/RepositoryFactory";
import TransactionRepository from "../repository/TransactionRepository"

export default class GetTransaction {
  private transactionRepository: TransactionRepository;
  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.transactionRepository = repositoryFactory.createTransactionRepository();
  }

  async execute(input: Input): Promise<Output> {
    const transaction = await this.transactionRepository.getById(input.transactionId);
    if (!transaction){ 
      throw new Error("Transaction not found")
    }
    return {
      transactionId: transaction.id,
      amount: transaction.amount,
      date: transaction.date,
      rideId: transaction.rideId
    }
  }
}


type Input = {
  transactionId: string
}

type Output = {
  transactionId: string,
  amount: number,
  date: Date,
  rideId: string
}