import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from '@mui/material';
import { fetchData } from '../../utils/customHooks/fetchData'; // Assuming fetchData returns a typed object
import { transHistory } from '../../utils/interface/types';
import { Incomedata, Expensedata, allCategories } from '../../utils/dummyData';
import { cn } from '../../lib/utils';
import GridPattern from '../../components/landing/GridPattern';
import CommonButton from '../../components/common/CommonButton';

interface Option {
  value: string;
  label: string;
}

export const TransHistoryDetails: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [filteredType, setFilteredType] = useState<string>('');
  const user = fetchData(); // Assuming fetchData returns a typed object
  const [transactionsData, setTransactionData] = useState<transHistory[]>(user?.transDetails || []);

  const [data, setData] = useState<string[]>(allCategories
    
  );
  const [defaultvalue, setDefaultvalue] = useState<string>('Select option');
  const options: Option[] = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/login`);
    }
  }, [user, navigate]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setFilteredType(event.target.value);
    if (event.target.value === 'income') {
      setDefaultvalue(Incomedata[0]);
      setData(Incomedata);
    } else if (event.target.value === 'expense') {
      setDefaultvalue(Expensedata[0]);
      setData(Expensedata);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = user?.transDetails?.filter((trans: transHistory) => trans.type === selectedOption);
    if (result) {
      setTransactionData(result);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
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
      {/* <div className="sm:w-full sm:max-w-md">
        <Typography variant="h2" color="primary" align="left" gutterBottom>
          
        </Typography>
      </div> */}

      <AppBar
                position="static"
                sx={{
                    background: 'white',
                    color: '#03071e',
                    borderRadius: '10px',
                  marginTop:"4rem",
                    boxShadow: '0'  // Adds margin at the bottom to separate the AppBar from the form
                }}
            >
                <Toolbar>
                    <Typography variant="h5" sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        fontFamily: "Playwrite DK Uloopet",
                        fontWeight: 'bold',
                        marginTop: 8,
                    }}>
                        Hi, {user?.user.name}

                    </Typography>
                </Toolbar>
            </AppBar>

      <div className="mt-8 sm:w-full sm:max-w-md bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Dropdowns for filtering */}
          <div className="flex space-x-4">
            {/* Filter by Type */}
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

            {/* Select specific item */}
            {
              filteredType.length>0 && <FormControl className="w-full">
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
                {data.map((types, index) => (
                  <MenuItem key={index} value={types}>
                    {types}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            }
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <CommonButton
              type="submit"
              variant="contained"
            >
              Submit
            </CommonButton>
          </div>
        </form>
      </div>

      {/* Table Section */}
      {transactionsData.length > 0 ? (
  <div className="mt-8 sm:w-full sm:max-w-3xl max-h-96 overflow-y-auto">
    <div className="bg-white shadow sm:rounded-lg overflow-y-auto">
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
          {transactionsData.map((transHistory, index) => (
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
) : (
  <div className="mt-8 sm:w-full sm:max-w-3xl">
    <Typography variant="body1" className="bg-white shadow sm:rounded-lg p-4">
      No data found.
    </Typography>
  </div>
)}

    </div>
  );
};
