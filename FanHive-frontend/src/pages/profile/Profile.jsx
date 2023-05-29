import "./profile.scss";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import Stories from "../../components/stories/Stories";

const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://img.freepik.com/free-vector/gradient-mountain-landscape_52683-77407.jpg"
          alt="cover"
          className="cover"
        />
        <img
          src="https://images3.alphacoders.com/654/654249.png"
          alt="profilePic"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <span>saitama_senpai</span>
          <div className="userStats">
            <div className="following">
              <AccessibilityNewRoundedIcon />
              <span>681</span>
            </div>
            <div className="followers">
              <PeopleAltRoundedIcon />
              <span>1,181</span>
            </div>
          </div>
          <button>Follow</button>
        </div>
      </div>
      <div className="profileStories">
        <Stories />
      </div>
    </div>
  );
};

export default Profile;
