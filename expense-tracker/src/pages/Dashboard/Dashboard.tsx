import "./Dashboard.css";
import Card from "../../components/Card/Card";
import Placeholder from "../../assets/placeholder.png";
import NewExpenseComp from "../../components/NewExpenseComp/NewExpenseComp";
import RecentExpensesComp from "../../components/RecentExpensesComp/RecentExpensesComp";
import SummaryComp from "../../components/SummaryComp/SummaryComp";
import DeleteComp from "../../components/DeleteComp/DeleteComp";


import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import BudgetComp from "../../components/BudgetComp/BudgetComp";


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
                  <img src={Placeholder}></img>
                  New Expense

                </div>
                <div onClick={()=>{setMode(2)}}>
                  <img src={Placeholder}></img>
                  Recent Expenses
                </div>
                <div onClick={()=>{setMode(3)}}>
                  <img src={Placeholder}></img>
                  My Summary
                </div>
                <div onClick={()=>{setMode(4)}}>
                  <img src={Placeholder}></img>
                  My Budget
                </div>
                <div onClick={()=>{setMode(5)}}>
                  <img src={Placeholder}></img>
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
