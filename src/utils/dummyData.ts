import localforage from "localforage";
import { newUser } from "../utils/interface/types";

const dummyData: newUser = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "securepassword",
  },
  incomeDetails: [
    { incomeType: "Salary", amount: "5000" },
    {incomeType:"Gift", amount:"200"},
    { incomeType: "Freelancing", amount: "2000" },
  ],
  expenseDetails: [
    { expenseType: "Groceries", amount: "400" },
    { expenseType: "Rent", amount: "1500" },
  ],
  transDetails: [
    { date: "2023-01-01", type: "credit", amount: "5000" },
    { date: "2023-01-05", type: "debit", amount: "300" },
    { date: "2023-01-10", type: "debit", amount: "1500" },
    { date: "2023-01-15", type: "credit", amount: "2000" },
    { date: "2023-01-20", type: "debit", amount: "200" },
  ],
  budgetDetails: [
    { type: "Groceries", amount: "500" },
    { type: "Rent", amount: "1500" },
    { type: "Travel", amount: "1500" },
  ],
};

export const initializeDummyData = async () => {
  await localforage.setItem("user_john.doe@example.com", dummyData);
  console.log("Dummy data initialized in localForage");
};
//#delete this dummy data from here when you complete registering a user - Aditya 