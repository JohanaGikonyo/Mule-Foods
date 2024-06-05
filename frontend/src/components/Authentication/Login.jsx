import { useState } from 'react';
import { Box, TextField, InputAdornment, CircularProgress, Button, Snackbar, Alert, AlertTitle } from '@mui/material';
import axios from 'redaxios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/Store';

function Login() {
    const [phone, setPhone] = useState('');
    const [circularProgress, setCircularProgress] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const setToken = useAuthStore((state) => state.setToken);
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCircularProgress(true);
        try {
            const response = await axios.post('https://mule-foods.onrender.com/api/login', { phone });
            setCircularProgress(false);
            if (response.data === "does not exist") {
                setFailAlert(true);
            } else {
                setToken(response.data.token);
                navigate('/mainpage/home');
            }
        } catch (error) {
            setCircularProgress(false);
            setFailAlert(true);
            console.error("An error occurred", error);
        }
    };

    const handleFailClose = () => {
        setFailAlert(false);
    };

    return (
        <div>
            <Snackbar open={failAlert} autoHideDuration={5000} onClose={handleFailClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleFailClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                    <AlertTitle>Failed</AlertTitle>
                    Failed! Try Again or SignIn.
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit} className='flex flex-col justify-around items-center gap-4 p-2 rounded-md text-slate-700'>
                <div className='flex flex-col justify-around items-center gap-4 bg-slate-50 p-2 m-10 rounded-md text-slate-700'>
                    <div className="text-center flex items-start flex-col justify-between gap-0">
                        <h1 className="text-2xl font-semibold italic">
                            <span className="text-orange-400">Mule</span>Foods
                        </h1>
                        <p className="text-sm italic font-bold">faster than a phone call</p>
                    </div>
                    <h1 className='border-b-2 border-b-orange-400'>Log In</h1>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        className='flex flex-col justify-around items-center'
                    >
                        <TextField
                            id="outlined-basic"
                            type='number'
                            variant="standard"
                            InputProps={{ startAdornment: <InputAdornment position="start">(+254)</InputAdornment> }}
                            label="Phone Number"
                            onChange={(e) => setPhone(e.target.value)}
                            maxLength={9}
                        />
                    </Box>
                    <div>
                        {circularProgress ? (
                            <div className='w-[100%] rounded-md bg-slate-100 z-30'>
                                <Button className='font-bold p-1 rounded-md flex items-center gap-1'>
                                    <span className='p-3'><CircularProgress size={20} /></span>Please Wait...
                                </Button>
                            </div>
                        ) : (
                            <Button type='submit' className='border border-orange-400 p-1 px-3 rounded-md flex items-center gap-1'>Log In</Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
