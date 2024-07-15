import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { fetchData } from '../../utils/customHooks/fetchData'; // Assuming fetchData returns a typed object
import { transHistory } from '../../utils/interface/types';
import { Income, Expense,all } from "../../utils/dummyData";

interface Option {
  value: string;
  label: string;
}

export const TransHistoryDetails: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [filteredType, setFilteredType] = useState<string>(''); // State to store selected type (Income or Expense)
  const user = fetchData(); // Assuming fetchData returns a typed object
  const [data,setData]=useState<string[]>(all)
const [defaultvalue,setDefaultvalue]=useState<string>("Select option")
  const options: Option[] = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

 

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
   
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setFilteredType(event.target.value);
    console.log(event.target.value)
    if(event.target.value==='income'){
        setDefaultvalue(Income[0]);
        setData(Income)
    }
    else if(event.target.value==='expense'){
        setDefaultvalue(Expense[0]);
        setData(Expense);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Selected Option:', selectedOption);
    console.log("selection fintier",filteredType)

    const transactionsData=user?.transDetails?.filter((trans:transHistory)=>trans.type===filteredType)
    console.log("transfilerdata",transactionsData)
    // Handle form submission logic here, e.g., send data to backend
  };

  // Filter transactions based on selected type
//   const filteredTransactions = filteredType === 'income' ? Income : 
//                               filteredType === 'expense' ? Expense : transHistorys;
const filteredTransactions: transHistory[] = [
    {  type: 'Retail', date: '2024-07-15', amount: "100" },
    {  type: 'Services', date: '2024-07-14', amount: "150" },
    {  type: 'Wholesale', date: '2024-07-13', amount: "200" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:w-full sm:max-w-md">
        <Typography variant="h2" color="primary" align="left" gutterBottom>
          Hi {user?.user.name}
        </Typography>
      </div>

      <div className="mt-8 sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
           

            {/* Dropdown for filtering by type (Income or Expense) */}
            <div>
              <FormControl className="w-full">
                <InputLabel id="type-label" className="text-sm font-medium text-gray-700">
                  Filter by Type
                </InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  value={filteredType}
                  onChange={handleTypeChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <MenuItem value="">All</MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className="w-full">
                <InputLabel id="dropdown-label" className="text-sm font-medium text-gray-700">
                {defaultvalue}
                </InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  value={selectedOption}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {data.map((types,index) => (
                    <MenuItem key={index} value={types}>
                      {types}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full sm:w-auto py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8 sm:w-full sm:max-w-3xl">
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transHistory, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transHistory.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transHistory.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transHistory.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// export default TransHistoryDetails;









// export const TransHistoryDetails: React.FC = () => {
//   // ...component implementation
// };