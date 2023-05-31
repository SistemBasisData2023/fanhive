import { useState } from "react";
import "./ficWrite.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FicWrite = () => {
  const [value, setValue] = useState("");

  return (
    <div className="writing">
      <div className="content">
        <input type="text" placeholder="Story Title" />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Post Fic</h1>
          <span>Story Art (Recommended: 512x800px)</span>
          <input type="file" style={{ display: "none" }} name="" id="file" />
          <label className="cover-file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Submit</button>
          </div>
        </div>
        <div className="item">
          <h1>Status</h1>
          <div className="status">
            <div className="check">
              <input type="checkbox" name="stat" value="finished" />
            </div>
            <label htmlFor="finished">Finished</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicWrite;
