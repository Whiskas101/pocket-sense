import { useState } from "react";
import "./ExpenseCard.css";

//Icon imports
import MiscIcon from "../../assets/dices.png";
import FoodIcon from "../../assets/diet.png";
import TravelIcon from "../../assets/travelling.png";
import LeisureIcon from "../../assets/leisure.png";
import MedicalIcon from "../../assets/medical.png";
import EducationIcon from "../../assets/education.png";
import GiftsIcon from "../../assets/gift.png";
import DebtIcon from "../../assets/debt.png";
import TaxesIcon from "../../assets/taxes.png";

import ShowIcon from "../../assets/show.png";
import OpenedIcon from "../../assets/open-show.png";
import RemoveExpenseIcon from "../../assets/remove.png";
import axios from "axios";
import { toast } from "react-toastify";

type Expense = {
  category: string;
  amount: string;
  date: string;
  description: string;
  userid: string;
  expense_id: string;
};

type ExpenseData = {
  expenseData: Expense;
  expenseDataUpdater: Function;
  selfIndex: number;
};

export default function ExpenseCard({
  expenseData,
  expenseDataUpdater,
  selfIndex,
}: ExpenseData) {
  const [visible, setVisibility] = useState(false);

  function toggleVisibility() {
    setVisibility(!visible);
  }

  async function handleDelete() {
    console.log("fired an attempt to Delete an expense");
    const result = await axios.post(
      "http://localhost:8000/user/remove/expense",
      {
        expenseid: expenseData.expense_id,
      }
    );
    console.log(result);
    toast.success("Deleted Expense");

    expenseDataUpdater((prev: Expense[]) => prev.splice(selfIndex, 1));
  }

  function setCategoryIcon(category: string) {
    switch (category) {
      case "Food":
        return FoodIcon;

      case "Travel":
        return TravelIcon;
      case "Leisure": return LeisureIcon;
      case "Medical": return MedicalIcon; 
      case "Education": return EducationIcon; 
      case "Gifts": return GiftsIcon; 
      case "Debt": return DebtIcon; 
      case "Taxes": return TaxesIcon; 

      default:
        return MiscIcon;
    }
  }

  return (
    <div className={"Expense-Card"}>
      <div className="Expense-Card-Item">
        <img
          className="category-icons-recent"
          title={expenseData.category}
          src={setCategoryIcon(expenseData.category)}
        ></img>
        <div className="expense-card-amount">₹{expenseData.amount}</div>
        <div className="expense-card-date">{expenseData.date.slice(0, 10)}</div>
        <div className="expense-card-options">
          <button className="hidden-button-item" onClick={toggleVisibility}>
            {/* only show allow to switch on description if there is one! */}
            {expenseData.description ? (
              <img
                className="option-images"
                src={visible ? OpenedIcon : ShowIcon}
              ></img>
            ) : (
              <></>
            )}
          </button>
          <button className="hidden-button-item" onClick={handleDelete}>
            <img className="option-images" src={RemoveExpenseIcon}></img>
          </button>
        </div>
      </div>
      <div className="expense-card-description">{visible ? <div className="word-wrappable">{expenseData.description}</div> : <></>}</div>
    </div>
  );
}
