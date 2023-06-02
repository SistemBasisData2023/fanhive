import { useState } from "react";
import "./chapterWrite.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

const ChapterWrite = () => {
  const storyID = useLocation().pathname.split("/")[2];
  const state = useLocation().state;
  const { isLoading, error, data } = useQuery(["story"], () =>
    makeRequest.get("/fic/" + storyID).then((res) => {
      return res.data;
    })
  );
  const [chapter_title, setChapterTitle] = useState(state?.title || "");
  const [chapter_number, setChapterNumber] = useState(
    state?.number || data.chapters.length + 1
  );
  const [value, setValue] = useState(state?.content || "");

  const handleChapterSubmit = async (e) => {
    e.preventDefault();
    try {
      state
        ? await makeRequest.put(`/fic/${storyID}/ch/${state.id}`, {
            chapter_title,
            chapter_content: value,
            chapter_number,
          })
        : await makeRequest.post(`/fic/${storyID}/ch`, {
            chapter_title,
            chapter_content: value,
            chapter_number,
          });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  console.log(data);
  console.log(state);

  return (
    <div className="writingChapter">
      <div className="contentChapter">
        <input
          type="text"
          value={chapter_title}
          placeholder="Chapter Title"
          onChange={(e) => setChapterTitle(e.target.value)}
        />
        <div className="editorContainerChapter">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menuChapter">
        <div className="itemChapter">
          <h1>{data.title}</h1>
          <img src={`../../uploads/${data.coverimage}`} alt="story-cover" />
          <div className="chapterNumber">
            <label htmlFor="ch-num">Chapter</label>
            <input
              type="number"
              id="ch-num"
              value={chapter_number}
              name="ch-num"
              step="1"
              min="1"
              placeholder={data.chapters.length + 1}
              onChange={(e) => setChapterNumber(e.target.value)}
            />
          </div>
          <div className="buttonsChapter">
            <button onClick={handleChapterSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterWrite;
