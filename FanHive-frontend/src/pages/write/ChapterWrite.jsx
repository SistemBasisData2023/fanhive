import { useState } from "react";
import "./chapterWrite.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ChapterWrite = () => {
  const [value, setValue] = useState("");

  const story = {
    id: "261316381",
    coverImage: "https://img.wattpad.com/cover/261316381-288-k546095.jpg",
    fandom: "Original Work",
    title: "Thread of Gold",
    author: "JKMacLaren",
    status: "Finished",
    tags: [],
    synopsis:
      "Annalise Cidarius wants to take back the throne. It belongs to her: she comes from a long line of magical Nightweavers who ruled Winterlynn up until the day that her family was brutally murdered. A rebellion led by another magical group, the Dayweavers, usurped the throne and forced Anna to go into hiding...until now. Anna wants the throne back and has a plan to take it. Everything she needs is hidden inside the castle walls. But once inside, Anna realizes she has not accounted for her newfound feelings for the charming and handsome Dayweaver king, Ryne Delafort. Will Anna's greatest enemy also become her greatest love?.",
    chapterCount: 10,
    datePublished: "2022-11-04",
    dateUpdated: "2022-11-04",
    wordCount: 626314,
    chapters: [
      {
        id: 1,
        title: "Castle of Wielkingdam",
        number: 1,
        content: "Long time ago in a galaxy far, far away...",
      },
      {
        id: 2,
        title: "Chapter 2",
        number: 2,
        content: "It is a period of civil war...",
      },
      {
        id: 3,
        title: "Chapter 3",
        number: 3,
        content: "Rebel spaceships, striking...",
      },
      {
        id: 4,
        title: "Chapter 4",
        number: 4,
        content: "During the battle, Rebel...",
      },
      {
        id: 5,
        title: "Chapter 5",
        number: 5,
        content: "Pursued by the Empire's...",
      },
      {
        id: 6,
        title: "Chapter 6",
        number: 6,
        content: "Evading the dreaded Imperial...",
      },
      {
        id: 7,
        title: "Chapter 7",
        number: 7,
        content: "Luke Skywalker has returned...",
      },
      {
        id: 8,
        title: "Chapter 8",
        number: 8,
        content: "The Empire has driven the...",
      },
      {
        id: 9,
        title: "Chapter 9",
        number: 9,
        content: "The Emperor has ordered the...",
      },
      {
        id: 10,
        title: "Chapter 10",
        number: 10,
        content: "The Emperor has ordered the...",
      },
    ],
  };

  return (
    <div className="writingChapter">
      <div className="contentChapter">
        <input type="text" placeholder="Chapter Title" />
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
          <h1>{story.title}</h1>
          <img src={story.coverImage} alt="story-cover" />
          <div className="chapterNumber">
            <label htmlFor="ch-num">Chapter</label>
            <input type="number" id="ch-num" name="ch-num" step="1" min="1" />
          </div>
          <div className="buttonsChapter">
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterWrite;
