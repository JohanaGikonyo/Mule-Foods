import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { AlertTitle, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'redaxios';
import { useNavigate, NavLink } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../Store/Store';
function SignIn() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [locationAround, setLocationAround] = useState("");
    const [street, setStreet] = useState("");
    const [building, setBuilding] = useState("");
    const [floor, setFloor] = useState("");
    const [other, setOther] = useState("");
    const [circularProgress, setCircularProgress] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const history = useNavigate();
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const locationString = `${locationAround}, ${street} street, ${building} building, ${floor}, ${other}`;
        setCircularProgress(true);

        try {
            const response = await axios.post('https://mule-foods.onrender.com/api/signin', {
                name,
                email,
                location: locationString,
                phone
            });

            if (response.data === "exists") {
                setCircularProgress(false);
                setFailAlert(true);
            } else {
                setCircularProgress(false);
                useAuthStore.setState({ token: response.data.token });
                setSuccessAlert(true);
            }
        } catch (error) {
            console.error("An error occurred", error);
            setCircularProgress(false);
            setFailAlert(true);
        }
    };

    const handleSuccessClose = () => {
        setSuccessAlert(false);
        history('/mainpage/home');
    };

    const handleFailClose = () => {
        setFailAlert(false);
        history('/');
    };

    return (
        <div>
            <Snackbar open={successAlert} autoHideDuration={5000} onClose={handleSuccessClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleSuccessClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    <AlertTitle>Success</AlertTitle>
                    Successfully Registered!
                </Alert>
            </Snackbar>

            <Snackbar open={failAlert} autoHideDuration={5000} onClose={handleFailClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleFailClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                    <AlertTitle>Failed</AlertTitle>
                    Failed! Try to Log In.
                </Alert>
            </Snackbar>

            <form className='flex flex-col justify-around items-center gap-4 p-2 rounded-md text-slate-700' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-around items-center gap-4 bg-slate-50 p-2 m-10 rounded-md text-slate-700'>
                    <div className="text-center flex items-start flex-col justify-between gap-0">
                        <h1 className="text-2xl font-semibold italic">
                            <span className="text-orange-400">Mule</span>Foods
                        </h1>
                        <p className="text-sm italic font-bold">faster than a phone call</p>
                    </div>

                    <h1 className='border-b-2 border-b-orange-400'>Sign Up</h1>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off" className='flex flex-col justify-around items-center'>
                        <TextField id="outlined-basic" label="Name" variant="standard" helperText="Please enter your name" required onChange={(e) => setName(e.target.value)} />
                        <TextField id="outlined-basic" type='number' variant="standard" InputProps={{ startAdornment: <InputAdornment position="start">(+254)</InputAdornment> }} label="Phone Number" onChange={(e) => setPhone(e.target.value)} maxLength={9} />
                        <TextField id="outlined-basic" type='email' variant="standard" label="Email Address" required onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" type='text' label="Location around upperHill" variant="standard" onChange={(e) => setLocationAround(e.target.value)} required />
                        <TextField id="outlined-basic" type='text' label="Street" variant="standard" onChange={(e) => setStreet(e.target.value)} required />
                        <TextField id="outlined-basic" type='text' label="Building" variant="standard" onChange={(e) => setBuilding(e.target.value)} />
                        <TextField id="outlined-basic" type='text' label="Floor" variant="standard" onChange={(e) => setFloor(e.target.value)} />
                        <TextField id="outlined-basic" type='text' label="Other" variant="standard" onChange={(e) => setOther(e.target.value)} />
                    </Box>
                    <div>
                        {circularProgress ? (
                            <div className='w-[100%] rounded-md bg-slate-100 z-30'>
                                <Button className='font-bold p-1 rounded-md flex items-center gap-1'><span className='p-3'><CircularProgress /></span>Please Wait...</Button>
                            </div>
                        ) : (
                            <Button type='submit' className='border border-orange-400 p-1 px-3 rounded-md flex items-center gap-1'>Create Account</Button>
                        )}
                    </div>
                    <div><NavLink to="/login" className="text-blue-500 text-sm underline">Already have an account? Log In</NavLink></div>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
