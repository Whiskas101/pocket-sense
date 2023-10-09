import "./UtilExpenseCard.css";
import MiscIcon from "../../assets/dices.png";
import FoodIcon from "../../assets/diet.png";
import TravelIcon from "../../assets/travelling.png";
import CopyIcon from "../../assets/copy.png";
import RepeatIcon from "../../assets/repeat.png";


type ExpenseCard = {
    ExpenseData : {
        amount: string
        category: string
        description: string
    }
    selfIndex : Number
    updaters : {
      setSelected : Function,
      setDesc : Function,
      setAmt : Function,
      handleSelect : Function
    }
}


export default function UtilExpenseCard({ExpenseData, selfIndex, updaters} : ExpenseCard){

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
    
      const {setDesc, setAmt, setSelected, handleSelect} = updaters;
    function copyData(){
      setDesc(ExpenseData.description)
      setAmt(ExpenseData.amount)
      setSelected(ExpenseData.category);

    }

    return (<>
        <div className="UtilExpenseCard">
            <img className="category-icons-recent" src={setCategoryIcon(ExpenseData.category)}></img>
            {parseFloat(ExpenseData.amount) > 1000 ? <div>₹{Math.round((parseFloat(ExpenseData.amount) / 1000.0))}k</div> : <div>₹{ExpenseData.amount}</div> }
            <img className="category-icons" src={CopyIcon} onClick={copyData}></img>
            <img className="category-icons" src={RepeatIcon}></img>
        </div>
    </>);
}