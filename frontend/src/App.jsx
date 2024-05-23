
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import Login from './components/Authentication/Login';
import Home from './components/Pages/Home';
import Help from './components/Pages/Help';
import Confirmation from './components/Pages/Corfirmation'
import Account from './components/Pages/Account';
import Cart from './components/Pages/Cart';
import Orders from './components/Admin/Orders';
import Navbar from './components/navbar/Navbar';
import { useAuthStore } from './components/Store/Store';
import './App.css';

function App() {
  const token = useAuthStore((state) => state.token);
  return (
    <div className=''>
      <Routes>
        {/* Redirect to main page if user is authenticated */}
        {token && <Route path='/' element={<Navigate to='/mainpage/home' />} />}

        {/* Render main page routes */}
        <Route path='/mainpage/*' element={<MainPageRoutes />} />
        <Route path='/' element={<SignIn />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

function MainPageRoutes() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/help' element={<Help />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/confirm' element={<Confirmation />} />
        <Route path='/account' element={<Account />} />
        <Route path='/orders' element={<Orders />} />
      </Routes >
    </>
  );
}

export default App;
