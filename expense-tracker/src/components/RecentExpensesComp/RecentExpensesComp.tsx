import ExpenseCard from "../ExpenseCard/ExpenseCard";
import "./RecentExpensesComp.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/userContext";

export default function RecentExpensesComp() {
    
    const [range, setRange] = useState(7);
    const {user} = useUserContext();

    //change any here 
    const [expenseArr, setExpenseArr] = useState<expense[]>([]);

    type expense = {
        amount: string
        category: string
        date: string
        desc: string
        expense_id: string
        userid: string
    }

    
    // we are defining and calling the function within a react useEffect hook that updates based on input range.
    useEffect(()=>{
        async function fetchExpenses(range : number){
            const result = await axios.post("http://localhost:8000/home/expenses/recent", {
                userid: user.id,
                range: range
            });
            console.log(result);

            //we check the returned data array's first element to see whether a property of expense_id exists on it
            if(result.data[0].expense_id){
                setExpenseArr(result.data);
            }
        }

        fetchExpenses(range)
    }, [range, expenseArr.length]);

  return (
    <>
      <div className="recent-expenses">
        Recent Expenses
        <div className="expense-list">
          {expenseArr.length > 0 ? expenseArr.map((expense, index)=>(
            <ExpenseCard key={expense.expense_id} expenseData={expense} expenseDataUpdater={setExpenseArr} selfIndex={index}/>
          )) : <>No Expenses yet</>}
        </div>
        <div className="recent-expenses-options">
          <button className="recent-expenses-btn" onClick={()=>{setRange(7)}}>7 Days </button>
          <button className="recent-expenses-btn" onClick={()=>{setRange(30)}}>30 Days </button>
          <button className="recent-expenses-btn" onClick={()=>{setRange(90)}}>3 Months </button>
        </div>
      </div>
    </>
  );
}
