import Divider from "@mui/material/Divider";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="mt-10 mb-5 ">
      <Divider />
      <div className="flex justify-between items-center p-5 gap-2 flex-wrap">
        <small className="text-black flex flex-col items-start justify-around italic">
          <NavLink to="mainpage/home" className="flex text-black">
            <span className="text-orange-400 flex">Mule </span> Foods
          </NavLink>
          <span className="italic">Faster than a phone Call</span>{" "}
        </small>

        <small className="flex items-center justify-center text-center">
          <CopyrightIcon size={5} />
          copyright{new Date().getFullYear()}
        </small>
        <small>Crafted By @Martial School Of IT Students</small>
      </div>
    </div>
  );
}

export default Footer;
