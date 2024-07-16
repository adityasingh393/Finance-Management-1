import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Budget, expenseSource } from "../../utils/interface/types";

interface BudgetProgressProps {
  budgetDetails: Budget[];
  expenseDetails: expenseSource[];
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ budgetDetails, expenseDetails = [] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const labels = budgetDetails.map(budget => budget.type);
        const spentData = budgetDetails.map(budget => {
          return expenseDetails
            .filter(expense => expense.expenseType === budget.type)
            .reduce((total, expense) => total + parseFloat(expense.amount), 0);
        });
        const remainingData = budgetDetails.map((budget, index) => parseFloat(budget.amount) - spentData[index]);

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Spent',
                data: spentData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
              {
                label: 'Remaining',
                data: remainingData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }, [budgetDetails, expenseDetails]);

  return (
    <div className="budget-progress">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BudgetProgress;
