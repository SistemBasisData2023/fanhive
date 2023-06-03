import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put(`/users/`, user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverPicUrl;
    let profilePicUrl;
    coverPicUrl = cover ? await uploadImage(cover) : user.cover_pic;
    profilePicUrl = profile ? await uploadImage(profile) : user.profile_pic;
    mutation.mutate({ cover_pic: coverPicUrl, profile_pic: profilePicUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Profile Images</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : `../../uploads/${user.cover_pic}`
                  }
                  alt="cover_pic"
                />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : `../../uploads/${user.profile_pic}`
                  }
                  alt="profile_pic"
                />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              onChange={(e) => setProfile(e.target.files[0])}
            />
            <button onClick={handleSubmit}>Save</button>
          </div>
        </form>
        <button className="return" onClick={() => setOpenUpdate(false)}>
          Return
        </button>
      </div>
    </div>
  );
};

export default Update;
