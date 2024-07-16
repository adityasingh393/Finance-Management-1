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
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Grid, Box } from "@mui/material";
import GridPattern from "../../components/landing/GridPattern";
import { cn } from "../../lib/utils";
import Typography from "@mui/material/Typography";

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
      {/* Grid animation */}
      <GridPattern
        width={40}
        height={40}
        x={0}
        y={0}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          "absolute inset-0 z-0",
          "animate-pulse"
        )}
      />

      {/* AppBar */}
      <AppBar
        position="static"
        sx={{
          background: 'white',
          color: '#03071e',
          borderRadius: '10px',
          mb: 4,
          boxShadow: '0', // Adds margin at the bottom to separate the AppBar from the form
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontFamily: "Playwrite DK Uloopet",
            fontWeight: 'bold',
            mt: 12,
          }}>
            DashBoard 🏦
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Charts and Graphs */}

      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={14} sm={6} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: '10px',
                padding: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                height: '100%',
                width: '100%',
              }}
            >
              <IncomePieChart
                incomeDetails={incomeDetails}
                generatePieChartData={generatePieChartData}
              />
            </Box>
          </Grid>
          <Grid item xs={14} sm={6} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: '10px',
                padding: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                height: '100%',
                width: '100%',
              }}
            >
              <ExpensePieChart
                expenseDetails={expenseDetails}
                generatePieChartData={generatePieChartData}
              />
            </Box>
          </Grid>
          <Grid item xs={14} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: '10px',
                padding: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                width: '100%',
                paddingTop: 3,
                paddingBottom: 3,
              }}
            >
              <Typography variant="h6" component="h2" sx={{ fontFamily: 'Inter, sans-serif' }}>
                Latest Transactions
              </Typography>
              <LatestTransactions transactions={latestTransactions} />
            </Box>
          </Grid>
          <Grid item xs={14} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: '10px',
                padding: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                height: '100%',
                width: '100%',
              }}
            >
              <Typography variant="h6" component="h2" sx={{ fontFamily: 'Inter, sans-serif' }}>
                Transaction History
              </Typography>
              <TransactionChart transactions={transDetails} />
            </Box>
          </Grid>
          <Grid item xs={14} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: '10px',
                padding: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                height: '100%',
                width: '100%',
              }}
            >
              <Typography variant="h6" component="h2" sx={{ fontFamily: 'Inter, sans-serif' }}>
                Budget Progress
              </Typography>
              <BudgetProgress
                budgetDetails={budgetDetails}
                expenseDetails={expenseDetails}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
