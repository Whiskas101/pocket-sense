import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import "./BudgetComp.css";
import { toast } from "react-toastify";
import YAMERO from "../../assets/YAMERO.jpeg";

export default function BudgetComp() {
  const { user } = useUserContext();

  const [newBudget, setNewBudget] = useState(user.budget);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewBudget(event.target.value);
  }

  async function handleUpdate(event: React.MouseEvent) {
    event.preventDefault();

    if(parseInt(newBudget) <= 0) {
        toast.info(<img className="logo" src={YAMERO} ></img>)
        return;
    }

    const result = await axios.post(
      "http://localhost:8000/user/update/budget",
      {
        userid: user.id,
        budget: newBudget,
      }
    );

    if (result.data.affectedRows) {
      user.budget = newBudget;
      toast.success("Updated Budget.");
    }
  }

  return (
    <>
      <div>
        Current Budget
        <div>
          <input placeholder={`${user.budget}`} onChange={handleChange} type="number" min={0}></input>
        </div>
        <div>
          <button className="recent-expenses-btn" onClick={handleUpdate}>
            Update Budget
          </button>
        </div>
      </div>
    </>
  );
}
