import { useState, useEffect } from "react";
import "./NewExpenseComp.css";
import axios from "axios";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//Icon Imports
import MiscIcon from "../../assets/dices.png";
import FoodIcon from "../../assets/diet.png";
import TravelIcon from "../../assets/travelling.png";

//Utility bar imports
import UtilExpenseCard from "../UtilityExpenseCard/UtilExpenseCard";

export default function NewExpenseComp() {
  const [visible, setVisibility] = useState(false);
  const navigator = useNavigate();
  const categories = [
    "Misc",
    "Food",
    "Travel",
    "Misc",
    "Food",
    "Travel",
    "Misc",
    "Food",
    "Travel",
    "Misc",
    "Food",
    "Travel",
  ];
  const category_icons = [
    MiscIcon,
    FoodIcon,
    TravelIcon,
    MiscIcon,
    FoodIcon,
    TravelIcon,
  ];
  const { user } = useUserContext();

  //Data variables used in axios.post are here
  //Category
  const [selected, setSelected] = useState<string | null>(categories[0]);
  //Description
  const [desc, setDesc] = useState("");
  //Amount
  const [amt, setAmt] = useState("");

  const deselected_class = "category-item";
  const selected_class = "category-item-selected";

  const [range, setRange] = useState(7);
  const [expenseArr, setExpenseArr] = useState<expense[]>([]);

  type expense = {
    amount: string;
    category: string;
    date: string;
    description: string;
    expense_id: string;
    userid: string;
  };

  function handleAmount(event: React.ChangeEvent<HTMLInputElement>) {
    setAmt(event.target.value);
    console.log(amt);
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDesc(event.target.value);
    console.log(desc);
  }

  //used to show description box
  function toggleVisibility() {
    setVisibility(!visible);
  }

  //managing which category is selected
  function handleSelect(category: string) {
    console.log(selected);
    if (selected === category) {
      setSelected(null);
    } else {
      setSelected(category);
    }
  }

  async function sendExpense() {
    //if user doesnt exist, we send you back to the login page
    console.log(user);
    if (user.id === "-1") {
      toast("Login before doing anything 💀");
      navigator("/login");
      return;
    }

    if (amt === "0" || amt === "" || parseFloat(amt) <= 0) {
      toast.warn("Please enter a valid amount! 💀");
      return;
    }

    if (selected === null) {
      toast.warn("No category selected");
      return;
    }

    const result = await axios.post("http://localhost:8000/user/add/expense", {
      userid: user.id,
      desc: desc,
      amount: amt,
      category: selected,
    });

    setAmt("");
    setDesc("");
    toast.success("Success");
    console.log(result);
  }

  useEffect(() => {
    async function fetchExpenses() {
      const result = await axios.post(
        "http://localhost:8000/user/fetch/common/expenses",
        {
          userid: user.id,
          range: 7,
        }
      );
      console.log(result);

      //we check the returned data array's first element to see whether a property of category exists on it
      if (result.data[0].category) {
        setExpenseArr(result.data);
      }
    }

    fetchExpenses();
  }, [range]);

  const updaters = {
    setSelected,
    setDesc,
    setAmt,
    handleSelect,
    sendExpense,
  };

  return (
    <>
      <div className="new-expense-wrapper">
        <div className="add-expense">
          <div className="expense-category">
            Categories
            <div className="category-items">
              {categories.map((category, index) => (
                <div>
                  <button
                    key={category}
                    className={
                      selected != category ? deselected_class : selected_class
                    }
                    onClick={() => {
                      handleSelect(category);
                    }}
                  >
                    {category}
                    <img
                      className="category-icons"
                      src={category_icons[index]}
                    ></img>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            Amount
            <div>
              <input
                className="add-expense-input"
                placeholder="₹00000.00"
                onChange={handleAmount}
                value={amt}
                type="number"
                min={"0"}
              ></input>
            </div>
          </div>
          <div>
            Description
            <div>
              {desc || visible ? (
                <textarea
                  className="add-expense-desc"
                  onChange={handleChange}
                  value={desc}
                  spellCheck="false"
                ></textarea>
              ) : (
                <button className="add-new-desc" onClick={toggleVisibility}>
                  +
                </button>
              )}
            </div>
          </div>
          <div>
            <div>
              <button className="add-expense-button" onClick={sendExpense}>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="utility-side">
          {expenseArr.length > 0 ? (
            <div className="utility-expense-list">
              {expenseArr.length > 0 &&
                expenseArr.map((expense, index) => (
                  <UtilExpenseCard
                    ExpenseData={expense}
                    selfIndex={index}
                    updaters={updaters}
                  />
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
