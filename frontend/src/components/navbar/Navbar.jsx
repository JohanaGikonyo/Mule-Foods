import { NavLink } from "react-router-dom"
import MenuDrawer from "./MenuDrawer"
import Person2Icon from '@mui/icons-material/Person2';
function Navbar() {

    return (
        <div className="top-0 sticky flex justify-between p-2 pr-5 items-center bg-slate-100 shadow-md z-50 shadow-slate-200">
            <div className=" text-2xl italic font-semibold"><h1><span className="text-orange-400">Mule</span> Foods</h1></div>
            <div className="hidden lg:flex flex-row justify-around items-center gap-3 ">
                <NavLink to='/mainpage/home'>Home</NavLink>
                <NavLink to='/mainpage/help'>Help?</NavLink>
                <NavLink to='/mainpage/confirm'>Cornfirm</NavLink>
                <NavLink to="/mainpage/account"><Person2Icon /></NavLink>
            </div>
            <div className="block lg:hidden">

                <MenuDrawer />
            </div>

        </div >
    )
}

export default Navbar