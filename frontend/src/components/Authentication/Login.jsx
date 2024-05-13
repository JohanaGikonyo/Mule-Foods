import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';
import { AlertTitle, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'redaxios'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Login() {

    const [phone, setPhone] = useState()
    const [circularProgress, setCircularProgress] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [failAlert, setFailAlert] = useState(false)

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    navigate('/mainpage/*');

                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page
                navigate('/login')
            }
        }
    }, [navigate]);

    const history = useNavigate()
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCircularProgress(prev => !prev)
        try {
            const response = await axios.post('https://mule-foods.onrender.com/api/login', {
                phone
            })
            if (response.data === "does not exist") {
                setCircularProgress(prev => !prev)
                console.log("The user does not Exists. Please SignIn")
                setFailAlert(prev => !prev)
            }
            else {
                setCircularProgress(prev => !prev)
                localStorage.setItem('token', response.data.token);
                setSuccessAlert(prev => !prev)

            }
        }

        catch (error) {
            console.error("An error occured", error)
            setFailAlert(prev => !prev);
            console.log(error)
        }
    }
    const handleSuccessClose = () => {

        setSuccessAlert(prev => !prev);
        history('/mainpage/home')
    }
    const handleFailClose = () => {
        setFailAlert(prev => !prev);
        history('/login')

    }

    return (
        <div>
            <Snackbar open={successAlert} autoHideDuration={1000} onClose={handleSuccessClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100 % ' }
                    }
                >
                    <AlertTitle>Successs</AlertTitle>
                    Welcome!
                </Alert >
            </Snackbar >

            <Snackbar open={failAlert} autoHideDuration={5000} onClose={handleFailClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert
                    onClose={handleFailClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    <AlertTitle>Failed</AlertTitle>
                    Failed! Try to LogIn.
                </Alert>
            </Snackbar>
            <form action="" className='flex flex-col justify-around items-center gap-4  p-2  rounded-md text-slate-700' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-around items-center gap-4 bg-slate-50 p-2 m-10 rounded-md text-slate-700'>
                    <h1 className='text-2xl font-semibold italic'><span className='text-orange-400 '>Mule </span>Foods</h1>
                    <h1 className='border-b-2 border-b-orange-400'>Log In</h1>
                    {/* < Navigate to='/home' /> */}
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        className='flex flex-col justify-around items-center'
                    >

                        <TextField id="outlined-basic" type='number' variant="standard" InputProps={{
                            startAdornment: <InputAdornment position="start">(+254)</InputAdornment>,
                        }}
                            label="Phone Number" onChange={(e) => { setPhone(e.target.value) }} maxLength={9} />

                    </Box>
                    <div>
                        {circularProgress ? (
                            <div className='w-[100%]  rounded-md bg-slate-100 z-30'>
                                <Button className='font-bold p-1  rounded-md flex items-center gap-1'><span className='p-3'> <CircularProgress /></span>Please Wait...</Button>
                            </div>
                        ) : (
                            <Button type='submit' className='border border-orange-400 p-1 px-3 rounded-md flex items-center gap-1' > Log In </Button>

                        )}

                    </div>
                </div>
            </form >
        </div >
    )
}

export default Login




