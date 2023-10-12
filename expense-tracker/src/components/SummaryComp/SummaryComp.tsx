import axios from "axios";
import exportFromJSON from "export-from-json";
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
  ArcElement,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import BarChart from "react-chartjs-2";
import { useUserContext } from "../../contexts/userContext";
import { readUsedSize } from "chart.js/helpers";

interface ExpenseObject {
  amount: string;
  date: string;
}

interface CategorizedExpenseObject {
  amount: string;
  category: string;
}

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

export default function SummaryComp() {
  const { user } = useUserContext();
  const [expenseData, setExpenseData] = useState<ExpenseObject[] | null>([]);
  const [categoryData, setCategoryData] = useState<
    CategorizedExpenseObject[] | null
  >();

  const [amountSpent, setAmtSpent] = useState("0");

  const [data, setData] = useState([{}]);

  // We find all the expenses made upto today, starting from the first of the given month
  useEffect(() => {
    //Data for Line chart is fetched via this function
    async function fetchExpensesUptoToday() {
      let currentDate = Date().substring(8, 10);
      //Converting to relevant format
      // If we know today's date is 10, we know we only have to go back 10 days to get expenses for current month
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
        setData(result.data);
        // console.log(expenseData);
      }

      console.log(currentDate);
    }

    //For Doughnut
    async function fetchDoughnutData() {
      let currentDate = Date().substring(8, 10);
      const range = parseInt(currentDate);
      const result = await axios.post(
        "http://localhost:8000/home/expenses/sum/by/category",
        {
          range: range,
          userid: user.id,
        }
      );

      if (result.data[0].amount) {
        setCategoryData(result.data);
      }
      console.log(result);
    }

    //For Getting remaining amount
    async function fetchTotalExpenses() {
      let currentDate = Date().substring(8, 10);
      const range = parseInt(currentDate);

      const result = await axios.post(
        "http://localhost:8000/home/expenses/sum/by/range",
        {
          range: range,
          userid: user.id,
        }
      );

      console.log(result);
      if (result.data[0].amount) {
        setAmtSpent(result.data[0].amount);
      }
    }

    fetchExpensesUptoToday();
    fetchDoughnutData();
    fetchTotalExpenses();
  }, []);

  const Data = {
    labels: expenseData?.map((expense) => expense.date.slice(0, 10)),
    datasets: [
      {
        label: "Expense",
        data: expenseData?.map((expense) => expense.amount),
        fill: true,
        backgroundColor: "rgba(205, 245, 193, 0.4)",
        borderColor: "#436c3f",
        pointBorderColor: "black",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const Options = {
    plugins: {
      legend: false,
    },

    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        min: 0,

        grid: { borderDash: [10] },
      },
    },
  };

  const DoughnutData = {
    labels: categoryData?.map((expense) => expense.category),
    datasets: [
      {
        label: "Expense",
        data: categoryData?.map((expense) => expense.amount),
        backgroundColor: [
          "rgba(67,	108,	63, 0.8)",
          "rgba(85,	122,	82, 0.6)",
          "rgba(177,	238,	159, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  };

  async function handleExport(e: React.MouseEvent){
    e.preventDefault();
    const curDate = Date().toString().slice(0, 15)
   
    try{
      const filename = `Report ${curDate}`;
      const exporttype = exportFromJSON.types.csv;
      console.log(data)
      exportFromJSON({
        data,
        fileName: filename,
        exportType: exporttype
      });

    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      {categoryData  && parseFloat(user.budget) > 0.0 ? (
        <div className="summary-area">
          <div className="chart-container">
            <div className="expense-chart">
              <Line data={Data} />
            </div>
            <div>
              <div>
                <Doughnut data={DoughnutData} />
              </div>
            </div>
          </div>
          <div>
            {   (parseFloat(amountSpent) > parseFloat(user.budget)) ? (
              <div>
                You have overspent by{" "}
                {Math.floor(
                  ((parseFloat(amountSpent) - parseFloat(user.budget)) /
                    parseFloat(user.budget)) *
                    100
                )}
                %
              </div>
            ) : (
              <div>
                You have spent{" "}
                {Math.floor(
                  (parseFloat(amountSpent) / parseFloat(user.budget)) * 100
                )}
                % of your total budget
              </div>
            )}
            <button className="export-button" onClick={handleExport}>Export CSV</button>
          </div>
        </div>
      ) : (
        <div>Not Enough Data</div>
        
      )}
    </>
  );
}
