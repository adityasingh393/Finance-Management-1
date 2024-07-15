import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Budget, expenseSource } from "../../utils/interface/types";

interface BudgetProgressProps {
  budgetDetails: Budget[];
  expenseDetails: expenseSource[];
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ budgetDetails, expenseDetails = [] }) => {
  const chartRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    budgetDetails.forEach((budget, index) => {
      if (chartRefs.current[index]) {
        const ctx = chartRefs.current[index]?.getContext('2d');
        if (ctx) {
          const spent = expenseDetails.filter(expense => expense.expenseType === budget.type)
            .reduce((total, expense) => total + parseFloat(expense.amount), 0);
          const remaining = parseFloat(budget.amount) - spent;
          
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Spent', 'Remaining'],
              datasets: [{
                label: budget.type,
                data: [spent, remaining],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
              }]
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
    });
  }, [budgetDetails, expenseDetails]);

  return (
    <div className="budget-progress">
      <h2>Budget</h2>
      {budgetDetails.map((budget, index) => (
        <div key={index} className="budget-item">
          <p>{budget.type}</p>
          <canvas ref={el => chartRefs.current[index] = el}></canvas>
        </div>
      ))}
    </div>
  );
};

export default BudgetProgress;
