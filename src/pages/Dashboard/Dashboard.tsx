import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchData } from "../../utils/customHooks/fetchData";
import LatestTransactions from "./LatestTransactions";
import IncomePieChart from "./IncomePieChart";
import ExpensePieChart from "./ExpensePieChart";
import BudgetProgress from "./BudgetProgress";
import TransactionChart from "./TransactionChart";
import { newUser, transHistory, incomeSource, expenseSource } from "../../utils/interface/types";
import "../../styles/Dashboard.css";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<newUser | null>(null);
  const [latestTransactions, setLatestTransactions] = useState<transHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "null");

    if (!currentUser) {
      alert("You are not logged in. Redirecting to login page...");
      navigate("/login");
      return;
    }
    setCurrentUserName(currentUser.user.name);
    console.log(currentUser.user.name);
    const fetchUserData = async () => {
      const data = await fetchData();
      if (data) {
        setUserData(data);
        setLatestTransactions(data.transDetails?.slice(-5).reverse() || []);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const generatePieChartData = (data: (incomeSource | expenseSource)[], key: "incomeType" | "expenseType") => {
    const labels = data.map((item: incomeSource | expenseSource) => {
      if ("incomeType" in item) {
        return (item as incomeSource).incomeType;
      } else if ("expenseType" in item) {
        return (item as expenseSource).expenseType;
      } else {
        return "";
      }
    });

    const amounts = data.map((item: incomeSource | expenseSource) => parseFloat(item.amount));

    return {
      labels,
      datasets: [
        {
          label: key === "incomeType" ? "Income" : "Expenses",
          data: amounts,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  if (isLoading) {
    return <Loader />;
  }

  const { incomeDetails = [], expenseDetails = [], budgetDetails = [], transDetails = [] } = userData || {};

  const isEmpty = incomeDetails.length === 0 && expenseDetails.length === 0 && budgetDetails.length === 0 && transDetails.length === 0;

  if (isEmpty) {
    return <p>Hi {currentUserName}, please add some data to view your dashboard.</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <div className="left-section">
          <div className="piechart">
            <IncomePieChart
              incomeDetails={incomeDetails}
              generatePieChartData={generatePieChartData}
            />
            <ExpensePieChart
              expenseDetails={expenseDetails}
              generatePieChartData={generatePieChartData}
            />
          </div>
          <div className="latest-transactions">
            <h2>Latest Transactions</h2>
            <LatestTransactions transactions={latestTransactions} />
          </div>
          <div className="transaction-chart">
            <h2>Transaction History</h2>
            <TransactionChart transactions={transDetails} />
          </div>
        </div>
        <div className="right-section">
          <div className="budget-progress">
            <h2>Budget Progress</h2>
            <BudgetProgress
              budgetDetails={budgetDetails}
              expenseDetails={expenseDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
