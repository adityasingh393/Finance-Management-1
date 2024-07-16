import React from 'react';
import { Line } from 'react-chartjs-2';
import { transHistory } from "../../utils/interface/types";

interface TransactionChartProps {
  transactions: transHistory[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p>No transaction history available</p>;
  }

  const data = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Transaction Amount',
        data: transactions.map(transaction => parseFloat(transaction.amount)),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return <Line data={data} />;
};

export default TransactionChart;
