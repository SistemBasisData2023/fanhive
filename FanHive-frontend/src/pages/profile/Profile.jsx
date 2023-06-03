import "./profile.scss";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import Stories from "../../components/stories/Stories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authenticationContext";

const Profile = () => {
  const { loggedUser } = useContext(AuthContext);
  const userName = useLocation().pathname.split("/")[2];
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete(`/follows/${userName}`);
      return makeRequest.post(`/follows/${userName}`);
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries("follows");
      }
    }
  )

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get(`/users/${userName}`).then((res) => {
      return res.data;
    })
  );

  const { isLoading: followLoading, data: followData } = useQuery(
    ["follows"],
    () =>
      makeRequest.get(`/follows/${userName}`).then((res) => {
        return res.data;
      })
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const handleFollow = () => {
    mutation.mutate(followData.includes(loggedUser.userid));
  };

  console.log(followData);

  return (
    <div className="profile">
      <div className="images">
        <img
          src={`../../uploads/${data.cover_pic}`}
          alt="cover"
          className="cover"
        />
        <img
          src={`../../uploads/${data.profile_pic}`}
          alt="profilePic"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <span>{data.username}</span>
          <div className="userStats">
            <div className="following">
              <AccessibilityNewRoundedIcon />
              <span>{data.followingcount.toLocaleString("en-US")}</span>
            </div>
            <div className="followers">
              <PeopleAltRoundedIcon />
              <span>{data.followercount.toLocaleString("en-US")}</span>
            </div>
          </div>
          {followLoading ? (
            "Loading"
          ) : data.userid === loggedUser.userid ? (
            <button>Edit</button>
          ) : (
            <button onClick={handleFollow}>
              {followData.includes(loggedUser.userid) ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <div className="profileStories">
        <Stories endpoint={`/fic/profile/${data.username}`} />
      </div>
    </div>
  );
};

export default Profile;
