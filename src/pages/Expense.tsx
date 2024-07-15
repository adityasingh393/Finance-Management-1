import { Button, Container, FormControl, MenuItem, Select, TextField, Typography, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { expenseSource, newUser, transHistory } from '../utils/interface/types';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/customHooks/fetchData';
import { useDispatch } from 'react-redux';
import { addExpenseToTansactionArray, addToExpenseArray, deleteExpense, setInitialState } from '../redux/slices/userSlice';
import dayjs from 'dayjs';
import { useAuth } from '../utils/customHooks/useAuth';

const Expense = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);
    // const currentUser: newUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    const {currentUser} = useAuth()
    const { control, handleSubmit, reset } = useForm<expenseSource>();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    dispatch(setInitialState(currentUser!))

    useEffect(() => {
        const fetchUserData = async () => {
            const data = fetchData();
            // console.log(data, `log`)
            if (data) {
                setUserData(data);
                // console.log(data)
                // console.log(userData)
            }
            else{
                navigate('/login')
            }
        };

        fetchUserData();
    }, [currentUser]);

    const onSubmit:SubmitHandler<expenseSource> = (data) => {
        // console.log(data);
        dispatch(addToExpenseArray(data))
        const newObject:transHistory = {
            date: `${dayjs(Date.now()).format('DD/MM/YYYY')}`,
            type: data.expenseType,
            amount: data.amount
        }
        // console.log(newObject)
        dispatch(addExpenseToTansactionArray(newObject))
        reset()
    };

    const handleEdit = (id: number) => {
        // Handle edit functionality
        console.log(`Edit item with id ${id}`);
    };

    const handleDelete = (id: number) => {
        // Handle delete functionality
        console.log(`Delete item with id ${id}`);
        dispatch(deleteExpense(id))
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Expense Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin="normal">
                    {/* <InputLabel id="expense-type-label">Expense Type</InputLabel> */}
                    <Typography fontSize={15} color={'GrayText'}>Expense Type</Typography>
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
                            >
                                <MenuItem value="Clothes">Clothes</MenuItem>
                                <MenuItem value="Entertainment">Entertainment</MenuItem>
                                <MenuItem value="Food">Food</MenuItem>
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

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            {/* here comes the list of Expenses... */}
            {
                currentUser?.expenseDetails?.map((item, indx) => (
                    <ListItem key={indx}>
                        <ListItemText primary={item.expenseType} secondary={`Amount: ${item.amount}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(indx)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(indx)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            }
        </Container>
    )
}

export default Expense