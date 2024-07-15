import { Button, Container, FormControl, IconButton, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { incomeSource, newUser, transHistory } from '../utils/interface/types';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/customHooks/fetchData';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToIncomeArray, addIncomeToTansactionArray, deleteIncome, setInitialState } from '../redux/slices/userSlice';
import dayjs from 'dayjs'
// import { useAuth } from '../utils/customHooks/useAuth';
import { RootState } from '../redux/store';

const Income = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);
    // const currentUser: newUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    const currentUser = useSelector((state:RootState)=>state.userReducer.currentUser)
    const { control, handleSubmit, reset } = useForm<incomeSource>();
    const navigate = useNavigate()
    const dispatch = useDispatch()


    
    useEffect(() => {
        dispatch(setInitialState(currentUser!))
        const fetchUserData = () => {
            const data = fetchData();
            // console.log(data, `log`)
            if (data) {
                setUserData(data);
                // console.log('consoling data', data)
                // console.log('consoling currentUser', currentUser)
                // console.log('consoling userData', userData)
            }
            else {
                navigate('/login')
            }
        };

        fetchUserData();
    }, [currentUser, dispatch, navigate]);

    const onSubmit: SubmitHandler<incomeSource> = (data) => {
        // console.log(data.incomeType, data.amount);
        dispatch(addToIncomeArray(data))
        const newObject: transHistory = {
            date: `${dayjs(Date.now()).format('DD/MM/YYYY')}`,
            type: data.incomeType,
            amount: data.amount
        }
        // console.log(newObject)
        dispatch(addIncomeToTansactionArray(newObject))
        reset()
    };

    const handleEdit = (id: number) => {
        // Handle edit functionality
        console.log(`Edit item with id ${id}`);
    };

    const handleDelete = (id: number) => {
        // Handle delete functionality
        console.log(`Delete item with id ${id}`);
        dispatch(deleteIncome(id))
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Income Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin="normal">
                    {/* <InputLabel id="income-type-label">Income Type</InputLabel> */}
                    <Typography fontSize={15} color={'GrayText'}>Income Type</Typography>
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
                            >
                                <MenuItem value="Salary">Salary</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                                <MenuItem value="Investments">Investments</MenuItem>
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
            {/* {here comes the list of Incomes...} */}
            {
                currentUser?.incomeDetails?.map((item, indx) => (
                    <ListItem key={indx}>
                        <ListItemText primary={item.incomeType} secondary={`Amount: ${item.amount}`} />
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

export default Income