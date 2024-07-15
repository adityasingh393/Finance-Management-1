import React from 'react';
import { Budget, expenseSource } from "../../utils/interface/types";

interface BudgetProgressProps {
  budgetDetails: Budget[];
  expenseDetails: expenseSource[];
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ budgetDetails, expenseDetails = [] }) => {
  return (
    <div className="budget-progress">
      <h2>Budget</h2>
      {budgetDetails.map((budget, index) => {
        const spent = expenseDetails.filter(expense => expense.expenseType === budget.type)
          .reduce((total, expense) => total + parseFloat(expense.amount), 0);
        const remaining = parseFloat(budget.amount) - spent;
        return (
          <div key={index} className="budget-item">
            <p>{budget.type}: ${remaining} remaining</p>
            <progress value={spent} max={budget.amount}></progress>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetProgress;
