import React from 'react';
import { transHistory } from "../../utils/interface/types";
import "../../styles/LatestTransactions.css";

interface LatestTransactionsProps {
  transactions: transHistory[];
}

const LatestTransactions: React.FC<LatestTransactionsProps> = ({ transactions }) => {
  return (
    <div className="latest-transactions">
      <h2>Latest Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="transaction-item">
            {transaction.date} - {transaction.type} - ₹ {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestTransactions;
