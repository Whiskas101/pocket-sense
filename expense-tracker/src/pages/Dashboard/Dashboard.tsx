import "./Dashboard.css";
import Card from "../../components/Card/Card";

import NewExpenseComp from "../../components/NewExpenseComp/NewExpenseComp";
import RecentExpensesComp from "../../components/RecentExpensesComp/RecentExpensesComp";
import SummaryComp from "../../components/SummaryComp/SummaryComp";
import DeleteComp from "../../components/DeleteComp/DeleteComp";


import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import BudgetComp from "../../components/BudgetComp/BudgetComp";

//Icon Imports
// import Placeholder from "../../assets/placeholder.png";
import MoneyIcon from "../../assets/money.png";
import RecentExpensesIcon from "../../assets/time.png";
import SummaryIcon from "../../assets/profits.png";
import BudgetIcon from "../../assets/wallet.png";
import DeleteIcon from "../../assets/delete.png"

export default function Dashboard() {

  const {user} = useUserContext();

  function modeSelector(data : number) {
      switch(data){
        case 1: return <NewExpenseComp/>;
        case 2: return <RecentExpensesComp/>;
        case 3: return <SummaryComp/>
        case 4: return <BudgetComp/>
        case 5: return <DeleteComp/>
        
        default: return <>Something went wrong</>;
      }
  }

  const [mode, setMode] = useState(1);

  return (
    <>
      <div className="dashboard-main">
        <div className="dashboard-side">
          <Card>
            <div className="side-main">
              <div className="welcome-message"> {user.username} </div>
              <div className="modes-area">
                <div onClick={()=>{setMode(1)}}>
                  <img src={MoneyIcon}></img>
                  New Expense

                </div>
                <div onClick={()=>{setMode(2)}}>
                  <img src={RecentExpensesIcon}></img>
                  Recent Expenses
                </div>
                <div onClick={()=>{setMode(3)}}>
                  <img src={SummaryIcon}></img>
                  My Summary
                </div>
                <div onClick={()=>{setMode(4)}}>
                  <img src={BudgetIcon}></img>
                  My Budget
                </div>
                <div onClick={()=>{setMode(5)}}>
                  <img src={DeleteIcon}></img>
                  Delete Account
                </div>
              </div>
            </div>
          </Card>
        </div>


        <div className="dashboard-area">


          <Card>
            {modeSelector(mode)}
            <div></div>
          </Card>
        </div>
      </div>
      
    </>
  );
}
