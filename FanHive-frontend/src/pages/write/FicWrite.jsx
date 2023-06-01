import { useState } from "react";
import "./ficWrite.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

const FicWrite = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.synopsis || "");
  const [title, setTitle] = useState(state?.title || "");
  const [fandom, setFandom] = useState(state?.fandom || "");
  const [tags, setTags] = useState(state?.tags || "");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(state?.status || false);

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();
    try {
      state
        ? await makeRequest.put(`/fic/${state.id}`, {
            title,
            story_desc: value,
            is_finished: status,
            fandom,
            tags,
            story_cover: file ? imageUrl : "",
          })
        : await makeRequest.post(`/fic/`, {
            title,
            story_desc: value,
            is_finished: status,
            fandom,
            tags,
            story_cover: file ? imageUrl : "",
          });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="writing">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Story Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fandom(s)"
          value={fandom}
          onChange={(e) => setFandom(e.target.value)}
        />
        <input
          type="text"
          value={tags}
          placeholder="Tags, separate by comma"
          onChange={(e) => setTags(e.target.value)}
        />
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
          <input
            type="file"
            style={{ display: "none" }}
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="cover-file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div className="item">
          <h1>Status</h1>
          <div className="status">
            <div className="check">
              <input
                type="checkbox"
                name="stat"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            </div>
            <label htmlFor="status">Finished</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicWrite;
