import { Container, FormControl, MenuItem, Select, TextField, Typography, IconButton, ListItem, ListItemSecondaryAction, ListItemText, AppBar, Toolbar, DialogTitle, Dialog, DialogContent, Button, DialogActions } from '@mui/material';

import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { expenseSource, newUser, transHistory } from '../utils/interface/types';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/customHooks/fetchData';
import { useDispatch } from 'react-redux';
import { addExpenseToTansactionArray, addToExpenseArray, deleteExpense } from '../redux/slices/userSlice';
import dayjs from 'dayjs';
import { cn } from '../lib/utils';
import GridPattern from '../components/landing/GridPattern';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import CommonButton from '../components/common/CommonButton';
import { Expensedata } from '../utils/dummyData';
import { toast } from 'react-toastify';


const Expense = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editAmount, setEditAmount] = useState<number | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const users = fetchData();
    const { control, handleSubmit, reset } = useForm<expenseSource>();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!users) {
            navigate(`/login`);
        }
    }, [users, navigate]);
    useEffect(() => {
        setUserData(users);
    }, [users]);

    const onSubmit: SubmitHandler<expenseSource> = (data) => {
        // console.log(data);
        const existingExpense = _userData?.expenseDetails?.find((item) => item.expenseType === data.expenseType);
        // const existingBuged=_userData?.expenseDetails.find((item)=>item.expenseType===data.expenseType);
        const existingBudget = _userData?.budgetDetails?.find((item) => item.type === data.expenseType);
        console.log(`existingBudget ${existingBudget?.amount}`);

        let num1;
        if (!existingExpense) {
            num1 = 0;
        }
        else {
            num1 = Number(existingExpense.amount)
        }
        const num2 = Number(data.amount);
        const updateamount = num1 + num2;
        const newExpense: expenseSource = {
            expenseType: data.expenseType,
            amount: updateamount.toString(),
        }


        if (existingBudget) {
            if (Number(existingBudget.amount) < updateamount) {
                // console.log(`existingbudget ${existingBudget.amount}  or  ${data.amount} /n`)
                // console.log(existingBudget.amount < data.amount)
                toast.warning(`The expense for ${data.expenseType} has exceeded the budget`, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }


        } else {
            // console.log(`you dont assign a budget for ${data.expenseType} First assign your budget`);
            toast.info(`Please assign a budget for ${data.expenseType} before incurring expenses.`, {
                position: 'top-center',
                autoClose: 3000,  // Auto close the toast after 3000ms (3 seconds)
                hideProgressBar: false,  // Show the progress bar
                closeOnClick: true,  // Close the toast when clicked
                pauseOnHover: true,  // Pause autoClose when hovering over the toast
                draggable: true,  // Allow dragging the toast
                progress: undefined,  // Default progress animation duration
            });
            navigate(`/budget`)

            return;
        }


        dispatch(addToExpenseArray(newExpense))
        const newObject: transHistory = {
            date: `${dayjs(Date.now()).format('DD/MM/YYYY')}`,
            type: data.expenseType,
            amount: data.amount,
        }
        // console.log(newObject)
        dispatch(addExpenseToTansactionArray(newObject));
        const updatedUserData = fetchData();
        if (updatedUserData) {
            setUserData(updatedUserData);
        }
        else {
            navigate(`/login`);
        }
        reset()
    };

    const handleEdit = (index: number) => {
        // Handle edit functionality
        setEditIndex(index);
        setEditAmount(Number(_userData?.incomeDetails![index]?.amount)); // Set initial value for edit dialog
        setEditDialogOpen(true);

    };
    const handleEditSubmit = () => {
        if (editIndex !== null && editAmount !== null) {
            // Perform update action here
            console.log(`Updating amount for index ${editIndex} to ${editAmount}`);
            const newObject: expenseSource = {
                expenseType: _userData?.expenseDetails![editIndex]?.expenseType!,
                amount: editAmount.toString()
            }
            // console.log(newObject)
            
            dispatch(addToExpenseArray(newObject));
            const updatedUserData = fetchData();
            if (updatedUserData) {
                setUserData(updatedUserData);
            } else {
                navigate(`/login`);
            }
            //   onSubmit(newObject)
            setEditDialogOpen(false);

            //   setForceRerender(forceRerender+1);
            // location.reload()
        }
    };

    const handleDelete = (id: number) => {
        // Handle delete functionality
        console.log(`Delete item with id ${id}`);
        dispatch(deleteExpense(id))
        const storeuser = fetchData();
        if (storeuser) {
            setUserData(storeuser);
        } else {
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
                        Expense Form 💰
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* form  */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin="normal">
                    <Typography fontSize={15} color="GrayText">Expense Type</Typography>
                    <Controller
                        name="expenseType"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="expense-type-label"
                                id="expense-type"
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
                                {Expensedata.map((item, index) => (
                                    <MenuItem key={index} value={item} sx={{ fontFamily: 'Inter, sans-serif' }}>
                                        {item}
                                    </MenuItem>
                                ))}
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

                <CommonButton type="submit" variant="contained">
                    Submit
                </CommonButton>
            </form>

            {/* Here comes the list of Expenses... */}
            {_userData?.expenseDetails?.map((item, indx) => (
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
                        listStyleType: 'none',
                    }}
                >
                    <ListItemText
                        primary={item.expenseType}
                        secondary={`Amount: ₹${item.amount}`}
                        primaryTypographyProps={{
                            sx: {
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                fontFamily: 'Inter, sans-serif',
                                listStyleType: 'none',
                            },
                        }}
                        secondaryTypographyProps={{
                            sx: {
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1rem',
                                listStyleType: 'none',
                            },
                        }}
                    />
                    <ListItemSecondaryAction
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            listStyleType: 'none',
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

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Amount</DialogTitle>
                <DialogContent>
                    <TextField
                        label="New Amount"
                        type="number"
                        fullWidth
                        value={editAmount || ''}
                        onChange={(e) => setEditAmount(parseFloat(e.target.value))}
                        InputProps={{
                            inputProps: {
                                min: 0
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>


        </Container>
    )
}

export default Expense;