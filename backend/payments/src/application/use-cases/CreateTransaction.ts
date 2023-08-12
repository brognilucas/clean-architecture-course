import Transaction from "../../domain/Transaction";
import RepositoryFactory from "../factory/RepositoryFactory";
import TransactionRepository from "../repository/TransactionRepository";

export default class CreateTransaction { 
  transactionRepository: TransactionRepository;
  constructor(repositoryFactory: RepositoryFactory) {
    this.transactionRepository = repositoryFactory.createTransactionRepository();
  }

  async execute(input: Input): Promise<Output> { 
    const transaction = Transaction.create(input.amount, input.rideId, input.date); 
    await this.transactionRepository.save(transaction);
    return { 
      transactionId: transaction.id
    }
  }
}

type Input = { 
  rideId: string, 
  amount: number,
  date: Date
}

type Output = {
  transactionId: string
}