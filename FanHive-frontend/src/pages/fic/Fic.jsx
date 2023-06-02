import "./fic.scss";
import { formatDate } from "../../utilsDate";
import { useContext, useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authenticationContext";

const Fic = () => {
  const { loggedUser } = useContext(AuthContext);
  const { id } = useParams();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const { isLoading, error, data } = useQuery(["story"], () =>
    makeRequest.get(`/fic/${id}`).then((res) => {
      return res.data;
    })
  );

  useEffect(() => {
    if (data && data.chapters && data.chapters.length > 0) {
      setSelectedChapter(data.chapters[0]);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

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
            <FavoriteRoundedIcon />
            {loggedUser.username === data.author && (
              <div className="edit">
                <Link to={`/write?edit=2`} state={data}>
                  <SettingsRoundedIcon />
                </Link>
                <DeleteRoundedIcon />
              </div>
            )}
          </div>
          <p className="fic-fandom">{data.fandom}</p>
          <p className="fic-author">by {data.author}</p>
          <p className="fic-status">{data.status}</p>
          {data && data.tags && data.tags[0] && (
            <div className="fic-tags">
              {data.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
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
                data.wordCount.toLocaleString("en-US")}{" "}
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
              //className={
              //selectedChapter.id === chapter.number ? "selected" : ""
              //}
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
            <Link to={`/write/${data.id}/ch?edit=2`} state={selectedChapter}>
              <SettingsRoundedIcon />
            </Link>
          </div>
          <p>{selectedChapter.content}</p>
        </div>
      )}
    </div>
  );
};

export default Fic;
