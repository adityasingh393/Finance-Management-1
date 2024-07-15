import React from 'react';
import { Pie } from 'react-chartjs-2';
import { expenseSource } from "../../utils/interface/types";

interface ExpensePieChartProps {
  expenseDetails: expenseSource[];
  generatePieChartData: (data: expenseSource[], key: "expenseType") => any;
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ expenseDetails, generatePieChartData }) => {
  return (
    <div className="expense-pie-chart">
      <h2>Expenses</h2>
      <Pie data={generatePieChartData(expenseDetails, "expenseType")} />
    </div>
  );
};

export default ExpensePieChart;
