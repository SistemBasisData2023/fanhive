import "./fic.scss";
import { formatDate } from "../../utilsDate";
import { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";

const Fic = () => {
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

  console.log(data);

  return (
    <div className="fic-details">
      <div className="top-details">
        <img className="fic-cover" src={data.coverimage} alt={data.title} />
        <div className="fic-info">
          <div className="fic-edit-follow">
            <h2 className="fic-title">{data.title}</h2>
            <SettingsRoundedIcon />
          </div>
          <p className="fic-fandom">{data.fandom}</p>
          <p className="fic-author">by {data.author}</p>
          <p className="fic-status">{data.status}</p>
          {data && data.tags && data.tags[0] && (
            <div className="fic-tags">
              {data.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="fic-synopsis">{data.synopsis}</p>
          <div className="fic-stats">
            <span>{data.chaptercount} Chapters</span>
            <span>Published on {formatDate(data.datepublished)}</span>
            <span>Last Updated on {formatDate(data.dateupdated)}</span>
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
        <AddCircleRoundedIcon className="add-chapter-icon" />
      </div>
      {selectedChapter && (
        <div className="chapter-content">
          <div className="title-edit">
            <h2>{selectedChapter.title}</h2>
            <SettingsRoundedIcon />
          </div>
          <p>{selectedChapter.content}</p>
        </div>
      )}
    </div>
  );
};

export default Fic;
