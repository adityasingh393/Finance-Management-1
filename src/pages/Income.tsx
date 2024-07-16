import { AppBar, Container, FormControl, IconButton, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { incomeSource, newUser, transHistory } from '../utils/interface/types';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/customHooks/fetchData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addToIncomeArray, addIncomeToTansactionArray, deleteIncome } from '../redux/slices/userSlice';
import dayjs from 'dayjs'
import GridPattern from '../components/landing/GridPattern';
import { cn } from '../lib/utils';
import CommonButton from '../components/common/CommonButton';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { Incomedata } from '../utils/dummyData'



const Income = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);

    const users = fetchData();
    const { control, handleSubmit, reset } = useForm<incomeSource>();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!users) {
            navigate(`/login`);
        }
    }, [users, navigate]);
    useEffect(() => {
        setUserData(users);
    }, [])

    const onSubmit: SubmitHandler<incomeSource> = (data) => {
        // Find existing income object based on incomeType
        const existingIncome = _userData?.incomeDetails?.find((item) => item.incomeType === data.incomeType);
        let num1;
        if (!existingIncome) {
            num1 = 0;
        }
        else {

            num1 = Number(existingIncome?.amount);
        }
        let num2 = Number(data.amount);


        // Calculate updated amount
        let updateamount = num1 + num2;
        console.log(`submit ${updateamount}`)


        const newIncome: incomeSource = {
            incomeType: data.incomeType,
            amount: updateamount.toString(),
        };

        // Dispatch action to add to Redux store
        dispatch(addToIncomeArray(newIncome));

        // Create a transaction history entry
        const newTransaction: transHistory = {
            date: `${dayjs(Date.now()).format('DD/MM/YYYY')}`,
            type: data.incomeType,
            amount: updateamount.toString(), // Use the submitted amount for transaction history
        };

        // Dispatch action to add transaction history
        dispatch(addIncomeToTansactionArray(newTransaction));

        // Fetch updated user data (assuming fetchData() fetches updated data from Redux store)
        const updatedUserData = fetchData();
        if (updatedUserData) {
            setUserData(updatedUserData);
        } else {
            navigate(`/login`);
        }

        // Reset form fields after submission
        reset();
    };

    const handleEdit = (id: number) => {
        // Handle edit functionality
        console.log(`Edit item with id ${id}`);
    };

    const handleDelete = (id: number) => {
        // Handle delete functionality
        console.log(`Delete item with id ${id}`);
        dispatch(deleteIncome(id));
        const storeuser = fetchData();
        if (storeuser) {
            setUserData(storeuser);
        }
        else {
            navigate(`/login`);
        }
    };

    return (
        <Container maxWidth="sm">
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
            <AppBar
                position="static"
                sx={{
                    background: 'white',
                    color: '#03071e',
                    borderRadius: '10px',
                    mb: 4,
                    boxShadow: '0'  // Adds margin at the bottom to separate the AppBar from the form
                }}
            >
                <Toolbar>
                    <Typography variant="h5" sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        fontFamily: "Playwrite DK Uloopet",
                        fontWeight: 'bold',
                        mt: 15,
                    }}>
                        Income Form 💸
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(onSubmit)}>

                <FormControl fullWidth margin="normal">
                    <Controller
                        name="incomeType"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="income-type-label"
                                id="income-type"
                                fullWidth
                                required
                                displayEmpty
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        fontFamily: 'Inter, sans-serif',
                                        '&.Mui-focused': {
                                            borderColor: '#edafb8',
                                        },
                                        '& fieldset': {
                                            borderColor: '#edafb8',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#edafb8',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#edafb8',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled sx={{ fontFamily: 'Inter, sans-serif' }}>
                                    Select the Category
                                </MenuItem>
                                {/* Map through menuItems array to generate menu items */}
                                {Incomedata.map((item, index) => (
                                    <MenuItem key={index} value={item} sx={{ fontFamily: 'Inter, sans-serif' }}>
                                        {item}
                                    </MenuItem>
                                ))}
                                {/* Add more income types as needed */}
                            </Select>
                        )}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <Controller
                        name="amount"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Amount"
                                id="amount"
                                type="number"
                                fullWidth
                                required
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        fontFamily: 'Inter, sans-serif',
                                        '&.Mui-focused': {
                                            borderColor: '#1b263b',
                                        },
                                        '& fieldset': {
                                            borderColor: '#1b263b',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#1b263b',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1b263b',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </FormControl>


                <CommonButton type="submit" variant="contained" >
                    Submit
                </CommonButton>
            </form>
            {/* {here comes the list of Incomes...} */}
            {
                _userData?.incomeDetails?.map((item, indx) => (
                    <ListItem
                        key={indx}
                        sx={{
                            mb: 2,
                            borderRadius: '10px',
                            bgcolor: '#f5f5f5',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <ListItemText
                            primary={item.incomeType}
                            secondary={`Amount: ₹${item.amount}`}
                            primaryTypographyProps={{
                                sx: {
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    fontFamily: 'Inter, sans-serif',
                                },
                            }}
                            secondaryTypographyProps={{
                                sx: {
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '1rem',
                                },
                            }}
                        />
                        <ListItemSecondaryAction
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(indx)} sx={{ color: '#3f51b5', mr: 1 }}>
                                <FaRegEdit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(indx)} sx={{ color: '#f50057' }}>
                                <MdDeleteSweep />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                ))
            }
        </Container>
    )
}

export default Income