import { Button, Container, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Budget, newUser } from '../utils/interface/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/customHooks/fetchData';
import { useDispatch } from 'react-redux';
import { addToBudgetArray } from '../redux/slices/userSlice';

const BudgetPage = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserData = async () => {
            const data = fetchData();
            console.log(data, `log`)
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
    }, []);

    const onSubmit = (data: any) => {
        // console.log(data);
        const newObject:Budget = {
            type: data.budgetType,
            amount: data.amount
        }
        dispatch(addToBudgetArray(newObject))
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
                        name="budgetType"
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
        </Container>
    )
}

export default BudgetPage