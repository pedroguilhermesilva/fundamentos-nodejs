import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactions {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (prevIncome, currentTransaction) =>
        currentTransaction.type === 'income'
          ? prevIncome + currentTransaction.value
          : prevIncome,
      0,
    );
    const outcome = this.transactions.reduce(
      (prevOutcome, currentTransaction) =>
        currentTransaction.type === 'outcome'
          ? prevOutcome + currentTransaction.value
          : prevOutcome,
      0,
    );
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactions): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
