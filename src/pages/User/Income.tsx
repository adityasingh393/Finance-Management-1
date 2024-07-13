import { Button, Container, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const Income = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
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