
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react';
import { AlertTitle, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'redaxios'
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../Store/Store';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
function Account() {
    const [phone, setPhone] = useState()
    const [locationAround, setLocationAround] = useState("");
    const [street, setStreet] = useState("");
    const [building, setBuilding] = useState("");
    const [floor, setFloor] = useState("");
    const [other, setOther] = useState("");
    const [circularProgress, setCircularProgress] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [failAlert, setFailAlert] = useState(false)
    const history = useNavigate()
    const token = useAuthStore(state => state.token)
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;


    useEffect(() => {

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    setPhone(decodedToken.userPhone)
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page

            }
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const locationString = `${locationAround}, ${street} street, ${building} building, ${floor}, ${other}`;

        setCircularProgress(prev => !prev)
        try {
            const response = await axios.patch(`https://mule-foods.onrender.com/api/update/${phone}`, {
                location: locationString
            })
            if (response.data === "not success") {
                setCircularProgress(prev => !prev)
                setFailAlert(prev => !prev)
            }
            else {
                setCircularProgress(prev => !prev)
                useAuthStore.setState({ token: response.data.token });
                console.log("User Updated Successfully")
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
        history('/mainpage/confirm')
    }
    const handleFailClose = () => {
        setFailAlert(prev => !prev);
        history('/mainpage/account')

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
                    Successfully Updated!
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
                    Failed! Try to again.
                </Alert>
            </Snackbar>

            <form action="" className='flex flex-col justify-around items-center gap-4  p-2  rounded-md text-slate-700' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-around items-center gap-4 bg-slate-50 p-2 m-10 rounded-md text-slate-700'>
                    <h1 className='text-2xl font-semibold italic'><span className='text-orange-400 '>Mule </span>Foods</h1>
                    <h1 className='border-b-2 border-b-orange-400'>Change Location</h1>
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

                        <TextField id="outlined-basic" type='number' value={phone} variant="standard" InputProps={{
                            startAdornment: <InputAdornment position="start">(+254)</InputAdornment>,
                        }}
                            label="Phone Number" onChange={(e) => { setPhone(e.target.value) }} maxLength={9} />
                        <TextField id="outlined-basic" type='text' label="Location around upperHill" variant="standard" onChange={(e) => setLocationAround(e.target.value)} required />
                        <TextField id="outlined-basic" type='text' label="Street" variant="standard" onChange={(e) => setStreet(e.target.value)} required />
                        <TextField id="outlined-basic" type='text' label="Building" variant="standard" onChange={(e) => setBuilding(e.target.value)} />
                        <TextField id="outlined-basic" type='text' label="Floor" variant="standard" onChange={(e) => setFloor(e.target.value)} />
                        <TextField id="outlined-basic" type='text' label="Other" variant="standard" onChange={(e) => setOther(e.target.value)} />

                    </Box>
                    <div>
                        {circularProgress ? (
                            <div className='w-[100%]  rounded-md bg-slate-100 z-30'>
                                <Button className='font-bold p-1  rounded-md flex items-center gap-1'><span className='p-3'> <CircularProgress /></span>In Progress. Please Wait...</Button>
                            </div>
                        ) : (
                            <Button type='submit' className='border border-orange-400 p-1 px-3 rounded-md flex items-center gap-1' > Update </Button>

                        )}

                    </div>
                </div>
            </form >
        </div >
    )
}

export default Account