import "./navbar.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/authenticationContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>FanHive</span>
        </Link>
        <HomeRoundedIcon onClick={navigateToHome}/>
        {darkMode ? (
          <NightlightRoundedIcon onClick={toggle} />
        ) : (
          <LightModeRoundedIcon onClick={toggle} />
        )}
        <AppsRoundedIcon />
        <div className="searchbar">
          <SearchRoundedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link to="/write" style={{ textDecoration: "none" }}>
          <div className="writeFic">
            <CreateRoundedIcon />
            <span>Write</span>
          </div>
        </Link>
        <div className="user">
          <img src={`../uploads/${loggedUser.profile_pic}`} alt="profpic" />
          <Link
            to={`/profile/${loggedUser.username}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <span>{loggedUser.username}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
