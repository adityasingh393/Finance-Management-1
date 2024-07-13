import { Button, Container, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const Expense = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
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
        </Container>
    )
}

export default Expense