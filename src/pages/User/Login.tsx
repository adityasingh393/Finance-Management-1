import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../utils/schema/loginSignupSchema';
import {  TextField, Typography, AppBar, Toolbar, InputAdornment, IconButton, Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useLogin from '../../utils/customHooks/useLogin';
import { LoginFormInput } from '../../utils/interface/types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CommonButton from '../../components/common/CommonButton';

const Login = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // let loading=false;
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
        resolver: yupResolver(LoginSchema), // Ensure RegisterSchema matches User interface
        defaultValues: {

            email: '',
            password: '',

        },
    });

    const handleFormSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        try {
            setLoading(true);
            const loginUser = await useLogin(data); // Pass newUserObject here
            console.log(loginUser);
            toast.success('Login successful!', {
                position: 'top-center',
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate(`/dashboard`)

        } catch (error) {
            console.log('Login error', error);
            if (error instanceof Error) {

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
        } finally {
            setLoading(false)
        }
    };
    if (loading) {
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
                        Welcome Back! 👋
                    </Typography>
                </Toolbar>
            </AppBar>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Container maxWidth="sm"> {/* Adjust maxWidth as needed */}
            <Box sx={{ bgcolor: '#f5f5f5', p: 4, borderRadius: 3 }}>
                <Grid container spacing={2}>
                   
                    <Grid item xs={12}>
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
                                    sx={{
                                        '& .MuiInputLabel-root': { color: '#333' },
                                        '& .MuiInputBase-input': { color: '#333' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#ddd' },
                                            '&:hover fieldset': { borderColor: '#888' },
                                            '&.Mui-focused fieldset': { borderColor: '#888' },
                                            borderRadius: 3,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                                    sx={{
                                        '& .MuiInputLabel-root': { color: '#333' },
                                        '& .MuiInputBase-input': { color: '#333' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#ddd' },
                                            '&:hover fieldset': { borderColor: '#888' },
                                            '&.Mui-focused fieldset': { borderColor: '#888' },
                                            borderRadius: 3,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CommonButton type="submit" >
                       Login
                        </CommonButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#555' }}>
                            Don’t have an account?{' '}
                            <Typography
                                component="span"
                                sx={{
                                    color: '#d00000',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
                </Container>
            </form>
        </>);
}

export default Login
