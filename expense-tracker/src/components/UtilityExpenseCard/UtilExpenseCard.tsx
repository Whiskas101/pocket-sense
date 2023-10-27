import "./UtilExpenseCard.css";
import MiscIcon from "../../assets/dices.png";
import FoodIcon from "../../assets/diet.png";
import TravelIcon from "../../assets/travelling.png";
import LeisureIcon from "../../assets/leisure.png";
import MedicalIcon from "../../assets/medical.png";
import EducationIcon from "../../assets/education.png";
import GiftsIcon from "../../assets/gift.png";
import DebtIcon from "../../assets/debt.png";
import TaxesIcon from "../../assets/taxes.png";

import CopyIcon from "../../assets/copy.png";
import RepeatIcon from "../../assets/repeat.png";
import { useUserContext } from "../../contexts/userContext";
import axios from "axios";
import { toast } from "react-toastify";

type ExpenseCard = {
  ExpenseData: {
    amount: string;
    category: string;
    description: string;
  };
  selfIndex: Number;
  updaters: {
    setSelected: Function;
    setDesc: Function;
    setAmt: Function;
    handleSelect: Function;
    sendExpense: () => Promise<void>;
  };
};

export default function UtilExpenseCard({
  ExpenseData,
  selfIndex,
  updaters,
}: ExpenseCard) {
  const { user } = useUserContext();
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

  const { setDesc, setAmt, setSelected, handleSelect, sendExpense } = updaters;
  function copyData() {
    setDesc(ExpenseData.description);
    setAmt(ExpenseData.amount);
    setSelected(ExpenseData.category);
  }

  async function repeatExpense() {
    const result = await axios.post("http://localhost:8000/user/add/expense", {
      userid: user.id,
      desc: ExpenseData.description,
      amount: ExpenseData.amount,
      category: ExpenseData.category,
    });

    setAmt("");
    setDesc("");
    toast.success("Repeated Expense");
    console.log(result);
  }

  return (
    <>
      <div className="UtilExpenseCard">
        <img
          className="custom-category-icon"
          src={setCategoryIcon(ExpenseData.category)}
        ></img>
        {parseFloat(ExpenseData.amount) > 1000 ? (
          <div className="util-expense-amount">₹{Math.round(parseFloat(ExpenseData.amount) / 1000.0)}k</div>
        ) : (
          <div className="util-expense-amount">₹{ExpenseData.amount}</div>
        )}
        <img className="custom-icon" src={CopyIcon} onClick={copyData}></img>
        <img
          className="custom-icon"
          src={RepeatIcon}
          onClick={repeatExpense}
        ></img>
      </div>
    </>
  );
}
