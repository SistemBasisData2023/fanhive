import "./leftBar.scss";
import Hearts from "../../assets/red-heart.png";
import Following from "../../assets/following.png";
import Logout from "../../assets/logout-icon.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authenticationContext";

const LeftBar = () => {
  const { loggedUser, logout } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={loggedUser.profile_pic} alt="profpic" />
            <span>{loggedUser.username}</span>
          </div>
          <div className="item">
            <img src={Hearts} alt="Heart Fics" />
            <span>Heart</span>
          </div>
          <div className="item">
            <img src={Following} alt="Following" />
            <span>Following</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Preferences</span>
          <div className="item">
            <img src={Logout} alt="Logout" />
            <span onClick={logout}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
