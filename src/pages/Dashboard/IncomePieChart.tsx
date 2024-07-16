/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { incomeSource } from "../../utils/interface/types";

interface IncomePieChartProps {
  incomeDetails: incomeSource[];
  generatePieChartData: (data: incomeSource[], key: "incomeType") => any;
}

const IncomePieChart: React.FC<IncomePieChartProps> = ({ incomeDetails, generatePieChartData }) => {
  return (
    <div className="income-pie-chart">
      <h2>Income</h2>
      <Pie data={generatePieChartData(incomeDetails, "incomeType")} />
    </div>
  );
};

export default IncomePieChart;
