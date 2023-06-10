import "./fic.scss";
import { formatDate } from "../../utilsDate";
import { useContext, useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authenticationContext";
import DOMPurify from "dompurify";
import Comments from "../../components/comments/Comments";

const Fic = () => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const queryClient = useQueryClient();
  const [commentOpen, setCommentSection] = useState(false);
  const { isLoading, error, data } = useQuery(["story"], () =>
    makeRequest.get(`/fic/${id}`).then((res) => {
      return res.data;
    })
  );

  const { isLoading: loadingHeart, data: heartData } = useQuery(
    ["hearts"],
    () =>
      makeRequest.get(`/hearts/${id}`).then((res) => {
        return res.data;
      })
  );

  useEffect(() => {
    if (data && data.chapters && data.chapters.length > 0) {
      setSelectedChapter(data.chapters[0]);
    } else {
      setSelectedChapter(null);
    }
  }, [data]);

  const mutation = useMutation(
    (hearted) => {
      if (hearted) return makeRequest.delete(`/hearts/${id}`);
      return makeRequest.post(`/hearts/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("hearts");
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  const handleDelete = async () => {
    try {
      await makeRequest.delete(`/fic/${id}`);
      // navigate to home page after deletion
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleHeart = () => {
    mutation.mutate(heartData.includes(loggedUser.userid));
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  console.log(selectedChapter);

  return (
    <div className="fic-details">
      <div className="top-details">
        <img
          className="fic-cover"
          src={`../uploads/${data.coverimage}`}
          alt={data.title}
        />
        <div className="fic-info">
          <div className="fic-edit-follow">
            <h2 className="fic-title">{data.title}</h2>
            {loadingHeart ? (
              "loading"
            ) : heartData.includes(loggedUser.userid) ? (
              <FavoriteRoundedIcon onClick={handleHeart} />
            ) : (
              <FavoriteBorderRoundedIcon onClick={handleHeart} />
            )}
            <CommentRoundedIcon
              onClick={() => setCommentSection(!commentOpen)}
            />
            {loggedUser.username === data.author && (
              <div className="edit">
                <Link
                  to={`/write?edit=2`}
                  style={{ color: "inherit" }}
                  state={data}
                >
                  <SettingsRoundedIcon />
                </Link>
                <DeleteRoundedIcon onClick={handleDelete} />
              </div>
            )}
          </div>
          {data.fandom.map((fandom) => (
            <span className="fic-fandom" key={fandom}>
              <Link
                to={`/fandom/${encodeURIComponent(fandom)}`}
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                {fandom}
              </Link>
              {data.fandom.indexOf(fandom) !== data.fandom.length - 1 && ", "}
            </span>
          ))}
          <p className="fic-author">
            by{" "}
            <Link
              to={`/profile/${data.author}`}
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              {data.author}
            </Link>
          </p>
          <p className="fic-status">{data.status}</p>
          {data && data.tags && data.tags[0] && (
            <div className="fic-tags">
              {data.tags.map((tag) => (
                <span className="tag" key={tag}>
                  <Link
                    to={`/tags/${encodeURIComponent(tag)}`}
                    style={{ color: "inherit", textDecoration: "underline" }}
                  >
                    {tag}
                  </Link>
                  {data.tags.indexOf(tag) !== data.tags.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
          <p className="fic-synopsis">{getText(data.synopsis)}</p>
          <div className="fic-stats">
            <span>{data.chaptercount} Chapters</span>
            <span>Published on {formatDate(data.datepublished)}</span>
            <span>
              Last Updated on{" "}
              {data.dateUpdated
                ? formatDate(data.dateupdated)
                : formatDate(data.datepublished)}
            </span>
            <span>
              {data &&
                data.wordCount !== undefined &&
                Number(data.wordCount).toLocaleString("en-US")}{" "}
              Words
            </span>
          </div>
        </div>
      </div>
      <div className="chapter-picker">
        {data &&
          data.chapters &&
          data.chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => handleChapterSelect(chapter)}
            >
              Chapter {chapter.number}
            </button>
          ))}
        {loggedUser.username === data.author && (
          <Link to={`/write/${data.id}/ch`}>
            <AddCircleRoundedIcon className="add-chapter-icon" />
          </Link>
        )}
      </div>
      {selectedChapter && (
        <div className="chapter-content">
          <div className="title-edit">
            <h2>{selectedChapter.title}</h2>
            {loggedUser.username === data.author && (
              <Link
                to={`/write/${data.id}/ch?edit=2`}
                style={{ color: "inherit" }}
                state={selectedChapter}
              >
                <SettingsRoundedIcon />
              </Link>
            )}
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedChapter.content),
            }}
          ></p>
        </div>
      )}
      {commentOpen && (
        <Comments setCommentSection={setCommentSection} storyID={id} />
      )}
    </div>
  );
};

export default Fic;
