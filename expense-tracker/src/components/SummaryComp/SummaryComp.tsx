import axios from "axios";
import "./SummaryComp.css";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import BarChart from "react-chartjs-2";
import { useUserContext } from "../../contexts/userContext";
import { readUsedSize } from "chart.js/helpers";

interface ExpenseObject {
  amount: string;
  date: string;
}

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function SummaryComp() {
  const { user } = useUserContext();
  const [expenseData, setExpenseData] = useState<ExpenseObject[] | null>([]);
  const [remainingBudgetArr, setBudgetArr] = useState<number[] | void[]>();

  //helper function to find how many days there are within a given month
  function mapDays() {
    //to implement
  }

  // We find all the expenses made upto today, starting from the first of the given month
  useEffect(() => {
    async function fetchExpensesUptoToday() {
      let currentDate = Date().substring(8, 10);
      //Converting to relevant format
      // If we know today's date is 10, wew know we only have to go back 10 days to get expenses for current month
      const range = parseInt(currentDate);

      const result = await axios.post(
        "http://localhost:8000/home/expenses/by/days",
        {
          range: range,
          userid: user.id,
        }
      );

      if (result.data[0].date) {
        setExpenseData(result.data);
        console.log(expenseData);


        

      }

      console.log(currentDate);
    }

    
    

    fetchExpensesUptoToday();
  }, []);

  const Data = {
    labels: expenseData?.map((expense) => expense.date.slice(0, 10)),
    datasets: [
      {
        label: "Expense",
        data: expenseData?.map((expense) => expense.amount),
        backgroundColor: "transparent",
        borderColor: "#FF0000",
        pointBorderColor: "black",
        pointBorderWidth: 2,
        tension: 0.4,
      },

      
      

      
    ],
  };

  const Options = {
    // plugins: {
    //   // legend: false,
    // },

    scales: {
      x: {
        
        grid: { display: false },
      },
      y:{
        min:0,
        
        
        grid:{borderDash : [10]}
      }
    },
  };
  return (
    <div className="chart-container">
      <Line data={Data} options={Options} />
    </div>
  );
}
