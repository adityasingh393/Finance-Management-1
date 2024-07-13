import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../utils/schema/loginSignupSchema';
import {  userDetails, newUser} from "../../utils/interface/types" // Assuming this defines RegisterSchema correctly
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Button, TextField, Typography, AppBar, Toolbar, InputAdornment, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useRegister from '../../utils/customHooks/useRegisterForm';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // let loading=false;
    const [loading,setLoading]=useState<boolean>(false);
const [showPassword,setShowPassword]=useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<userDetails>({
        resolver: yupResolver(RegisterSchema), // Ensure RegisterSchema matches User interface
        defaultValues: {
            name: '',
            email: '',
            password: '',

        },
    });

    const handleFormSubmit: SubmitHandler<userDetails> = async (data) => {
        try {
            setLoading(true);
            
            // Construct newUser object
            const newUserObject: newUser = {
                user: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
                incomeDetails: [],
                expenseDetails: [],
                transDetails: [],
                budgetDetails: []
            };
    
            const result = await useRegister(newUserObject); // Pass newUserObject here
            console.log(result);
            navigate(`/login`)
            toast.success('Registration successful!', {
                position: 'top-center',
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


        } catch (error) {
            if(error instanceof Error){

                console.log('registration error', error);
                toast.error(`${error.message}`, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                console.log('registration error', error);
                toast.error(`An unknown error occurred`, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        finally{
            setLoading(false)
        }
    };
    if(loading){
        return <>Loading....</>
    }
    return (
        <>
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
                        fontWeight: 'bold'
                    }}>
                        Let's Register You! 🚀
                    </Typography>
                </Toolbar>
            </AppBar>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem',width:'90vw'}}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="text"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                        )}
                    />
                  <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                variant="outlined"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>  SignUp!</Button>
            
                    <NavLink to='/login'>Login</NavLink>
                </Box>
            </form>
        </>);
}

export default Register
