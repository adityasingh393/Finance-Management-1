import { Button, Container, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { newUser, transHistory } from '../utils/interface/types';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/customHooks/fetchData';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { addToIncomeArray, addIncomeToTansactionArray } from '../redux/slices/userSlice';
import dayjs from 'dayjs'

const Income = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserData = () => {
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

    const onSubmit = (data:any) => {
        // console.log(data.incomeType, data.amount);
        dispatch(addToIncomeArray(data))
        const newObject:transHistory = {
            date: `${dayjs(Date.now()).format('DD/MM/YYYY')}`,
            type: data.incomeType,
            amount: data.amount
        }
        // console.log(newObject)
        dispatch(addIncomeToTansactionArray(newObject))
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
        </Container>
    )
}

export default Income