import { Button, Container, FormControl, IconButton, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Budget, newUser } from '../utils/interface/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/customHooks/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { addToBudgetArray, deleteBudget, setInitialState } from '../redux/slices/userSlice';
// import { useAuth } from '../utils/customHooks/useAuth';
import { RootState } from '../redux/store';

const BudgetPage = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);
    // const currentUser: newUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    const currentUser = useSelector((state:RootState)=>state.userReducer.currentUser)
    const { control, handleSubmit, reset } = useForm<Budget>();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(setInitialState(currentUser!))
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

    const onSubmit:SubmitHandler<Budget> = (data) => {
        // console.log(data);
        const newObject:Budget = {
            type: data.type,
            amount: data.amount
        }
        dispatch(addToBudgetArray(newObject))
        reset()
    };

    const handleEdit = (id: number) => {
        // Handle edit functionality
        console.log(`Edit item with id ${id}`);
    };

    const handleDelete = (id: number) => {
        // Handle delete functionality
        console.log(`Delete item with id ${id}`);
        dispatch(deleteBudget(id))
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Budget Form
            </Typography>
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
                                placeholder='Budget Type'
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
            {/* here comes the list of Budgets... */}
            {
                currentUser?.budgetDetails?.map((item, indx) => (
                    <ListItem key={indx}>
                        <ListItemText primary={item.type} secondary={`Amount: ${item.amount}`} />
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

export default BudgetPage