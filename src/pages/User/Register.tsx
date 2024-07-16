import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../utils/schema/loginSignupSchema';
import { userDetails, newUser } from "../../utils/interface/types" // Assuming this defines RegisterSchema correctly
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  TextField, Typography, AppBar, Toolbar, InputAdornment, IconButton, Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useRegister from '../../utils/customHooks/useRegisterForm';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CommonButton from '../../components/common/CommonButton';
import GridPattern from '../../components/landing/GridPattern';
import { cn } from '../../lib/utils';
import Navbar from '../../components/common/Navbar';
import { BorderBeam } from '../../components/landing/BorderBeam';



const Register = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // let loading=false;
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<userDetails>({
        resolver: yupResolver(RegisterSchema), // Ensure RegisterSchema matches User interface
        defaultValues: {
            name: '',
            email: '',
            password: '',

        },
    });
    const { register} = useRegister();

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

            const result = await register(newUserObject); // Pass newUserObject here
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
        }
        finally {
            setLoading(false)
        }
    };
    if (loading) {
        return <>Loading....</>
    }
    return (
        <> 
            <Navbar />
            <AppBar
                position="static"
                sx={{
                    background: 'white',
                    color: '#03071e',
                    borderRadius: '10px',
                    mb: 4,
                    boxShadow: '0', 
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
                        Let's Register You! 🚀
                    </Typography>
                </Toolbar>
            </AppBar>


            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Container maxWidth="sm"> {/* Adjust maxWidth as needed */}
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


               <Box sx={{ bgcolor: '#f5f5f8', p: 4, borderRadius: 4,}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                            <BorderBeam 
                                size={90} 
                                duration={12} 
                                delay={9} 
                                            
                                        />
                            SignUp!
                        </CommonButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#1b263b' }}>
                        Already have an account? 🎯{' '}
                            <Typography
                                component="span"
                                sx={{
                                    color: '#1b263b',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                                onClick={() => navigate('/login')}
                            >
                                Login now!
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
            </form>
        </>);
}

export default Register
