import "./stories.scss";
import { formatDate } from "../../utilsDate";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const Stories = ({ endpoint }) => {
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get(endpoint).then((res) => {
      return res.data;
    })
  );

  if (isLoading) return <div>Loading...</div>;

  // show error message if there is an error
  if (error) return <div>Error: {error.message} </div>;

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="stories">
      {data.map((story) => (
        <div className="story" key={story.id}>
          <img
            className="story-cover"
            src={`../uploads/${story.coverImage}`}
            alt={story.title}
          />
          <div className="story-info">
            <Link to={`/fic/${story.id}`} style={{ textDecoration: "none" }}>
              <h2 className="story-title">{story.title}</h2>
            </Link>
            <p className="story-fandom">{story.fandom}</p>
            <p className="story-author">by {story.author}</p>
            <p className="story-status">{story.status}</p>
            {story.tags.length > 0 && (
              <div className="story-tags">
                {story.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                    {story.tags.indexOf(tag) !== story.tags.length - 1 && ", "}
                  </span>
                ))}
              </div>
            )}
            <p className="story-synopsis">{getText(story.synopsis)}</p>
            <div className="story-stats">
              <span>{story.chapterCount} Chapters</span>
              <span>Published on {formatDate(story.datePublished)}</span>
              <span>
                Last Updated on{" "}
                {story.dateUpdated
                  ? formatDate(story.dateUpdated)
                  : formatDate(story.datePublished)}
              </span>
              <span>
                {story.wordCount
                  ? story.wordCount.toLocaleString("en-US")
                  : "0 "}{" "}
                Words
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Stories.defaultProps = {
  endpoint: "/fic/",
};

export default Stories;
