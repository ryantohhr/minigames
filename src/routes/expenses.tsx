import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/expenses")({
  component: RouteComponent,
});

type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
};

type TransactionType = "revenue" | "expense";

function RouteComponent() {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TransactionType>("revenue");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const total = transactions.reduce((sum, transaction) => {
    if (transaction.type === "revenue") return sum + transaction.amount;
    else return sum - transaction.amount;
  }, 0);

  function handleAdd() {
    const newTransaction = {
      id: crypto.randomUUID(),
      amount: amount,
      type: type,
    };
    setTransactions(() => {
      const copyTransactions = [...transactions];
      copyTransactions.push(newTransaction);
      return copyTransactions;
    });
    setAmount(0);
  }

  function handleRemove(transactionId: string) {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== transactionId),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="w-screen flex justify-center pt-10 gap-3">
        <input
          value={amount === 0 ? "" : amount}
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="rounded-sm px-3"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="rounded-sm"
        >
          <option value="revenue">Revenue</option>
          <option value="expense">Expense</option>
        </select>
        <button
          onClick={handleAdd}
          className="rounded-sm bg-gray-300 text-black px-5 py-2"
        >
          Add
        </button>
      </div>
      <div className="w-screen flex flex-col gap-5 items-center">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex gap-5 items-center justify-between w-1/5"
          >
            <p
              className={`${transaction.type === "revenue" ? "text-green-500" : "text-red-500"}`}
            >
              {`${transaction.type === "revenue" ? "+" : "-"} $${transaction.amount}`}
            </p>
            <button
              onClick={() => handleRemove(transaction.id)}
              className="bg-red-500 rounded-sm text-black px-5 py-1"
            >
              Remove
            </button>
          </div>
        ))}
        <h1 className="font-semibold">${total} profit</h1>
      </div>
    </div>
  );
}
