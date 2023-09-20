import { useState } from "react";
import "./NewExpenseComp.css";
import axios from "axios";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


//Icon Imports
import MiscIcon from "../../assets/dices.png";
import FoodIcon from "../../assets/diet.png";
import TravelIcon from "../../assets/travelling.png";

export default function NewExpenseComp() {
  const [visible, setVisibility] = useState(false);
  const navigator = useNavigate();
  const categories = ["Misc", "Food", "Travel"];
  const category_icons = [MiscIcon, FoodIcon, TravelIcon];
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
      toast("Login before doing anything 💀")
      navigator("/login");
      return;
    }

    if(amt==="0" || amt==="" || parseFloat(amt) <= 0){
      toast.warn("Please enter a valid amount! 💀");
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
    toast.success("Success")
    console.log(result);
  }

  return (
    <>
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
                <img className="category-icons" src={category_icons[index]}></img>
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
            ></input>
          </div>
        </div>
        <div>
          Description
          <div>
            {visible ? (
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
    </>
  );
}
