import { useState } from 'react';
import { Box, TextField, CircularProgress, Snackbar, Alert, AlertTitle } from '@mui/material';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'redaxios';
import { NavLink, useNavigate } from 'react-router-dom';
function AdminLogin() {
    const [circularProgress, setCircularProgress] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const history = useNavigate();
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;
    const handleSuccessClose = () => {
        setSuccessAlert(false);
        history('/mainpage/orders');
    };

    const handleFailClose = () => {
        setFailAlert(false);
        history('/mainpage/admin');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCircularProgress(true);
        try {
            const response = await axios.post('https://mule-foods.onrender.com/admin/login', {
                password,
                email,

            });

            if (response.data === "authorized") {
                setCircularProgress(false);
                setSuccessAlert(true);

            } else {
                setCircularProgress(false);
                setFailAlert(true);
            }
        } catch (error) {
            console.error("An error occurred", error);
            setCircularProgress(false);
            setFailAlert(true);
        }
    };
    return (
        <div>
            <Snackbar open={successAlert} autoHideDuration={5000} onClose={handleSuccessClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleSuccessClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    <AlertTitle>Success</AlertTitle>
                    Welcome Admin!
                </Alert>
            </Snackbar>

            <Snackbar open={failAlert} autoHideDuration={5000} onClose={handleFailClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleFailClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                    <AlertTitle>Failed</AlertTitle>
                    Failed! Admins Only.
                </Alert>
            </Snackbar>

            <form action="" className='flex flex-col justify-around items-center gap-4 p-2 rounded-md text-slate-700' onSubmit={handleSubmit}>
                <div className="text-center flex items-start flex-col justify-between gap-0">
                    <h1 className="text-2xl font-semibold italic">
                        <span className="text-orange-400">Mule</span>Foods
                    </h1>
                    <p className="text-sm italic font-bold">faster than a phone call</p>
                </div>
                <div><h1 className='border-b-2 border-b-orange-400'>Admin LogIn</h1></div>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    className='flex flex-col justify-around items-center'
                >

                    <TextField id="outlined-basic" type='email' variant="standard" label="Email Address" required onChange={(e) => setEmail(e.target.value)} />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                </Box>
                <div>
                    {circularProgress ? (
                        <div className='w-[100%] rounded-md bg-slate-100 z-30'>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2'>
                                <CircularProgress sx={{ color: "white" }} size={20} />
                                <span>Please Wait...</span>
                            </button>
                        </div>
                    ) : (
                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2'>
                            <span>LogIn</span>
                        </button>)}<br />
                    <small className='text-blue-500'><NavLink to='/mainpage/help'>Having Trouble? Contact Support</NavLink></small>
                </div>
            </form >
        </div >
    )
}

export default AdminLogin