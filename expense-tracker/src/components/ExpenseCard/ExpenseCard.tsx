import { useState } from "react";
import "./ExpenseCard.css";

type Expense = {
  category: String;
  amount: string;
  date: string;
  desc: string;
  userid: string;
  expense_id: string;
};

type ExpenseData = {
  expenseData: Expense;
};

export default function ExpenseCard({ expenseData }: ExpenseData) {
  const [visible, setVisibility] = useState(false);

  function toggleVisibility() {
    setVisibility(!visible);
  }

  function handleDelete() {
    console.log("fired an attempt to Delete an expense");
  }

  return (
    <div className="Expense-Card">
      <div className="Expense-Card-Item">
        <div>{expenseData.category}</div>
        <div>₹{expenseData.amount}</div>
        <div>{expenseData.date.slice(0, 10)}</div>
        <div>
          <button className="show-desc" onClick={toggleVisibility}>
            {" "}
            O{" "}
          </button>
          <button className="delete-expense-card" onClick={handleDelete}>
            {" "}
            X
          </button>
        </div>
      </div>
      <div>{visible ? <div>{expenseData.desc}</div> : <></>}</div>
    </div>
  );
}
