import "./UtilExpenseCard.css";
import MiscIcon from "../../assets/dices.png";
import FoodIcon from "../../assets/diet.png";
import TravelIcon from "../../assets/travelling.png";
import CopyIcon from "../../assets/copy.png";
import RepeatIcon from "../../assets/repeat.png";

import ShowIcon from "../../assets/show.png";
import OpenedIcon from "../../assets/open-show.png";
import RemoveExpenseIcon from "../../assets/remove.png";

type ExpenseCard = {
    ExpenseData : {
        amount: string
        category: string
    }
    selfIndex : Number
}


export default function UtilExpenseCard({ExpenseData, selfIndex} : ExpenseCard){

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


    return (<>
        <div className="UtilExpenseCard">
            <img className="category-icons-recent" src={setCategoryIcon(ExpenseData.category)}></img>
            {parseFloat(ExpenseData.amount) > 1000 ? <div>₹{Math.round((parseFloat(ExpenseData.amount) / 1000.0))}k</div> : <div>{ExpenseData.amount}</div> }
            <img className="category-icons" src={CopyIcon}></img>
            <img className="category-icons" src={RepeatIcon}></img>
        </div>
    </>);
}