import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';
import { AlertTitle, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useUser } from '../Store/Store';
import axios from 'redaxios'
import { useNavigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function SignIn() {
    const { setUser } = useUser((state) => ({
        setUser: state.setUser
    }))
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState()
    const [location, setLocation] = useState("")
    const [circularProgress, setCircularProgress] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [failAlert, setFailAlert] = useState(false)
    const history = useNavigate()
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

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
                navigate('/')
            }
        }
    }, [navigate]);


    const handleSetUser = () => {
        setUser({
            id: Math.ceil(Math.random() * 1000000),
            userName: name,
            userEmail: email,
            userPhone: phone,
            userLocation: location

        })


    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCircularProgress(prev => !prev)
        try {
            const response = await axios.post('http://localhost:3000/api/signin', {
                name, email, location, phone
            })
            if (response.data === "exists") {
                setCircularProgress(prev => !prev)
                console.log("The user Exists. Please LogIn")
                setFailAlert(prev => !prev)
            }
            else {

                setCircularProgress(prev => !prev)
                console.log("created user Successfully")
                handleSetUser();
                localStorage.setItem('token', response.data.token);
                setSuccessAlert(prev => !prev)
            }
        }

        catch (error) {
            console.error("An error occured", error)
            console.log(error)
        }
    }
    const handleSuccessClose = () => {

        setSuccessAlert(prev => !prev);
        history('/mainpage/home')
    }
    const handleFailClose = () => {
        setFailAlert(prev => !prev);
        history('/')

    }

    return (
        <div>
            <Snackbar open={successAlert} autoHideDuration={5000} onClose={handleSuccessClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100 % ' }
                    }
                >
                    <AlertTitle>Successs</AlertTitle>
                    Successfully Registered!
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
                    <h1 className='border-b-2 border-b-orange-400'>Sign Up</h1>
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
                        <TextField id="outlined-basic" label="Name" variant="standard" helperText="Please enter your name"
                            required onChange={(e) => { setName(e.target.value) }} />
                        <TextField id="outlined-basic" type='number' variant="standard" InputProps={{
                            startAdornment: <InputAdornment position="start">(+254)</InputAdornment>,
                        }}
                            label="Phone Number" onChange={(e) => { setPhone(e.target.value) }} maxLength={9} />
                        <TextField id="outlined-basic" type='email' variant="standard" label="Email Address" required onChange={(e) => { setEmail(e.target.value) }} />

                        <TextField id="outlined-basic" type='text' label="Location" variant="standard" onChange={(e) => { setLocation(e.target.value) }} />

                    </Box>
                    <div>
                        {circularProgress ? (
                            <div className='w-[100%]  rounded-md bg-slate-100 z-30'>
                                <Button className='font-bold p-1  rounded-md flex items-center gap-1'><span className='p-3'> <CircularProgress /></span>In Progress. Please Wait...</Button>
                            </div>
                        ) : (
                            <Button type='submit' className='border border-orange-400 p-1 px-3 rounded-md flex items-center gap-1' > Create Account </Button>

                        )}


                    </div>
                    <div><NavLink to="/login" className="text-blue-500 text-sm underline">Already have an account? Log In</NavLink></div>
                </div>
            </form >
        </div >
    )
}

export default SignIn