import "./leftBar.scss";
import Hearts from "../../assets/red-heart.png";
import Following from "../../assets/following.png";
import Logout from "../../assets/logout-icon.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authenticationContext";
import { Link } from "react-router-dom";

const LeftBar = () => {
  const { loggedUser, logout } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={`../uploads/${loggedUser.profile_pic}`} alt="profpic" />
            <Link
              to={`/profile/${loggedUser.username}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span>{loggedUser.username}</span>
            </Link>
          </div>
          <div className="item">
            <img src={Hearts} alt="Heart Fics" />
            <Link to={`/hearted/${loggedUser.userid}`}>
              <span>Heart</span>
            </Link>
          </div>
          <div className="item">
            <img src={Following} alt="Following" />
            <Link to={`/followed/${loggedUser.userid}`}>
              <span>Following</span>
            </Link>
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
