import { AppBar, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Budget, newUser } from '../utils/interface/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/customHooks/fetchData';
import { useDispatch } from 'react-redux';
import { addToBudgetArray, deleteBudget } from '../redux/slices/userSlice';
import GridPattern from '../components/landing/GridPattern';
import { cn } from '../lib/utils';
import CommonButton from '../components/common/CommonButton';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import { Expensedata } from '../utils/dummyData';
// import { useAuth } from '../utils/customHooks/useAuth';
// import { RootState } from '../redux/store';

const BudgetPage = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);
    const navigate = useNavigate()
    const { control, handleSubmit, reset } = useForm<Budget>();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editAmount, setEditAmount] = useState<number | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const dispatch = useDispatch()
    const users = fetchData();
    useEffect(() => {
        if (!users) {
            navigate(`/login`);
        }
    }, [users, navigate]);

    useEffect(() => {
        setUserData(users);
    }, [users] )   //changed just now at 7 pm nedd to check it back did to remove soft error
   
    const onSubmit: SubmitHandler<Budget> = (data) => {
        console.log(data,"budget submit");
        const existingBudget = _userData?.budgetDetails?.find((item) => item.type === data.type);
        let num1;
        console.log(existingBudget,"existing budget")
        if (!existingBudget) {
            num1 = 0;
        }
        else {
            num1 = Number(existingBudget.amount);
        }
        const num2 = Number(data.amount)

        const updateamount = num1 + num2;
        const newBudget: Budget = {
            type: data.type,
            amount: updateamount.toString(),
        }

        dispatch(addToBudgetArray(newBudget))
        const updatedUserData = fetchData();
        if (updatedUserData) {
            setUserData(updatedUserData);
        } else {
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
            const newObject: Budget = {
                type: _userData?.budgetDetails![editIndex]?.type!,
                amount: editAmount.toString()
            }
            console.log(newObject)
            dispatch(addToBudgetArray(newObject));
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
        dispatch(deleteBudget(id));
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
                        Budget Form 💱

                    </Typography>
                </Toolbar>
            </AppBar>

            {/* form 
             */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin="normal">
                    {/* <InputLabel id="budget-type-label">Budget Type</InputLabel> */}
                    <Typography fontSize={15} color={'GrayText'}>Budget Type</Typography>
                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="budget-type-label"
                                id="budget-type"
                                fullWidth
                                required
                                placeholder="Budget Type"
                            >
                                <MenuItem value="" disabled sx={{ fontFamily: 'Inter, sans-serif' }}>
                                    Select the Category
                                </MenuItem>
                                {Expensedata.map((item, index) => (
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
                            />
                        )}
                    />
                </FormControl>

                <CommonButton type="submit" variant="contained" >
                    Submit
                </CommonButton>
            </form>
            {/* here comes the list of Budgets... */}
            {
                _userData?.budgetDetails?.map((item, indx) => (
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
                        <ListItemText primary={item.type} secondary={`Amount: ${item.amount}`}
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

export default BudgetPage