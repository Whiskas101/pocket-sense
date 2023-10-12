import "./UtilExpenseCard.css";
import MiscIcon from "../../assets/dices.png";
import FoodIcon from "../../assets/diet.png";
import TravelIcon from "../../assets/travelling.png";
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
          className="category-icons-recent"
          src={setCategoryIcon(ExpenseData.category)}
        ></img>
        {parseFloat(ExpenseData.amount) > 1000 ? (
          <div>₹{Math.round(parseFloat(ExpenseData.amount) / 1000.0)}k</div>
        ) : (
          <div>₹{ExpenseData.amount}</div>
        )}
        <img className="category-icons" src={CopyIcon} onClick={copyData}></img>
        <img
          className="category-icons"
          src={RepeatIcon}
          onClick={repeatExpense}
        ></img>
      </div>
    </>
  );
}
