import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authenticationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { formatDate } from "../../utilsDate";

const Comments = ({ setCommentSection, storyID }) => {
  const [content, setContent] = useState("");
  const { loggedUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post(`/comments/${storyID}`, newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const { isLoading, data, error } = useQuery(["comments"], () =>
    makeRequest.get(`/comments/${storyID}`).then((res) => {
      return res.data;
    })
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ content });
    setContent("");
  };

  console.log(data);

  return (
    <div className="comments">
      <div className="wrapper">
        <h1>Comments</h1>
        <div className="post-comment">
          <img src={"../uploads/" + loggedUser.profile_pic} alt="profile-pic" />
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleClick}>Share</button>
        </div>
        {error
          ? "Error fetching comments"
          : isLoading
          ? "Loading..."
          : data.map((comment) => (
              <div className="comment">
                <img
                  src={"../uploads/" + comment.profile_pic}
                  alt="commenter-pic"
                />
                <div className="info">
                  <span>{comment.username}</span>
                  <p>{comment.content}</p>
                </div>
                <span className="date">{formatDate(comment.date_posted)}</span>
              </div>
            ))}
        <button className="return" onClick={() => setCommentSection(false)}>
          Return
        </button>
      </div>
    </div>
  );
};

export default Comments;
