
import { Routes, Route, Outlet } from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import Login from './components/Authentication/Login';
import Home from './components/Pages/Home';
import Help from './components/Pages/Help';
import Confirmation from './components/Pages/Corfirmation'
import Account from './components/Pages/Account';
import Navbar from './components/navbar/Navbar';

import './App.css';

function App() {


  return (
    <div className=''>
      <Routes>
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
        <Route path='/confirm' element={<Confirmation />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
