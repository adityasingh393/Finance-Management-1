import { Button, Container, FormControl, MenuItem, Select, TextField, Typography, IconButton, ListItem, ListItemSecondaryAction, ListItemText, AppBar, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
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
// import { useAuth } from '../utils/customHooks/useAuth';
// import { RootState } from '../redux/store';

const Expense = () => {
    const [_userData, setUserData] = useState<newUser | null>(null);
    // const currentUser: newUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    // const currentUser = useSelector((state:RootState)=>state.userReducer.currentUser)
    const users=fetchData();
    const { control, handleSubmit, reset } = useForm<expenseSource>();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    useEffect(() => {
        setUserData(users);
    }, []);

    const onSubmit:SubmitHandler<expenseSource> = (data) => {
        // console.log(data);
        const existingExpense=_userData?.expenseDetails?.find((item)=>item.expenseType===data.expenseType);
        let num1;
        if(!existingExpense){
            num1=0;
        }
        else{
            num1=Number(existingExpense.amount)
        }
        let num2=Number(data.amount);
        let updateamount=num1+num2;
        const newExpense:expenseSource={
            expenseType:data.expenseType,
            amount:updateamount.toString(),
        }
        dispatch(addToExpenseArray(newExpense))
        const newObject:transHistory = {
            date: `${dayjs(Date.now()).format('DD/MM/YYYY')}`,
            type: data.expenseType,
            amount: updateamount.toString(),
        }
        // console.log(newObject)
        dispatch(addExpenseToTansactionArray(newObject));
        const updatedUserData=fetchData();
        if(updatedUserData){
            setUserData(updatedUserData);
        }
        else{
            navigate(`/login`);
        }
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
        const storeuser=fetchData();
        if(storeuser){
            setUserData(storeuser);
        }else{
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
                        mt: 19,
                    }}>
                        Expense Form 💰
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* form  */}
            
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
                _userData?.expenseDetails?.map((item, indx) => (
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