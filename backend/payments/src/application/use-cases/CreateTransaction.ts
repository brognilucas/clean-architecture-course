import Transaction from "../../domain/Transaction";
import Queue from "../../infra/queue/Queue";
import { QueueTopics } from "../../infra/topics/QueueTopics";
import RepositoryFactory from "../factory/RepositoryFactory";
import TransactionRepository from "../repository/TransactionRepository";

export default class CreateTransaction {
  transactionRepository: TransactionRepository;
  constructor(repositoryFactory: RepositoryFactory, private queue: Queue) {
    this.transactionRepository = repositoryFactory.createTransactionRepository();
  }

  async execute(input: Input): Promise<Output> {
    const transaction = Transaction.create(input.amount, input.rideId, input.date);
    await this.transactionRepository.save(transaction);
    await this.queue.produce(QueueTopics.TRANSACTION_CREATED, { 
      transactionId: transaction.id,
      amount: input.amount
    })
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